"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { allProjects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTagList } from "@/components/ui/TechTag";
import { formatProjectCategory, cn } from "@/lib/utils";

const FILTERS = ["All", "Web", "Mobile", "Full Stack", "Experiment"] as const;
type Filter = (typeof FILTERS)[number];

const categoryMap: Record<Exclude<Filter, "All">, string> = {
  Web: "web",
  Mobile: "mobile",
  "Full Stack": "fullstack",
  Experiment: "experiment",
};

export function ProjectsArchive() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === categoryMap[filter]);

  return (
    <section className="section-padding pt-32 md:pt-36 bg-background">
      <div className="container-wide">
        <SectionHeader
          label="ALL PROJECTS"
          heading="Everything I&apos;ve built."
          subheading="Arsip lengkap proyek web, mobile, dan eksperimen teknis — termasuk yang masih berupa latihan."
        />

        {/* filter kategori */}
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "font-sans text-sm transition-colors focus-ring",
                filter === f ? "text-foreground" : "text-secondary hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {`${visible.length} project${visible.length === 1 ? "" : "s"} shown`}
        </p>

        <ul role="list" className="border-t border-border">
          {visible.map((project, index) => (
            <motion.li
              key={project.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut", delay: reduced ? 0 : index * 0.04 }}
              className="border-b border-border"
            >
              <article className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <div className="md:col-span-1">
                  <span aria-hidden="true" className="font-sans text-sm tabular-nums text-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <p className="font-sans text-xs uppercase tracking-widest text-secondary">
                    {formatProjectCategory(project.category)}
                  </p>
                  <h3 className="mt-2 font-sans text-xl font-semibold text-foreground">
                    {project.name}
                  </h3>
                </div>

                <div className="md:col-span-6">
                  <p className="text-secondary leading-relaxed">{project.description}</p>
                  <TechTagList tags={project.techStack} plain maxVisible={5} className="mt-4" />
                </div>

                <div className="flex items-start gap-4 md:col-span-1 md:justify-end">
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-medium text-secondary hover:text-accent transition-colors focus-ring"
                    aria-label={`View ${project.name} repository on GitHub`}
                  >
                    Code
                  </Link>
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm font-medium text-secondary hover:text-accent transition-colors focus-ring"
                      aria-label={`View ${project.name} live demo`}
                    >
                      Live
                    </Link>
                  )}
                </div>
              </article>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            href="/"
            className="font-sans text-sm font-medium text-foreground hover:text-accent transition-colors focus-ring"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
