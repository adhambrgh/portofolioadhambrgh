"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechTagProps {
  children: ReactNode;
  variant?: "default" | "outline" | "subtle" | "plain";
  size?: "sm" | "md";
  className?: string;
}

export function TechTag({ children, variant = "default", size = "sm", className }: TechTagProps) {
  const variants = {
    default: "bg-accent-light text-accent",
    outline: "border border-border text-secondary hover:border-border-hover hover:text-foreground",
    subtle: "bg-muted/30 text-secondary",
    plain: "text-secondary",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  // varian plain tampil sebagai teks berderet, jadi padding kotak dilewati
  const boxed = variant !== "plain";

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        variants[variant],
        boxed ? sizes[size] : "text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}

interface TechTagListProps {
  tags: string[];
  variant?: "default" | "outline" | "subtle" | "plain";
  size?: "sm" | "md";
  maxVisible?: number;
  /** Baris teks berpemisah titik, bukan kotak-kotak. */
  plain?: boolean;
  className?: string;
}

export function TechTagList({
  tags,
  variant = "default",
  size = "sm",
  maxVisible = 6,
  plain = false,
  className,
}: TechTagListProps) {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;
  const items = remainingCount > 0 ? [...visibleTags, `+${remainingCount}`] : visibleTags;

  if (plain) {
    return (
      <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-secondary", className)}>
        {items.map((tag, i) => (
          <span key={tag} className="inline-flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-border">
                ·
              </span>
            )}
            {tag}
          </span>
        ))}
      </p>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)} aria-label="Technology stack">
      {visibleTags.map((tag) => (
        <TechTag key={tag} variant={variant} size={size}>
          {tag}
        </TechTag>
      ))}
      {remainingCount > 0 && (
        <TechTag variant={variant} size={size} className="text-muted">
          +{remainingCount}
        </TechTag>
      )}
    </div>
  );
}