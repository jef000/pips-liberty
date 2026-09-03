import { marqueePhrases } from "@/lib/content";

/**
 * The scrolling accent band under the hero. Two identical halves, because the
 * animation slides exactly -50%; each half repeats the phrase set twice so no
 * gap ever shows on a wide screen. Pauses on hover so it can be read.
 */
export function MarqueeBand() {
  const half = [...marqueePhrases, ...marqueePhrases];

  return (
    <div
      aria-hidden="true"
      className="bg-accent text-ink border-ink/10 overflow-hidden border-b py-3"
    >
      <div className="marquee font-display text-lg font-semibold uppercase">
        {[0, 1].map((halfIndex) =>
          half.map((phrase, i) => (
            <span key={`${halfIndex}-${i}`}>
              <span className="mx-6">{phrase}</span>
              <span className="mx-2">●</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
