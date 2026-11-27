"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tooltip } from "@/components/ui/Tooltip";

const approachSteps = [
  {
    number: "01",
    icon: "search",
    title: "Discover",
    description: "Understand goals, constraints, and the real problem.",
  },
  {
    number: "02",
    icon: "design",
    title: "Design",
    description: "Shape architecture and UX that stay usable.",
  },
  {
    number: "03",
    icon: "code",
    title: "Develop",
    description: "Build clean, tested, and accessible code.",
  },
  {
    number: "04",
    icon: "launch",
    title: "Launch",
    description: "Ship, measure, then iterate on real feedback.",
  },
];

/** Ikon garis monokrom; maknanya sudah dibawa judul, jadi aria-hidden. */
function StepIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
          <path d="m14 6 4 4" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M5 19 19 5M19 5h-6M19 5v6" />
        </svg>
      );
  }
}

export function Approach() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.4, ease: "easeOut" as const } },
  };

  return (
    <section
      id="approach"
      className="section-padding bg-background"
      aria-labelledby="approach-heading"
    >
      <div className="container-wide">
        <SectionHeader
          label="MY APPROACH"
          id="approach"
          heading="How I build digital products."
        />

        <motion.div
          className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          role="list"
          aria-label="Development approach steps"
        >
          {approachSteps.map((step, index) => (
            <motion.article
              key={step.number}
              variants={item}
              className="group relative flex flex-col items-center text-center"
              role="listitem"
            >
              <span aria-hidden="true" className="font-sans text-sm tabular-nums text-foreground">
                {step.number}
              </span>

              <Tooltip
                content={
                  <>
                    <strong className="block mb-1">{step.title}</strong>
                    <span className="text-sm opacity-90">{step.description}</span>
                  </>
                }
                position="top"
                delay={150}
              >
                <motion.span
                  className="mt-4 flex size-16 items-center justify-center rounded-full border border-border bg-card transition-all duration-base group-hover:border-accent hover:scale-[1.03] hover:shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <StepIcon
                    name={step.icon}
                    className="size-7 text-foreground transition-colors duration-base group-hover:text-accent"
                  />
                </motion.span>
              </Tooltip>

              <h3 className="mt-5 font-sans text-xl font-semibold text-foreground md:text-2xl">
                {step.title}
              </h3>

              <motion.p
                className="mt-3 max-w-[26ch] text-base leading-relaxed text-secondary"
                whileHover={{ color: "#20211F", fontWeight: 500 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {step.description}
              </motion.p>

              {/* penghubung horizontal: hanya di lg, sejajar pusat lingkaran */}
              {index < approachSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+3rem)] top-[3.25rem] hidden w-[calc(100%-6rem)] border-t border-dashed border-border lg:block"
                />
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
