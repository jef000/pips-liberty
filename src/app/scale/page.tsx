import type { Metadata } from "next";

import {
  Breadcrumbs,
  Disclosure,
  Headline,
  Masthead,
  delay,
} from "@/components/brand";
import { Entry, LinkButton, Step, Steps } from "@/components/ui";
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

export default function ScalePage() {
  return (
    <main className="w-full max-w-[560px] px-6 py-10 sm:px-8 sm:py-14 lg:max-w-[680px]">
      <Masthead asLink />
      <Breadcrumbs page="Trade Bigger" />
      <Headline className="mb-3 text-[clamp(28px,7.5vw,38px)] lg:text-[44px]" />
      <p
        data-enter
        style={delay(620)}
        className="text-ink-soft mb-5 text-[15px] sm:text-[16px]"
      >
        Trade bigger with a top prop firm — get funded and scale up.
      </p>

      <div
        data-enter
        style={delay(700)}
        className="border-green/20 bg-green-soft mb-8 rounded-xl border px-5 py-4"
      >
        <p className="text-green text-[15px] font-bold">
          {propFirmHighlight.headline}
        </p>
        <p className="text-ink-soft mt-1 text-[13.5px] leading-relaxed">
          {propFirmHighlight.detail}
        </p>
        <p className="text-ink-faint mt-2 text-[11px]">
          {propFirmHighlight.caveat}
        </p>
      </div>

      <div data-enter style={delay(800)}>
        <Entry title="How it works">
          <p className="text-ink-soft mb-4 text-[14.5px] leading-relaxed">
            Prop firms let you trade with their capital instead of only your
            own. Pass FTMO&apos;s evaluation with the same discipline you
            practice here, and scale up without adding more of your own risk.
          </p>
          <Steps>
            <Step index={0}>
              <b>Start a challenge</b> — tap below to begin with FTMO
            </Step>
            <Step index={1}>
              <b>Trade the evaluation</b> — the same discipline you&apos;re
              building in the community is exactly what gets you through it
            </Step>
            <Step index={2}>
              <b>Get funded</b> — pass, and trade a funded account
            </Step>
          </Steps>
        </Entry>

        <Disclosure className="mt-2 mb-6">{site.propFirmDisclosure}</Disclosure>

        <LinkButton href={links.propFirm} variant="solid">
          Start with FTMO →
        </LinkButton>
        <LinkButton href="/join" className="mt-3">
          Not ready yet? Join the free community →
        </LinkButton>
      </div>
    </main>
  );
}
