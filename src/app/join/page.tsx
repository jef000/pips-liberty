import type { Metadata } from "next";

import { DetailPage } from "@/components/detail";
import { JoinFlow } from "@/components/join-flow";
import { CheckIcon, Panel, Section, Stamp } from "@/components/ui";
import { insideFree } from "@/lib/content";

export const metadata: Metadata = {
  title: "See What's Inside",
  description:
    "See what's inside Pips & Liberty and how to get verified — the classroom, daily check-ins, and the streak leaderboard.",
  openGraph: {
    title: "See What's Inside — Pips & Liberty | Proof Over Hype",
    description:
      "See what's inside Pips & Liberty and how to get verified — the classroom, daily check-ins, and the streak leaderboard.",
    url: "/pips-liberty/join",
  },
};

export default function JoinPage() {
  return (
    <DetailPage
      page="See What's Inside"
      eyebrow="The whole room, free"
      title="Built on one habit: showing up."
      lead="Here is everything inside, how to get verified, and the exact route to take depending on where your trading account already sits."
      aside={
        <Panel className="p-7">
          <p className="font-display text-[19px] font-semibold">
            Included from day one
          </p>
          <ul className="mt-5 space-y-3.5 text-sm">
            {insideFree.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="bg-accent/10 text-accent-ink mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                >
                  <CheckIcon />
                </span>
                <span className="text-soft">{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-line mt-6 border-t pt-5">
            <Stamp>No signals sold</Stamp>
          </div>
        </Panel>
      }
    >
      <Section tone="raised">
        <JoinFlow />
      </Section>
    </DetailPage>
  );
}
