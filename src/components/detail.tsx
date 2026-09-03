import type { ReactNode } from "react";

import { Breadcrumbs, PageTitle, delay } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Panel } from "@/components/ui";

/**
 * The shared shell for the three detail pages.
 *
 * They were previously a narrow column of prose and buttons, which read as a
 * document next to a home page that had been designed. This gives them the
 * same vocabulary — a wide two-column header, a supporting panel, numbered
 * step cards and a closing band — so moving between them feels like one site.
 */
export function DetailPage({
  page,
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  page: string;
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  /** The panel beside the header — a partner ribbon, a perk list, key facts. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="w-full">
      <header className="border-line relative overflow-hidden border-b">
        <div aria-hidden="true" className="hero-aura" />
        <div aria-hidden="true" className="hero-grid" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <Breadcrumbs page={page} />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div data-enter style={delay(200)}>
                <Eyebrow>{eyebrow}</Eyebrow>
                <PageTitle className="mb-5">{title}</PageTitle>
                <p className="text-soft max-w-xl text-[16px] leading-relaxed md:text-[17px]">
                  {lead}
                </p>
              </div>
            </div>

            {aside ? (
              <div data-enter style={delay(340)} className="lg:col-span-5">
                {aside}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {children}
    </main>
  );
}

/** Numbered step cards — the detail-page equivalent of the ritual band. */
export function StepCards({
  steps,
}: {
  steps: readonly { title: string; body: ReactNode }[];
}) {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal key={step.title} delayMs={i * 80}>
          <li>
            <Panel className="h-full p-7">
              <span className="font-display text-accent-ink/40 text-[30px] leading-none font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-cream mt-5 text-[18px] leading-snug font-semibold">
                {step.title}
              </p>
              <p className="text-muted mt-2.5 text-[14px] leading-relaxed">{step.body}</p>
            </Panel>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/** The closing call to action at the foot of a detail page. */
export function DetailClose({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-line relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="glow left-1/2 h-[20rem] w-[38rem] -translate-x-1/2 -translate-y-1/4"
      />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-20 text-center md:px-8 md:py-24">
        <Reveal>
          <p className="font-display text-[clamp(24px,4.4vw,34px)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance">
            {title}
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
