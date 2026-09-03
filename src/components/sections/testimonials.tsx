import { Reveal } from "@/components/reveal";
import { Eyebrow, Panel, Section, SectionTitle } from "@/components/ui";
import { testimonials, testimonialsArePlaceholder } from "@/lib/content";

/**
 * Social proof. While `testimonialsArePlaceholder` is true the section carries
 * a visible notice, so placeholder quotes can never quietly ship as though
 * they were real endorsements — flip the flag in content.ts once they are.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="raised">
      <Reveal className="max-w-2xl">
        <Eyebrow index="07">From the room</Eyebrow>
        <SectionTitle>
          What members say <span className="text-accent-ink">after</span> they join.
        </SectionTitle>
      </Reveal>

      {testimonialsArePlaceholder ? (
        <Reveal>
          <p className="border-amber/30 bg-amber/10 text-amber mt-6 rounded-xl border border-dashed px-4 py-3 text-[13px] leading-relaxed">
            Placeholder quotes — replace them in{" "}
            <code className="font-mono">src/lib/content.ts</code> and set{" "}
            <code className="font-mono">testimonialsArePlaceholder</code> to false
            before running any paid traffic.
          </p>
        </Reveal>
      ) : null}

      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {testimonials.map((item, i) => (
          <Reveal key={item.initials} delayMs={i * 80}>
            <Panel lift className="flex h-full flex-col p-7 md:p-8">
              <figure className="flex h-full flex-col">
                <svg
                  aria-hidden="true"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-accent-ink opacity-90"
                >
                  <path d="M9.5 7H5a1 1 0 00-1 1v4a1 1 0 001 1h2.5v1.5A1.5 1.5 0 016 16H5.5v2H6a3.5 3.5 0 003.5-3.5V8a1 1 0 00-1-1zm10 0H15a1 1 0 00-1 1v4a1 1 0 001 1h2.5v1.5A1.5 1.5 0 0116 16h-.5v2h.5a3.5 3.5 0 003.5-3.5V8a1 1 0 00-1-1z" />
                </svg>
                <blockquote className="text-soft mt-5 flex-1 text-[15px] leading-relaxed">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="border-line mt-6 flex items-center gap-3 border-t pt-5">
                  <span className="bg-accent/15 border-accent/30 text-accent-ink font-display grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold">
                    {item.initials}
                  </span>
                  <span className="text-sm">
                    <span className="text-cream font-medium">{item.name}</span>
                    <br />
                    <span className="text-muted">{item.since}</span>
                  </span>
                </figcaption>
              </figure>
            </Panel>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="text-muted mt-8 max-w-2xl text-xs leading-relaxed">
          Experiences shared by members of the community; they may not be
          typical. Trading involves risk, results vary, and nothing here is
          guaranteed.
        </p>
      </Reveal>
    </Section>
  );
}
