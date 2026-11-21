"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:adham.baarigh@example.com",
    description: "Best for project inquiries",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/adhambrgh",
    description: "View my code and contributions",
    external: true,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/adhambrgh",
    description: "Behind the scenes & updates",
    external: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="section-padding bg-card"
      aria-labelledby="contact-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <SectionHeader
            label="04 — GET IN TOUCH"
            heading="Have something in mind? Let&apos;s create it."
            className="mb-12"
          />

          <div className="grid sm:grid-cols-3 gap-6 mb-12" role="list" aria-label="Contact methods">
            {contactLinks.map((contact, index) => (
              <motion.article
                key={contact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + index * 0.1 }}
                className="group p-6 bg-background border border-border hover:border-border-hover transition-colors"
                role="listitem"
              >
                <div className="text-accent mb-4" aria-hidden="true">
                  {contact.icon}
                </div>
                <h3 className="font-sans font-medium text-lg text-foreground mb-1">
                  {contact.label}
                </h3>
                <p className="text-sm text-secondary mb-4">{contact.description}</p>
                <a
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-accent hover:text-accent-hover transition-colors hover-underline inline-flex items-center gap-1"
                  aria-label={`${contact.label}${contact.external ? " (opens in new tab)" : ""}`}
                >
                  Get in touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </a>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <a
              href="mailto:adham.baarigh@example.com?subject=Project Inquiry&body=Hi Adham,%0D%0A%0D%0AI'd like to discuss a project with you...%0D%0A%0D%0ABest regards,"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-foreground text-background hover:opacity-90 active:opacity-80 transition-colors focus-ring rounded-none"
            >
              Start a Conversation
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="mt-8 text-sm text-muted"
          >
            I typically respond within 24–48 hours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}