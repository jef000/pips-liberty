import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

import { ConsentBanner } from "@/components/consent-banner";
import { FunnelProvider } from "@/components/funnel";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteNav } from "@/components/site-nav";
import { StickyJoinBar } from "@/components/sticky-join-bar";
import { site } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
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

/*
 * The display face. Space Grotesk carries the uppercase hero and every section
 * heading — it has the tight, slightly mechanical uppercase the cinematic
 * layout needs, and unlike the webfont the original concept loaded from a CDN
 * it is self-hosted by next/font, so there is no third-party request and no
 * layout shift while it arrives.
 */
const displayGrotesk = Space_Grotesk({
  variable: "--font-display-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const DESCRIPTION =
  "A free trading community built on one habit: showing up. Daily check-ins, a trading-psychology classroom and a streak leaderboard — no signals, no paywall.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jef000.github.io/pips-liberty"),
  title: {
    default: "Pips & Liberty | Proof Over Hype",
    template: "%s — Pips & Liberty | Proof Over Hype",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/pips-liberty/",
    siteName: site.brand,
    title: "Pips & Liberty | Proof Over Hype",
    description: DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pips & Liberty — master your pips, then claim your liberty.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pips & Liberty | Proof Over Hype",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#08090B" },
  ],
  colorScheme: "light dark",
};

/** Organization structured data. The FAQ equivalent lives on the home page. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: "https://jef000.github.io/pips-liberty/",
  description: DESCRIPTION,
};

// Spelled out rather than using Next's generated `LayoutProps` global, so that
// `npm run typecheck` works on a fresh checkout with no build artifacts.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /*
       * The theme script below stamps `data-theme` on this element before
       * React hydrates, which is the whole point — it has to happen ahead of
       * the first paint. That is a deliberate server/client attribute
       * difference on this one element, so the warning is suppressed here
       * rather than by moving the work into an effect, which would be too
       * late and would flash the wrong theme.
       */
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${displayGrotesk.variable} h-full antialiased`}
    >
      <body className="bg-canvas text-cream flex min-h-full flex-col font-sans">
        {/*
          Applies a stored theme before anything below it renders, so a visitor
          who chose light never sees a frame of dark. Must run ahead of the
          markup rather than in an effect, which is far too late.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="grain" aria-hidden="true" />
        <FunnelProvider>
          <ScrollProgress />
          <SiteNav />
          <div className="flex w-full flex-1 flex-col">{children}</div>
          <SiteFooter />
          <StickyJoinBar />
          <ConsentBanner />
        </FunnelProvider>
      </body>
    </html>
  );
}
