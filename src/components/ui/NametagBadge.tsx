"use client";

import { useState, useEffect, useRef } from "react";
import { LanyardRig } from "./LanyardRig";

/** Tinggi navbar (h-16) — ujung atas tali berhenti tepat di bawahnya, bukan menembusnya. */
const NAV_BOTTOM = 64;

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
  const badgeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* kotak ini cuma penanda posisi + area klik; tali & kartu dirender fixed oleh rig */}
      <div
        ref={badgeRef}
        className={`relative w-full h-full select-none ${className || ""}`}
        aria-hidden="true"
      >
        <span className="sr-only">{name}, {role}</span>
      </div>

      <LanyardRig
        name={name}
        role={role}
        badgeRef={badgeRef}
        navBottom={NAV_BOTTOM}
        prefersReducedMotion={prefersReducedMotion}
      />
    </>
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
