"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const approachSteps = [
  {
    number: "01",
    title: "Understand the Problem",
    description: "Deep dive into requirements, constraints, and user needs before touching code. Ask the right questions to uncover the real problem.",
  },
  {
    number: "02",
    title: "Design Thoughtful Solutions",
    description: "Create architecture and UX that balance technical elegance with practical usability. Prototype, validate, and refine.",
  },
  {
    number: "03",
    title: "Build Functional Products",
    description: "Write clean, maintainable code with proper testing. Focus on performance, accessibility, and developer experience.",
  },
  {
    number: "04",
    title: "Improve Through Iteration",
    description: "Ship, measure, learn, and iterate. Continuous improvement based on real user feedback and data.",
  },
];

export function Approach() {
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          role="list"
          aria-label="Development approach steps"
        >
          {approachSteps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
              className="group relative pl-12 pb-8 lg:pb-0"
              role="listitem"
            >
              <span
                className="absolute left-0 top-0 font-sans font-medium text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
                {step.title}
              </h3>

              <p className="text-secondary text-sm leading-relaxed">
                {step.description}
              </p>

              <div
                className="absolute bottom-0 left-0 right-0 h-px bg-border group-hover:bg-accent transition-colors duration-base"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}