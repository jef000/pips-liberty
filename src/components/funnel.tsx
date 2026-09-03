"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import { initAnalytics, storageKeys, track, type RevealSource } from "@/lib/analytics";
import {
  getServerSnapshot,
  getSnapshot,
  persist,
  subscribe,
} from "@/lib/persisted-state";
import { video } from "@/lib/site";

/**
 * Shared state for the join funnel, so the nav, the walkthrough, the sticky
 * mobile bar and the join band all agree about where the visitor is without
 * prop-drilling through half the page.
 *
 * Three gates, in order:
 *
 *  1. `revealed` — the join band exists at all. Opened by watching enough of
 *     the walkthrough, finishing it, arriving from an ad, or having done any
 *     of those on a previous visit.
 *  2. `agreed` — the visitor has confirmed they are 18+ and accepted the
 *     terms. Until then step 1 is inert.
 *  3. `unlocked` — the broker link has been opened, which reveals the
 *     community link.
 *
 * None of this is security. It proves a click, not a signup; the real gate is
 * moderation of the community against the broker's own records. What it buys
 * is that nobody lands on a join link before they know what they are joining.
 */

type FunnelValue = {
  revealed: boolean;
  agreed: boolean;
  unlocked: boolean;
  /** True for the moment right after the community link opens, to fire its pulse. */
  justUnlocked: boolean;
  /** Shows the "join steps unlocked" pill under the video, mid-playback only. */
  showPill: boolean;
  onVideoProgress: () => void;
  onVideoEnded: () => void;
  setAgreed: (agreed: boolean) => void;
  onBrokerClick: () => void;
  onCommunityClick: () => void;
  scrollToJoin: () => void;
};

const FunnelContext = createContext<FunnelValue | null>(null);

export function useFunnel() {
  const value = useContext(FunnelContext);
  if (!value) throw new Error("useFunnel must be used inside <FunnelProvider>");
  return value;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Paid traffic already showed intent by clicking the ad, so it skips the
 * walkthrough gate. fbclid/gclid catch Meta and Google auto-tagging even when
 * the campaign forgot its UTMs.
 */
function isAdVisit() {
  const params = new URLSearchParams(window.location.search);
  return ["utm_source", "utm_medium", "utm_campaign", "fbclid", "gclid"].some(
    (key) => params.has(key),
  );
}

export function FunnelProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Transient, this-visit-only state. Never persisted, so it can be plain
  // useState driven entirely from event handlers.
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [showPill, setShowPill] = useState(false);

  // Only ever read inside analytics calls, so a ref rather than state — it
  // must not cause a render of its own.
  const sourceRef = useRef<RevealSource>("none");

  const revealed = !video.gated || stored.videoWatched;
  const agreed = stored.agreed;
  const unlocked = stored.brokerClicked;

  const reveal = useCallback(
    (source: RevealSource) => {
      if (revealed) return false;
      sourceRef.current = source;
      persist(storageKeys.videoWatched, "1");
      // Tagging every reveal with its source lets GA4 compare funnel drop-off
      // between ad traffic (gate skipped) and organic traffic (gate watched).
      track("cta_reveal", null, { reveal_source: source });
      return true;
    },
    [revealed],
  );

  useEffect(() => {
    initAnalytics();
    if (video.gated && isAdVisit()) reveal("ad_click");
    // Runs once on mount: a mid-session change of URL params isn't a thing here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A visitor who arrives already revealed got there on an earlier visit.
  useEffect(() => {
    if (revealed && sourceRef.current === "none") sourceRef.current = "returning";
  }, [revealed]);

  const scrollToJoin = useCallback(() => {
    document.getElementById("join")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
    });
  }, []);

  /** 60% watched: open the gate quietly and offer a pill rather than yanking the page. */
  const onVideoProgress = useCallback(() => {
    if (reveal("video_60")) setShowPill(true);
  }, [reveal]);

  /** Finished: open the gate if it wasn't already, then bring the join band into view. */
  const onVideoEnded = useCallback(() => {
    if (!reveal("video_end")) {
      scrollToJoin();
      return;
    }
    // Let the band finish expanding before scrolling to where it landed.
    setTimeout(scrollToJoin, 80);
  }, [reveal, scrollToJoin]);

  const setAgreed = useCallback((next: boolean) => {
    persist(storageKeys.agreed, next ? "1" : null);
    if (next) track("accept_terms", null, { reveal_source: sourceRef.current });
  }, []);

  const onBrokerClick = useCallback(() => {
    track("create_account", "Lead", {
      content_name: "PU Prime account signup",
      reveal_source: sourceRef.current,
    });
    if (!unlocked) setJustUnlocked(true);
    persist(storageKeys.brokerClicked, "1");
  }, [unlocked]);

  const onCommunityClick = useCallback(() => {
    track("join_community", "Lead", {
      content_name: "WhatsApp community join",
      reveal_source: sourceRef.current,
    });
  }, []);

  const value = useMemo<FunnelValue>(
    () => ({
      revealed,
      agreed,
      unlocked,
      justUnlocked,
      showPill,
      onVideoProgress,
      onVideoEnded,
      setAgreed,
      onBrokerClick,
      onCommunityClick,
      scrollToJoin,
    }),
    [
      revealed,
      agreed,
      unlocked,
      justUnlocked,
      showPill,
      onVideoProgress,
      onVideoEnded,
      setAgreed,
      onBrokerClick,
      onCommunityClick,
      scrollToJoin,
    ],
  );

  return <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>;
}
