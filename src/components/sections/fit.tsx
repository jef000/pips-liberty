import { Reveal } from "@/components/reveal";
import { CheckIcon, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { fitClosing, fitFor, fitNotFor } from "@/lib/content";

function CrossIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3" fill="none">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Who this suits, and who it does not.
 *
 * Built as one object split by a hairline rather than two floating cards, so
 * the two columns read as a single comparison being made — which is the point
 * of the section. Saying the second half out loud costs a few signups and is
 * the clearest proof of the "proof over hype" claim the rest of the page makes.
 */
export function Fit() {
  return (
    <Section id="fit">
      <Reveal className="max-w-2xl">
        <Eyebrow index="05">Before you go further</Eyebrow>
        <SectionTitle>
          This is not for <span className="text-accent-ink">everyone</span>.
        </SectionTitle>
        <p className="text-muted mt-6 leading-relaxed">
          Most pages like this one try to be for everybody. Here is the honest
          split, so you can rule yourself out in ten seconds.
        </p>
      </Reveal>

      <Reveal delayMs={80}>
        <div className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-2xl border lg:grid-cols-2">
          <div className="bg-accent/[0.06] p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="bg-accent text-ink grid h-8 w-8 shrink-0 place-items-center rounded-full">
                <CheckIcon className="h-4 w-4" />
              </span>
              <p className="text-accent-ink font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
                A good fit if
              </p>
            </div>

            <ul className="mt-7 space-y-5">
              {fitFor.map((item, i) => (
                <li
                  key={item}
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className="reveal-item text-soft flex gap-4 text-[15px] leading-relaxed"
                >
                  <span className="text-accent-ink/50 shrink-0 font-mono text-[12px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="bg-surface-2 text-muted grid h-8 w-8 shrink-0 place-items-center rounded-full">
                <CrossIcon />
              </span>
              <p className="text-muted font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
                Not a fit if
              </p>
            </div>

            <ul className="mt-7 space-y-5">
              {fitNotFor.map((item, i) => (
                <li
                  key={item}
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className="reveal-item text-muted flex gap-4 text-[15px] leading-relaxed"
                >
                  <span className="text-muted/40 shrink-0 font-mono text-[12px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="text-soft mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed">
          {fitClosing}
        </p>
      </Reveal>
    </Section>
  );
}
