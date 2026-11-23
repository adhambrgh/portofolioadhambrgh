"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTagList } from "@/components/ui/TechTag";
import { AboutPortrait } from "@/components/ui/AboutPortrait";
import { SkillBar } from "@/components/ui/SkillBar";
import { skillCategories, skillBars } from "@/data/skills";
import { cn } from "@/lib/utils";

const interests = [
  "Building accessible and performant web applications",
  "Crafting intuitive mobile experiences with Flutter",
  "Clean architecture and maintainable codebases",
  "Developer experience and tooling",
  "Open source contribution and community",
];

const approachItems = [
  "Understand the problem deeply before writing code",
  "Design thoughtful solutions with the user in mind",
  "Build functional products that scale",
  "Improve through iteration and feedback",
];

export function About() {
  return (
    <section
      id="about"
      className="section-padding bg-card"
      aria-labelledby="about-heading"
    >
      <div className="container-wide">
        <SectionHeader
          label="ABOUT"
          id="about"
          heading="A little about the person behind the code."
        />

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AboutPortrait src="/images/about/portrait.png" alt="Adham Baarigh" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div className="space-y-6 text-secondary leading-relaxed">
              <p>
                I&apos;m Adham, a Full Stack Web & Flutter Developer based in Indonesia.
                My journey in software development started with curiosity about how things work
                behind the screen, and it evolved into a passion for building digital products
                that solve real problems.
              </p>
              <p>
                I specialize in building web applications with React, Next.js, and Laravel,
                and mobile applications with Flutter and React Native. I believe in writing
                clean, maintainable code and creating intuitive user experiences that feel
                natural and purposeful.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open source, or learning about software architecture and
                system design.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              {skillBars.map((bar) => (
                <SkillBar key={bar.label} label={bar.label} value={bar.value} color={bar.color} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div>
              <h3 className="font-sans font-medium text-lg text-foreground mb-4">
                Development Interests
              </h3>
              <ul className="space-y-3" role="list">
                {interests.map((interest, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + index * 0.05 }}
                    className="flex items-start gap-3 text-secondary leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>{interest}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div>
              <h3 className="font-sans font-medium text-lg text-foreground mb-4">
                Technology Focus
              </h3>
              <div className="space-y-6">
                {skillCategories.map((category, catIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + catIndex * 0.05 }}
                  >
                    <h4 className="font-sans font-medium text-sm uppercase tracking-wider text-muted mb-3">
                      {category.category}
                    </h4>
                    <TechTagList
                      tags={category.skills}
                      variant="outline"
                      size="sm"
                      maxVisible={8}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}