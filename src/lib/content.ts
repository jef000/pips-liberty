/**
 * Long-form copy for the home page, kept out of the markup so the whole
 * narrative can be read and edited in one place.
 *
 * A note on substance. The visual language here is carried over from the
 * QuantEdge concept — the marquee, the chat mock, the pull quote. The content
 * is not. QuantEdge sold "live signals with entry, target and stop"; this
 * brand's own risk warning states plainly that we don't sell signals or trade
 * calls. Shipping both would make the site contradict itself on the one claim
 * it is built on, so every section below describes what actually exists:
 * check-ins, streaks, the classroom, and market context.
 */

/** Icon key — drawn in `components/sections/inside.tsx`. Keeps this file JSX-free. */
export type FeatureIcon = "pulse" | "mind" | "people" | "clock";

export const features: {
  title: string;
  body: string;
  icon: FeatureIcon;
}[] = [
  {
    title: "A daily check-in, not a highlight reel",
    body: "You post the day's work — win, loss or flat. The streak counts showing up, not being right.",
    icon: "pulse",
  },
  {
    title: "The trading-psychology classroom",
    body: "The part most traders skip: risk, tilt, patience, position sizing. Taught properly, not preached.",
    icon: "mind",
  },
  {
    title: "Live classes twice a week",
    body: "Tuesday and Thursday, 8pm EAT. Come with questions, leave with something you can actually run.",
    icon: "clock",
  },
  {
    title: "A leaderboard for consistency",
    body: "Saturday's board ranks streaks, not returns — the only number we think is worth publishing.",
    icon: "people",
  },
];

/**
 * The statement band's line, split so the component can put the accent marker
 * on the closing phrase without parsing prose.
 */
export const pullQuote = {
  lead: "Nobody blows an account in a single day. They blow it over a hundred small days of",
  /** Carries the full stop, so it sits inside the marker rather than floating off it. */
  mark: "not showing up.",
} as const;

/** Scrolling band under the hero. Short, declarative, no claims to verify. */
export const marqueePhrases = [
  "Show up daily",
  "Proof over hype",
  "Streaks, not screenshots",
  "No signals sold",
  "Risk first",
  "One habit",
] as const;

/**
 * The WhatsApp mock. An illustrative recreation of how a day in the community
 * reads — deliberately a check-in thread rather than a trade call, because a
 * trade call is exactly what this room does not do.
 */
export const roomThread: {
  time: string;
  kind: "context" | "checkin" | "streak";
  title: string;
  body: string;
  rows?: { label: string; value: string; tone?: "accent" | "cream" }[];
}[] = [
  {
    time: "07:58",
    kind: "context",
    title: "Morning context",
    body: "DXY soft into the London open, gold still inside yesterday's range. Watch how you react to the first push — that is today's lesson, not the level itself.",
  },
  {
    time: "19:41",
    kind: "checkin",
    title: "End-of-day check-in — Day 34",
    body: "Took the loss exactly where I said I would. Did not add to it, did not revenge it.",
    rows: [
      { label: "Setups taken", value: "1" },
      { label: "Followed the plan", value: "Yes", tone: "accent" },
      { label: "Risk used", value: "0.5%" },
      { label: "Result", value: "-0.4R", tone: "cream" },
    ],
  },
  {
    time: "19:43",
    kind: "streak",
    title: "Streak 34 logged",
    body: "A red day that follows the plan still counts. Saturday's board is updated.",
  },
];

/** The three points standing next to the chat mock. */
export const roomPoints = [
  "Every check-in shows the plan, not just the profit and loss.",
  "A losing day counts the same as a winning one — the streak is for showing up.",
  "No entries, no targets, no calls. That is not what this room is.",
] as const;

/** What the value card in the hero lists. Mirrors the perks on /join. */
export const insideFree = [
  "The full trading-psychology classroom",
  "Daily end-of-day check-in — this is what builds the streak",
  "Live classes Tuesday & Thursday, 8pm EAT",
  "The Saturday streak leaderboard",
  "Free habit calendar & trading journal",
] as const;

/**
 * PLACEHOLDER CONTENT — replace every quote and name below with real member
 * testimonials before running ads, and keep the claims modest: no profit
 * promises, no numbers anyone would have to take on faith.
 *
 * `testimonialsArePlaceholder` drives a visible notice on the section, so a
 * forgotten placeholder cannot quietly ship as though it were a real
 * endorsement. Set it to false once the quotes below are real.
 */
export const testimonialsArePlaceholder = true;

export const testimonials = [
  {
    initials: "DK",
    quote:
      "I used to trade in bursts — three good weeks, then nothing for a month. Logging a check-in every single evening is the first thing that ever made it stick.",
    name: "[Member name]",
    since: "Joined the community",
  },
  {
    initials: "PS",
    quote:
      "The room is honest. People post the red days too, not just the green ones. Being around that every day made me far more patient with my own.",
    name: "[Member name]",
    since: "Joined the community",
  },
  {
    initials: "MT",
    quote:
      "Nobody here is selling me a signal. The classes are about risk and my own head, which turned out to be the part that was actually broken.",
    name: "[Member name]",
    since: "Joined the community",
  },
] as const;

/**
 * FAQ. Plain strings, not JSX — the same array feeds both the accordion and
 * the FAQPage structured data, so the rich result can never drift from what
 * the page actually says.
 */
export const faqs = [
  {
    q: "Is it really free to join?",
    a: "Yes. There is no paywall and nothing to buy from us. The community is funded by a referral commission the broker pays us when you open an account through our link — it costs you nothing extra, and we disclose it on every page where it applies.",
  },
  {
    q: "Do you sell signals or trade calls?",
    a: "No, and we never have. What you get instead is a trading-psychology classroom, a daily end-of-day check-in that builds your streak, live classes twice a week, and market context before sessions open. Any trade you place is still entirely your own decision.",
  },
  {
    q: "Why do I need a PU Prime account?",
    a: "It is how we verify that someone is actually trading rather than only watching, and it is what keeps the community free. Opening a live account takes about ten minutes and costs nothing. Priority for approval goes to traders with a live account under Pips & Liberty.",
  },
  {
    q: "What if my account is already under another partner?",
    a: "That is fixable and free. The join page has a step-by-step tool that writes the migration email for you — fill in your name and email, send it to broker support, and reply to us once they confirm the move.",
  },
  {
    q: "Do I need experience to start?",
    a: "No. New and experienced traders are both welcome. The classroom starts at risk and position sizing rather than assuming you already know them, and the daily check-in works the same whether it is your first month or your fifth year.",
  },
  {
    q: "What exactly is the streak?",
    a: "One check-in per trading day: what you took, whether you followed your plan, how much you risked, and how it went. Post it and your streak grows. A losing day counts exactly the same as a winning one — the streak measures showing up, not being right.",
  },
  {
    q: "Is any of this financial advice?",
    a: "No. Everything shared is for education and discussion only. Trading carries a real risk of loss, results vary, and nothing here is guaranteed. If you need advice for your own circumstances, speak to someone licensed to give it.",
  },
] as const;

/**
 * The daily ritual, spelled out. This is the actual product, so the home page
 * shows it rather than describing it in the abstract.
 */
export const ritual = [
  {
    step: "01",
    title: "Trade your plan",
    body: "One setup or none at all. The classroom gives you the risk framework; the plan is yours to write and yours to follow.",
  },
  {
    step: "02",
    title: "Post the check-in",
    body: "Before you close the laptop: what you took, whether you followed the plan, what you risked, how it went. Sixty seconds.",
  },
  {
    step: "03",
    title: "Watch the streak grow",
    body: "Green day or red day, the streak counts the same. Saturday it goes on the board next to everyone else who showed up.",
  },
] as const;

/**
 * The three routes off the home page. Each one is a full page of its own; the
 * home page carries enough of each that a visitor can choose without leaving.
 */
export const paths = [
  {
    index: "01",
    href: "/trade",
    title: "Get your account funded",
    hint: "Open a live PU Prime account — that is what gets you verified in.",
    detail:
      "Free to open, about ten minutes, and the only thing standing between you and a verified place in the community.",
    cta: "How the account works",
    emphasis: true,
  },
  {
    index: "02",
    href: "/join",
    title: "See what is inside",
    hint: "The classroom, the check-ins, the leaderboard — the whole room.",
    detail:
      "Already have an account, or not sure which partner it sits under? The join page routes you to the right next step either way.",
    cta: "Open the join flow",
    emphasis: false,
  },
  {
    index: "03",
    href: "/scale",
    title: "Trade bigger",
    hint: "Pass an FTMO challenge and trade their capital instead of only yours.",
    detail:
      "For traders who already have the habit and want size. The same discipline the streak builds is exactly what gets you through an evaluation.",
    cta: "See the prop-firm route",
    emphasis: false,
  },
] as const;

/** Who this is and is not for. Saying the second half out loud saves everyone time. */
export const fitFor = [
  "You have blown accounts on tilt more than once and know it was you, not the strategy.",
  "You can trade a live account, however small, and want the habit to outlast the excitement.",
  "You would rather be told your risk is too big than be told you are doing great.",
] as const;

export const fitNotFor = [
  "You want someone to send you entries to copy.",
  "You are looking for a guaranteed return or a way to get rich by Friday.",
  "You want to trade a demo forever and never put anything real at stake.",
] as const;

/**
 * What the walkthrough actually covers. No timestamps or running time here —
 * those would have to be checked against the real cut of the video, and a
 * wrong number on the page is worse than no number.
 */
export const walkthroughPoints = [
  {
    title: "How the classroom runs",
    body: "What the first week covers, and how the twice-weekly live classes are structured.",
  },
  {
    title: "A real check-in, posted",
    body: "What one actually looks like in the room, and exactly how the streak is counted.",
  },
  {
    title: "What happens after you join",
    body: "Verification, what unlocks once it clears, and what is expected of you day to day.",
  },
] as const;

/** The closing line under the fit columns. */
export const fitClosing =
  "If the second column sounds like you, we would genuinely rather you did not join. It saves you money and saves us both a conversation.";
