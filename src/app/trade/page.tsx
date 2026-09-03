import type { Metadata } from "next";

import { Disclosure } from "@/components/brand";
import { DetailClose, DetailPage, StepCards } from "@/components/detail";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Highlight, LinkButton, Section, SectionTitle } from "@/components/ui";
import { brokerPromo, links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open Your Account",
  description:
    "Open a live PU Prime account — the first step to getting verified into Pips & Liberty.",
  openGraph: {
    title: "Open Your Account — Pips & Liberty | Proof Over Hype",
    description:
      "Open a live PU Prime account — the first step to getting verified into Pips & Liberty.",
    url: "/pips-liberty/trade",
  },
};

const STEPS = [
  {
    title: "Open a live account",
    body: "Tap through to PU Prime and complete their signup. It costs nothing and takes about ten minutes.",
  },
  {
    title: "Fund it",
    body: "With whatever you can genuinely afford to lose. PU Prime currently matches your first deposit by 50%, up to $500.",
  },
  {
    title: "Get verified in",
    body: "Join the free community and we will match your account against our partner records, then unlock everything.",
  },
] as const;

export default function TradePage() {
  return (
    <DetailPage
      page="Open Your Account"
      eyebrow="Step one of two"
      title="Open a live account, and we can verify you in."
      lead="A live PU Prime account is free to open and takes about ten minutes. It is the only requirement for a verified place in the community, and the referral commission it pays us is the entire reason the community costs you nothing."
      aside={
        <Highlight
          headline={brokerPromo.headline}
          detail={brokerPromo.detail}
          caveat={brokerPromo.caveat}
        />
      }
    >
      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <Eyebrow index="01">How it works</Eyebrow>
          <SectionTitle>
            Three steps, and none of them cost{" "}
            <span className="text-accent-ink">anything</span>.
          </SectionTitle>
          <p className="text-muted mt-6 leading-relaxed">
            Discipline is only tested when real money is on the line. That is the
            whole reason a live account matters here — not the size of it.
          </p>
        </Reveal>

        <div className="mt-12">
          <StepCards steps={STEPS} />
        </div>

        <Reveal>
          <Disclosure className="mt-8 max-w-3xl" />
        </Reveal>
      </Section>

      <DetailClose title="Ready? Opening the account is the slowest part, and it is ten minutes.">
        <LinkButton href={links.broker} variant="solid">
          Open your PU Prime account →
        </LinkButton>
        <LinkButton href="/join">
          Already have an account? Join the community →
        </LinkButton>
      </DetailClose>
    </DetailPage>
  );
}
