"use client";

import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

export default function About() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  return (
    <section
      id="about"
      className="relative grid min-h-svh items-center gap-20 px-[6vw] py-[120px] lg:grid-cols-[1fr_1.2fr]"
    >
      {/* Real portrait — cinematic frame */}
      <Reveal blur>
        <div className="relative mx-auto w-full max-w-[460px]">
          {/* Glow halo behind frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 50% at 30% 30%, color-mix(in srgb, var(--warm) 45%, transparent), transparent 70%), radial-gradient(50% 60% at 70% 70%, color-mix(in srgb, var(--cool) 35%, transparent), transparent 70%)"
            }}
          />
          <div
            className="group relative aspect-[3/4] overflow-hidden rounded-[4px] shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            data-cursor
          >
            <Image
              src="/portrait.jpg"
              alt="Taha Jasim Mohammed — portrait"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 460px"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
            />

            {/* Duotone wash — cyan + violet on the photo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--warm) 35%, transparent), transparent 55%), linear-gradient(225deg, color-mix(in srgb, var(--cool) 35%, transparent), transparent 55%)"
              }}
            />
            {/* Bottom darken so frame label reads */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))"
              }}
            />

            {/* Frame corners */}
            {[
              "left-2 top-2 border-t border-l",
              "right-2 top-2 border-t border-r",
              "left-2 bottom-2 border-b border-l",
              "right-2 bottom-2 border-b border-r"
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden
                className={`pointer-events-none absolute h-5 w-5 border-warm ${pos}`}
              />
            ))}

            {/* Frame label — top */}
            <div
              className="absolute left-3.5 top-3.5 z-[2] flex items-center gap-2 border border-white/20 bg-black/55 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-sm"
              style={{ direction: "ltr" }}
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulseRec rounded-full bg-warm shadow-[0_0_8px_var(--warm)]" />
              {t.about.photoLabel}
            </div>

            {/* Frame label — bottom (timecode style) */}
            <div
              className="absolute bottom-3.5 left-3.5 right-3.5 z-[2] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-white/80"
              style={{ direction: "ltr" }}
            >
              <span>TJM · MOSUL</span>
              <span className="text-warm">2.39 : 1 · 24FPS</span>
            </div>
          </div>

          {/* Side caption (rotated) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -end-12 top-6 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-paper/40 lg:block"
            style={{ writingMode: "vertical-rl", direction: "ltr" }}
          >
            PORTRAIT · SCENE 02
          </div>
        </div>
      </Reveal>

      {/* Content */}
      <div className="max-w-[640px]">
        <Reveal>
          <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
            {t.about.eyebrow}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            {t.about.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="max-w-[60ch] text-pretty text-paper/80"
            style={{ fontSize: "clamp(18px,1.4vw,22px)", lineHeight: 1.55 }}
          >
            {t.about.p1}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className={[
              "my-8 max-w-full text-balance border-warm ps-6 uppercase",
              "border-s-[2px]",
              isAr ? "arabic-display" : "font-display",
              "leading-[1.05]"
            ].join(" ")}
            style={{
              fontSize: "clamp(28px, 3vw, 52px)",
              letterSpacing: isAr ? 0 : "-0.01em",
              color: "#fff"
            }}
            dangerouslySetInnerHTML={{ __html: t.about.pull }}
          />
        </Reveal>

        <Reveal delay={0.3}>
          <p
            className="max-w-[60ch] text-pretty text-paper/80"
            style={{ fontSize: "clamp(18px,1.4vw,22px)", lineHeight: 1.55 }}
          >
            {t.about.p2}
          </p>
        </Reveal>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
          {[
            { n: "2+", l: t.about.stats.years },
            { n: "12", l: t.about.stats.certs },
            { n: "5", l: t.about.stats.languages }
          ].map((s, i) => (
            <Reveal key={s.l} delay={0.4 + i * 0.1}>
              <div className="border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-md sm:p-5">
                <div className="font-display text-warm text-warm-glow text-[36px] sm:text-[48px]">
                  {s.n}
                </div>
                <div
                  className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/55"
                  style={{ direction: isAr ? "rtl" : "ltr" }}
                >
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
