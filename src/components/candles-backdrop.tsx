/**
 * The generated candlestick chart behind the hero — the site's one bespoke
 * signature, drawn rather than stock-photographed.
 *
 * The walk is produced by a seeded PRNG rather than Math.random on purpose.
 * This page is statically exported, so the server renders the SVG at build
 * time and the browser renders it again on hydration; an unseeded random walk
 * would produce two different charts and React would throw a hydration
 * mismatch. A fixed seed makes the two passes byte-identical, and still gives
 * a chart that looks hand-drawn rather than algorithmic.
 */

/** mulberry32 — small, fast, and identical in Node and the browser. */
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

const WIDTH = 1200;
const HEIGHT = 560;
const COUNT = 46;
const PADDING = 24;

function buildWalk() {
  const random = seededRandom(20260818);
  const step = (WIDTH - PADDING * 2) / COUNT;
  const candles: {
    x: number;
    top: number;
    bottom: number;
    high: number;
    low: number;
    color: string;
    width: number;
    delay: string;
  }[] = [];

  let price = HEIGHT * 0.66;
  let lastX = 0;
  let lastY = price;

  for (let i = 0; i < COUNT; i += 1) {
    const x = PADDING + step * i + step * 0.5;
    const open = price;
    // Slight upward drift, so the walk trends the way the copy promises.
    const close = Math.max(70, Math.min(HEIGHT - 70, open + (random() - 0.5) * 48 - 3.2));
    price = close;

    const top = Math.min(open, close);
    const bottom = Math.max(open, close);

    candles.push({
      x,
      top,
      bottom,
      high: top - (random() * 22 + 6),
      low: bottom + (random() * 22 + 6),
      // SVG y grows downward, so a lower close is an up candle.
      color: close < open ? "var(--color-accent)" : "var(--color-candle-down)",
      width: Math.max(4, step * 0.46),
      delay: (i * 0.02).toFixed(3),
    });

    lastX = x;
    lastY = close;
  }

  return { candles, lastX, lastY };
}

const { candles, lastX, lastY } = buildWalk();

export function CandlesBackdrop() {
  return (
    <div className="candles-bg" aria-hidden="true">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid slice">
        {candles.map((candle, i) => (
          <g key={i}>
            <line
              className="cndl"
              style={{ animationDelay: `${candle.delay}s` }}
              x1={candle.x}
              y1={candle.high}
              x2={candle.x}
              y2={candle.low}
              stroke={candle.color}
              strokeWidth="1.2"
            />
            <rect
              className="cndl"
              style={{ animationDelay: `${candle.delay}s` }}
              x={candle.x - candle.width / 2}
              y={candle.top}
              width={candle.width}
              height={Math.max(2, candle.bottom - candle.top)}
              rx="1"
              fill={candle.color}
            />
          </g>
        ))}
        <line
          x1="0"
          y1={lastY}
          x2={WIDTH}
          y2={lastY}
          stroke="var(--color-accent)"
          strokeWidth="1.3"
          strokeDasharray="7 7"
          opacity="0.45"
        />
        <circle className="price-dot" cx={lastX} cy={lastY} r="5.5" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}
