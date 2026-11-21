import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F6F2",
        foreground: "#20211F",
        primary: {
          DEFAULT: "#20211F",
          foreground: "#F7F6F2",
        },
        secondary: {
          DEFAULT: "#777873",
          foreground: "#F7F6F2",
        },
        muted: {
          DEFAULT: "#9E9D96",
          foreground: "#F7F6F2",
        },
        accent: {
          DEFAULT: "#7886A8",
          foreground: "#F7F6F2",
          hover: "#5E6D8E",
          light: "#E8EAF2",
        },
        card: {
          DEFAULT: "#FFFFFF",
          hover: "#FDFDFB",
          foreground: "#20211F",
        },
        border: {
          DEFAULT: "#E5E3DC",
          hover: "#D4D1C8",
        },
        focus: "#7886A8",
        destructive: "#C0392B",
        success: "#27AE60",
        overlay: "rgba(32, 33, 31, 0.6)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        xs: ["clamp(0.70rem, 0.65rem + 0.25vw, 0.75rem)", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        sm: ["clamp(0.80rem, 0.75rem + 0.25vw, 0.875rem)", { lineHeight: "1.5" }],
        base: ["clamp(0.95rem, 0.875rem + 0.375vw, 1rem)", { lineHeight: "1.6" }],
        lg: ["clamp(1.10rem, 1.0rem + 0.5vw, 1.125rem)", { lineHeight: "1.6" }],
        xl: ["clamp(1.30rem, 1.15rem + 0.75vw, 1.5rem)", { lineHeight: "1.35" }],
        "2xl": ["clamp(1.60rem, 1.35rem + 1.25vw, 2rem)", { lineHeight: "1.35" }],
        "3xl": ["clamp(2.00rem, 1.6rem + 2vw, 3rem)", { lineHeight: "1.1" }],
        "4xl": ["clamp(2.50rem, 1.9rem + 3vw, 4rem)", { lineHeight: "1.1" }],
        "5xl": ["clamp(3.20rem, 2.3rem + 4.5vw, 5.5rem)", { lineHeight: "1.1" }],
      },
      spacing: {
        "section-y": "clamp(4rem, 8vw, 10rem)",
        "section-x": "clamp(1.5rem, 5vw, 4rem)",
        "container-max": "72rem",
        "container-wide": "88rem",
      },
      animation: {
        "fade-in-up": "fadeInUp 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in": "fadeIn 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "scale-hover": "scaleHover 150ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "underline-slide": "underlineSlide 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
        underlineSlide: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      transitionDuration: {
        instant: "0ms",
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
        slower: "600ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        in: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      },
      container: {
        center: true,
        padding: "clamp(1.5rem, 5vw, 4rem)",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;