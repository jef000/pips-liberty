import Link from "next/link";

import { SocialLinks, Wordmark } from "@/components/brand";
import { LinkButton } from "@/components/ui";
import { site } from "@/lib/site";

const GROUPS = [
  {
    heading: "Start",
    links: [
      { href: "/trade", label: "Open an account" },
      { href: "/join", label: "Join the community" },
      { href: "/scale", label: "Trade bigger" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { href: "/#inside", label: "Inside the community" },
      { href: "/#room", label: "The room" },
      { href: "/#walkthrough", label: "Walkthrough" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Disclaimer" },
    ],
  },
] as const;

/**
 * The closing moment, not a sitemap dump. After a page this long the footer is
 * the last thing anyone reads, so it repeats the offer once, then gets out of
 * the way with the legal text it is obliged to carry.
 */
export function SiteFooter() {
  return (
    <footer className="border-line relative mt-auto w-full overflow-hidden border-t">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="border-line flex flex-col gap-8 border-b pb-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-display max-w-xl text-[clamp(26px,4vw,40px)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance">
            Start the streak <span className="text-accent-ink">tonight</span>.
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <LinkButton href="/trade" variant="solid" full={false}>
              Open your account →
            </LinkButton>
            <LinkButton href="/join" full={false}>
              See what is inside →
            </LinkButton>
          </div>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark />
            <p className="text-muted mt-4 max-w-xs text-[13px] leading-relaxed">
              {site.tagline}
            </p>
            <SocialLinks className="mt-5" />
          </div>

          {GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <p className="text-muted font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase">
                {group.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-soft hover:text-accent-ink text-[14px] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-line border-t">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
          <p className="text-muted max-w-4xl text-[12.5px] leading-relaxed">
            {site.riskWarning}
          </p>
          <p className="text-muted/70 mt-3 text-[12px]">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
