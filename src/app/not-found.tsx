import { LinkButton } from "@/components/ui";

/**
 * The 404. Statically exported as 404.html, which is the file GitHub Pages
 * serves for any unknown path.
 *
 * No metadata export here: a not-found page should never be indexed, and it
 * inherits the site title from the layout, which is enough for a tab label.
 */
export default function NotFound() {
  return (
    <main className="relative flex w-full flex-1 items-center overflow-hidden">
      <div aria-hidden="true" className="hero-aura" />
      <div aria-hidden="true" className="hero-grid" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
        <p className="text-accent-ink font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          Error 404
        </p>

        <h1 className="font-display mt-5 text-[clamp(34px,8vw,62px)] leading-[0.98] font-semibold tracking-[-0.03em] uppercase">
          This page never
          <br />
          showed <span className="text-accent-ink">up</span>.
        </h1>

        <p className="text-soft mx-auto mt-6 max-w-md text-[16px] leading-relaxed">
          Which, given what we do here, is a little embarrassing. The link is
          broken or the page has moved — everything else is still where you left
          it.
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <LinkButton href="/" variant="solid" full={false}>
            Back to the home page →
          </LinkButton>
          <LinkButton href="/join" full={false}>
            See what is inside →
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
