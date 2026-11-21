"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateStrapPaths, generateStaticStrapPaths, DEFAULT_STRAP_CONFIG } from "@/lib/strapGeometry";
import type { StrapGeometryConfig } from "@/lib/strapGeometry";
import { usePendulumPhysics } from "@/hooks/usePendulumPhysics";

const MAX_ANGLE = (35 * Math.PI) / 180;
const SVG_WIDTH = 300;
const SVG_HEIGHT = 400;

const CLIP_X = 150;
const CLIP_Y = 0;
const CARD_CENTER_Y = 220;
const CLIP_HOLE_OFFSET_Y = -16;
const STRAP_LERP = 0.12;
const DRAG_EASE_POWER = 0.85;
const DRAG_PIXEL_RANGE = 200;

const STRAP_GEO: StrapGeometryConfig = {
  ...DEFAULT_STRAP_CONFIG,
  clipX: CLIP_X,
  clipY: 8,
  cardCenterY: CARD_CENTER_Y,
  clipHoleOffsetY: CLIP_HOLE_OFFSET_Y,
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
      stiffness: 0.55,
      damping: 0.055,
      mass: 1,
      elasticLimit: 0.25,
      releaseVelocityScale: 0.8,
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
    const norm = Math.max(-1.6, Math.min(1.6, deltaX / DRAG_PIXEL_RANGE));
    const eased =
      Math.sign(norm) * Math.pow(Math.abs(norm), DRAG_EASE_POWER) * MAX_ANGLE * 1.15;
    const nextAngle = startAngleRef.current + eased;
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
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
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
          <linearGradient id="cardGradStatic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FDFDFB" />
          </linearGradient>
          <filter id="softShadowStatic" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#20211F" floodOpacity="0.08" />
          </filter>
        </defs>

        <g filter="url(#softShadowStatic)">
          <path d={staticPaths.left} stroke="url(#lanyardGradStatic)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d={staticPaths.right} stroke="url(#lanyardGradStatic)" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>

        <g transform="translate(150, 0)">
          <ClipAndClasp />
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
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
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
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FDFDFB" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#20211F" floodOpacity="0.08" />
          </filter>
        </defs>

        <g filter="url(#softShadow)">
          <path d={strapPaths.left} stroke={strapStroke} strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d={strapPaths.right} stroke={strapStroke} strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>

        <g transform={`translate(${CLIP_X}, 0) rotate(${angleDeg.toFixed(2)})`}>
          <ClipAndClasp />
          <BadgeCardHolder name={name} role={role} />
        </g>
      </svg>
    </div>
  );
}

function ClipAndClasp() {
  return (
    <>
      <g transform="translate(0, 10)">
        <ellipse cx="0" cy="0" rx="12" ry="6" fill="#7886A8" opacity="0.9" />
        <ellipse cx="0" cy="0" rx="7" ry="3" fill="#F7F6F2" />
      </g>
      <g transform="translate(0, 120)">
        <rect x="-16" y="-6" width="32" height="12" rx="3" fill="#7886A8" opacity="0.7" />
        <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#F7F6F2" opacity="0.5" />
      </g>
    </>
  );
}

function BadgeCardHolder({ name, role }: { name: string; role: string }) {
  return (
    <g transform="translate(0, 220)">
      <rect
        x="-70"
        y="-10"
        width="140"
        height="160"
        rx="8"
        fill="#FFFFFF"
        fillOpacity="0.18"
        stroke="#E5E3DC"
        strokeWidth="1.5"
      />
      <ellipse cx="0" cy="-16" rx="14" ry="6" fill="#F7F6F2" stroke="#E5E3DC" strokeWidth="1" />
      <ellipse cx="0" cy="-16" rx="8" ry="3" fill="none" />
      <rect
        x="-62"
        y="-4"
        width="124"
        height="148"
        rx="6"
        fill="url(#cardGrad)"
        stroke="#E5E3DC"
        strokeWidth="1"
      />
      <rect x="-62" y="-4" width="124" height="3" rx="6" fill="#7886A8" />
      <line x1="-40" y1="42" x2="40" y2="42" stroke="#E5E3DC" strokeWidth="1" strokeDasharray="4 4" />
      <text
        x="0"
        y="22"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="16"
        fontWeight="500"
        fill="#20211F"
        letterSpacing="0.5"
      >
        {name}
      </text>
      <text
        x="0"
        y="56"
        textAnchor="middle"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#777873"
        letterSpacing="0.8"
      >
        {role.toUpperCase()}
      </text>
      <text
        x="0"
        y="72"
        textAnchor="middle"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="8.5"
        fontWeight="400"
        fill="#9E9D96"
        letterSpacing="0.5"
      >
        FULL STACK WEB / FLUTTER
      </text>
      <g transform="translate(0, 92)">
        <rect x="-22" y="0" width="44" height="44" rx="4" fill="#F7F6F2" stroke="#E5E3DC" strokeWidth="0.5" />
        <g fill="#777873" opacity="0.4">
          <rect x="-20" y="2" width="10" height="10" />
          <rect x="-20" y="2" width="4" height="4" fill="#F7F6F2" />
          <rect x="10" y="2" width="10" height="10" />
          <rect x="10" y="2" width="4" height="4" fill="#F7F6F2" />
          <rect x="-20" y="32" width="10" height="10" />
          <rect x="-20" y="32" width="4" height="4" fill="#F7F6F2" />
          <rect x="-10" y="2" width="3" height="3" />
          <rect x="-5" y="2" width="3" height="3" />
          <rect x="0" y="2" width="3" height="3" />
          <rect x="7" y="2" width="3" height="3" />
          <rect x="-20" y="12" width="3" height="3" />
          <rect x="-12" y="12" width="3" height="3" />
          <rect x="-4" y="12" width="3" height="3" />
          <rect x="4" y="12" width="3" height="3" />
          <rect x="10" y="12" width="3" height="3" />
          <rect x="16" y="12" width="3" height="3" />
          <rect x="-16" y="16" width="3" height="3" />
          <rect x="-8" y="16" width="3" height="3" />
          <rect x="0" y="16" width="3" height="3" />
          <rect x="8" y="16" width="3" height="3" />
          <rect x="-14" y="20" width="3" height="3" />
          <rect x="-2" y="20" width="3" height="3" />
          <rect x="6" y="20" width="3" height="3" />
          <rect x="14" y="20" width="3" height="3" />
          <rect x="-18" y="24" width="3" height="3" />
          <rect x="-6" y="24" width="3" height="3" />
          <rect x="2" y="24" width="3" height="3" />
          <rect x="12" y="24" width="3" height="3" />
        </g>
        <text
          x="0"
          y="50"
          textAnchor="middle"
          fontFamily="DM Sans, system-ui, sans-serif"
          fontSize="5"
          fontWeight="400"
          fill="#9E9D96"
        >
          SCAN
        </text>
      </g>
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