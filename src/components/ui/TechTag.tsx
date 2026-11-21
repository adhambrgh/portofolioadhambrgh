"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechTagProps {
  children: ReactNode;
  variant?: "default" | "outline" | "subtle";
  size?: "sm" | "md";
  className?: string;
}

export function TechTag({ children, variant = "default", size = "sm", className }: TechTagProps) {
  const variants = {
    default: "bg-accent-light text-accent",
    outline: "border border-border text-secondary hover:border-border-hover hover:text-foreground",
    subtle: "bg-muted/30 text-secondary",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface TechTagListProps {
  tags: string[];
  variant?: "default" | "outline" | "subtle";
  size?: "sm" | "md";
  maxVisible?: number;
  className?: string;
}

export function TechTagList({
  tags,
  variant = "default",
  size = "sm",
  maxVisible = 6,
  className,
}: TechTagListProps) {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

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