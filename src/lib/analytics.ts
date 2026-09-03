/**
 * GA4 and the Meta Pixel — consent-gated, and inert until real IDs are set.
 *
 * Nothing loads unless BOTH are true: the visitor has explicitly accepted the
 * consent banner, and the ID in `site.ts` no longer looks like a placeholder.
 * Declining keeps every tracker off and the site fully usable.
 *
 * Ported from the QuantEdge concept's `analytics.js`, typed and given the
 * `pl_` storage prefix used across this build.
 */
import { analyticsIds, isConfiguredId } from "@/lib/site";

/** Where a visitor was standing when the join section opened up for them. */
export type RevealSource =
  | "none"
  | "ad_click"
  | "video_60"
  | "video_end"
  | "returning";

export const storageKeys = {
  consent: "pl_consent",
  videoWatched: "pl_video_watched",
  brokerClicked: "pl_broker_clicked",
  agreed: "pl_agreed",
} as const;

type Consent = "granted" | "denied" | null;

/** localStorage throws in private modes and sandboxed frames — never let it break a render. */
export function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* no storage available — the session simply won't be remembered */
  }
}

export function readConsent(): Consent {
  const value = readStored(storageKeys.consent);
  return value === "granted" || value === "denied" ? value : null;
}

export function setConsent(granted: boolean) {
  writeStored(storageKeys.consent, granted ? "granted" : "denied");
}

let initialized = false;

/** Loads the trackers. Safe to call repeatedly; only the first accepted call does work. */
export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  if (readConsent() !== "granted") return;
  initialized = true;

  const { ga4Id, metaPixelId } = analyticsIds;

  if (isConfiguredId(ga4Id)) {
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(tag);
    window.dataLayer = window.dataLayer || [];
    // gtag must forward `arguments` verbatim, so it can't be an arrow function.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ga4Id);
  }

  if (isConfiguredId(metaPixelId)) {
    loadMetaPixel();
    window.fbq?.("init", metaPixelId);
    window.fbq?.("track", "PageView");
  }
}

/** Meta's own snippet, transcribed. The queue lets events fire before the script lands. */
function loadMetaPixel() {
  if (window.fbq) return;

  // Anonymous on purpose: a named function expression would shadow `fbq`
  // inside its own body, and the inner references need the annotated const.
  const fbq: FbqFn = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as FbqFn;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = window._fbq || fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

/**
 * One helper for both platforms — a safe no-op until IDs are set and consent
 * is granted. `fbEvent` is null for events with no Meta equivalent worth firing.
 */
export function track(
  gaEvent: string,
  fbEvent: string | null,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", gaEvent, params ?? {});
  } catch {
    /* a blocked tracker must never break the funnel */
  }
  try {
    if (fbEvent) window.fbq?.("track", fbEvent, params ?? {});
  } catch {
    /* same */
  }
}

type FbqFn = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FbqFn;
    _fbq?: FbqFn;
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** The slice of the YouTube IFrame API the video gate actually touches. */
export interface YouTubePlayer {
  getDuration(): number;
  getCurrentTime(): number;
  destroy(): void;
}

export interface YouTubeApi {
  Player: new (host: HTMLElement, options: YouTubePlayerOptions) => YouTubePlayer;
  PlayerState: { PLAYING: number; ENDED: number };
}

export interface YouTubePlayerOptions {
  host?: string;
  videoId: string;
  playerVars?: Record<string, string | number>;
  events?: { onStateChange?: (event: { data: number }) => void };
}

/**
 * Loads the IFrame API once, on demand — never on page load, so a visitor who
 * never presses play never pays for it. Resolves immediately if it is already
 * in the document, and chains onto any existing ready callback rather than
 * clobbering it.
 */
export function loadYouTubeApi(): Promise<YouTubeApi> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
}
