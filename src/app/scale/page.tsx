import type { Metadata } from "next";

import { Disclosure } from "@/components/brand";
import { DetailClose, DetailPage, StepCards } from "@/components/detail";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Highlight, LinkButton, Section, SectionTitle } from "@/components/ui";
import { links, propFirmHighlight, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trade Bigger",
  description:
    "Trade bigger with a top prop firm — get funded and scale up without risking more of your own capital.",
  openGraph: {
    title: "Trade Bigger — Pips & Liberty | Proof Over Hype",
    description:
      "Trade bigger with a top prop firm — get funded and scale up without risking more of your own capital.",
    url: "/pips-liberty/scale",
  },
};

const STEPS = [
  {
    title: "Start a challenge",
    body: "Pick an account size that fits what you can actually afford to put at risk, not the largest one offered.",
  },
  {
    title: "Trade the evaluation",
    body: "The streak you have been building is the whole skill being examined — staying inside your own rules for weeks in a row.",
  },
  {
    title: "Get funded",
    body: "Pass, and trade a funded account with your entry fee refunded in full on the first payout.",
  },
] as const;

export default function ScalePage() {
  return (
    <DetailPage
      page="Trade Bigger"
      eyebrow="For traders with the habit already"
      title="Trade their capital instead of only your own."
      lead="A prop firm funds you against its own capital once you prove you can follow a plan — which is exactly what the daily check-in has been training. This is the step after the habit, not instead of it."
      aside={
        <Highlight
          headline={propFirmHighlight.headline}
          detail={propFirmHighlight.detail}
          caveat={propFirmHighlight.caveat}
        />
      }
    >
      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <Eyebrow index="01">How it works</Eyebrow>
          <SectionTitle>
            An evaluation is a test of{" "}
            <span className="text-accent-ink">discipline</span>, not cleverness.
          </SectionTitle>
          <p className="text-muted mt-6 leading-relaxed">
            Most people fail a challenge on the same day they abandon their own
            rules. That is the part the community drills every evening.
          </p>
        </Reveal>

        <div className="mt-12">
          <StepCards steps={STEPS} />
        </div>

        <Reveal>
          <Disclosure className="mt-8 max-w-3xl">{site.propFirmDisclosure}</Disclosure>
        </Reveal>
      </Section>

      <DetailClose title="Build the habit first. The size can come later.">
        <LinkButton href={links.propFirm} variant="solid">
          Start with FTMO →
        </LinkButton>
        <LinkButton href="/join">
          Not ready yet? Join the free community →
        </LinkButton>
      </DetailClose>
    </DetailPage>
  );
}
