/**
 * The funnel's persisted flags, exposed as an external store.
 *
 * This page is statically exported, so localStorage cannot be read while
 * rendering — the server has no such thing, and the client would disagree with
 * the server-rendered HTML. Reading it in an effect and calling setState works
 * but costs a cascading render on every mount, which is exactly what
 * `useSyncExternalStore` exists to avoid: React renders `getServerSnapshot`
 * during hydration, then switches to the real value in one pass.
 *
 * Subscribing to the `storage` event is a free bonus — accept the cookie
 * banner or open your broker account in one tab and every other open tab
 * catches up immediately.
 */
import { readConsent, readStored, storageKeys, writeStored } from "@/lib/analytics";

export type PersistedFlags = {
  /** The visitor confirmed 18+ and accepted the terms. */
  agreed: boolean;
  /** The broker link has been opened, which unlocks the community link. */
  brokerClicked: boolean;
  /** Enough of the walkthrough was watched on this or an earlier visit. */
  videoWatched: boolean;
  consent: "granted" | "denied" | null;
};

/** What the server renders, and what the client hydrates against. */
const SERVER_SNAPSHOT: PersistedFlags = {
  agreed: false,
  brokerClicked: false,
  videoWatched: false,
  consent: null,
};

const listeners = new Set<() => void>();
let cached: PersistedFlags | null = null;

function readAll(): PersistedFlags {
  return {
    agreed: readStored(storageKeys.agreed) === "1",
    brokerClicked: readStored(storageKeys.brokerClicked) === "1",
    videoWatched: readStored(storageKeys.videoWatched) === "1",
    consent: readConsent(),
  };
}

function isSame(a: PersistedFlags, b: PersistedFlags) {
  return (
    a.agreed === b.agreed &&
    a.brokerClicked === b.brokerClicked &&
    a.videoWatched === b.videoWatched &&
    a.consent === b.consent
  );
}

/** Re-reads storage and notifies subscribers only when something actually moved. */
function refresh() {
  const next = readAll();
  if (cached && isSame(cached, next)) return;
  cached = next;
  for (const listener of listeners) listener();
}

/**
 * getSnapshot must return a stable reference between changes, or
 * useSyncExternalStore will re-render forever — hence the cache.
 */
export function getSnapshot(): PersistedFlags {
  if (!cached) cached = readAll();
  return cached;
}

export function getServerSnapshot(): PersistedFlags {
  return SERVER_SNAPSHOT;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  // One window listener for all subscribers: `refresh` is a stable reference,
  // so registering it per subscriber would dedupe to a single registration and
  // the first unsubscribe would then deafen everyone else.
  if (listeners.size === 1) window.addEventListener("storage", refresh);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", refresh);
  };
}

/** Writes a flag and pushes the change straight to every subscriber. */
export function persist(key: string, value: string | null) {
  writeStored(key, value);
  refresh();
}
