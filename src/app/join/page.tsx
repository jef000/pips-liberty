import type { Metadata } from "next";

import { Breadcrumbs, Headline, Masthead, delay } from "@/components/brand";
import { JoinFlow } from "@/components/join-flow";

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
    <main className="w-full max-w-[560px] px-6 py-10 sm:px-8 sm:py-14 lg:max-w-[680px]">
      <Masthead asLink />
      <Breadcrumbs page="See What's Inside" />
      <Headline className="mb-3 text-[clamp(28px,7.5vw,38px)] lg:text-[44px]" />
      <p
        data-enter
        style={delay(620)}
        className="text-ink-soft mb-2 text-[15px] sm:text-[16px]"
      >
        Built on one habit: showing up. Streaks, not screenshots.
      </p>

      <div data-enter style={delay(720)}>
        <JoinFlow />
      </div>
    </main>
  );
}
