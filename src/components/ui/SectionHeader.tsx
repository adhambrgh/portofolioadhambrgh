"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  heading: string;
  subheading?: string;
  /** Id dasar untuk heading; pakai id section supaya aria-labelledby cocok. */
  id?: string;
  className?: string;
  labelClassName?: string;
  headingClassName?: string;
}

export function SectionHeader({
  label,
  heading,
  subheading,
  id,
  className,
  labelClassName,
  headingClassName,
}: SectionHeaderProps) {
  const baseId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <header className={cn("mb-12 md:mb-16", className)} aria-labelledby={`${baseId}-heading`}>
      <p id={`${baseId}-label`} className={cn("section-label mb-4", labelClassName)}>
        {label}
      </p>
      <h2 id={`${baseId}-heading`} className={cn("section-heading text-balance", headingClassName)}>
        {heading}
      </h2>
      {subheading && (
        <p className={cn("mt-6 text-lg text-secondary leading-relaxed max-w-2xl", headingClassName)}>
          {subheading}
        </p>
      )}
    </header>
  );
}