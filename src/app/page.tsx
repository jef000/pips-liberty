import { Disclosure, Headline, Masthead, delay } from "@/components/brand";
import { CountUp } from "@/components/count-up";
import { CtaRow, Entry, Stamp } from "@/components/ui";
import { site, stats } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="w-full max-w-[560px] px-6 pt-10 pb-12 sm:px-8 sm:pt-14 lg:max-w-[1080px] lg:px-12 lg:pt-20">
      <Masthead />

      {/*
        Stacked on phone/tablet. On desktop the pitch and the stats hold the
        left rail while the actions take a column of their own — grid placement
        rather than a duplicated block, so the counters only ever mount once.
      */}
      <div className="lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-x-16">
        <div className="lg:col-start-1 lg:row-start-1">
          <Headline className="mb-5 text-[clamp(34px,9vw,46px)] lg:text-[clamp(46px,4.4vw,62px)]" />

          <div className="flex flex-col items-start gap-5 sm:flex-row">
            <p
              data-enter
              style={delay(620)}
              className="text-ink-soft max-w-[42ch] text-[16px] sm:text-[17px] lg:text-[18px]"
            >
              {site.tagline}
            </p>
            <div data-enter style={delay(700)} className="shrink-0">
              <Stamp>No signals sold</Stamp>
            </div>
          </div>
        </div>

        <nav
          aria-label="Primary actions"
          className="mt-9 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:pt-2"
        >
          <div data-enter style={delay(760)}>
            <CtaRow
              href="/trade"
              index="01"
              title="Get your account funded"
              hint="Open a live PU Prime account — that's what gets you verified in"
              emphasis
            />
          </div>
          <div data-enter style={delay(840)}>
            <CtaRow
              href="/join"
              index="02"
              title="See what's inside"
              hint="The classroom, the check-ins, the leaderboard — starts here"
            />
          </div>
          <div data-enter style={delay(920)}>
            <CtaRow
              href="/scale"
              index="03"
              title="Trade bigger"
              hint="Pass an FTMO challenge and trade their capital instead of just yours"
            />
          </div>
        </nav>

        <div
          data-enter
          style={delay(1000)}
          className="mt-12 lg:col-start-1 lg:row-start-2 lg:mt-10"
        >
          <Entry index="04" title="What's real here" className="py-0">
            <dl className="grid grid-cols-3 gap-6 lg:gap-8">
              {stats.map(({ value, label }, i) => (
                <div key={label} className="text-center lg:text-left">
                  <dd className="font-mono text-[22px] font-bold sm:text-[26px] lg:text-[30px]">
                    <CountUp value={value} delayMs={i * 130} />
                  </dd>
                  <dt className="text-ink-faint mt-1.5 text-[11px] font-medium tracking-[0.06em] uppercase">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </Entry>
        </div>
      </div>

      <Disclosure className="mt-8 lg:mt-12 lg:max-w-[62ch]" />
    </main>
  );
}
