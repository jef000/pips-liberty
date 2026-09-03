"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Scroll-reveal scheduler.
 *
 * This deliberately does not use IntersectionObserver. The pre-reveal state is
 * `opacity: 0`, so an element that never gets its trigger is not merely
 * un-animated — it is invisible. IntersectionObserver only queues a callback
 * when an element's intersection state *changes*, and a fast flick-scroll can
 * carry an element from below the viewport to above it between two animation
 * frames. The state reads "not intersecting" both times, no callback is ever
 * dispatched, and the content stays blank for the rest of the session.
 *
 * A position check cannot be skipped that way: however far the page jumped,
 * the element is either above the trigger line or it is not. One shared,
 * rAF-throttled scroll listener serves every element on the page, and it
 * unregisters itself once the last one has been revealed.
 */

type Pending = { node: HTMLElement; show: () => void };

const pending = new Set<Pending>();
let frame = 0;

/** Reveal anything whose top edge has crossed 92% of the viewport height. */
function check() {
  frame = 0;
  const limit = window.innerHeight * 0.92;

  for (const item of [...pending]) {
    if (item.node.getBoundingClientRect().top < limit) {
      pending.delete(item);
      item.show();
    }
  }

  if (pending.size === 0) stopListening();
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(check);
}

let listening = false;
let failsafe = 0;

/**
 * Last resort: reveal everything still waiting, wherever it is on the page.
 *
 * The scroll check above depends on scroll events actually being dispatched,
 * and some renderers never dispatch them — headless screenshot services and
 * "capture full page" tools commonly expand the viewport through the debug
 * protocol instead of scrolling, and print has no scrolling at all. Those
 * environments would otherwise photograph a page of blank sections. Losing the
 * animation for a visitor who has sat still this long costs nothing; shipping
 * invisible content costs everything.
 */
function flushAll() {
  for (const item of [...pending]) {
    pending.delete(item);
    item.show();
  }
  stopListening();
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("beforeprint", flushAll);
  failsafe = window.setTimeout(flushAll, 12000);
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  window.removeEventListener("beforeprint", flushAll);
  clearTimeout(failsafe);
}

function register(item: Pending) {
  pending.add(item);
  startListening();
  schedule();

  return () => {
    pending.delete(item);
    if (pending.size === 0) stopListening();
  };
}

/**
 * Reveals its children the first time they scroll into view, so sections
 * arrive as you read rather than all being present at once.
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

    const unregister = register({
      node,
      show: () => {
        timer = window.setTimeout(() => setShown(true), delayMs);
      },
    });

    return () => {
      unregister();
      clearTimeout(timer);
    };
  }, [delayMs]);

  return (
    <div ref={ref} data-shown={shown ? "" : undefined} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
