/**
 * The streak, drawn.
 *
 * A habit grid in the shape everyone already understands from contribution
 * graphs: one square per day, seven days to a column. It is the single most
 * direct way to show what this community actually sells — the left of the
 * grid is patchy, the right is a solid unbroken run, which is the whole
 * before-and-after of building the habit in one picture.
 *
 * Seeded rather than random, for the same reason the candlestick backdrop is:
 * the page is statically exported, so the build and the browser must draw
 * exactly the same grid or React reports a hydration mismatch.
 */

const WEEKS = 18;
const DAYS = 7;
const TOTAL = WEEKS * DAYS;
/** Length of the unbroken run at the end — matches the illustrative "Day 34". */
const STREAK = 34;

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 0 = missed, 1-3 = logged, with 3 reserved for the unbroken run. */
function buildLevels() {
  const random = seededRandom(734129);

  return Array.from({ length: TOTAL }, (_, i) => {
    if (i >= TOTAL - STREAK) return 3;
    // Consistency ramps up across the earlier weeks rather than starting well.
    const progress = i / (TOTAL - STREAK);
    const roll = random();
    if (roll > 0.82 - progress * 0.45) return 0;
    return roll > 0.5 ? 2 : 1;
  });
}

const LEVELS = buildLevels();

const LEVEL_CLASS = [
  "bg-surface-2",
  "bg-accent/25",
  "bg-accent/55",
  "bg-accent",
] as const;

export function StreakGrid({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div
        role="img"
        aria-label={`An illustrative habit grid: ${STREAK} unbroken days of check-ins following a patchier start.`}
        className="grid grid-flow-col gap-[3px]"
        style={{
          gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
        }}
      >
        {LEVELS.map((level, i) => (
          <span
            key={i}
            aria-hidden
            className={`streak-cell aspect-square rounded-[2px] ${LEVEL_CLASS[level]}`}
            // Column-major stagger, so the habit accumulates left to right.
            style={{ animationDelay: `${((i % DAYS) * WEEKS + Math.floor(i / DAYS)) * 6}ms` }}
          />
        ))}
      </div>

      <div className="text-muted mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] uppercase">
        <span>18 weeks</span>
        <span className="flex items-center gap-1.5">
          Missed
          {LEVEL_CLASS.map((cls) => (
            <span key={cls} className={`h-2.5 w-2.5 rounded-[2px] ${cls}`} aria-hidden />
          ))}
          Logged
        </span>
      </div>
    </div>
  );
}
