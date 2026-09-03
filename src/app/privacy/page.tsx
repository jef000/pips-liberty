import type { Metadata } from "next";

import { LegalPage, Todo } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pips & Liberty handles information when you visit this site and join the community.",
  openGraph: { title: "Privacy Policy — Pips & Liberty", url: "/pips-liberty/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage page="Privacy" title="Privacy Policy">
      <div className="prose mt-10">
        <p>
          This Privacy Policy explains how <strong>{site.name}</strong> (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) handles information when you visit this website and choose to
          join our WhatsApp community. By using this site you agree to the practices
          described here.
        </p>

        <h2>Who we are</h2>
        <p>
          {site.name} is an online community of traders sharing educational content,
          daily check-ins and market context. We do not sell signals or trade calls. For
          any privacy question, contact us at <Todo>[your-email@example.com]</Todo>.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information you give us:</strong> if you fill in our join form we
            receive the answers you submit, which are collected through Google Forms. If
            you join the community you do so through WhatsApp, which may share your
            phone number and profile name with the group under its own terms.
          </li>
          <li>
            <strong>Information collected automatically:</strong> when you visit the
            site we and our analytics providers may collect your IP address, device and
            browser type, referring page, pages viewed, and interactions such as
            starting the walkthrough video.
          </li>
          <li>
            <strong>Information from partners:</strong> when you open a broker or prop
            firm account through our referral link, that partner may tell us a referral
            was completed so we can verify your place in the community.
          </li>
        </ul>

        <h2>Cookies and tracking</h2>
        <p>
          Analytics and advertising cookies load <strong>only after you accept</strong>{" "}
          the consent banner. Declining keeps them off and the site fully usable.
        </p>
        <ul>
          <li>
            <strong>Google Analytics (GA4)</strong> — usage and traffic measurement. You
            can opt out with the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
              Google Analytics Opt-out Add-on
            </a>
            .
          </li>
          <li>
            <strong>Meta Pixel</strong> — measures the performance of our ads and may be
            used for retargeting. Manage this in your{" "}
            <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noreferrer">
              Meta ad preferences
            </a>
            .
          </li>
          <li>
            <strong>YouTube</strong> — the walkthrough is served from
            youtube-nocookie.com and may still set cookies controlled by YouTube once
            you press play.
          </li>
        </ul>
        <p>
          You can also block or delete cookies in your browser settings, though parts of
          the site may then behave differently.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To operate, maintain and improve this website.</li>
          <li>To measure and improve our marketing and advertising.</li>
          <li>To run and moderate the community you choose to join.</li>
          <li>To verify that a member holds an account referred by us.</li>
        </ul>

        <h2>How information is shared</h2>
        <p>
          We do not sell your personal information. Information may be processed by the
          service providers named above (Google, Meta, WhatsApp) acting on our behalf or
          under their own terms. We may disclose information where required by law.
        </p>

        <h2>Data retention</h2>
        <p>
          We keep analytics data for as long as needed for the purposes above, in line
          with our providers&apos; retention settings. Community membership lasts until
          you leave the group or are removed.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct or
          delete your personal data, or to object to certain processing. To make a
          request, email <Todo>[your-email@example.com]</Todo>. You can leave the
          community at any time from within WhatsApp.
        </p>

        <h2>Children</h2>
        <p>
          This site and community are intended for adults aged 18 and over and are not
          directed at children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo;
          date above shows when it last changed.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email <Todo>[your-email@example.com]</Todo>.
        </p>
      </div>
    </LegalPage>
  );
}
