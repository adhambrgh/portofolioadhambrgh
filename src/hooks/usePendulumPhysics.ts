"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface PendulumPhysicsConfig {
  maxAngle: number;
  stiffness: number;
  damping: number;
  mass: number;
  elasticLimit: number;
}

export interface PendulumPhysicsReturn {
  angle: number;
  angularVelocity: number;
  isAnimating: boolean;
  setTargetAngle: (angle: number, immediate?: boolean) => void;
  impulse: (velocity: number) => void;
  stop: () => void;
  setDragging: (dragging: boolean) => void;
}

const DEFAULT_CONFIG: PendulumPhysicsConfig = {
  maxAngle: 25 * Math.PI / 180,
  stiffness: 0.8,
  damping: 0.15,
  mass: 1,
  elasticLimit: 0.2,
};

export function usePendulumPhysics(
  config: Partial<PendulumPhysicsConfig> = {},
  prefersReducedMotion: boolean
): PendulumPhysicsReturn {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const [angle, setAngle] = useState(0);
  const [angularVelocity, setAngularVelocity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const targetAngleRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  const step = useCallback(
    (currentTime: number) => {
      if (prefersReducedMotion) {
        stopAnimation();
        return;
      }

      const dt = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = currentTime;

      if (dt === 0 || dt > 0.1) {
        animationFrameRef.current = requestAnimationFrame(step);
        return;
      }

      const currentAngle = angle;
      const currentVelocity = angularVelocity;

      const targetAngle = isDraggingRef.current
        ? targetAngleRef.current
        : 0;

      const angleDiff = targetAngle - currentAngle;

      const springForce = -cfg.stiffness * angleDiff;
      const dampingForce = -cfg.damping * currentVelocity;
      const acceleration = (springForce + dampingForce) / cfg.mass;

      let newVelocity = currentVelocity + acceleration * dt;
      let newAngle = currentAngle + newVelocity * dt;

      if (!isDraggingRef.current) {
        if (Math.abs(newAngle) > cfg.maxAngle * (1 + cfg.elasticLimit)) {
          const overLimit = Math.abs(newAngle) - cfg.maxAngle * (1 + cfg.elasticLimit);
          const elasticForce = -overLimit * cfg.stiffness * 2;
          newVelocity += (elasticForce / cfg.mass) * dt * Math.sign(-newAngle);
        }
      }

      const EPSILON = 0.0001;
      const isSettled =
        !isDraggingRef.current &&
        Math.abs(newAngle) < EPSILON &&
        Math.abs(newVelocity) < EPSILON;

      if (isSettled) {
        setAngle(0);
        setAngularVelocity(0);
        stopAnimation();
        return;
      }

      setAngle(newAngle);
      setAngularVelocity(newVelocity);

      animationFrameRef.current = requestAnimationFrame(step);
    },
    [angle, angularVelocity, cfg, prefersReducedMotion, stopAnimation]
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      stopAnimation();
      setAngle(0);
      setAngularVelocity(0);
      return;
    }
  }, [prefersReducedMotion, stopAnimation]);

  const setTargetAngle = useCallback(
    (newTargetAngle: number, immediate = false) => {
      const clamped = Math.max(
        -cfg.maxAngle * (1 + cfg.elasticLimit),
        Math.min(cfg.maxAngle * (1 + cfg.elasticLimit), newTargetAngle)
      );
      targetAngleRef.current = clamped;

      if (immediate) {
        setAngle(clamped);
        setAngularVelocity(0);
        stopAnimation();
      } else if (!isAnimating) {
        setIsAnimating(true);
        lastTimeRef.current = performance.now();
        animationFrameRef.current = requestAnimationFrame(step);
      }
    },
    [cfg, isAnimating, step, stopAnimation]
  );

  const impulse = useCallback(
    (velocity: number) => {
      setAngularVelocity((prev) => prev + velocity);
      if (!isAnimating) {
        setIsAnimating(true);
        lastTimeRef.current = performance.now();
        animationFrameRef.current = requestAnimationFrame(step);
      }
    },
    [isAnimating, step]
  );

  const stop = useCallback(() => {
    setTargetAngle(0, true);
  }, [setTargetAngle]);

  const setDragging = useCallback((dragging: boolean) => {
    isDraggingRef.current = dragging;
    if (dragging && !isAnimating) {
      setIsAnimating(true);
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(step);
    }
  }, [isAnimating, step]);

  return {
    angle,
    angularVelocity,
    isAnimating,
    setTargetAngle,
    impulse,
    stop,
    setDragging,
  };
}

export function useInitialTilt(maxTilt: number): number {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    setTilt((Math.random() - 0.5) * 2 * maxTilt);
  }, [maxTilt]);

  return tilt;
}