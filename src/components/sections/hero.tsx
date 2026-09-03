import { CandlesBackdrop } from "@/components/candles-backdrop";
import { Headline, delay } from "@/components/brand";
import { CheckIcon, Panel, Stamp } from "@/components/ui";
import { insideFree } from "@/lib/content";
import { site, stats } from "@/lib/site";

/**
 * The hero. Two jobs and no more: say what this is in one line, and give the
 * visitor somewhere to go. The value card on the right answers the only
 * question anyone actually has on arrival — what do I get, and what does it
 * cost me — before they have to scroll for it.
 */
export function Hero() {
  return (
    <header id="top" className="border-line relative overflow-hidden border-b">
      {/* Three stacked layers of depth, cheapest first: two radial blooms,
          a masked technical grid, then the generated candle walk. */}
      <div className="hero-aura" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="parallax-drift absolute inset-0">
        <CandlesBackdrop />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-20 lg:min-h-[92vh] lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p
            data-enter
            style={delay(60)}
            className="text-accent-ink mb-6 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            {site.eyebrow}
          </p>

          <Headline />

          <p
            data-enter
            style={delay(760)}
            className="text-soft mt-8 max-w-lg text-[17px] leading-relaxed md:text-[18px]"
          >
            {site.tagline}
          </p>

          <div
            data-enter
            style={delay(840)}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#walkthrough"
              className="btn bg-accent text-ink inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the walkthrough
            </a>
            <a
              href="#ritual"
              className="text-muted hover:text-cream inline-block py-2 transition-colors"
            >
              See how the streak works ↓
            </a>
          </div>

          <dl
            data-enter
            style={delay(920)}
            className="border-line mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-8"
          >
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dd className="font-display text-accent-ink text-[26px] font-semibold md:text-[30px]">
                  {value}
                </dd>
                <dt className="text-muted mt-1 text-[11px] leading-snug tracking-[0.04em] uppercase">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div data-enter style={delay(700)} className="lg:col-span-5">
          <Panel lift className="relative overflow-hidden p-7 md:p-8">
            <span className="bg-accent text-ink absolute top-0 right-0 rounded-bl-xl px-3 py-1 text-[11px] font-bold tracking-wide">
              FREE TO JOIN
            </span>
            <p className="font-display text-[24px] font-semibold">
              Everything is in the room.
            </p>
            <p className="text-muted mt-1.5 mb-7 text-sm">
              No paywall, no upsell, nothing to download beyond WhatsApp.
            </p>

            <ul className="space-y-4 text-sm">
              {insideFree.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="bg-accent/10 text-accent-ink mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  >
                    <CheckIcon />
                  </span>
                  <span className="text-soft">{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-line mt-7 flex flex-wrap items-center gap-3 border-t pt-6">
              <Stamp>No signals sold</Stamp>
              <p className="text-muted text-[13px]">New and experienced both welcome.</p>
            </div>
          </Panel>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="scroll-cue absolute bottom-0 left-1/2 hidden h-16 w-px -translate-x-1/2 overflow-hidden lg:block"
      >
        <span />
      </div>
    </header>
  );
}
