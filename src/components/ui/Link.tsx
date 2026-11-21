"use client";

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "muted" | "accent";
  children: ReactNode;
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", children, external, ...props }, ref) => {
    const variants = {
      default: "text-foreground hover:text-accent transition-colors hover-underline",
      muted: "text-secondary hover:text-foreground transition-colors hover-underline",
      accent: "text-accent hover:text-accent-hover transition-colors hover-underline",
    };

    return (
      <a
        ref={ref}
        className={cn(variants[variant], className)}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={external ? `${props["aria-label"] || children} (opens in new tab)` : props["aria-label"]}
        {...props}
      >
        {children}
        {external && (
          <span className="ml-1 inline-block" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = "Link";