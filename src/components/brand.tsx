import Link from "next/link";
import type { ReactNode } from "react";

import { MarkTile } from "@/components/mark";
import { isConfiguredLink, site, social } from "@/lib/site";

/** Inline style carrying an entrance delay, for the `--enter-delay` custom prop. */
export function delay(ms: number) {
  return { "--enter-delay": `${ms}ms` } as React.CSSProperties;
}

/** The mark and wordmark lockup, used in the nav and the footer. */
export function Wordmark({
  className = "",
  tileClassName = "h-7 w-7",
}: {
  className?: string;
  tileClassName?: string;
}) {
  return (
    <span className={`flex shrink-0 items-center gap-2.5 ${className}`}>
      <MarkTile className={tileClassName} />
      <span className="font-display text-cream text-[17px] font-semibold tracking-[-0.01em] whitespace-nowrap">
        {site.name}
      </span>
    </span>
  );
}

/**
 * The home hero headline, revealed a line at a time. Each line sits in its own
 * overflow track so it wipes up from behind its baseline, and the last word
 * carries the accent marker — the one promise the whole page is built on.
 */
export function Headline({ className = "" }: { className?: string }) {
  return (
    <h1
      className={`font-display text-[clamp(34px,8.2vw,52px)] leading-[0.94] font-semibold tracking-[-0.03em] uppercase lg:text-[clamp(44px,4.6vw,66px)] ${className}`}
    >
      {/*
        Three deliberate lines, not two. Each .line is an overflow track that
        assumes the text inside it fits on one line — a wrap would be clipped
        mid-animation — so the break points are set here rather than left to
        the browser, and the sizes above keep every line inside the hero's
        left column at each breakpoint. It also lets the payoff word own the
        final line, which is the whole point of the headline.
      */}
      <span className="line">
        <span>{site.headline.lead}</span>
      </span>
      <span className="line">
        <span>{site.headline.goldLead}</span>
      </span>
      <span className="line">
        <span>
          {/* Full stop inside the marker: left outside, it floats away
              from the block and reads as a stray dot. */}
          <span className="text-accent-ink">{site.headline.gold}.</span>
        </span>
      </span>
    </h1>
  );
}

/** The h1 for the detail pages, which carry their own title rather than the brand line. */
export function PageTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-display text-[clamp(30px,7.5vw,40px)] leading-[1.04] font-semibold tracking-[-0.02em] lg:text-[46px] ${className}`}
    >
      {children}
    </h1>
  );
}

/**
 * A "Home / Current page" breadcrumb. Every page in the app sits one level
 * under Home, so it never needs to express more than these two crumbs.
 */
export function Breadcrumbs({ page }: { page: string }) {
  return (
    <nav aria-label="Breadcrumb" data-enter style={delay(120)} className="mb-6">
      <ol className="text-muted flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.06em] uppercase">
        <li>
          <Link href="/" className="hover:text-accent-ink transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="text-cream">
          {page}
        </li>
      </ol>
    </nav>
  );
}

const SOCIAL_LINKS = (
  [
    { href: social.tiktok, label: "TikTok" },
    { href: social.telegram, label: "Telegram" },
    { href: social.facebook, label: "Facebook" },
  ] as const
).filter((item) => isConfiguredLink(item.href));

/** The footer's follow row. Renders nothing until at least one profile is configured. */
export function SocialLinks({ className = "" }: { className?: string }) {
  if (SOCIAL_LINKS.length === 0) return null;

  return (
    <nav
      aria-label="Follow"
      className={`text-muted divide-line flex items-center divide-x font-mono text-[10.5px] font-semibold tracking-[0.1em] uppercase ${className}`}
    >
      {SOCIAL_LINKS.map(({ href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent-ink px-3 transition-colors first:pl-0 last:pr-0"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

/** The partner-commission disclosure. Shown wherever we ask for money to move. */
export function Disclosure({
  className = "",
  children,
}: {
  className?: string;
  /** Overrides the default PU Prime disclosure — e.g. the FTMO one on /scale. */
  children?: ReactNode;
}) {
  return (
    <p
      className={`text-muted border-line bg-surface rounded-xl border px-4 py-3 text-[12.5px] leading-relaxed ${className}`}
    >
      {children ?? site.disclosure}
    </p>
  );
}
