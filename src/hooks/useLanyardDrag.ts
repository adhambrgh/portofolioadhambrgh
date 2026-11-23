"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface LanyardConfig {
  stiffness: number;
  damping: number;
  mass: number;
  tiltPerPx: number; // rad rotasi card per px simpangan horizontal
  maxTilt: number;
  /** Amplitudo ayunan saat diam, unit sama dengan x. 0 = kartu diam total. */
  idleSway: number;
}

export interface LanyardReturn {
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
  dragTo: (dx: number, dy: number) => void;
  impulse: (vx: number) => void;
  stop: () => void;
}

const DEFAULT_CONFIG: LanyardConfig = {
  stiffness: 0.65,
  damping: 0.12,
  mass: 1,
  tiltPerPx: 0.0012,
  maxTilt: 0.6,
  idleSway: 0,
};

/** Kecepatan sudut titik diam saat mengayun, rad/detik. 0.9 = satu ayunan penuh ~7 detik. */
const IDLE_OMEGA = 0.9;
/** Naiknya kartu di ujung ayunan, fraksi dari amplitudo. Kecil: bandul nyata hampir datar. */
const IDLE_RISE = 0.25;

export function useLanyardDrag(
  config: Partial<LanyardConfig> = {},
  prefersReducedMotion: boolean
): LanyardReturn {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const lastMoveRef = useRef(0);
  const idleTimeRef = useRef(0);
  const reducedRef = useRef(prefersReducedMotion);
  reducedRef.current = prefersReducedMotion;

  const apply = useCallback((p: { x: number; y: number }) => {
    posRef.current = p;
    setPos(p);
  }, []);

  const stepRef = useRef<(now: number) => void>(() => {});
  stepRef.current = (now: number) => {
    if (reducedRef.current) {
      apply({ x: 0, y: 0 });
      velRef.current = { x: 0, y: 0 };
      rafRef.current = null;
      return;
    }
    const c = cfgRef.current;
    const dt = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0;
    lastTimeRef.current = now;
    if (dt <= 0 || dt > 0.1) {
      rafRef.current = requestAnimationFrame((t) => stepRef.current(t));
      return;
    }

    const p = posRef.current;
    const v = velRef.current;
    // saat diam, titik gantung ikut bergerak pelan; pegas mengejar titik itu
    const sway = c.idleSway;
    if (sway > 0) idleTimeRef.current += dt;
    const wt = idleTimeRef.current * IDLE_OMEGA;
    const restX = sway > 0 ? sway * Math.sin(wt) : 0;
    // bandul naik sedikit di kedua ujung ayunan: y = -A*k*(1-cos 2wt)/2
    const restY = sway > 0 ? (-sway * IDLE_RISE * (1 - Math.cos(2 * wt))) / 2 : 0;
    v.x += ((-c.stiffness * (p.x - restX) - c.damping * v.x) / c.mass) * dt;
    v.y += ((-c.stiffness * (p.y - restY) - c.damping * v.y) / c.mass) * dt;
    const next = { x: p.x + v.x * dt, y: p.y + v.y * dt };

    if (sway === 0 && Math.abs(next.x) < 0.3 && Math.abs(next.y) < 0.3 && Math.hypot(v.x, v.y) < 0.6) {
      apply({ x: 0, y: 0 });
      velRef.current = { x: 0, y: 0 };
      rafRef.current = null;
      return;
    }

    apply(next);
    rafRef.current = requestAnimationFrame((t) => stepRef.current(t));
  };

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startRaf = useCallback(() => {
    if (rafRef.current !== null || reducedRef.current) return;
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame((t) => stepRef.current(t));
  }, []);

  const dragTo = useCallback(
    (dx: number, dy: number) => {
      const now = performance.now();
      const dt = now - lastMoveRef.current;
      const target = { x: dx, y: dy };
      if (dt > 0 && dt < 120 && lastMoveRef.current !== 0) {
        velRef.current = {
          x: ((target.x - posRef.current.x) / dt) * 1000 * 0.15,
          y: ((target.y - posRef.current.y) / dt) * 1000 * 0.15,
        };
      }
      lastMoveRef.current = now;
      apply(target);
    },
    [apply]
  );

  const setDragging = useCallback(
    (dragging: boolean) => {
      draggingRef.current = dragging;
      setIsDragging(dragging);
      if (dragging) {
        stopRaf();
        velRef.current = { x: 0, y: 0 };
        lastMoveRef.current = 0;
      } else {
        velRef.current.x = Math.max(-900, Math.min(900, velRef.current.x));
        velRef.current.y = Math.max(-900, Math.min(900, velRef.current.y));
        startRaf();
      }
    },
    [stopRaf, startRaf]
  );

  const impulse = useCallback(
    (vx: number) => {
      if (reducedRef.current) return;
      velRef.current.x += vx;
      startRaf();
    },
    [startRaf]
  );

  const stop = useCallback(() => {
    stopRaf();
    apply({ x: 0, y: 0 });
    velRef.current = { x: 0, y: 0 };
  }, [stopRaf, apply]);

  useEffect(() => {
    return () => {
      // wajib null: StrictMode unmount/remount, ref stale bikin startRaf menolak jalan
      stopRaf();
    };
  }, [stopRaf]);

  // kartu mengayun sendiri saat diam; drag menahan loop, lepas drag melanjutkan
  const idleSway = cfg.idleSway;
  useEffect(() => {
    if (idleSway <= 0 || reducedRef.current) return;
    startRaf();
  }, [idleSway, startRaf]);

  const tilt = Math.max(-cfg.maxTilt, Math.min(cfg.maxTilt, pos.x * cfg.tiltPerPx));

  return {
    x: pos.x,
    y: pos.y,
    rotation: tilt,
    isDragging,
    setDragging,
    dragTo,
    impulse,
    stop,
  };
}
