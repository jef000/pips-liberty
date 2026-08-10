/**
 * The site's mark: a "PL" monogram — Pips & Liberty's own initials, which
 * also happen to be the universal trading abbreviation for Profit & Loss.
 * One name, two readings, and the second one no competitor can license away.
 *
 * Colored in two parts on purpose: P (Pips — the daily grind, discipline,
 * the check-ins) in ink; L (Liberty — what the discipline buys you) in
 * green. Drawn as solid geometric slabs rather than thin letterforms so it
 * survives being shrunk to nav/favicon scale, where anything finer than
 * this turns into a smudge. See app/icon.svg for the badged favicon cut of
 * the same drawing.
 */
export function TallyMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 33 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3 3.5 H12.5 A6.6 6.6 0 0 1 12.5 16.7 H8.8 V28.5 H3 Z M8.8 8.2 V12 H11.9 A1.9 1.9 0 0 0 11.9 8.2 Z"
        fill="#0F172A"
        fillRule="evenodd"
      />
      <path d="M17 3.5 H23 V23.2 H31.5 V28.5 H17 Z" fill="#047857" />
    </svg>
  );
}
