import { Reveal } from "@/components/reveal";
import { Eyebrow, Panel, Section, SectionTitle } from "@/components/ui";
import { features, type FeatureIcon } from "@/lib/content";

/** Icon paths kept here rather than in content.ts, so the copy file stays JSX-free. */
const ICONS: Record<FeatureIcon, React.ReactNode> = {
  pulse: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  mind: (
    <>
      <path d="M12 3a7 7 0 00-4 12.7V18h8v-2.3A7 7 0 0012 3z" />
      <path d="M9 21h6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0111 0" />
      <path d="M16 6a3 3 0 010 6" />
      <path d="M20.5 20a5.5 5.5 0 00-3.5-5.1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

/**
 * What you actually get. Laid out as a wide two-by-two of cards rather than
 * the text-beside-a-visual shape used by the bands either side of it — a page
 * this long has to keep changing its silhouette or it reads as one wall.
 */
export function InsideCommunity() {
  return (
    <Section id="inside">
      <Reveal className="max-w-2xl">
        <Eyebrow index="01">Inside the community</Eyebrow>
        <SectionTitle>
          More than a group chat — a way of{" "}
          <span className="text-accent-ink">practising</span>.
        </SectionTitle>
        <p className="text-muted mt-6 leading-relaxed">
          Four things, running every week. None of them is a trade call.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delayMs={i * 70}>
            <Panel lift className="group h-full p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="bg-accent/10 border-accent/25 text-accent-ink group-hover:bg-accent/20 grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors">
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[feature.icon]}
                  </svg>
                </span>
                <span className="text-muted/40 font-mono text-[11px] tracking-[0.1em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="font-display text-cream mt-6 text-[19px] leading-snug font-semibold">
                {feature.title}
              </p>
              <p className="text-muted mt-2.5 text-[14.5px] leading-relaxed">
                {feature.body}
              </p>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
