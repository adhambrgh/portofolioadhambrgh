"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { TechTagList } from "@/components/ui/TechTag";
import { formatProjectCategory } from "@/lib/utils";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ProjectCard({ index, featured }: { index: number; featured: boolean }) {
  const project = projects[index];
  const no = String(index + 1).padStart(2, "0");

  return (
    <motion.article variants={itemVariants} role="listitem" className="h-full">
      <Card
        variant="project"
        hover
        className={cn("flex h-full flex-col", featured ? "p-8 md:p-10" : "p-6")}
      >
        <CardContent className={cn("flex flex-1 flex-col px-0 pt-0", featured ? "pb-0" : "pb-0")}>
          {/* nomor editorial: kecil, tenang, dekoratif */}
          <span aria-hidden="true" className="font-sans text-xs tabular-nums text-secondary">
            {no}
          </span>

          <p className="mt-3 font-sans text-xs uppercase tracking-widest text-secondary">
            {formatProjectCategory(project.category)}
          </p>

          <h3
            className={cn(
              "mt-2 font-serif font-medium text-foreground",
              featured ? "text-3xl md:text-4xl" : "text-xl"
            )}
          >
            {project.name}
          </h3>

          <p
            className={cn(
              "mt-3 text-secondary leading-relaxed",
              featured ? "text-base" : "text-sm line-clamp-2"
            )}
          >
            {project.description}
          </p>

          <TechTagList
            tags={project.techStack}
            plain
            maxVisible={featured ? 6 : 4}
            className="mt-5"
          />
        </CardContent>

        <CardFooter className="mt-6 flex items-center justify-between border-t border-border px-0 pb-0">
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-sans text-xs font-medium text-secondary hover:text-accent transition-colors focus-ring"
            aria-label={`View ${project.name} repository on GitHub`}
          >
            <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Code
          </Link>

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-xs font-medium text-secondary hover:text-accent transition-colors focus-ring"
              aria-label={`View ${project.name} live demo`}
            >
              Live
              <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.article>
  );
}

export function SelectedWorks() {
  return (
    <section
      id="selected-works"
      className="section-padding pt-10 md:pt-16 bg-background"
      aria-labelledby="selected-works-heading"
    >
      <div className="container-wide">
        <SectionHeader
          label="SELECTED WORK"
          id="selected-works"
          heading="Some things I&apos;ve built."
        />

        {/* asimetris: satu proyek unggulan besar, sisanya lebih kecil */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          role="list"
          aria-label="Featured projects"
        >
          <div className="md:col-span-2 lg:col-span-7">
            <ProjectCard index={0} featured />
          </div>

          <div className="flex flex-col gap-6 md:gap-8 lg:col-span-5">
            <ProjectCard index={1} featured={false} />
            <ProjectCard index={2} featured={false} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
