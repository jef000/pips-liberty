import type { Metadata } from "next";
import Link from "next/link";

import { Callout, LegalPage, Todo } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description:
    "The terms governing use of the Pips & Liberty site and community, and the risk disclaimer that applies to everything on it.",
  openGraph: { title: "Terms & Disclaimer — Pips & Liberty", url: "/pips-liberty/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage page="Terms" title={<>Terms &amp; Disclaimer</>}>
      <Callout>
        <strong>Risk warning.</strong> Trading financial markets carries a high level of
        risk and can result in the loss of some or all of your capital. Nothing on this
        site or in the {site.name} community is financial, investment or tax advice.
        Past performance is not a reliable indicator of future results. Only trade with
        money you can afford to lose.
      </Callout>

      <div className="prose mt-10">
        <p>
          These Terms govern your use of this website and the {site.name} community
          (&ldquo;the room&rdquo;). By using the site or joining the room, you agree to
          these Terms. If you do not agree, please do not use them.
        </p>

        <h2>1. Educational purpose only</h2>
        <p>
          {site.name} shares educational content, market context, classroom sessions and
          a daily check-in routine for{" "}
          <strong>educational and informational purposes only</strong>. We are not a
          licensed broker, financial adviser or investment manager, and nothing we share
          is a personal recommendation or a solicitation to buy or sell any instrument.
        </p>

        <h2>2. We do not sell signals</h2>
        <p>
          We do not sell, publish or distribute trade signals, entries, targets or stop
          levels, and we never charge for access to the community. Anything another
          member shares is their own opinion and not ours. Any trade you place is your
          own decision and your own responsibility.
        </p>

        <h2>3. No guarantees</h2>
        <p>
          Opinions and analysis shared in the room may be wrong. We make no guarantee of
          profit, accuracy, or any particular outcome, and streaks or leaderboard
          positions measure participation rather than performance.
        </p>

        <h2>4. Your responsibility</h2>
        <ul>
          <li>You are solely responsible for your own trading decisions and risk management.</li>
          <li>
            You should do your own research and, where appropriate, consult a licensed
            professional before trading.
          </li>
          <li>
            You confirm you are at least 18 years old and legally permitted to trade in
            your jurisdiction.
          </li>
        </ul>

        <h2>5. Community conduct</h2>
        <p>
          The room is a shared space. You agree not to spam, post unsolicited
          promotions, sell signals to other members, harass anyone, or share others&apos;
          content without permission. We may remove any member at any time to keep the
          room useful and respectful.
        </p>

        <h2>6. Joining the room, and how we are funded</h2>
        <p>
          Membership is free of charge. To be verified you must hold a live trading
          account opened with our partner broker through the referral link on this site.
          We may receive a commission from that broker, and from any prop firm you join
          through our link, at no extra cost to you. This is disclosed wherever those
          links appear, and it is the only way the community is funded. We may change
          what is offered, or how, at any time.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          The {site.name} name, branding and the content we publish on this site are our
          property and may not be copied or redistributed without permission.
        </p>

        <h2>8. Third-party services</h2>
        <p>
          This site and community rely on third parties including WhatsApp, YouTube,
          Google, Meta and our partner broker and prop firm. Your use of those services
          is also governed by their own terms and privacy policies. See our{" "}
          <Link href="/privacy">Privacy Policy</Link> for how data is handled.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {site.name} and its operators are not
          liable for any trading losses or other damages arising from your use of this
          site or the room. You use them at your own risk.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These Terms are governed by the laws of <Todo>[your jurisdiction]</Todo>, and
          any disputes will be subject to its courts.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may update these Terms from time to time. The &ldquo;last updated&rdquo;
          date above shows when they last changed.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these Terms? Email <Todo>[your-email@example.com]</Todo>.
        </p>
      </div>
    </LegalPage>
  );
}
