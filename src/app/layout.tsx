import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://adhamabaarigh.dev"),
  title: {
    default: "Adham Baarigh — Full Stack Web & Flutter Developer",
    template: "%s | Adham Baarigh",
  },
  description: "Building digital experiences with purpose. Full Stack Web & Flutter Developer portfolio showcasing projects, skills, and approach.",
  keywords: [
    "Full Stack Developer",
    "Flutter Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Laravel",
    "TypeScript",
    "Portfolio",
    "Indonesia",
  ],
  authors: [{ name: "Adham Baarigh" }],
  creator: "Adham Baarigh",
  publisher: "Adham Baarigh",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adhamabaarigh.dev",
    siteName: "Adham Baarigh Portfolio",
    title: "Adham Baarigh — Full Stack Web & Flutter Developer",
    description: "Building digital experiences with purpose.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Adham Baarigh Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adham Baarigh — Full Stack Web & Flutter Developer",
    description: "Building digital experiences with purpose.",
    images: ["/og-image.svg"],
    creator: "@adhambrgh",
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SkipLink />
        <Navigation />
        <main id="main-content" className="relative z-40 min-h-screen" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}