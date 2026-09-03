import { Faq } from "@/components/sections/faq";
import { Fit } from "@/components/sections/fit";
import { Hero } from "@/components/sections/hero";
import { InsideCommunity } from "@/components/sections/inside";
import { JoinBand } from "@/components/sections/join";
import { MarqueeBand } from "@/components/sections/marquee";
import { Paths } from "@/components/sections/paths";
import { Ritual } from "@/components/sections/ritual";
import { RoomPreview } from "@/components/sections/room-preview";
import { Statement } from "@/components/sections/statement";
import { Testimonials } from "@/components/sections/testimonials";
import { Walkthrough } from "@/components/sections/walkthrough";
import { faqs } from "@/lib/content";

/**
 * FAQPage structured data, generated from the same array the accordion
 * renders — so the rich result can never claim something the page does not say.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/**
 * The home page carries the whole story in one scroll: what this is, how the
 * daily habit works, what the room actually looks like, where to go next, who
 * it suits, the walkthrough, proof, the questions people ask, and finally the
 * two steps to join. The deeper routes exist for anyone who wants more on a
 * single step, not because anything essential was left off this page.
 */
export default function HomePage() {
  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <MarqueeBand />
      <InsideCommunity />
      <Ritual />
      <Statement />
      <RoomPreview />
      <Paths />
      <Fit />
      <Walkthrough />
      <Testimonials />
      <Faq />
      <JoinBand />
    </main>
  );
}
