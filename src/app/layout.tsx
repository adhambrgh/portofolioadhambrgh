import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
    creator: "@adhambrgh",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}