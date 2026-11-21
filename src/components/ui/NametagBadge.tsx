"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateStrapPaths, generateStaticStrapPaths } from "@/lib/strapGeometry";
import { usePendulumPhysics } from "@/hooks/usePendulumPhysics";

const MAX_ANGLE = (25 * Math.PI) / 180;
const SVG_WIDTH = 300;
const SVG_HEIGHT = 400;

const CLIP_X = 150;
const CLIP_Y = 0;
const HOLDER_LEFT_X = 80;
const HOLDER_RIGHT_X = 220;
const HOLDER_Y = 220;

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
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const physics = usePendulumPhysics(
    {
      maxAngle: MAX_ANGLE,
      stiffness: 0.85,
      damping: 0.18,
      mass: 1,
      elasticLimit: 0.25,
    },
    prefersReducedMotion
  );

  const angleDeg = physics.angle * (180 / Math.PI);
  const strapPaths = generateStrapPaths(physics.angle, {
    clipX: CLIP_X,
    clipY: CLIP_Y,
    holderLeftX: HOLDER_LEFT_X,
    holderRightX: HOLDER_RIGHT_X,
    holderY: HOLDER_Y,
    maxSag: 28,
    asymmetry: 0.15,
  });

  const tension = Math.min(Math.abs(physics.angle) / MAX_ANGLE, 1);
  const strapStroke = tension > 0.35 ? "url(#lanyardGradTensed)" : "url(#lanyardGrad)";

  const getClientX = useCallback((e: React.MouseEvent | React.TouchEvent): number => {
    if ("touches" in e) {
      return e.touches[0].clientX;
    }
    return e.clientX;
  }, []);

  const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const clientX = getClientX(e);
    isPointerDownRef.current = true;
    startXRef.current = clientX;
    startAngleRef.current = physics.angle;
    physics.setDragging(true);
    e.preventDefault();
  }, [physics, getClientX]);

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isPointerDownRef.current) return;
    const clientX = getClientX(e);
    const deltaX = clientX - startXRef.current;
    const targetAngle = startAngleRef.current + deltaX * 0.0035;
    physics.setTargetAngle(targetAngle);
  }, [physics, getClientX]);

  const handlePointerUp = useCallback(() => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    physics.setDragging(false);
    physics.setTargetAngle(0);
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
    const staticPaths = generateStaticStrapPaths({
      clipX: CLIP_X,
      clipY: CLIP_Y,
      holderLeftX: HOLDER_LEFT_X,
      holderRightX: HOLDER_RIGHT_X,
      holderY: HOLDER_Y,
      maxSag: 28,
      asymmetry: 0.15,
    });

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
          <g transform="translate(150, 10)">
            <ellipse cx="0" cy="0" rx="12" ry="6" fill="#7886A8" opacity="0.9" />
            <ellipse cx="0" cy="0" rx="7" ry="3" fill="#F7F6F2" />
          </g>
          <g transform="translate(150, 120)">
            <rect x="-16" y="-6" width="32" height="12" rx="3" fill="#7886A8" opacity="0.7" />
            <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#F7F6F2" opacity="0.5" />
          </g>
        </g>

        <g transform="translate(150, 0)">
          <BadgeCardHolder name={name} role={role} />
        </g>
      </svg>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing touch-none select-none ${className || ""}`}
      onMouseDown={(e) => handlePointerDown(e)}
      onMouseMove={(e) => handlePointerMove(e)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={(e) => handlePointerDown(e)}
      onTouchMove={(e) => handlePointerMove(e)}
      onTouchEnd={handlePointerUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
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
          <g transform="translate(150, 10)">
            <ellipse cx="0" cy="0" rx="12" ry="6" fill="#7886A8" opacity="0.9" />
            <ellipse cx="0" cy="0" rx="7" ry="3" fill="#F7F6F2" />
          </g>
          <g transform="translate(150, 120)">
            <rect x="-16" y="-6" width="32" height="12" rx="3" fill="#7886A8" opacity="0.7" />
            <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#F7F6F2" opacity="0.5" />
          </g>
        </g>

        <g transform={`translate(150, 0) rotate(${angleDeg.toFixed(2)})`}>
          <BadgeCardHolder name={name} role={role} />
        </g>
      </svg>
    </div>
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