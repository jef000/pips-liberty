"use client";

import { useEffect, useRef, useState } from "react";

import { useFunnel } from "@/components/funnel";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SectionTitle } from "@/components/ui";
import { loadYouTubeApi, track, type YouTubePlayer } from "@/lib/analytics";
import { walkthroughPoints } from "@/lib/content";
import { video } from "@/lib/site";

const hasVideo = Boolean(video.youtubeId);

/**
 * The walkthrough, and the gate in front of the join section.
 *
 * The YouTube IFrame API is fetched only when someone actually presses play,
 * so a visitor who never watches never pays for the script. Progress is polled
 * rather than evented because the API has no "percentage watched" callback.
 */
export function Walkthrough() {
  const { onVideoProgress, onVideoEnded, showPill, scrollToJoin } = useFunnel();

  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const pollRef = useRef<number | null>(null);
  const firedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(
    () => () => {
      if (pollRef.current) clearInterval(pollRef.current);
      playerRef.current?.destroy();
    },
    [],
  );

  const startPolling = () => {
    if (firedRef.current || pollRef.current) return;
    pollRef.current = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;

      const duration = player.getDuration();
      const mark =
        video.revealAtPercent > 0 && duration > 0
          ? duration * video.revealAtPercent
          : video.revealAfterSeconds;

      if (mark > 0 && player.getCurrentTime() >= mark) {
        firedRef.current = true;
        if (pollRef.current) clearInterval(pollRef.current);
        pollRef.current = null;
        onVideoProgress();
      }
    }, 500);
  };

  const play = async () => {
    setPlaying(true);
    track("watch_walkthrough", "ViewContent", { content_name: "Walkthrough" });

    if (!hasVideo) {
      // No video configured yet — don't strand the visitor behind a dead gate.
      if (video.gated) setTimeout(onVideoEnded, 3000);
      return;
    }

    const api = await loadYouTubeApi();
    if (!hostRef.current) return;

    playerRef.current = new api.Player(hostRef.current, {
      host: "https://www.youtube-nocookie.com",
      videoId: video.youtubeId,
      playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
      events: {
        onStateChange: (event) => {
          if (!video.gated) return;
          if (event.data === api.PlayerState.PLAYING) startPolling();
          if (event.data === api.PlayerState.ENDED) onVideoEnded();
        },
      },
    });
  };

  return (
    <Section id="walkthrough" tone="deep">
      <Reveal className="max-w-2xl">
        <Eyebrow index="06">How it works, in a few minutes</Eyebrow>
        <SectionTitle>
          See what actually happens <span className="text-accent-ink">inside</span>.
        </SectionTitle>
        <p className="text-muted mt-5 max-w-xl leading-relaxed">
          A short, honest walkthrough of the classroom, the check-in, and what
          the first week looks like once you are in.
        </p>
      </Reveal>

      <Reveal delayMs={120} className="relative">
        <div
          aria-hidden="true"
          className="glow top-1/2 left-1/2 h-[22rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-50"
        />
        <div className="border-line shadow-lift relative z-10 mt-12 aspect-video overflow-hidden rounded-2xl border bg-black">
          <div ref={hostRef} className="absolute inset-0 h-full w-full">
            {playing && !hasVideo ? (
              <div className="text-muted grid h-full w-full place-items-center bg-black px-6 text-center text-sm">
                No walkthrough connected yet — set{" "}
                <code className="text-accent-ink mx-1 font-mono">video.youtubeId</code> in
                src/lib/site.ts
              </div>
            ) : null}
          </div>

          {!playing ? (
            <button
              type="button"
              onClick={play}
              aria-label="Play the walkthrough video"
              className="group absolute inset-0 grid h-full w-full place-items-center bg-black"
            >
              {hasVideo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-55"
                />
              ) : null}
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              <span className="play-ring bg-accent text-ink relative grid h-[76px] w-[76px] place-items-center rounded-full transition-transform group-hover:scale-105">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute bottom-4 left-4 text-xs text-white/80">
                The official walkthrough
              </span>
            </button>
          ) : null}
        </div>
      </Reveal>

      <div className="border-line mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
        {walkthroughPoints.map((point, i) => (
          <Reveal key={point.title} delayMs={i * 70}>
            <div className="bg-surface h-full p-6 md:p-7">
              <span className="text-accent-ink/50 font-mono text-[12px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-cream mt-3 text-[16px] leading-snug font-semibold">
                {point.title}
              </p>
              <p className="text-muted mt-2 text-[13.5px] leading-relaxed">{point.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {video.gated ? (
        <Reveal>
          <p className="text-muted mt-6 max-w-2xl text-[13px] leading-relaxed">
            The two join steps open up once you have watched enough of this to
            know what you would be joining. No email, no form — just the video.
          </p>
        </Reveal>
      ) : null}

      {showPill ? (
        <button
          type="button"
          onClick={scrollToJoin}
          className="btn bg-accent text-ink mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
        >
          Join steps unlocked ↓
        </button>
      ) : null}
    </Section>
  );
}
