import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SectionTitle } from "@/components/ui";
import { faqs } from "@/lib/content";

/**
 * The FAQ. Native <details> elements, so every answer is in the DOM for
 * crawlers and works with no JavaScript at all — the same array also feeds the
 * FAQPage structured data on the home page, so the two can never drift apart.
 */
export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow index="08">Before you join</Eyebrow>
          <SectionTitle>
            Questions, answered <span className="text-accent-ink">straight</span>.
          </SectionTitle>
          <p className="text-muted mt-6 max-w-sm leading-relaxed">
            The honest answers to what people ask most before stepping into the
            room — including the ones that lose us signups.
          </p>
          <Link
            href="/#walkthrough"
            className="navlink text-accent-ink hover:text-cream mt-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            Still deciding? Watch the walkthrough ↑
          </Link>
        </Reveal>

        <Reveal delayMs={100} className="faq border-line lg:col-span-7 lg:border-t">
          {faqs.map(({ q, a }) => (
            <details key={q} className="border-line border-b">
              <summary className="text-cream flex items-center justify-between gap-4 py-5 text-lg font-medium">
                {q}
                <svg
                  className="faq-ic text-accent-ink shrink-0"
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="faq-a">
                <p className="text-muted -mt-1 max-w-xl pb-5 leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
