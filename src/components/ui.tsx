import Link from "next/link";
import type { ComponentProps, ReactNode, Ref } from "react";

export function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className} fill="none">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section scaffolding
   ───────────────────────────────────────────────────────────── */

/**
 * One band of the long home page. Every section shares the same gutters, the
 * same maximum measure and the same hairline separator, which is what stops a
 * page this long from reading like several pages stapled together.
 */
const TONES = {
  canvas: "",
  raised: "band-raised",
  deep: "band-deep",
} as const;

export function Section({
  id,
  className = "",
  bleed = false,
  tone = "canvas",
  children,
}: {
  id?: string;
  className?: string;
  /** Skips the inner width clamp — for full-bleed bands like the marquee. */
  bleed?: boolean;
  /** Alternating bands are what give a page this long a readable pulse. */
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`border-line relative scroll-mt-20 overflow-hidden border-b ${TONES[tone]} ${className}`}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          {children}
        </div>
      )}
    </section>
  );
}

/** The small uppercase accent label that opens every section. */
export function Eyebrow({
  index,
  className = "",
  children,
}: {
  /** Position in the page, e.g. "02". Editorial chrome — it makes a long
      scroll feel authored and tells the reader how far through they are. */
  index?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={`text-accent-ink mb-4 flex items-center gap-2.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase ${className}`}
    >
      {index ? (
        <>
          <span className="text-muted">{index}</span>
          <span aria-hidden className="bg-line h-px w-6" />
        </>
      ) : null}
      {children}
    </p>
  );
}

/**
 * A section heading. Wrap one word in <span className="text-accent-ink"> for the accent marker.
 *
 * `text-balance` rather than hand-placed <br /> tags: these headings sit in
 * half-width columns, so a break tuned for one viewport orphans a word at the
 * next one — an em-dash stranded on its own line, for instance.
 */
export function SectionTitle({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={`font-display text-[clamp(28px,5.6vw,38px)] leading-[1.06] font-semibold tracking-[-0.02em] text-balance md:text-[clamp(32px,2.9vw,44px)] ${className}`}
    >
      {children}
    </h2>
  );
}

/* ─────────────────────────────────────────────────────────────
   Buttons
   ───────────────────────────────────────────────────────────── */

const baseButton =
  "btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-[14.5px] font-semibold no-underline";

const variants = {
  solid: "bg-accent text-ink hover:bg-accent-deep",
  outline: "border border-line-strong text-cream hover:border-accent hover:text-accent-ink",
  /** For the accent-filled join band, where the accent itself is the ground. */
  invert: "bg-ink text-on-ink hover:opacity-90",
} as const;

type Variant = keyof typeof variants;

export function LinkButton({
  href,
  variant = "outline",
  className = "",
  full = true,
  onClick,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  /** Full width by default — the detail pages stack buttons in a narrow column. */
  full?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  const classes = `${baseButton} ${variants[variant]} ${full ? "w-full" : ""} ${className}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className = "",
  full = true,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; full?: boolean }) {
  return (
    <button
      className={`${baseButton} ${variants[variant]} ${full ? "w-full" : ""} cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Cards and rows
   ───────────────────────────────────────────────────────────── */

/** The raised panel every card on the site is cut from. */
export function Panel({
  className = "",
  lift = false,
  children,
}: {
  className?: string;
  /** Adds the hover-rise treatment — only for panels that are themselves links. */
  lift?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`border-line bg-surface shadow-panel rounded-2xl border ${lift ? "lift" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A card-style link row: numbered badge, title, hint, trailing arrow.
 * `emphasis` renders it as a filled accent card for the one primary action.
 */
export function CtaRow({
  href,
  index,
  title,
  hint,
  emphasis = false,
  className = "",
}: {
  href: string;
  index: string;
  title: ReactNode;
  hint: ReactNode;
  emphasis?: boolean;
  className?: string;
}) {
  const Tag = href.startsWith("http") ? "a" : Link;

  if (emphasis) {
    return (
      <Tag
        href={href}
        className={`group bg-accent text-ink flex items-center gap-4 rounded-2xl px-5 py-5 no-underline transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-6 ${className}`}
      >
        <span className="bg-ink/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-semibold">
          {index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-display block text-[17px] leading-snug font-semibold sm:text-[19px]">
            {title}
          </span>
          <span className="text-ink/70 mt-1 block text-[13px] leading-snug sm:text-[13.5px]">
            {hint}
          </span>
        </span>
        <span
          aria-hidden
          className="shrink-0 text-[18px] transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      href={href}
      className={`group border-line bg-surface hover:border-accent/40 flex items-center gap-4 rounded-2xl border px-5 py-4 no-underline transition-all hover:-translate-y-0.5 sm:px-6 sm:py-5 ${className}`}
    >
      <span className="bg-surface-2 text-muted group-hover:text-accent-ink flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-semibold transition-colors">
        {index}
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display text-cream group-hover:text-accent-ink block text-[16px] leading-snug font-semibold transition-colors sm:text-[17px]">
          {title}
        </span>
        <span className="text-muted mt-1 block text-[13px] leading-snug">{hint}</span>
      </span>
      <span
        aria-hidden
        className="text-muted group-hover:text-accent-ink shrink-0 text-[18px] transition-all group-hover:translate-x-1"
      >
        →
      </span>
    </Tag>
  );
}

/** A trust badge, pill-shaped — for the one claim worth certifying, not decoration. */
export function Stamp({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-accent/25 bg-accent/10 text-accent-ink inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-semibold whitespace-nowrap ${className}`}
    >
      <CheckIcon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </div>
  );
}

/** A partner highlight ribbon — the promo blocks on /trade and /scale. */
export function Highlight({
  headline,
  detail,
  caveat,
  className = "",
}: {
  headline: string;
  detail: string;
  caveat: string;
  className?: string;
}) {
  return (
    <div className={`border-accent/25 bg-accent/5 rounded-2xl border px-5 py-4 ${className}`}>
      <p className="text-accent-ink text-[15px] font-bold">{headline}</p>
      <p className="text-soft mt-1 text-[13.5px] leading-relaxed">{detail}</p>
      <p className="text-muted mt-2 text-[11.5px]">{caveat}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Document primitives — the detail pages and the join flow
   ───────────────────────────────────────────────────────────── */

/** A document section: an optional numbered badge + heading, spaced rather than ruled. */
export function Entry({
  index,
  title,
  titleRef,
  className = "",
  children,
}: {
  index?: string;
  title?: ReactNode;
  titleRef?: Ref<HTMLHeadingElement>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`py-6 ${className}`}>
      {title ? (
        <h2
          ref={titleRef}
          tabIndex={titleRef ? -1 : undefined}
          className="mb-4 flex items-center gap-2.5 outline-none"
        >
          {index ? (
            <span className="bg-accent/10 text-accent-ink flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold">
              {index}
            </span>
          ) : null}
          <span className="text-cream text-[15px] font-semibold">{title}</span>
        </h2>
      ) : null}
      {children}
    </section>
  );
}

/** A tick list — perks, inclusions, anything being enumerated. */
export function LedgerList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-col gap-1 ${className}`}>
      {items.map((item, i) => (
        <li
          key={item}
          style={{ transitionDelay: `${i * 70}ms` }}
          className="reveal-item hover:bg-surface-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14.5px] transition-colors"
        >
          <span
            aria-hidden
            className="bg-accent/10 text-accent-ink flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          >
            <CheckIcon />
          </span>
          <span className="text-soft">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps with circular badges. `start` continues an earlier list. */
export function Steps({
  start = 1,
  className = "",
  children,
}: {
  start?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <ol
      start={start}
      className={`flex list-none flex-col gap-1 ${className}`}
      style={{ counterReset: `s ${start - 1}` }}
    >
      {children}
    </ol>
  );
}

export function Step({
  index = 0,
  children,
}: {
  /** Position in its list — staggers the scroll reveal. */
  index?: number;
  children: ReactNode;
}) {
  return (
    <li
      style={{ transitionDelay: `${index * 90}ms` }}
      className="reveal-item text-soft flex gap-3 rounded-lg px-3 py-2.5 text-[14.5px] [counter-increment:s]"
    >
      <span
        aria-hidden
        className="bg-surface-2 text-muted before:content-[counter(s,decimal-leading-zero)] flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold"
      />
      <span className="flex-1 pt-0.5">{children}</span>
    </li>
  );
}
