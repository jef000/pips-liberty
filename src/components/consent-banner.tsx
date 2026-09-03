"use client";

import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui";
import { initAnalytics, storageKeys } from "@/lib/analytics";
import {
  getServerSnapshot,
  getSnapshot,
  persist,
  subscribe,
} from "@/lib/persisted-state";

/**
 * Cookie consent. GA4 and the Meta Pixel load only after an explicit Accept;
 * declining keeps every tracker off and the site entirely usable.
 *
 * The stored choice is read through the shared external store rather than in
 * an effect, so the server-rendered markup and the hydrated client agree, and
 * so answering the banner in one tab dismisses it in all the others.
 */
export function ConsentBanner() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (stored.consent !== null) return null;

  const decide = (granted: boolean) => {
    persist(storageKeys.consent, granted ? "granted" : "denied");
    if (granted) initAnalytics();
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="border-line bg-surface shadow-lift fixed inset-x-4 bottom-4 z-[60] rounded-2xl border p-5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <p className="text-soft text-[13.5px] leading-relaxed">
        We use cookies to understand site traffic and measure our advertising
        (Google Analytics, Meta Pixel). Read the{" "}
        <a href="/privacy" className="text-accent-ink underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <Button variant="solid" onClick={() => decide(true)} className="px-4 py-2 text-sm">
          Accept
        </Button>
        <Button variant="outline" onClick={() => decide(false)} className="px-4 py-2 text-sm">
          Decline
        </Button>
      </div>
    </div>
  );
}
