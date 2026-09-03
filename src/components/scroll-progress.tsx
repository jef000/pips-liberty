"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline of accent across the top of the page showing how far through the
 * scroll you are. On a page this long it does real work: it tells a first-time
 * visitor the thing is finite.
 *
 * Written straight to a CSS custom property from a rAF-throttled listener, so
 * scrolling never triggers a React render.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      node.style.setProperty("--progress", String(Math.min(1, Math.max(0, ratio))));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="progress-bar bg-accent pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]"
    />
  );
}
