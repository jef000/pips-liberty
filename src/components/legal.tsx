import type { ReactNode } from "react";

import { Breadcrumbs, PageTitle, delay } from "@/components/brand";

/**
 * Shared shell for the legal pages.
 *
 * TEMPLATE — not legal advice. Every [bracketed] placeholder below and in the
 * pages that use this shell must be filled in, and the result reviewed by
 * someone qualified, before it is relied on.
 */
export function LegalPage({
  page,
  title,
  lastUpdated = "18 August 2026",
  children,
}: {
  page: string;
  title: ReactNode;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <Breadcrumbs page={page} />
      <div data-enter style={delay(200)}>
        <PageTitle>{title}</PageTitle>
        <p className="text-muted mt-4 text-sm">Last updated: {lastUpdated}</p>
      </div>
      <div data-enter style={delay(320)}>
        {children}
      </div>
    </main>
  );
}

/** The boxed risk warning that opens the Terms page. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="border-accent/30 bg-accent/5 mt-8 rounded-2xl border px-5 py-4">
      <p className="text-soft leading-relaxed">{children}</p>
    </div>
  );
}

/**
 * Marks a value that still has to be supplied before launch. Rendering these
 * with a visible treatment rather than as plain text means an unfilled
 * placeholder is obvious on the page instead of hiding in a wall of prose.
 */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <strong className="text-amber bg-amber/10 rounded px-1.5 py-0.5 font-mono text-[0.9em] font-semibold">
      {children}
    </strong>
  );
}
