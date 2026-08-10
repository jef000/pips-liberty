"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a stat like "12.4k" or "3.2M" up from zero, preserving whatever
 * suffix and decimal precision the source string uses. Non-numeric values
 * ("Daily") are rendered as-is.
 *
 * Runs once, when the element first scrolls into view.
 */
export function CountUp({
  value,
  durationMs = 1100,
  delayMs = 0,
}: {
  value: string;
  durationMs?: number;
  delayMs?: number;
}) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match?.[1].includes(".")
    ? match[1].split(".")[1].length
    : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    target === null ? value : `${(0).toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (target === null) return;

    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let timer = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        // easeOutExpo — fast out of the gate, settles gently on the real number.
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        if (reduced) {
          setDisplay(value);
          return;
        }
        timer = window.setTimeout(run, delayMs);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [target, suffix, decimals, durationMs, delayMs, value]);

  // Reserve the final width so the row doesn't reflow while counting.
  return (
    <span ref={ref} className="relative inline-grid">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span className="col-start-1 row-start-1 tabular-nums">{display}</span>
    </span>
  );
}
