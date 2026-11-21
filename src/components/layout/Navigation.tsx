"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "WORK", href: "#selected-works" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-base",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="container-wide flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Zona Kiri: Logo — sejajar "HELLO, I'M ADHAM" */}
        <Link
          href="/"
          className="font-sans font-medium text-lg text-foreground hover:text-accent transition-colors focus-ring"
          aria-label="Adham Baarigh - Home"
        >
          ADHAM BAARIGH
        </Link>

        {/* Zona Tengah: Nav links */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "font-sans font-medium text-sm text-foreground hover:text-accent transition-colors relative focus-ring",
                pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href))
                  ? "text-accent"
                  : ""
              )}
              aria-current={pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href)) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Zona Kanan: Badge — sejajar edge kanan portrait placeholder */}
        <AvailabilityBadge />

        <button
          className="md:hidden p-2 text-foreground hover:text-accent transition-colors focus-ring"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-50 bg-background/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="container-wide w-full flex flex-col items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-sans font-medium text-2xl text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <AvailabilityBadge />
          </div>
        </div>
      )}
    </header>
  );
}

function AvailabilityBadge() {
  return (
    <span
      className="hidden sm:inline-flex items-center px-3 py-1 text-xs font-medium bg-accent-light text-accent"
      aria-label="Available for opportunities"
    >
      Available for opportunities
    </span>
  );
}