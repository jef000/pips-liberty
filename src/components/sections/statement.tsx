import { MarkTile } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { pullQuote } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The page's one oversized typographic moment.
 *
 * This line used to sit in a sidebar next to the feature list, where it read
 * as a caption. It is the argument the whole community rests on, so it gets a
 * full band, the largest type on the page after the hero, and a pool of light
 * behind it. A long scroll needs somewhere to peak.
 */
export function Statement() {
  return (
    <section className="border-line relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="glow left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/3 opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center md:px-8 md:py-36">
        <Reveal>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-accent-ink mx-auto h-10 w-10 opacity-70"
          >
            <path d="M9.5 7H5a1 1 0 00-1 1v4a1 1 0 001 1h2.5v1.5A1.5 1.5 0 016 16H5.5v2H6a3.5 3.5 0 003.5-3.5V8a1 1 0 00-1-1zm10 0H15a1 1 0 00-1 1v4a1 1 0 001 1h2.5v1.5A1.5 1.5 0 0116 16h-.5v2h.5a3.5 3.5 0 003.5-3.5V8a1 1 0 00-1-1z" />
          </svg>

          <blockquote className="font-display statement mt-6 font-semibold">
            <p>
              {pullQuote.lead} <span className="text-accent-ink">{pullQuote.mark}</span>
            </p>
          </blockquote>

          <div className="text-muted mt-10 flex items-center justify-center gap-3 text-sm">
            <MarkTile className="h-8 w-8 rounded-full" />
            The {site.name} room
          </div>
        </Reveal>
      </div>
    </section>
  );
}
