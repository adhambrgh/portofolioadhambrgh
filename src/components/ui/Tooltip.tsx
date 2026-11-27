"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 150,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const tooltipIdRef = useRef(`tooltip-${Math.random().toString(36).slice(2, 9)}`);

  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const show = () => {
    clearTimeout(timeoutRef.current);
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }
    timeoutRef.current = setTimeout(() => setVisible(false), 50);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 border-l border-t border-border",
    bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-border",
    left: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 border-l border-t border-border",
    right: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45 border-l border-t border-border",
  };

  const springTransition = { type: "spring", stiffness: 400, damping: 17 } as const;

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={visible ? tooltipIdRef.current : undefined}
    >
      {children}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={prefersReducedMotion ? { duration: 0 } : springTransition}
            className={cn(
              "absolute z-50 pointer-events-none",
              positionClasses[position]
            )}
            role="tooltip"
            id={tooltipIdRef.current}
          >
            <div className="px-3 py-2 text-sm bg-card border border-border text-foreground shadow-lg rounded-lg whitespace-normal max-w-xs">
              {content}
            </div>
            <div className={cn("absolute w-2 h-2 bg-card", arrowClasses[position])} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}