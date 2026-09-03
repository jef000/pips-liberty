import Link from "next/link";

import { Disclosure } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Highlight, Panel, Section, SectionTitle } from "@/components/ui";
import { paths } from "@/lib/content";
import { brokerPromo, communityHighlight, propFirmHighlight } from "@/lib/site";

/** The partner ribbon that belongs under each route, if any. */
const HIGHLIGHTS = {
  "/trade": brokerPromo,
  "/join": communityHighlight,
  "/scale": propFirmHighlight,
} as const;

/**
 * The three routes off this page, each a full page of its own. They are shown
 * here in full rather than as bare links, so a visitor can pick the right one
 * without having to open all three to find out what they are.
 */
export function Paths() {
  return (
    <Section id="paths" tone="raised">
      <Reveal className="max-w-2xl">
        <Eyebrow index="04">Where to go next</Eyebrow>
        <SectionTitle>
          Three routes in. Pick the one that is <span className="text-accent-ink">true</span>{" "}
          today.
        </SectionTitle>
        <p className="text-muted mt-6 leading-relaxed">
          Most people start at the first and work down. Nothing here expires, and
          nothing costs anything to look at.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7">
        {paths.map((path, i) => {
          const highlight = HIGHLIGHTS[path.href as keyof typeof HIGHLIGHTS];

          return (
            <Reveal key={path.href} delayMs={i * 90}>
              <Panel
                lift
                className={`flex h-full flex-col p-7 md:p-8 ${
                  path.emphasis ? "border-accent/40" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-semibold ${
                      path.emphasis
                        ? "bg-accent text-ink"
                        : "bg-surface-2 text-muted"
                    }`}
                  >
                    {path.index}
                  </span>
                  {path.emphasis ? (
                    <span className="text-accent-ink font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase">
                      Start here
                    </span>
                  ) : null}
                </div>

                <p className="font-display text-cream mt-5 text-[21px] leading-snug font-semibold">
                  {path.title}
                </p>
                <p className="text-soft mt-2 text-[14.5px] leading-relaxed">{path.hint}</p>
                <p className="text-muted mt-3 mb-6 flex-1 text-[13.5px] leading-relaxed">
                  {path.detail}
                </p>

                {highlight ? (
                  <Highlight
                    headline={highlight.headline}
                    detail={highlight.detail}
                    caveat={highlight.caveat}
                    className="mt-auto"
                  />
                ) : null}

                <Link
                  href={path.href}
                  className={`btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold ${
                    path.emphasis
                      ? "bg-accent text-ink hover:bg-accent-deep"
                      : "border-line-strong text-cream hover:border-accent hover:text-accent-ink border"
                  }`}
                >
                  {path.cta} →
                </Link>
              </Panel>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <Disclosure className="mt-8 max-w-3xl" />
      </Reveal>
    </Section>
  );
}
