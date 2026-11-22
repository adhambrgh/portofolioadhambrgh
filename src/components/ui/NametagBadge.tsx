"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateStrapPaths, generateStaticStrapPaths, DEFAULT_STRAP_CONFIG } from "@/lib/strapGeometry";
import type { StrapGeometryConfig } from "@/lib/strapGeometry";
import { usePendulumPhysics } from "@/hooks/usePendulumPhysics";

const MAX_ANGLE = (35 * Math.PI) / 180;
const SVG_WIDTH = 300;
const SVG_HEIGHT = 470;
const SVG_VIEWBOX = `0 -20 ${SVG_WIDTH} ${SVG_HEIGHT}`;

const CLIP_X = 150;
const CARD_CENTER_Y = 220;
const CLIP_HOLE_OFFSET_Y = -16;
const MEET_Y = CARD_CENTER_Y + CLIP_HOLE_OFFSET_Y;
const STRAP_LERP = 0.12;
const DRAG_SENSITIVITY = 0.0035;

const STRAP_GEO: StrapGeometryConfig = {
  ...DEFAULT_STRAP_CONFIG,
  hangLeft: { x: 124, y: -10 },
  hangRight: { x: 176, y: -10 },
  meetLocal: { x: CLIP_X, y: CARD_CENTER_Y + CLIP_HOLE_OFFSET_Y },
  chainLen: 245,
  slackFactor: 0.3,
};

const DEBUG = false;

export function NametagBadge({
  name = "Adham Baarigh",
  role = "Software Engineer",
  className,
}: {
  name?: string;
  role?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const strapLagRef = useRef(0);
  const lagRafRef = useRef<number | null>(null);

  const physics = usePendulumPhysics(
    {
      maxAngle: MAX_ANGLE,
      stiffness: 0.65,
      damping: 0.12,
      mass: 1,
      elasticLimit: 0.25,
      releaseVelocityScale: 0.15,
    },
    prefersReducedMotion
  );

  useEffect(() => {
    strapLagRef.current = 0;
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (lagRafRef.current !== null) {
        cancelAnimationFrame(lagRafRef.current);
        lagRafRef.current = null;
      }
      return;
    }

    let active = true;
    const tick = () => {
      if (!active) return;
      const diff = physics.angle - strapLagRef.current;
      const dragging = isPointerDownRef.current;

      if (dragging) {
        strapLagRef.current += diff * 0.22;
      } else {
        strapLagRef.current += diff * STRAP_LERP;
        if (Math.abs(diff) < 0.0004) strapLagRef.current = physics.angle;
      }

      lagRafRef.current = requestAnimationFrame(tick);
    };

    lagRafRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (lagRafRef.current !== null) {
        cancelAnimationFrame(lagRafRef.current);
        lagRafRef.current = null;
      }
    };
  }, [physics.angle, prefersReducedMotion]);

  const angleDeg = physics.angle * (180 / Math.PI);
  const strapPaths = generateStrapPaths(strapLagRef.current, STRAP_GEO);

  const tension = Math.min(Math.abs(physics.angle) / MAX_ANGLE, 1);
  const strapStroke = tension > 0.35 ? "url(#lanyardGradTensed)" : "url(#lanyardGrad)";

  const getClientX = useCallback((e: React.PointerEvent): number => {
    return e.clientX;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === "mouse") return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore capture errors */
    }
    const clientX = getClientX(e);
    isPointerDownRef.current = true;
    setIsPointerDown(true);
    startXRef.current = clientX;
    startAngleRef.current = physics.angle;
    physics.setDragging(true);
    if (DEBUG) console.log("[badge] drag start", { clientX, angle: physics.angle });
  }, [physics, getClientX]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const clientX = getClientX(e);
    const deltaX = clientX - startXRef.current;
    const nextAngle = startAngleRef.current + deltaX * DRAG_SENSITIVITY;
    physics.setAngleDirectly(nextAngle);
    if (DEBUG) console.log("[badge] drag move", { deltaX, angle: nextAngle.toFixed(4) });
  }, [physics, getClientX]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsPointerDown(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ignore */
    }
    physics.setDragging(false);
    if (DEBUG) console.log("[badge] drag end -> release swing");
  }, [physics]);

  const handleClick = useCallback(() => {
    if (!physics.isAnimating) {
      physics.impulse(0.35);
    }
  }, [physics]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  if (prefersReducedMotion) {
    const staticPaths = generateStaticStrapPaths(STRAP_GEO);

    return (
      <svg
        viewBox={SVG_VIEWBOX}
        className={`w-full h-full select-none ${className || ""}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${name}, ${role} badge`}
      >
        <defs>
          <linearGradient id="lanyardGradStatic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7886A8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7886A8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7886A8" stopOpacity="0.3" />
          </linearGradient>
          <filter id="softShadowStatic" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#20211F" floodOpacity="0.08" />
          </filter>
        </defs>

        <g filter="url(#softShadowStatic)">
          <path d={staticPaths.left} stroke="url(#lanyardGradStatic)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d={staticPaths.right} stroke="url(#lanyardGradStatic)" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>

        <HangRings />

        <g transform={`translate(0, ${MEET_Y})`}>
          <MeetClip />
          <BadgeCardHolder name={name} role={role} />
        </g>
      </svg>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing touch-none select-none ${className || ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      data-dragging={isPointerDown}
      data-angle={angleDeg.toFixed(1)}
      aria-label={`${name}, ${role} badge. Drag ke kiri kanan untuk mengayun, klik untuk memantul.`}
    >
      <svg
        viewBox={SVG_VIEWBOX}
        className="w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7886A8" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#7886A8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7886A8" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="lanyardGradTensed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#677699" stopOpacity="1" />
            <stop offset="55%" stopColor="#677699" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7886A8" stopOpacity="0.55" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#20211F" floodOpacity="0.08" />
          </filter>
        </defs>

        <g filter="url(#softShadow)">
          <path d={strapPaths.left} stroke={strapStroke} strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d={strapPaths.right} stroke={strapStroke} strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>

        <HangRings />

        <g transform={`translate(0, ${MEET_Y}) rotate(${angleDeg.toFixed(2)})`}>
          <MeetClip />
          <BadgeCardHolder name={name} role={role} />
        </g>
      </svg>
    </div>
  );
}

function HangRings() {
  return (
    <g aria-hidden="true">
      <g transform={`translate(${STRAP_GEO.hangLeft.x}, ${STRAP_GEO.hangLeft.y})`}>
        <ellipse cx="0" cy="0" rx="7" ry="5" fill="none" stroke="#7886A8" strokeWidth="3" opacity="0.85" />
      </g>
      <g transform={`translate(${STRAP_GEO.hangRight.x}, ${STRAP_GEO.hangRight.y})`}>
        <ellipse cx="0" cy="0" rx="7" ry="5" fill="none" stroke="#7886A8" strokeWidth="3" opacity="0.85" />
      </g>
    </g>
  );
}

function MeetClip() {
  return (
    <g aria-hidden="true">
      <ellipse cx="0" cy="0" rx="10" ry="5" fill="#F7F6F2" stroke="#7886A8" strokeWidth="2.5" />
    </g>
  );
}

function BadgeCardHolder({ name: _name, role: _role }: { name: string; role: string }) {
  return (
    <g>
      <defs>
        <clipPath id="badgeCardClip">
          <rect x="-56" y="-8" width="112" height="190" rx="4" />
        </clipPath>
      </defs>
      <rect
        x="-62"
        y="-46"
        width="124"
        height="212"
        rx="6"
        fill="#FFFFFF"
        stroke="#E5E3DC"
        strokeWidth="1.5"
      />
      <image
        href="/images/projects/foto.png"
        x="-56"
        y="-8"
        width="112"
        height="190"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#badgeCardClip)"
      />
      <ellipse cx="0" cy="-16" rx="14" ry="6" fill="#F7F6F2" stroke="#E5E3DC" strokeWidth="1" />
      <ellipse cx="0" cy="-16" rx="8" ry="3" fill="none" />
    </g>
  );
}

function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
