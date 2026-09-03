import { CountUp } from "@/components/count-up";
import { StreakGrid } from "@/components/streak-grid";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Panel, Section, SectionTitle } from "@/components/ui";
import { ritual } from "@/lib/content";

/**
 * The daily ritual, spelled out end to end. This is the whole product, so the
 * home page shows the mechanics rather than gesturing at them — a visitor
 * should be able to decide whether they want this without joining anything.
 */
export function Ritual() {
  return (
    <Section id="ritual" tone="raised">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow index="02">The daily ritual</Eyebrow>
          <SectionTitle>
            One habit, repeated until it is <span className="text-accent-ink">yours</span>.
          </SectionTitle>
          <p className="text-muted mt-6 max-w-sm leading-relaxed">
            Sixty seconds at the end of a trading day. That is the entire
            commitment, and it is the only thing we measure.
          </p>

          <Panel className="mt-8 p-6">
            <div className="flex items-baseline gap-3">
              <p className="font-display text-accent-ink text-[44px] leading-none font-semibold">
                <CountUp value="34" />
              </p>
              <p className="text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
                Day streak
              </p>
            </div>
            <StreakGrid className="mt-5" />
            <p className="text-line border-line text-muted mt-5 border-t pt-4 text-[13px] leading-relaxed">
              An illustrative grid. Green days and red days count exactly the
              same — the only way to break the run is to say nothing.
            </p>
          </Panel>
        </Reveal>

        <div className="lg:col-span-7">
          <ol className="flex flex-col gap-4">
            {ritual.map((item, i) => (
              <Reveal key={item.step} delayMs={i * 90}>
                <li>
                  <Panel className="flex gap-5 p-6 md:p-7">
                    <span className="font-display text-accent-ink/40 shrink-0 text-[32px] leading-none font-semibold">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-display text-cream text-[19px] font-semibold">
                        {item.title}
                      </p>
                      <p className="text-muted mt-2 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </Panel>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
