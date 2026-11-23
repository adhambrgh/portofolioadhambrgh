"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TechTagList } from "@/components/ui/TechTag";
import { formatProjectCategory } from "@/lib/utils";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function SelectedWorks() {
  return (
    <section
      id="selected-works"
      className="section-padding bg-background"
      aria-labelledby="selected-works-heading"
    >
      <div className="container-wide">
        <SectionHeader
          label="SELECTED WORK"
          id="selected-works"
          heading="Some things I&apos;ve built."
        />

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="list"
          aria-label="Featured projects"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="group"
              role="listitem"
            >
              <Card variant="project" hover>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImagePlaceholder
                    type="project"
                    name={project.name}
                    techStack={project.techStack}
                    className="transition-transform duration-slower ease-out group-hover:scale-105"
                    alt={project.thumbnailAlt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-base" aria-hidden="true" />
                </div>

                <CardContent className="pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-accent-light text-accent">
                      {formatProjectCategory(project.category)}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors mb-2">
                    {project.name}
                  </h3>

                  <p className="text-secondary text-base leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <TechTagList tags={project.techStack} variant="subtle" size="sm" maxVisible={5} />
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-secondary hover:text-accent transition-colors hover-underline flex items-center gap-1"
                      aria-label={`View ${project.name} repository on GitHub`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      Code
                    </Link>
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-secondary hover:text-accent transition-colors hover-underline flex items-center gap-1"
                        aria-label={`View ${project.name} live demo`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live
                      </Link>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}