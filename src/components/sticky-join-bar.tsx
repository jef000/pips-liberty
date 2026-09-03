"use client";

import { useEffect, useState } from "react";

import { useFunnel } from "@/components/funnel";
import { track } from "@/lib/analytics";

/**
 * Phone-only bottom bar that keeps the next join step one tap away on a page
 * this long. It appears once the join section has been revealed, and slides
 * out of the way while that section is itself on screen.
 */
export function StickyJoinBar() {
  const { revealed, unlocked, agreed, scrollToJoin } = useFunnel();
  const [joinInView, setJoinInView] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    const join = document.getElementById("join");
    if (!join) return;

    const observer = new IntersectionObserver(
      ([entry]) => setJoinInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(join);
    return () => observer.disconnect();
  }, [revealed]);

  if (!revealed) return null;

  const nextStep = !agreed
    ? "Step 1: confirm and open your account"
    : !unlocked
      ? "Step 1: open your PU Prime account"
      : "Step 2: join the community";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 sm:hidden ${
        joinInView ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          track("sticky_bar_click", null, {
            next_step: unlocked ? "join_community" : "create_account",
          });
          scrollToJoin();
        }}
        className="bg-accent text-ink border-ink/10 flex w-full items-center justify-center gap-2 border-t px-5 py-3.5 text-sm font-semibold"
        style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
      >
        {nextStep} ↓
      </button>
    </div>
  );
}
