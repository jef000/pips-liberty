import Link from "next/link";
import type { ReactNode } from "react";

import { TallyMark } from "@/components/mark";
import { isConfiguredLink, site, social } from "@/lib/site";

/** Inline style carrying an entrance delay, for the `--enter-delay` custom prop. */
export function delay(ms: number) {
  return { "--enter-delay": `${ms}ms` } as React.CSSProperties;
}

/** A clean nav-bar nameplate: the mark, a wordmark, and a single hairline. */
export function Masthead({ asLink = false }: { asLink?: boolean }) {
  const mark = (
    <span className="flex items-center gap-2">
      <TallyMark className="h-[18px] w-[18px]" />
      <span className="text-ink text-[15px] font-semibold tracking-[-0.01em]">
        {site.name}
      </span>
    </span>
  );

  return (
    <div className="mb-10 sm:mb-12">
      <div
        data-enter
        style={delay(60)}
        className="flex items-center justify-between gap-4"
      >
        {asLink ? (
          <Link href="/" className="hover:text-green transition-colors">
            {mark}
          </Link>
        ) : (
          mark
        )}
        <span className="text-ink-faint font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
          Proof over hype
        </span>
      </div>
      <div data-enter="rule" style={delay(200)} className="border-rule mt-5 border-t" />
    </div>
  );
}

/**
 * A "Home / Current page" breadcrumb. Every page in the app sits one level
 * under Home, so it never needs to express more than these two crumbs.
 */
export function Breadcrumbs({ page }: { page: string }) {
  return (
    <nav aria-label="Breadcrumb" data-enter style={delay(260)} className="mb-6">
      <ol className="text-ink-faint flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.04em] uppercase">
        <li>
          <Link href="/" className="hover:text-green transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="text-ink">
          {page}
        </li>
      </ol>
    </nav>
  );
}

/**
 * The headline, revealed one line at a time. Each line sits in an
 * overflow-hidden track so it wipes up from behind its own baseline.
 */
export function Headline({
  className = "",
  startDelay = 380,
}: {
  className?: string;
  startDelay?: number;
}) {
  return (
    <h1
      className={`font-display leading-[1.05] font-bold tracking-[-0.02em] ${className}`}
    >
      <span className="block overflow-hidden pb-[0.06em]">
        <span data-enter="mask" style={delay(startDelay)} className="block">
          {site.headline.lead}
        </span>
      </span>
      <span className="text-green block overflow-hidden pb-[0.06em]">
        <span data-enter="mask" style={delay(startDelay + 110)} className="block">
          {site.headline.gold}
        </span>
      </span>
    </h1>
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
export function SocialLinks() {
  if (SOCIAL_LINKS.length === 0) return null;

  return (
    <nav
      aria-label="Follow"
      className="text-ink-faint divide-rule mb-4 flex items-center justify-center divide-x font-mono text-[10.5px] font-semibold tracking-[0.1em] uppercase"
    >
      {SOCIAL_LINKS.map(({ href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:text-green px-3 transition-colors first:pl-0 last:pr-0"
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
      className={`text-ink-faint bg-paper-raised rounded-lg px-4 py-3 text-[12.5px] leading-relaxed ${className}`}
    >
      {children ?? site.disclosure}
    </p>
  );
}
