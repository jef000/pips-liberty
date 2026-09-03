"use client";

import { useEffect, useState } from "react";

/**
 * Which of the given section ids is currently being read.
 *
 * Position-based and rAF-throttled rather than IntersectionObserver, for the
 * same reason the scroll reveal is: observers only fire on state changes, so a
 * fast scroll can jump clean over a section and leave the nav pointing at the
 * wrong one until you scroll back.
 *
 * The active section is the last one whose top edge has passed the nav.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // A little below the sticky nav, so a section counts as "current" only
      // once it is genuinely occupying the screen rather than peeking in.
      const line = window.innerHeight * 0.35;
      let current: string | null = null;

      for (const id of ids) {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) current = id;
      }

      setActive((previous) => (previous === current ? previous : current));
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
  }, [ids]);

  return active;
}
