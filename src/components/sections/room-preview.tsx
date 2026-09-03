import { MarkTile } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { CheckIcon, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { roomPoints, roomThread } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * A WhatsApp-style recreation of an ordinary day in the room.
 *
 * Deliberately a check-in thread rather than a trade call. The device is
 * borrowed from the other concept, which used it to show a signal with entry,
 * target and stop; showing that here would directly contradict this brand's
 * own risk warning. What it shows instead is the thing that actually happens
 * every evening, which is also the more persuasive of the two.
 */
export function RoomPreview() {
  return (
    <Section id="room">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow index="03">Straight from the room</Eyebrow>
          <SectionTitle>
            This is what a <span className="text-accent-ink">day</span> looks like.
          </SectionTitle>
          <p className="text-muted mt-6 max-w-sm leading-relaxed">
            Market context before the open, a check-in at the close, and a
            streak that does not care whether the day was green.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {roomPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="bg-accent/10 text-accent-ink mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                >
                  <CheckIcon />
                </span>
                <span className="text-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={100} className="relative lg:col-span-7">
          <div
            aria-hidden="true"
            className="glow top-1/2 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
          />
          <div className="border-line bg-canvas shadow-lift relative z-10 mx-auto max-w-md overflow-hidden rounded-[1.75rem] border">
            <div className="bg-surface border-line flex items-center gap-3 border-b px-4 py-3">
              <MarkTile className="h-9 w-9 rounded-full" />
              <div className="min-w-0 flex-1">
                <p className="text-cream truncate text-sm font-medium">
                  {site.name} — daily check-ins
                </p>
                <p className="text-muted truncate text-xs">Community group</p>
              </div>
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-muted"
              >
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </div>

            <div className="space-y-3 px-4 py-5">
              <p className="text-center">
                <span className="text-muted bg-surface border-line inline-block rounded-full border px-3 py-1 text-[10px]">
                  Today
                </span>
              </p>

              {roomThread.map((message) => (
                <div
                  key={message.time}
                  className={`max-w-[88%] rounded-xl rounded-tl-sm border px-4 py-3 text-sm leading-relaxed ${
                    message.kind === "streak"
                      ? "border-accent/30 bg-accent/10"
                      : "border-line bg-surface"
                  }`}
                >
                  <p
                    className={`mb-1.5 font-semibold ${
                      message.kind === "streak" ? "text-accent-ink" : "text-cream"
                    }`}
                  >
                    {message.kind === "streak" ? "🔥 " : null}
                    {message.title}
                  </p>

                  {message.rows ? (
                    <dl className="border-line mb-2 space-y-1 border-y py-2 font-medium">
                      {message.rows.map((row) => (
                        <div key={row.label} className="flex justify-between gap-6">
                          <dt className="text-muted font-normal">{row.label}</dt>
                          <dd
                            className={
                              row.tone === "accent"
                                ? "text-accent-ink"
                                : row.tone === "cream"
                                  ? "text-cream"
                                  : "text-soft"
                            }
                          >
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <p className="text-soft">{message.body}</p>
                  <span className="text-muted mt-1.5 block text-right text-[10px]">
                    {message.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-muted mx-auto mt-4 max-w-md text-center text-xs leading-relaxed">
            An illustrative example of how the room reads — not a live
            recommendation and not a trade call. Trading involves risk; results
            vary and are never guaranteed.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
