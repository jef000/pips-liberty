/**
 * Every outbound link, address and piece of partner copy lives here so the
 * numbers and URLs can be updated without touching any page markup.
 */

export const site = {
  name: "Pips & Liberty",
  brand: "Pips & Liberty · Proof Over Hype",
  headline: {
    lead: "Master your pips.",
    gold: "Then claim your liberty.",
  },
  tagline:
    "A free trading community built on one habit: showing up. We track your streak, not your screenshots.",
  disclosure:
    "How we're funded: PU Prime pays us a small referral commission when you trade through this link — it costs you nothing extra, and it's the only reason this community stays free.",
  propFirmDisclosure:
    "How we're funded: FTMO may pay us a referral commission if you sign up through this link — you pay nothing extra either way.",
  riskWarning:
    "Trading carries real risk of loss. Nothing on this site is financial advice, and we don't sell signals or trade calls. Any partner relationship is disclosed in full, every time.",
} as const;

export const links = {
  broker: "https://puvip.co/mie2Ij",
  community: "https://chat.whatsapp.com/DbaoJHrCb7g0QEcBPhVkhj",
  propFirm: "https://trader.ftmo.com/?affiliates=JYXCdiqyzZgaEdoinSSl",
} as const;

/**
 * PU Prime's current deposit-bonus promotion, shown on /trade to make the
 * broker signup more compelling. Cross-checked against a third-party broker
 * review site (2026-08) since puprime.com itself blocks automated fetches —
 * PU Prime sets these terms and can change them, so re-verify at
 * puprime.com/promotions before relying on this for long.
 */
export const brokerPromo = {
  headline: "50% bonus on your first deposit",
  detail:
    "Up to $500 bonus credit on your first deposit, plus 20% (up to $9,500) on your second — PU Prime matches up to $10,000 combined.",
  caveat: "Terms and conditions apply — confirm eligibility when you sign up.",
} as const;

/**
 * FTMO highlight ribbon, shown on /scale. Numbers pulled directly from
 * ftmo.com's live pricing widget and stats section (2026-08) — the €89 entry
 * price is the cheapest 2-Step Challenge tier ($10,000 account); $200,000 is
 * the largest account size offered; 90% and the fee refund are the terms
 * shown for every tier. Prices change; re-verify at ftmo.com before relying
 * on this for long.
 */
export const propFirmHighlight = {
  headline: "Challenges start from €89",
  detail:
    "Choose an account size that fits your financial capacity — from $10,000 up to $200,000 in funded capital. Keep up to 90% of what you earn, with your fee refunded in full on your first payout.",
  caveat: "Prices and terms are set by FTMO — see ftmo.com for full details.",
} as const;

/**
 * Social profiles for the footer follow row. Placeholders until the real
 * profile URLs are filled in — `isConfiguredLink` gates each one so a
 * forgotten placeholder never ships as a live "REPLACE_WITH_..." link.
 */
export const social = {
  tiktok: "REPLACE_WITH_TIKTOK_URL",
  telegram: "REPLACE_WITH_TELEGRAM_URL",
  facebook: "REPLACE_WITH_FACEBOOK_URL",
} as const;

export function isConfiguredLink(url: string) {
  return !url.startsWith("REPLACE_WITH_");
}

/**
 * Non-numeric trust markers shown on the homepage. Deliberately not follower
 * counts or view counts — nothing here is a number worth claiming until it's
 * ours to claim.
 */
export const stats = [
  { value: "Free", label: "No paywall, ever" },
  { value: "Real", label: "Verified accounts only" },
  { value: "Daily", label: "Check-ins, not chart flexing" },
] as const;

/**
 * The public link to the lead-capture Google Form, e.g.
 * "https://docs.google.com/forms/d/e/1FAIpQLS.../viewform" — copy it from the
 * form editor's Send button (the link icon), not the edit URL.
 *
 * Left as a placeholder until a real form exists; the join page detects the
 * placeholder and shows a setup notice instead of embedding a broken form.
 */
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScKcBr4xxczTPUWDoEiEgouDIGloqawxNOmC_ThjxrnGKCAEQ/viewform";

/**
 * Height of the embedded form in pixels. Google Forms iframes don't auto-size,
 * so once the real form is in, load it standalone and adjust this to match —
 * short forms (name, email, experience) usually sit around 900-1100px.
 */
export const GOOGLE_FORM_EMBED_HEIGHT = 1300;

/** Seconds shown before the "ready to join" state forwards to the WhatsApp community. */
export const COMMUNITY_REDIRECT_SECONDS = 4;

/**
 * The account-migration flow (moving a trader's broker account under Collins)
 * was written for Valetax's specific process — a support ticket plus this
 * email, sent to Valetax's address, naming Valetax's partner code. None of
 * that has a known PU Prime equivalent yet, so every broker-specific detail
 * below is a placeholder. `isReparentConfigured` is false until they're filled
 * in, and the join flow shows a "coming soon" notice instead of guessing.
 *
 * To wire it up, replace:
 *  - `to` / `cc` — PU Prime's support address (and account-manager cc, if any)
 *  - `partnerName` — the partner/IB code PU Prime accounts get migrated to
 *  - `partnerEmail` — Collins's email registered with PU Prime as that partner
 */
export const reparent = {
  to: "REPLACE_WITH_PUPRIME_SUPPORT_EMAIL",
  cc: "",
  partnerName: "REPLACE_WITH_PUPRIME_PARTNER_CODE",
  partnerEmail: "REPLACE_WITH_COLLINS_EMAIL",
} as const;

export const isReparentConfigured =
  !reparent.to.startsWith("REPLACE_WITH_") &&
  !reparent.partnerName.startsWith("REPLACE_WITH_") &&
  !reparent.partnerEmail.startsWith("REPLACE_WITH_");

const REPARENT_SUBJECT = `Request to migrate my account to ${reparent.partnerName}`;

/** The ready-to-send migration email, personalised with what the trader typed. */
export function buildReparentBody(name: string, email: string): string {
  return [
    "Hello PU Prime support,",
    "",
    `I wish to request for my account to be migrated to ${reparent.partnerName} (${reparent.partnerEmail}).`,
    "",
    "I'm currently accessing their trading community whereby I am receiving constant trading support, trading signals and daily check-ins.",
    "",
    "This will be highly regarded.",
    "",
    name || "[Your name]",
    email || "[your email]",
  ].join("\n");
}

export function buildReparentPreview(name: string, email: string): string {
  const lines = [`To: ${reparent.to}`];
  if (reparent.cc) lines.push(`Cc: ${reparent.cc}`);
  lines.push(`Subject: ${REPARENT_SUBJECT}`, "", buildReparentBody(name, email));
  return lines.join("\n");
}

export function buildMailtoHref(name: string, email: string): string {
  // encodeURIComponent, not URLSearchParams — mail clients render the `+` that
  // form-encoding produces as a literal plus sign instead of a space.
  const params = [
    reparent.cc && `cc=${encodeURIComponent(reparent.cc)}`,
    `subject=${encodeURIComponent(REPARENT_SUBJECT)}`,
    `body=${encodeURIComponent(buildReparentBody(name, email))}`,
  ].filter(Boolean);
  return `mailto:${reparent.to}?${params.join("&")}`;
}
