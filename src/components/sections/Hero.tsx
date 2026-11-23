"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function Hero() {
  // grid = stretch: kolom kanan harus setinggi section, satu-satunya induk sticky di rantai badge
  return (
    <section
      id="hero"
      className="min-h-screen container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-28 md:pt-32 pb-20 md:pb-32"
      aria-labelledby="hero-heading"
    >
          <div className="relative z-10 flex flex-col justify-start pt-8 lg:pt-16 lg:pr-8">
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

          {/* tanpa scale: ancestor ber-transform mematahkan posisi rig fixed */}
          <motion.div
            className="relative lg:pl-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {/* cart label lepas dari badge: tidak ikut sticky, selalu di bawah kolom */}
            <motion.div
              className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 text-right opacity-60"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              aria-hidden="true"
            >
              <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-widest text-secondary leading-tight">
                DESIGN / DEVELOP / CREATE
              </p>
            </motion.div>

            {/* gambar terpotong tinggi sd. kartu; di lg diberi ruang lebih supaya kartu bisa besar.
                overflow-visible: kartu yang ditarik keluar kolom tidak boleh terpotong */}
            <div className="h-auto lg:h-[140svh] overflow-visible">
              <div className="max-w-md mx-auto lg:max-w-lg pt-8 lg:-mt-20">
                <ImagePlaceholder type="nametag" name="Adham Baarigh" role="Software Engineer" className="rounded-none" />
              </div>
            </div>
          </motion.div>

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