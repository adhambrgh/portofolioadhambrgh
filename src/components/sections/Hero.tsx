"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 pb-20 md:pb-32 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col justify-center lg:pr-8">
            <motion.p
              className="section-label"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              HELLO, I&apos;M ADHAM
            </motion.p>

            <motion.h1
              id="hero-heading"
              className="section-heading mt-4 md:mt-6 max-w-xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              Building digital experiences with purpose.
            </motion.h1>

            <motion.p
              className="mt-6 md:mt-8 text-lg md:text-xl text-secondary leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              I&apos;m a Full Stack Web & Flutter Developer who enjoys turning ideas into thoughtful, functional, and user-friendly digital products.
            </motion.p>

            <motion.div
              className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <Link
                href="#selected-works"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-foreground text-background hover:opacity-90 active:opacity-80 transition-colors focus-ring rounded-none"
              >
                Explore My Work
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-transparent text-foreground border border-border hover:bg-card-hover hover:border-border-hover transition-colors focus-ring rounded-none"
              >
                Get in Touch
              </Link>
            </motion.div>

            <motion.p
              className="mt-8 md:mt-12 text-sm text-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              Based in Indonesia.
            </motion.p>
          </div>

          <motion.div
            className="relative lg:pl-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative -mt-6 md:-mt-8 lg:-mt-10 aspect-[3/4] max-w-md mx-auto lg:max-w-none overflow-visible">
              <ImagePlaceholder type="nametag" name="Adham Baarigh" role="Software Engineer" className="rounded-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
            </div>

            <motion.div
              className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 lg:-bottom-16 lg:-right-20 text-right opacity-60"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              aria-hidden="true"
            >
              <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-widest text-secondary leading-tight">
                DESIGN / DEVELOP / CREATE
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-bounce-slow"
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}