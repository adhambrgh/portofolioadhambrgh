"use client";

import { useEffect, useRef, useState } from "react";
import {
  generateStrapPathsToMeet,
  generateStaticStrapPaths,
  generateStrapMidCurves,
  tapeBand,
  DEFAULT_STRAP_CONFIG,
} from "@/lib/strapGeometry";
import type { StrapGeometryConfig, Point } from "@/lib/strapGeometry";
import { useLanyardDrag } from "@/hooks/useLanyardDrag";

export const SVG_WIDTH = 300;
/** Tinggi viewBox. Skala = min(w/300, h/SVG_HEIGHT); kotak pemakai harus aspect-[1/2] supaya kartu tetap sebesar dulu. */
export const SVG_HEIGHT = 1140;
/** Rongga di luar viewBox: tali bermula sedikit di atas titik gantung supaya tidak terlihat terpotong. Nilai negatif juga memperpanjang pita. */
const VIEWBOX_TOP = -40;
const SVG_VIEWBOX = `0 ${VIEWBOX_TOP} ${SVG_WIDTH} ${SVG_HEIGHT}`;

const CLIP_X = 150;
const CARD_CENTER_Y = 220;
const CLIP_HOLE_OFFSET_Y = -18;
const MEET_Y = CARD_CENTER_Y + CLIP_HOLE_OFFSET_Y;
/** Panjang tali diukur di rotasi 0; sisakan slack supaya tali tetap melengkung saat ditarik jauh. */
const STRAP_REACH = 900;
const STRAP_LERP = 0.35;
/** Batas geser kartu dari posisi diam, dalam unit SVG. */
const CARD_TRAVEL = 340;
/** Geser card turun dari ujung tali, tanpa mengubah panjang atau bentuk tali. */
const CARD_OFFSET_Y = 70;

export const STRAP_GEO: StrapGeometryConfig = {
  ...DEFAULT_STRAP_CONFIG,
  hangLeft: { x: 112, y: VIEWBOX_TOP + 10 },
  hangRight: { x: 188, y: VIEWBOX_TOP + 10 },
  meetLocal: { x: CLIP_X, y: MEET_Y },
  chainLen: STRAP_REACH,
  slackFactor: 0.1,
  width: 24,
};

const TAPE_TEXT = "SOFTWARE ENGINEER";
const TAPE_TEXT_STEPS = [0.14, 0.42, 0.70];

/**
 * Tali + kartu digambar langsung di kolom hero (bukan fixed), jadi ikut halaman saat scroll
 * dan tidak menimpa section lain. Skala diserahkan ke viewBox.
 */
export function LanyardRig({
  name,
  role,
  prefersReducedMotion,
  className,
}: {
  name: string;
  role: string;
  prefersReducedMotion: boolean;
  onTap?: () => void;
  className?: string;
}) {
  const lanyard = useLanyardDrag(
    { stiffness: 1.5, damping: 1.8, mass: 1, tiltPerPx: 0.0012, maxTilt: 0.5, idleSway: 26 },
    prefersReducedMotion
  );

  const [isPointerDown, setIsPointerDown] = useState(false);
  const isPointerDownRef = useRef(false);
  const startPointerRef = useRef({ x: 0, y: 0 });
  const grabRef = useRef<Point>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const strapLagRef = useRef({ x: 0, y: 0 });
  const lagRafRef = useRef<number | null>(null);
  const [, setStrapTick] = useState(0);
  const target = useRef({ x: 0, y: 0 });
  target.current = { x: lanyard.x, y: lanyard.y };

  // lag tali: mulai setiap target bergerak, berhenti sendiri saat konvergen
  useEffect(() => {
    if (prefersReducedMotion || lagRafRef.current !== null) return;
    lagRafRef.current = requestAnimationFrame(function tick() {
      const t = target.current;
      const lag = strapLagRef.current;
      const lerp = isPointerDownRef.current ? 0.5 : STRAP_LERP;
      lag.x += (t.x - lag.x) * lerp;
      lag.y += (t.y - lag.y) * lerp;
      const done = Math.abs(t.x - lag.x) < 0.3 && Math.abs(t.y - lag.y) < 0.3 && !isPointerDownRef.current;
      if (done) {
        lag.x = t.x;
        lag.y = t.y;
      }
      lagRafRef.current = done ? null : requestAnimationFrame(tick);
      setStrapTick((n) => n + 1);
    });
    return () => {
      if (lagRafRef.current !== null) {
        cancelAnimationFrame(lagRafRef.current);
        lagRafRef.current = null;
      }
    };
  }, [lanyard.x, lanyard.y, prefersReducedMotion]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === "mouse") return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore capture errors */
    }
    isPointerDownRef.current = true;
    setIsPointerDown(true);
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    grabRef.current = grabLocal(e.clientX, e.clientY);
    lanyard.setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    // target = kursor; titik pegang kartu harus berakhir di bawah kursor
    const g = grabRef.current;
    const { x: lx, y: ly } = toLocal(e.clientX, e.clientY);
    lanyard.dragTo(clampX(lx - g.x - CLIP_X), clampY(ly - g.y - MEET_Y));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    lanyard.dragTo(clampX(lanyard.x), clampY(lanyard.y));
    isPointerDownRef.current = false;
    setIsPointerDown(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ignore */
    }
    lanyard.setDragging(false);
  };

  const handleClick = () => {
    if (!lanyard.isDragging) lanyard.impulse(60);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const clampX = (v: number) => Math.max(-CARD_TRAVEL, Math.min(CARD_TRAVEL, v));
  const clampY = (v: number) => Math.max(-CARD_TRAVEL, Math.min(CARD_TRAVEL, v));

  /** Kursor layar → koordinat SVG lokal. Rect diambil saat dipakai, jadi aman ikut scroll. */
  const toLocal = (clientX: number, clientY: number): Point => {
    const r = svgRef.current?.getBoundingClientRect();
    const s = r ? Math.min(r.width / SVG_WIDTH, r.height / SVG_HEIGHT) || 1 : 1;
    return { x: (clientX - (r?.left ?? 0)) / s, y: (clientY - (r?.top ?? 0)) / s };
  };

  /**
   * Tangkap titik kartu yang dipegang. Geseran lewat clip menggeser semua titik kartu sama besar,
   * jadi titik pegang cukup disimpan relatif clip lalu dipakai sebagai kompensasi: tarik bagian
   * bawah kartu → bagian bawah ikut kursor, tarik atas → atas yang ikut.
   */
  const grabLocal = (clientX: number, clientY: number): Point => {
    const { x: lx, y: ly } = toLocal(clientX, clientY);
    return {
      x: lx - (CLIP_X + clampX(lanyard.x)),
      y: ly - (MEET_Y + clampY(lanyard.y)),
    };
  };

  if (prefersReducedMotion) {
    const staticPaths = generateStaticStrapPaths(STRAP_GEO);
    const staticMeet = { x: CLIP_X, y: MEET_Y };
    return (
      <div className={`relative w-full h-full pointer-events-none ${className || ""}`} aria-hidden="true">
        <svg
          viewBox={SVG_VIEWBOX}
          preserveAspectRatio="xMidYMin meet"
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
        >
          <LanyardDefs shadowId="softShadowStatic" fillId="lanyardFillStatic" />
          <Lanyard paths={staticPaths} meet={staticMeet} shadowId="softShadowStatic" fillId="lanyardFillStatic" />
          <g transform={`translate(${CLIP_X}, ${MEET_Y + CARD_OFFSET_Y})`}>
            <MeetClip />
            <BadgeCardHolder />
          </g>
        </svg>
      </div>
    );
  }

  const meet = {
    x: CLIP_X + clampX(strapLagRef.current.x),
    y: MEET_Y + clampY(strapLagRef.current.y),
  };
  const strapPaths = generateStrapPathsToMeet(meet, STRAP_GEO);
  const strapMid = generateStrapMidCurves(meet, STRAP_GEO);
  const hangAngle = Math.atan2(meet.x - CLIP_X, meet.y - STRAP_GEO.hangLeft.y);
  const angleDeg = (hangAngle + lanyard.rotation * 0.3) * (180 / Math.PI);

  return (
    <div
      className={`relative w-full h-full pointer-events-none ${className || ""}`}
      data-dragging={isPointerDown}
    >
      <svg
        ref={svgRef}
        viewBox={SVG_VIEWBOX}
        preserveAspectRatio="xMidYMin meet"
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing touch-none select-none outline-none focus-visible:[box-shadow:none]"
        style={{ overflow: "visible" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${name}, ${role} badge. Tarik untuk mengayun, klik untuk memantul.`}
      >
        <LanyardDefs shadowId="softShadow" fillId="lanyardFill" />
        <Lanyard paths={strapPaths} mid={strapMid} meet={meet} shadowId="softShadow" fillId="lanyardFill" />
        <g transform={`translate(${meet.x}, ${meet.y + CARD_OFFSET_Y}) rotate(${angleDeg.toFixed(2)})`}>
          <MeetClip />
          <BadgeCardHolder />
        </g>
      </svg>
    </div>
  );
}

function LanyardDefs({ shadowId, fillId }: { shadowId: string; fillId: string }) {
  return (
    <defs>
      <linearGradient id={fillId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#64719A" />
        <stop offset="55%" stopColor="#7886A8" />
        <stop offset="88%" stopColor="#8D99B5" />
        <stop offset="100%" stopColor="#E7E5DC" />
      </linearGradient>
      <filter id={shadowId} x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#20211F" floodOpacity="0.14" />
      </filter>
      {/* motif batik halus untuk blok dekat clip */}
      <pattern id="batikPattern" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2.5" cy="2.5" r="1.4" fill="none" stroke="#5C6890" strokeWidth="0.7" />
        <path d="M7 5.5 q2.5 2 0 4 q-2.5-2 0-4" fill="none" stroke="#5C6890" strokeWidth="0.7" />
        <circle cx="7.5" cy="2" r="0.6" fill="#5C6890" />
      </pattern>
    </defs>
  );
}

function Lanyard({
  paths,
  mid,
  meet,
  shadowId,
  fillId,
}: {
  paths: { left: string; right: string };
  mid?: { left: string; right: string };
  meet: Point;
  shadowId: string;
  fillId: string;
}) {
  const pathIds = { left: "lanyard-mid-left", right: "lanyard-mid-right" } as const;
  return (
    <g aria-hidden="true">
      {/* bar penghubung di belakang leher */}
      <g filter={`url(#${shadowId})`}>
        <path
          d={`M${STRAP_GEO.hangLeft.x} ${STRAP_GEO.hangLeft.y} h${STRAP_GEO.hangRight.x - STRAP_GEO.hangLeft.x}`}
          stroke={`url(#${fillId})`}
          strokeWidth={STRAP_GEO.width}
          strokeLinecap="round"
        />
        <path d={paths.left} fill={`url(#${fillId})`} />
        <path d={paths.right} fill={`url(#${fillId})`} />
      </g>

      {/* blok motif batik di ujung bawah pita */}
      {(["left", "right"] as const).map((side) => (
        <path
          key={`batik-${side}`}
          d={tapeBand(
            side === "left" ? STRAP_GEO.hangLeft : STRAP_GEO.hangRight,
            meet,
            STRAP_GEO.chainLen,
            STRAP_GEO.slackFactor,
            0.78,
            0.95
          )}
          fill="url(#batikPattern)"
        />
      ))}

      {/* teks mengikuti lengkung pita: garis tengah pita dipakai sebagai textPath */}
      {mid &&
        (["left", "right"] as const).map((side) => (
          <g key={`midpath-${side}`}>
            <path id={pathIds[side]} d={mid[side]} fill="none" />
            {TAPE_TEXT_STEPS.map((offset) => (
              <text
                key={`${side}-${offset}`}
                fontSize="4.5"
                fontWeight="700"
                letterSpacing="0.45"
                fill="#F7F6F2"
                opacity="0.85"
                dy="-2.2"
                dominantBaseline="middle"
              >
                <textPath href={`#${pathIds[side]}`} startOffset={`${offset * 100}%`} textAnchor="middle">
                  {TAPE_TEXT}
                </textPath>
              </text>
            ))}
          </g>
        ))}
    </g>
  );
}

function MeetClip() {
  return (
    <g aria-hidden="true">
      {/* loop metal duduk di lubang kartu (cy=3 relatif kartu), hook turun menimpa tepi atasnya */}
      <ellipse cx="0" cy="3" rx="6" ry="8" fill="none" stroke="#9AA0AB" strokeWidth="2.6" />
      <path d="M-6 10 L6 10 L0 24 Z" fill="#C3C7CF" stroke="#9AA0AB" strokeWidth="1.2" strokeLinejoin="round" />
    </g>
  );
}

function BadgeCardHolder() {
  return (
    <g>
      <defs>
        <clipPath id="badgeCardClip">
          <rect x="-89" y="-14" width="178" height="306" rx="8" />
        </clipPath>
      </defs>
      <rect x="-96" y="-61" width="192" height="365" rx="8" fill="#FFFFFF" stroke="#E5E3DC" strokeWidth="2" />
      <image
        href="/images/projects/foto.png"
        x="-89"
        y="-14"
        width="178"
        height="306"
        preserveAspectRatio="xMidYMin slice"
        clipPath="url(#badgeCardClip)"
      />
      <ellipse cx="0" cy="-18" rx="21" ry="9" fill="#F7F6F2" stroke="#E5E3DC" strokeWidth="1.2" />
    </g>
  );
}
