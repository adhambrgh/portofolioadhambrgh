"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface PendulumPhysicsConfig {
  maxAngle: number;
  stiffness: number;
  damping: number;
  mass: number;
  elasticLimit: number;
  releaseVelocityScale: number;
}

export interface PendulumPhysicsReturn {
  angle: number;
  angularVelocity: number;
  isAnimating: boolean;
  setAngleDirectly: (angle: number) => void;
  impulse: (velocity: number) => void;
  stop: () => void;
  setDragging: (dragging: boolean) => void;
}

const DEFAULT_CONFIG: PendulumPhysicsConfig = {
  maxAngle: (35 * Math.PI) / 180,
  stiffness: 0.55,
  damping: 0.055,
  mass: 1,
  elasticLimit: 0.25,
  releaseVelocityScale: 0.8,
};

export function usePendulumPhysics(
  config: Partial<PendulumPhysicsConfig> = {},
  prefersReducedMotion: boolean
): PendulumPhysicsReturn {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const [angle, setAngle] = useState(0);
  const [angularVelocity, setAngularVelocity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragAngleRef = useRef(0);
  const prefersReducedMotionRef = useRef(prefersReducedMotion);
  prefersReducedMotionRef.current = prefersReducedMotion;

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const clampAngle = useCallback((value: number) => {
    const limit = cfgRef.current.maxAngle * (1 + cfgRef.current.elasticLimit);
    return Math.max(-limit, Math.min(limit, value));
  }, []);

  const stepRef = useRef<(now: number) => void>(() => {});
  stepRef.current = (now: number) => {
    const c = cfgRef.current;

    if (prefersReducedMotionRef.current) {
      angleRef.current = 0;
      velocityRef.current = 0;
      setAngle(0);
      setAngularVelocity(0);
      setIsAnimating(false);
      rafRef.current = null;
      return;
    }

    const dt = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0;
    lastTimeRef.current = now;

    if (dt <= 0 || dt > 0.1) {
      rafRef.current = requestAnimationFrame((t) => stepRef.current(t));
      return;
    }

    const diff = 0 - angleRef.current;
    const springForce = -c.stiffness * diff;
    const dampingForce = -c.damping * velocityRef.current;
    const accel = (springForce + dampingForce) / c.mass;

    velocityRef.current += accel * dt;
    angleRef.current = clampAngle(angleRef.current + velocityRef.current * dt);

    const EPSILON_ANGLE = 0.0008;
    const EPSILON_VELOCITY = 0.002;
    const settled =
      Math.abs(angleRef.current) < EPSILON_ANGLE &&
      Math.abs(velocityRef.current) < EPSILON_VELOCITY;

    if (settled) {
      angleRef.current = 0;
      velocityRef.current = 0;
      setAngle(0);
      setAngularVelocity(0);
      setIsAnimating(false);
      rafRef.current = null;
      return;
    }

    setAngle(angleRef.current);
    setAngularVelocity(velocityRef.current);

    rafRef.current = requestAnimationFrame((t) => stepRef.current(t));
  };

  const startRaf = useCallback(() => {
    if (rafRef.current !== null) return;
    if (prefersReducedMotionRef.current) return;
    setIsAnimating(true);
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame((t) => stepRef.current(t));
  }, []);

  const setAngleDirectly = useCallback(
    (newAngle: number) => {
      const clamped = clampAngle(newAngle);
      const now = performance.now();
      const dt = now - lastDragTimeRef.current;

      if (dt > 0 && dt < 120 && lastDragTimeRef.current !== 0) {
        const deltaAngle = clamped - lastDragAngleRef.current;
        velocityRef.current = (deltaAngle / (dt / 1000)) * cfgRef.current.releaseVelocityScale;
      }

      lastDragTimeRef.current = now;
      lastDragAngleRef.current = clamped;

      angleRef.current = clamped;
      setAngle(clamped);
      setAngularVelocity(velocityRef.current);
    },
    [clampAngle]
  );

  const setDragging = useCallback(
    (dragging: boolean) => {
      if (dragging) {
        stopRaf();
        setIsAnimating(false);
        isDraggingRef.current = true;
        lastDragTimeRef.current = 0;
        lastDragAngleRef.current = angleRef.current;
        velocityRef.current = 0;
      } else {
        isDraggingRef.current = false;

        const now = performance.now();
        const dt = now - lastDragTimeRef.current;
        if (dt > 0 && dt < 150 && lastDragTimeRef.current !== 0) {
          const deltaAngle = angleRef.current - lastDragAngleRef.current;
          velocityRef.current = (deltaAngle / (dt / 1000)) * cfgRef.current.releaseVelocityScale;
        }

        velocityRef.current = Math.max(
          -12,
          Math.min(12, velocityRef.current)
        );

        lastTimeRef.current = 0;
        startRaf();
      }
    },
    [stopRaf, startRaf]
  );

  const impulse = useCallback(
    (velocity: number) => {
      if (prefersReducedMotionRef.current) return;
      velocityRef.current += velocity;
      startRaf();
    },
    [startRaf]
  );

  const stop = useCallback(() => {
    stopRaf();
    angleRef.current = 0;
    velocityRef.current = 0;
    setAngle(0);
    setAngularVelocity(0);
    setIsAnimating(false);
  }, [stopRaf]);

  useEffect(() => {
    if (prefersReducedMotion) {
      stopRaf();
      angleRef.current = 0;
      velocityRef.current = 0;
      setAngle(0);
      setAngularVelocity(0);
      setIsAnimating(false);
    }
  }, [prefersReducedMotion, stopRaf]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return {
    angle,
    angularVelocity,
    isAnimating,
    setAngleDirectly,
    impulse,
    stop,
    setDragging,
  };
}