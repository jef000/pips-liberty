"use client";

import Link from "next/link";

import { useFunnel } from "@/components/funnel";
import { links, site } from "@/lib/site";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.06 24l1.68-6.13A11.9 11.9 0 1124 12 11.94 11.94 0 0112 24a11.9 11.9 0 01-5.7-1.45zM6.6 20.13l.36.22a9.9 9.9 0 005.05 1.38A9.95 9.95 0 102.05 12a9.86 9.86 0 001.52 5.26l.24.38-1 3.65zM17.5 14.3c-.27-.14-1.6-.79-1.85-.88s-.43-.14-.61.14-.7.88-.86 1.06-.32.21-.59.07a8.13 8.13 0 01-2.39-1.47 9 9 0 01-1.65-2.06c-.17-.3 0-.46.13-.6s.27-.32.4-.48a1.83 1.83 0 00.27-.45.5.5 0 000-.48c-.07-.14-.61-1.47-.84-2s-.44-.46-.61-.46h-.52a1 1 0 00-.72.34A3 3 0 005.5 8.5c0 1.77 1.29 3.49 1.47 3.73s2.54 3.88 6.16 5.44a20.6 20.6 0 002.06.76 4.94 4.94 0 002.27.14 3.7 3.7 0 002.43-1.71 3 3 0 00.21-1.71c-.09-.16-.27-.25-.55-.39z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

const stepButton =
  "btn bg-ink text-on-ink mt-3 inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-semibold sm:w-auto sm:px-8";

/**
 * The join band — the one place on the page where money and identity move,
 * so it gets the accent ground to itself and nothing else competes with it.
 *
 * Two ordered steps. Step 1 stays inert until the visitor confirms they are
 * 18+ and accepts the terms; step 2 unlocks once the broker link has been
 * opened. That unlock proves a click and nothing more — the real check is
 * moderation of the community against the broker's own records.
 */
export function JoinBand() {
  const {
    revealed,
    agreed,
    unlocked,
    justUnlocked,
    setAgreed,
    onBrokerClick,
    onCommunityClick,
  } = useFunnel();

  const communityReady = unlocked && agreed;

  return (
    <section
      id="join"
      aria-hidden={revealed ? undefined : true}
      className={`on-accent bg-accent text-ink ${revealed ? "gate-shown" : "gate-hidden"}`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-ink/60 mb-4 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
            You have seen how it works
          </p>
          <h2 className="font-display text-[clamp(40px,10vw,64px)] leading-[0.95] font-semibold tracking-[-0.03em] uppercase md:text-[clamp(52px,6vw,76px)]">
            Step into
            <br />
            the room.
          </h2>
          <p className="text-ink/70 mt-6 max-w-md leading-relaxed">
            Two steps. Open a live account with our partner broker so we can
            verify you, then join the community and post your first check-in
            tonight. Everything after that is free, for as long as you keep
            showing up.
          </p>

          <dl className="border-ink/15 mt-10 grid max-w-lg grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-ink/60 text-[11px] tracking-[0.06em] uppercase">
                Cost to join
              </dt>
              <dd className="font-display mt-1 text-[22px] font-semibold">Nothing</dd>
            </div>
            <div>
              <dt className="text-ink/60 text-[11px] tracking-[0.06em] uppercase">
                Time to set up
              </dt>
              <dd className="font-display mt-1 text-[22px] font-semibold">~10 minutes</dd>
            </div>
            <div>
              <dt className="text-ink/60 text-[11px] tracking-[0.06em] uppercase">
                First check-in
              </dt>
              <dd className="font-display mt-1 text-[22px] font-semibold">Tonight</dd>
            </div>
          </dl>
        </div>

        <div className="lg:border-ink/15 lg:col-span-5 lg:border-l lg:pl-10">
          <p className="text-ink/60 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
            Step 1
          </p>

          <label className="mt-3 flex cursor-pointer items-start gap-3 select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="accent-ink mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded"
            />
            <span className="text-ink/80 text-sm leading-relaxed">
              I confirm I am <strong className="text-ink font-semibold">18 or older</strong>{" "}
              and I have read and agree to the{" "}
              <Link href="/terms" className="hover:text-ink font-medium underline">
                Terms &amp; Disclaimer
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="hover:text-ink font-medium underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <a
            href={agreed ? links.broker : undefined}
            target="_blank"
            rel="noreferrer"
            onClick={agreed ? onBrokerClick : (event) => event.preventDefault()}
            aria-disabled={agreed ? undefined : true}
            tabIndex={agreed ? undefined : -1}
            aria-describedby="broker-hint"
            className={`${stepButton} ${agreed ? "" : "pointer-events-none opacity-40"}`}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="8" r="4" />
              <path d="M2 21a7 7 0 0114 0" />
              <path d="M19 8v6" />
              <path d="M16 11h6" />
            </svg>
            Open your PU Prime account
          </a>
          <p id="broker-hint" className="text-ink/70 mt-3 text-sm">
            {agreed
              ? "Free to open and it takes a few minutes. Using our link is how we verify you belong to this community."
              : "Tick the confirmation above to get started."}
          </p>

          <p className="text-ink/60 mt-9 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
            Step 2
          </p>
          <a
            href={communityReady ? links.community : undefined}
            target="_blank"
            rel="noreferrer"
            onClick={communityReady ? onCommunityClick : (event) => event.preventDefault()}
            aria-disabled={communityReady ? undefined : true}
            tabIndex={communityReady ? undefined : -1}
            aria-describedby="community-hint"
            className={`${stepButton} ${communityReady ? "" : "pointer-events-none opacity-40"} ${
              justUnlocked && communityReady ? "unlock-pulse" : ""
            }`}
          >
            {communityReady ? <WhatsAppIcon /> : <LockIcon />}
            Join the community
          </a>
          <p id="community-hint" className="text-ink/70 mt-3 text-sm">
            {communityReady
              ? "Account open? Tap to join, then introduce yourself when you arrive."
              : agreed
                ? "Open your account first — this unlocks the moment you do."
                : "Complete step 1 to unlock the join link."}
          </p>

          <p className="border-ink/15 text-ink/70 mt-8 border-t pt-5 text-xs leading-relaxed">
            {site.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}
