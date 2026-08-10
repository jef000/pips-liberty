"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Reveals its children the first time they scroll into view. Used down the
 * length of the join page so sections arrive as you read rather than all being
 * present at once.
 *
 * Nested `.reveal` elements inside are released by the same trigger (see
 * globals.css), so a list can stagger its own rows via transition-delay.
 *
 * Shows immediately when the OS asks for reduced motion.
 */
export function Reveal({
  delayMs = 0,
  className = "",
  children,
}: {
  delayMs?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timer = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setTimeout(() => setShown(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => setShown(true), delayMs);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delayMs]);

  return (
    <div ref={ref} data-shown={shown ? "" : undefined} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
