"use client";

import { type ImgHTMLAttributes } from "react";
import { cn, getInitials } from "@/lib/utils";
import { NametagBadge } from "./NametagBadge";

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
  aspectRatio = type === "portrait" ? "aspect-[3/4]" : type === "nametag" ? "aspect-[15/57]" : "aspect-[4/3]",
  ...props
}: ImagePlaceholderProps) {
  const initials = name ? getInitials(name) : type === "portrait" ? "AB" : "··";

  if (type === "nametag") {
    // tanpa sticky: peran menempel dipegang LanyardRig (fixed) yang mengukur kotak ini tiap scroll
    return (
      <div className={cn("flex flex-col items-center", aspectRatio, className)} {...props}>
        <NametagBadge name={name} role={role} className="h-full w-full" />
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