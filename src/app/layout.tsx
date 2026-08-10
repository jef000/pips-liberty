import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SocialLinks } from "@/components/brand";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jef000.github.io/pips-liberty"),
  title: {
    default: "Pips & Liberty | Proof Over Hype",
    template: "%s — Pips & Liberty | Proof Over Hype",
  },
  description:
    "A free trading community built on one habit: showing up. We track your streak, not your screenshots.",
  openGraph: {
    type: "website",
    url: "/pips-liberty/",
    siteName: "Pips & Liberty | Proof Over Hype",
    title: "Pips & Liberty | Proof Over Hype",
    description:
      "A free trading community built on one habit: showing up. We track your streak, not your screenshots.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pips & Liberty | Proof Over Hype",
    description:
      "A free trading community built on one habit: showing up. We track your streak, not your screenshots.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

// Spelled out rather than using Next's generated `LayoutProps` global, so that
// `npm run typecheck` works on a fresh checkout with no build artifacts.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="text-ink bg-paper flex min-h-full flex-col items-center font-sans">
        {children}
        <footer className="border-rule mt-auto w-full max-w-[540px] border-t px-6 py-8 text-center">
          <SocialLinks />
          <p className="text-ink-faint mt-4 text-[12.5px] leading-relaxed">
            {site.riskWarning}
          </p>
        </footer>
      </body>
    </html>
  );
}
