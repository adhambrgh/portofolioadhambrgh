"use client";

import { type ImgHTMLAttributes } from "react";
import { cn, getInitials } from "@/lib/utils";
import { NametagBadge } from "./NametagBadge";

interface ImagePlaceholderProps extends ImgHTMLAttributes<HTMLDivElement> {
  type: "portrait" | "nametag";
  name?: string;
  role?: string;
  className?: string;
  aspectRatio?: string;
}

export function ImagePlaceholder({
  type,
  name,
  role,
  className,
  aspectRatio = type === "portrait" ? "aspect-[3/4]" : "aspect-[15/59]",
  ...props
}: ImagePlaceholderProps) {
  const initials = name ? getInitials(name) : "AB";

  if (type === "nametag") {
    // tanpa sticky: peran menempel dipegang LanyardRig (fixed) yang mengukur kotak ini tiap scroll
    return (
      <div className={cn("flex flex-col items-center", aspectRatio, className)} {...props}>
        <NametagBadge name={name} role={role} className="h-full w-full" />
      </div>
    );
  }

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
