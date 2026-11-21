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
      >
        {/* Tali lanyard: 2 garis tipis vertikal accent */}
        <div className="w-0.5 h-16 bg-accent/40" aria-hidden="true" />
        <div className="w-0.5 h-16 bg-accent/20 ml-1" aria-hidden="true" />
        
        {/* Kartu nametag */}
        <div className="relative w-full h-full bg-card border border-border shadow-sm flex flex-col items-center justify-center p-6">
          {/* Clip holder atas kartu */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-accent rounded-b-lg" aria-hidden="true" />
          
          {/* Nama - Instrument Serif */}
          <p className="font-serif text-xl font-medium text-foreground text-center mb-1">
            {name || "Adham Baarigh"}
          </p>
          
          {/* Role - DM Sans */}
          <p className="font-sans text-sm text-secondary text-center mb-4">
            {role || "Software Engineer"}
          </p>
          
          {/* QR code dekoratif */}
          <div className="w-20 h-20 bg-muted/30 flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="w-full h-full text-muted" aria-hidden="true">
              <rect x="5" y="5" width="90" height="90" fill="none" stroke="currentColor" strokeWidth="2"/>
              {[10,25,40,55,70,85].flatMap(x => [10,25,40,55,70,85].map(y => 
                <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill="currentColor" opacity="0.3"/>
              ))}
            </svg>
          </div>
        </div>
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