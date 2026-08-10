import type { Metadata } from "next";

import {
  Breadcrumbs,
  Disclosure,
  Headline,
  Masthead,
  delay,
} from "@/components/brand";
import { Entry, LinkButton, Step, Steps } from "@/components/ui";
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

export default function TradePage() {
  return (
    <main className="w-full max-w-[560px] px-6 py-10 sm:px-8 sm:py-14 lg:max-w-[680px]">
      <Masthead asLink />
      <Breadcrumbs page="Open Your Account" />
      <Headline className="mb-3 text-[clamp(28px,7.5vw,38px)] lg:text-[44px]" />
      <p
        data-enter
        style={delay(620)}
        className="text-ink-soft mb-5 text-[15px] sm:text-[16px]"
      >
        Open a live PU Prime account — required to get verified into the
        community.
      </p>

      <div
        data-enter
        style={delay(700)}
        className="border-green/20 bg-green-soft mb-8 rounded-xl border px-5 py-4"
      >
        <p className="text-green text-[15px] font-bold">
          {brokerPromo.headline}
        </p>
        <p className="text-ink-soft mt-1 text-[13.5px] leading-relaxed">
          {brokerPromo.detail}
        </p>
        <p className="text-ink-faint mt-2 text-[11px]">{brokerPromo.caveat}</p>
      </div>

      <div data-enter style={delay(800)}>
        <Entry title="Open your live account">
          <p className="text-ink-soft mb-4 text-[14.5px] leading-relaxed">
            Discipline is only tested when real money is on the line. A live
            PU Prime account is free to open, and it&apos;s how we verify you
            for the community.
          </p>
          <Steps>
            <Step index={0}>
              <b>Open a live account</b> — tap the button below and complete
              PU Prime&apos;s signup (about 10 minutes)
            </Step>
            <Step index={1}>
              <b>Fund it</b> — trade with real capital, since that&apos;s
              when discipline actually gets tested. PU Prime currently
              matches your first deposit by 50%, up to $500.
            </Step>
            <Step index={2}>
              <b>Join the community</b> — head to the free WhatsApp group and
              we&apos;ll verify your account
            </Step>
          </Steps>
        </Entry>

        <Disclosure className="mt-2 mb-6" />

        <LinkButton href={links.broker} variant="solid">
          Open your PU Prime account →
        </LinkButton>
        <LinkButton href="/join" className="mt-3">
          Already have an account? Join the community →
        </LinkButton>
      </div>
    </main>
  );
}
