"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SkillBar({ label, value, color }: { label: string; value: number; color: string }) {
  const reduced = useReducedMotion();
  return (
    // group: hover berlaku untuk seluruh baris, bukan hanya garis 3px yang sulit dikenai kursor
    <div className="group">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-sans text-sm font-medium text-foreground">{label}</span>
        <span className="font-sans text-xs text-muted tabular-nums">{value}%</span>
      </div>
      <div className="mt-2 h-[3px] w-full bg-border">
        <motion.div
          className="h-full origin-center transition-transform duration-200 ease-out group-hover:scale-y-[2]"
          style={{ backgroundColor: color }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
          initial={{ width: reduced ? `${value}%` : 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
