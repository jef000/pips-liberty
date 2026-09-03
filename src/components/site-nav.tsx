"use client";

import Link from "next/link";

import { Wordmark } from "@/components/brand";
import { useFunnel } from "@/components/funnel";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/components/use-active-section";

/**
 * The sticky masthead. Its one call to action tracks the funnel: before the
 * join section has been revealed it points at the walkthrough, after that it
 * points straight at the join step the visitor has actually reached.
 */
const NAV_LINKS = [
  { href: "/#inside", id: "inside", label: "Inside" },
  { href: "/#room", id: "room", label: "The room" },
  { href: "/#walkthrough", id: "walkthrough", label: "Walkthrough" },
  { href: "/#faq", id: "faq", label: "FAQ" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function SiteNav() {
  const { revealed, unlocked } = useFunnel();
  const active = useActiveSection(SECTION_IDS);

  const cta = !revealed
    ? { short: "Watch", long: "Watch the walkthrough" }
    : unlocked
      ? { short: "Join", long: "Join the community" }
      : { short: "Get in", long: "Get verified in" };

  return (
    <header className="bg-canvas/85 border-line sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8"
      >
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Wordmark />
          <span className="sr-only">— home</span>
        </Link>

        <div className="flex items-center gap-4 text-sm sm:gap-6">
          {NAV_LINKS.map(({ href, id, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={active === id ? "true" : undefined}
              className={`navlink hover:text-cream hidden py-2 transition-colors sm:inline ${
                active === id ? "text-cream" : "text-muted"
              }`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href={revealed ? "/#join" : "/#walkthrough"}
            className="btn bg-accent text-ink inline-flex shrink-0 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">{cta.short}</span>
            <span className="hidden sm:inline">{cta.long}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
