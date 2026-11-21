"use client";

import { type ImgHTMLAttributes } from "react";
import { cn, getInitials } from "@/lib/utils";

interface ImagePlaceholderProps extends ImgHTMLAttributes<HTMLDivElement> {
  type: "portrait" | "project" | "nametag";
  name?: string;
  role?: string;
  techStack?: string[];
  className?: string;
  aspectRatio?: string;
}

export function ImagePlaceholder({
  type,
  name,
  role,
  techStack,
  className,
  aspectRatio = type === "portrait" || type === "nametag" ? "aspect-[3/4]" : "aspect-[4/3]",
  ...props
}: ImagePlaceholderProps) {
  const initials = name ? getInitials(name) : type === "portrait" ? "AB" : "··";

  if (type === "nametag") {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center",
          aspectRatio,
          className
        )}
        {...props}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 300 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Gradient for lanyard */}
            <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7886A8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#7886A8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7886A8" stopOpacity="0.3" />
            </linearGradient>
            {/* Badge card gradient */}
            <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FDFDFB" />
            </linearGradient>
            {/* Shadow filter */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#20211F" floodOpacity="0.08" />
            </filter>
            {/* Inner shadow for holder */}
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="3" result="offset-blur" />
              <feComposite in="SourceGraphic" in2="offset-blur" operator="over" />
            </filter>
          </defs>

          {/* LANYARD - Straight V-shape straps */}
          <g filter="url(#softShadow)">
            {/* Left strap - straight diagonal from top center to holder left edge */}
            <path
              d="M150 0 L80 220"
              stroke="url(#lanyardGrad)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right strap - straight diagonal from top center to holder right edge */}
            <path
              d="M150 0 L220 220"
              stroke="url(#lanyardGrad)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Lanyard clip/hook at top center */}
            <g transform="translate(150, 10)">
              <ellipse cx="0" cy="0" rx="12" ry="6" fill="#7886A8" opacity="0.9" />
              <ellipse cx="0" cy="0" rx="7" ry="3" fill="#F7F6F2" />
            </g>
            {/* Breakaway clasp at chest level */}
            <g transform="translate(150, 120)">
              <rect x="-16" y="-6" width="32" height="12" rx="3" fill="#7886A8" opacity="0.7" />
              <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#F7F6F2" opacity="0.5" />
            </g>
          </g>

          {/* BADGE HOLDER - transparent with top hole */}
          <g transform="translate(150, 220)">
            {/* Holder background - semi-transparent */}
            <rect
              x="-70" y="-10"
              width="140" height="160"
              rx="8"
              fill="#FFFFFF"
              fillOpacity="0.15"
              stroke="#E5E3DC"
              strokeWidth="1.5"
              filter="url(#innerShadow)"
            />
            {/* Top hole for clip */}
            <ellipse
              cx="0" cy="-16"
              rx="14" ry="6"
              fill="#F7F6F2"
              stroke="#E5E3DC"
              strokeWidth="1"
            />
            {/* Inner hole cutout */}
            <ellipse cx="0" cy="-16" rx="8" ry="3" fill="none" />
          </g>

          {/* BADGE CARD inside holder */}
          <g transform="translate(150, 220)" filter="url(#softShadow)">
            {/* Card base */}
            <rect
              x="-62" y="-4"
              width="124" height="148"
              rx="6"
              fill="url(#cardGrad)"
              stroke="#E5E3DC"
              strokeWidth="1"
            />
            {/* Top accent line */}
            <rect
              x="-62" y="-4"
              width="124" height="3"
              rx="6"
              fill="#7886A8"
            />
            {/* Divider line under name */}
            <line
              x1="-40" y1="42"
              x2="40" y2="42"
              stroke="#E5E3DC"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            
            {/* NAME - Adham Baarigh */}
            <text
              x="0" y="22"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="16"
              fontWeight="500"
              fill="#20211F"
              letterSpacing="0.5"
            >
              Adham Baarigh
            </text>
            
            {/* ROLE - Software Engineer */}
            <text
              x="0" y="56"
              textAnchor="middle"
              fontFamily="DM Sans, system-ui, sans-serif"
              fontSize="10"
              fontWeight="500"
              fill="#777873"
              letterSpacing="0.8"
              style={{ textTransform: 'uppercase' }}
            >
              SOFTWARE ENGINEER
            </text>

            {/* SUB ROLE - Full Stack Web / Flutter */}
            <text
              x="0" y="72"
              textAnchor="middle"
              fontFamily="DM Sans, system-ui, sans-serif"
              fontSize="8.5"
              fontWeight="400"
              fill="#9E9D96"
              letterSpacing="0.5"
            >
              FULL STACK WEB  /  FLUTTER
            </text>

            {/* DECORATIVE QR CODE - bottom */}
            <g transform="translate(0, 92)">
              {/* QR background */}
              <rect
                x="-22" y="0"
                width="44" height="44"
                rx="4"
                fill="#F7F6F2"
                stroke="#E5E3DC"
                strokeWidth="0.5"
              />
              {/* QR pattern - decorative modules */}
              <g fill="#777873" opacity="0.4">
                {/* Finder patterns (3 corners) */}
                <rect x="-20" y="2" width="10" height="10" />
                <rect x="-20" y="2" width="4" height="4" fill="#F7F6F2" />
                <rect x="10" y="2" width="10" height="10" />
                <rect x="10" y="2" width="4" height="4" fill="#F7F6F2" />
                <rect x="-20" y="32" width="10" height="10" />
                <rect x="-20" y="32" width="4" height="4" fill="#F7F6F2" />
                
                {/* Data modules - random pattern */}
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
              {/* QR label */}
              <text
                x="0" y="50"
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
        </svg>
      </div>
    );
  }

  if (type === "portrait") {
    return (
      <div
        className={cn(
          "relative bg-accent-light flex items-center justify-center overflow-hidden",
          aspectRatio,
          className
        )}
        {...props}
      >
        <span
          className="font-serif text-5xl font-medium text-accent select-none"
          aria-hidden="true"
        >
          {initials}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-accent-light/50 to-muted/30 flex flex-col items-center justify-center p-6 overflow-hidden",
        aspectRatio,
        className
      )}
      {...props}
    >
      <div className="text-center" aria-hidden="true">
        <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-accent/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="M21 15l-5-5L5 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {name && <p className="font-serif text-lg font-medium text-foreground">{name}</p>}
        {techStack && techStack.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-medium bg-accent-light text-accent"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-medium text-muted">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}