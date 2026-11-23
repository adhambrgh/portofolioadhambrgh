"use client";

import { useState, useEffect } from "react";
import { LanyardRig } from "./LanyardRig";

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

  return (
    <LanyardRig
      name={name}
      role={role}
      prefersReducedMotion={prefersReducedMotion}
      className={className}
    />
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
