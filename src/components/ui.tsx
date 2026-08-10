import Link from "next/link";
import type { ComponentProps, ReactNode, Ref } from "react";

function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
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

const baseButton =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-center text-[14.5px] font-semibold no-underline transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  solid:
    "bg-green text-cream shadow-card hover:bg-green-deep hover:shadow-card-hover focus-visible:outline-green",
  outline:
    "border border-rule-strong text-ink hover:border-ink hover:bg-paper-raised focus-visible:outline-ink",
} as const;

type Variant = keyof typeof variants;

export function LinkButton({
  href,
  variant = "outline",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  const classes = `${baseButton} ${variants[variant]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={`${baseButton} ${variants[variant]} cursor-pointer disabled:cursor-wait disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * A card-style link row: numbered badge, title, hint, trailing arrow.
 * `emphasis` renders it as a filled accent card for the one primary action per page.
 */
export function CtaRow({
  href,
  index,
  title,
  hint,
  emphasis = false,
}: {
  href: string;
  index: string;
  title: ReactNode;
  hint: ReactNode;
  emphasis?: boolean;
}) {
  const Tag = href.startsWith("http") ? "a" : Link;

  if (emphasis) {
    return (
      <Tag
        href={href}
        className="group bg-green shadow-card hover:shadow-card-hover mb-3 flex items-center gap-4 rounded-2xl px-5 py-5 no-underline transition-all hover:-translate-y-0.5 sm:px-6 sm:py-6"
      >
        <span className="bg-white/15 text-cream flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-semibold">
          {index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-display block text-[17px] leading-snug font-semibold text-cream sm:text-[19px]">
            {title}
          </span>
          <span className="text-cream/80 mt-1 block text-[13px] leading-snug sm:text-[13.5px]">
            {hint}
          </span>
        </span>
        <span
          aria-hidden
          className="text-cream/80 shrink-0 text-[18px] transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      href={href}
      className="group border-rule shadow-card hover:shadow-card-hover hover:border-green/30 mb-3 flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 no-underline transition-all hover:-translate-y-0.5 sm:px-6 sm:py-5"
    >
      <span className="bg-paper-raised text-ink-soft group-hover:bg-green-soft group-hover:text-green flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-semibold transition-colors">
        {index}
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display group-hover:text-green block text-[16px] leading-snug font-semibold text-ink transition-colors sm:text-[17px]">
          {title}
        </span>
        <span className="text-ink-faint mt-1 block text-[13px] leading-snug">
          {hint}
        </span>
      </span>
      <span
        aria-hidden
        className="text-ink-faint group-hover:text-green shrink-0 text-[18px] transition-all group-hover:translate-x-1"
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
      className={`border-green/25 bg-green-soft text-green inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-semibold whitespace-nowrap ${className}`}
    >
      <CheckIcon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </div>
  );
}

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
            <span className="bg-green-soft text-green flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold">
              {index}
            </span>
          ) : null}
          <span className="text-ink text-[15px] font-semibold">{title}</span>
        </h2>
      ) : null}
      {children}
    </section>
  );
}

/** A tick list — perks, inclusions, anything being enumerated. */
export function LedgerList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item, i) => (
        <li
          key={item}
          style={{ transitionDelay: `${i * 70}ms` }}
          className="reveal hover:bg-paper-raised flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14.5px] transition-colors"
        >
          <span
            aria-hidden
            className="bg-green-soft text-green flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          >
            <CheckIcon />
          </span>
          <span className="text-ink">{item}</span>
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
      className="reveal flex gap-3 rounded-lg px-3 py-2.5 text-[14.5px] [counter-increment:s]"
    >
      <span
        aria-hidden
        className="bg-paper-raised text-ink-soft before:content-[counter(s,decimal-leading-zero)] flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold"
      />
      <span className="flex-1 pt-0.5">{children}</span>
    </li>
  );
}
