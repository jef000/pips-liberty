"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, Ref } from "react";

import { Disclosure } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { Button, Entry, LinkButton, Step, Steps } from "@/components/ui";
import {
  COMMUNITY_REDIRECT_SECONDS,
  GOOGLE_FORM_EMBED_HEIGHT,
  GOOGLE_FORM_URL,
  buildMailtoHref,
  buildReparentPreview,
  isReparentConfigured,
  links,
  reparent,
  site,
} from "@/lib/site";

/**
 * Which panel is on screen. Unlike the old form-driven flow, the trader picks
 * their own path with a button — a Google Form can't branch the page after
 * submitting, so the "which one are you?" question moved out of the form.
 */
type Stage = "start" | "community" | "broker" | "reparent";

const PATH_OPTIONS: { stage: Stage; label: string }[] = [
  { stage: "community", label: "I already have a live PU Prime account under Pips & Liberty" },
  { stage: "reparent", label: "I have one, but I'm not sure it's under Pips & Liberty" },
  { stage: "broker", label: "I don't have one yet" },
];

export function JoinFlow() {
  const [stage, setStage] = useState<Stage>("start");
  const [trader, setTrader] = useState({ name: "", email: "" });
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(COMMUNITY_REDIRECT_SECONDS);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus and scroll to the new panel so the change is announced.
  useEffect(() => {
    if (stage === "start") return;
    window.scrollTo({ top: 0 });
    headingRef.current?.focus();
  }, [stage]);

  // Tick the trader over to WhatsApp once they've confirmed they're ready.
  useEffect(() => {
    if (stage !== "community") return;

    const tick = setInterval(() => setCountdown((n) => n - 1), 1000);
    const jump = setTimeout(() => {
      window.location.href = links.community;
    }, COMMUNITY_REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(tick);
      clearTimeout(jump);
    };
  }, [stage]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(
        buildReparentPreview(trader.name, trader.email),
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (stage === "start") {
    return (
      <>
        <Reveal>
          <Entry index="01" title="How to join">
            <Steps>
              <Step index={0}>
                <b>Open a live PU Prime account and fund</b> — discipline is
                only tested when real money is on the line. Start from the{" "}
                <b>Open your account</b> step on the home page
              </Step>
              <Step index={1}>
                <b>Join our WhatsApp community</b> — tap the link below, no
                approval needed to get in
              </Step>
              <Step index={2}>
                <b>We verify your PU Prime account</b> — unlocks the full
                classroom, check-ins and Habit Calendar
              </Step>
            </Steps>
            <p className="text-amber bg-amber/10 mt-4 rounded-lg px-3.5 py-2.5 text-[13px] font-semibold">
              Priority for approval is given to traders with a live PU Prime
              account.
            </p>
            <Disclosure className="mt-4" />
          </Entry>
        </Reveal>

        <Reveal>
          <Entry index="02" title="Start here">
            <p className="text-soft mb-4 text-[14.5px]">
              Fill out the quick form below — takes about 20 seconds.
            </p>
            <GoogleFormEmbed />
          </Entry>
        </Reveal>

        <Reveal>
          <Entry index="03" title="Which one are you?">
            <div>
              {PATH_OPTIONS.map(({ stage: target, label }, i) => (
                <PathRow
                  key={target}
                  index={i}
                  label={label}
                  onClick={() => setStage(target)}
                />
              ))}
            </div>
          </Entry>
        </Reveal>
      </>
    );
  }

  if (stage === "community") {
    return (
      <Panel headingRef={headingRef} title="You're ready — one tap left">
        <BackButton onClick={() => setStage("start")} />
        <Steps>
          <Step index={0}>
            Tap the button below — it opens our WhatsApp community invite
          </Step>
          <Step index={1}>
            Tap <b>Join Chat</b> — you&apos;re in instantly, no approval needed
          </Step>
          <Step index={2}>
            We&apos;ll verify your PU Prime account from what you shared
            earlier — then the full classroom, check-ins and Habit Calendar
            unlock
          </Step>
        </Steps>
        <LinkButton href={links.community} variant="solid" className="mt-6">
          Open the community on WhatsApp →
        </LinkButton>
        <p
          className="text-muted mt-3 text-center font-mono text-[11.5px] tracking-[0.04em] uppercase"
          aria-live="polite"
        >
          {countdown > 0 ? `Redirecting in ${countdown}…` : "Redirecting…"}
        </p>
      </Panel>
    );
  }

  if (stage === "broker") {
    return (
      <Panel headingRef={headingRef} title="First step: open your live account">
        <BackButton onClick={() => setStage("start")} />
        <Steps>
          <Step index={0}>
            <b>Open a live PU Prime account and fund it</b> — about 10
            minutes
          </Step>
          <Step index={1}>
            Then join our WhatsApp community — priority approval once we
            verify your PU Prime account
          </Step>
        </Steps>
        <LinkButton href="/trade" variant="solid" className="mt-6">
          Open your PU Prime account →
        </LinkButton>
        <LinkButton href={links.community} className="mt-3">
          Account already funded? Go to the community →
        </LinkButton>
      </Panel>
    );
  }

  return (
    <Panel headingRef={headingRef} title="Let's move your account under Pips & Liberty">
      <BackButton onClick={() => setStage("start")} />

      {isReparentConfigured ? (
        <>
          <p className="text-soft mb-4 text-[14.5px]">
            No problem — if your account was opened under another partner,
            here&apos;s how to move it under Pips &amp; Liberty so we can
            approve you into the community. It&apos;s a quick, free fix, and
            takes about two minutes.
          </p>

          <Steps>
            <Step index={0}>
              <b>Log in to your PU Prime account</b> and raise a support ticket
              asking for your account to be moved to{" "}
              <b>{reparent.partnerName}</b>
            </Step>
            <Step index={1}>
              <b>Send the email below</b> to PU Prime support
              {reparent.cc ? " (cc the account manager)" : ""} — just copy,
              paste and send from your own email:
            </Step>
          </Steps>

          <Address label="To">{reparent.to}</Address>
          {reparent.cc ? <Address label="Cc">{reparent.cc}</Address> : null}

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Your first name (optional)" htmlFor="rp-name">
              <TextInput
                id="rp-name"
                type="text"
                autoComplete="given-name"
                value={trader.name}
                onChange={(e) =>
                  setTrader((t) => ({ ...t, name: e.target.value }))
                }
              />
            </Field>
            <Field label="Your email (optional)" htmlFor="rp-email">
              <TextInput
                id="rp-email"
                type="email"
                autoComplete="email"
                value={trader.email}
                onChange={(e) =>
                  setTrader((t) => ({ ...t, email: e.target.value }))
                }
              />
            </Field>
          </div>
          <p className="text-muted mt-2 text-[12.5px]">
            Fill these in to personalise the email below, or leave them blank
            and edit the placeholders yourself.
          </p>

          <textarea
            readOnly
            aria-label="Migration email to send to PU Prime support"
            value={buildReparentPreview(trader.name, trader.email)}
            className="bg-surface border-line-strong text-cream mt-4 min-h-[220px] w-full resize-y rounded-xl border p-4 font-mono text-[12.5px] leading-relaxed"
          />

          <LinkButton
            href={buildMailtoHref(trader.name, trader.email)}
            variant="solid"
            className="mt-6"
          >
            Open in your email app →
          </LinkButton>
          <Button
            type="button"
            variant="outline"
            onClick={copyEmail}
            className="mt-3"
          >
            Or copy the email →
          </Button>
          <p
            className="text-accent-ink mt-2 min-h-4 text-center text-[12.5px]"
            aria-live="polite"
          >
            {copied
              ? `Copied — now paste it into a new email to ${reparent.to}`
              : ""}
          </p>

          <Steps start={3} className="mt-4">
            <Step index={0}>
              <b>Then reply to the email once PU Prime confirms the move</b> —
              we approve you into the community straight away
            </Step>
          </Steps>
        </>
      ) : (
        <div className="border-line-strong text-soft bg-surface rounded-xl border border-dashed p-5 text-[14px] leading-relaxed">
          We&apos;re still setting up the account-move process for PU Prime —
          check back soon. In the meantime, go ahead and join the WhatsApp
          community; we&apos;ll sort out the account match by hand.
        </div>
      )}

      <LinkButton href={links.community} className="mt-5">
        Already confirmed under Pips &amp; Liberty? Go to the community →
      </LinkButton>
    </Panel>
  );
}

/** A single-panel view, spaced off like a fresh document section. */
function Panel({
  headingRef,
  title,
  children,
}: {
  headingRef: Ref<HTMLHeadingElement>;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-cream mb-5 text-[22px] leading-snug font-bold outline-none sm:text-[26px]"
      >
        {title}
      </h2>
      {/* Reveals on mount — also releases the nested .reveal steps inside. */}
      <Reveal>{children}</Reveal>
    </section>
  );
}

/** A selectable card row for the "which one are you?" self-routing question. */
function PathRow({
  label,
  index = 0,
  onClick,
}: {
  label: string;
  index?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ transitionDelay: `${index * 80}ms` }}
      className="reveal-item group border-line hover:border-accent/40 text-cream mb-2 flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border bg-surface px-4 py-3.5 text-left text-[14.5px] transition-all"
    >
      <span>{label}</span>
      <span
        aria-hidden
        className="text-muted group-hover:text-accent-ink shrink-0 text-[16px] transition-all group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}

/** The lead-capture form, or a setup notice if no real form link exists yet. */
function GoogleFormEmbed() {
  const isPlaceholder = GOOGLE_FORM_URL.includes("REPLACE_WITH_YOUR_FORM_ID");

  if (isPlaceholder) {
    return (
      <div className="border-line-strong text-muted bg-surface rounded-xl border border-dashed p-6 text-center text-[13px] leading-relaxed">
        Google Form not connected yet — paste its link into{" "}
        <code className="text-amber font-mono">GOOGLE_FORM_URL</code> in{" "}
        <code className="text-amber font-mono">src/lib/site.ts</code>.
      </div>
    );
  }

  return (
    <>
      <iframe
        src={`${GOOGLE_FORM_URL}?embedded=true`}
        title={`Join ${site.name}`}
        className="border-line w-full rounded-xl border bg-surface"
        style={{ height: GOOGLE_FORM_EMBED_HEIGHT }}
      >
        Loading…
      </iframe>
      <a
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noreferrer"
        className="text-muted hover:text-accent-ink mt-2 block text-center text-[12px] underline underline-offset-2"
      >
        Form not loading? Open it in a new tab →
      </a>
    </>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-muted hover:text-accent-ink mb-6 block cursor-pointer text-[13.5px] font-medium transition-colors"
    >
      ← Start over
    </button>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-soft mb-1.5 block text-[13px] font-medium"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput(props: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      className="border-line-strong text-cream hover:border-line-strong focus:border-accent focus:ring-accent/20 placeholder:text-muted w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[15px] outline-none transition-colors focus:ring-4"
    />
  );
}

function Address({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="bg-surface flex items-baseline justify-between gap-3 rounded-lg px-3.5 py-2.5 text-[13px]">
      <span className="text-muted text-[11px] font-semibold tracking-[0.05em] uppercase">
        {label}
      </span>
      <b className="text-cream truncate font-semibold">{children}</b>
    </p>
  );
}
