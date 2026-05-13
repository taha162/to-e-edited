"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import BurnReveal from "@/components/cinema/BurnReveal";
import Reveal from "@/components/cinema/Reveal";
import GyroCoreStage from "@/components/machine/GyroCoreStage";

/**
 * Hero — heavy cinematic motion stage:
 *   - Mouse-parallax on title / aurora / meta (CSS vars --mx, --my)
 *   - Scroll parallax on aurora
 *   - 70 drifting dust particles
 *   - Lens flare burst on mount
 *   - Pre-roll [3 · 2 · 1 · ACTION] mounted once per session
 *   - Arabic display uses .arabic-display so it matches the rest of the site
 */
export default function Hero() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  const stageRef = useRef<HTMLElement | null>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  // First-load pre-roll (3-2-1) — runs once per tab session.
  const [preroll, setPreroll] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("tjd-preroll") === "1") return;
    sessionStorage.setItem("tjd-preroll", "1");
    setPreroll(true);
    const t1 = setTimeout(() => setPreroll(false), 2900);
    return () => clearTimeout(t1);
  }, []);

  // Lens flare burst — fires shortly after mount (or after pre-roll)
  useEffect(() => {
    const fl = flareRef.current;
    if (!fl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const delay = preroll ? 3100 : 400;
    const id = setTimeout(() => {
      fl.classList.remove("fire");
      // force reflow so animation can replay if locale toggles
      void fl.offsetWidth;
      fl.classList.add("fire");
    }, delay);
    return () => clearTimeout(id);
  }, [preroll, locale]);

  // Scroll parallax on aurora layer
  useEffect(() => {
    const el = auroraRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * -0.18;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mouse-parallax — set --mx, --my (-1..1) on the section
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 2 - 1; // -1..1
      const my = ((e.clientY - r.top) / r.height) * 2 - 1;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Stable seeded dust positions — re-render on locale doesn't reshuffle
  const dust = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const r = rng(42);
    return Array.from({ length: 72 }, (_, i) => ({
      left: r() * 100,
      duration: 14 + r() * 18,
      delay: -r() * 24,
      size: 1 + Math.round(r() * 3),
      drift: (r() - 0.5) * 80,
      opacity: 0.15 + r() * 0.55
    }));
  }, []);

  // Title styling — same Bebas size in EN, .arabic-display + scaled size in AR
  const titleClassEn =
    "block w-full font-display text-[clamp(56px,13vw,220px)] leading-[0.82] tracking-[-0.02em] uppercase";
  const titleClassAr =
    "block w-full arabic-display text-[clamp(48px,10vw,160px)] leading-[1.05] uppercase";

  return (
    <>
      {preroll && <PreRoll />}
      <section
        id="hero"
        ref={stageRef}
        className="hero-stage relative flex min-h-svh items-center justify-center overflow-hidden px-[4vw]"
      >
        <GyroCoreStage />

        {/* Aurora layer — scroll-parallax wrapper */}
        <div
          ref={auroraRef}
          aria-hidden
          className="pointer-events-none absolute inset-[-12%] z-0"
        >
          {/* Mouse-parallax inside scroll-parallax */}
          <div className="hero-parallax absolute inset-0 opacity-45 blur-3xl">
            <div className="absolute inset-0 animate-auroraPulse bg-[radial-gradient(ellipse_50%_40%_at_30%_40%,#00E5FF_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_70%_60%,#A78BFA_0%,transparent_60%)]" />
            <div
              className="absolute inset-0 animate-auroraPulseSlow bg-[radial-gradient(ellipse_60%_30%_at_60%_30%,rgba(34,211,238,0.85)_0%,transparent_60%),radial-gradient(ellipse_30%_50%_at_20%_70%,rgba(124,58,237,0.75)_0%,transparent_60%)]"
              style={{ animationDelay: "-4s" }}
            />
            <div
              className="absolute inset-0 animate-auroraPulseSlow bg-[radial-gradient(ellipse_30%_25%_at_50%_50%,rgba(255,45,149,0.5)_0%,transparent_60%)]"
              style={{ animationDelay: "-9s" }}
            />
          </div>
        </div>

        {/* Lens flare burst */}
        <div ref={flareRef} className="lens-flare" aria-hidden />

        {/* Dust particles */}
        <div className="dust" aria-hidden>
          {dust.map((p, i) => (
            <span
              key={i}
              className="dust__p"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ["--o" as never]: p.opacity,
                ["--dx" as never]: p.drift
              }}
            />
          ))}
        </div>

        {/* SCENE TAKE REC chip — top-left */}
        <div
          className="hero-parallax absolute top-24 z-10 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-warm"
          style={{ insetInlineStart: "6vw" }}
        >
          <span className="inline-block h-2 w-2 animate-pulseRec rounded-full bg-warm shadow-[0_0_12px_var(--warm)]" />
          <span style={{ direction: isAr ? "rtl" : "ltr" }}>{t.hero.take}</span>
        </div>

        <div
          className="hero-machine-hud absolute z-10 hidden flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/55 lg:flex"
          style={{ insetInlineEnd: "6vw", top: "22vh", direction: "ltr" }}
          aria-hidden
        >
          <span>GYRO CORE</span>
          <strong>MASS 1.35 / DAMPED</strong>
        </div>

        {/* Hero text */}
        <div className="hero-parallax--strong relative z-[2] w-full text-center">
          <Reveal blur delay={0.1}>
            <div
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cool"
              style={{ direction: isAr ? "rtl" : "ltr" }}
            >
              {t.hero.eyebrow}
            </div>
          </Reveal>

          <h1 className="title-duotone" style={{ textWrap: "balance" }}>
            <BurnReveal
              key={`a-${locale}`}
              text={t.hero.titleA}
              className={isAr ? titleClassAr : titleClassEn}
              trigger="mount"
              delay={preroll ? 3.1 : 0.3}
            />
            <BurnReveal
              key={`b-${locale}`}
              text={t.hero.titleB}
              className={isAr ? titleClassAr : titleClassEn}
              trigger="mount"
              delay={preroll ? 3.45 : 0.65}
            />
          </h1>

          <Reveal blur delay={preroll ? 4.0 : 1.4}>
            <div
              className="holo mt-7 font-mono text-[11px] uppercase tracking-[0.32em] sm:text-[13px]"
              style={{ direction: isAr ? "rtl" : "ltr" }}
            >
              {t.hero.tag1} <span className="text-paper/50">×</span>{" "}
              {t.hero.tag2} <span className="text-paper/50">×</span>{" "}
              {t.hero.tag3} <span className="text-paper/50">×</span>{" "}
              {t.hero.tag4}
            </div>
          </Reveal>
        </div>

        {/* Hero meta strip — bottom */}
        <div
          className="hero-parallax absolute bottom-12 hidden items-end justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-paper/55 md:flex"
          style={{ insetInline: "6vw" }}
        >
          <div className="flex flex-col gap-1.5">
            <span>{t.hero.metaLocation}</span>
            <strong className="font-medium tracking-[0.2em] text-warm">
              {t.hero.metaLocationValue}
            </strong>
          </div>
          <div
            className="flex flex-col items-center gap-1.5"
            style={{ direction: "ltr" }}
          >
            <span></span>
            <strong className="font-medium tracking-[0.2em] text-warm">
              {t.hero.metaFormat}
            </strong>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-end">
            <span>{t.hero.metaDesigner}</span>
            <strong className="font-medium tracking-[0.2em] text-warm">
              {t.hero.metaDesignerValue}
            </strong>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-5 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.4em] text-paper/50">
          <span style={{ direction: isAr ? "rtl" : "ltr" }}>
            {t.hero.scrollCue}
          </span>
          <div className="h-10 w-px animate-cueDown bg-gradient-to-b from-warm to-transparent" />
        </div>
      </section>
    </>
  );
}

/**
 * PreRoll — fullscreen 3·2·1·ACTION countdown.
 * Uses three independent number flashes instead of a single `content`
 * keyframe (which is unreliable across browsers).
 */
function PreRoll() {
  return (
    <div className="preroll-overlay" role="presentation" aria-hidden>
      <div className="preroll-stack">
        <span className="preroll-num preroll-num--3">3</span>
        <span className="preroll-num preroll-num--2">2</span>
        <span className="preroll-num preroll-num--1">1</span>
        <span className="preroll-num preroll-num--a">ACTION</span>
      </div>
      <div className="preroll-line">
        <span />
      </div>
      <div className="preroll-meta">SCENE 01 · TAKE 26</div>

      <style jsx>{`
        .preroll-overlay {
          position: fixed;
          inset: 0;
          z-index: 9500;
          background: var(--ink);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          animation: prerollOut 0.55s var(--ease-cut) 2.55s forwards;
        }
        .preroll-overlay::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(60% 40% at 50% 50%, color-mix(in srgb, var(--warm) 25%, transparent), transparent 70%);
          opacity: 0.7;
          pointer-events: none;
        }
        .preroll-stack {
          position: relative;
          width: clamp(160px, 24vw, 360px);
          height: clamp(160px, 24vw, 360px);
        }
        .preroll-num {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-bebas), Anton, Impact, sans-serif;
          font-size: clamp(120px, 22vw, 320px);
          line-height: 1;
          color: var(--warm);
          text-shadow:
            0 0 40px color-mix(in srgb, var(--warm) 80%, transparent),
            0 0 120px color-mix(in srgb, var(--warm) 60%, transparent);
          opacity: 0;
        }
        .preroll-num--3 { animation: numFlash 0.8s var(--ease-cut) 0s forwards; }
        .preroll-num--2 { animation: numFlash 0.8s var(--ease-cut) 0.7s forwards; }
        .preroll-num--1 { animation: numFlash 0.8s var(--ease-cut) 1.4s forwards; }
        .preroll-num--a {
          color: #fff;
          font-size: clamp(48px, 8vw, 120px);
          letter-spacing: 0.2em;
          animation: actionFlash 0.6s var(--ease-cut) 2.1s forwards;
        }
        @keyframes numFlash {
          0%   { opacity: 0; transform: scale(1.4); filter: blur(20px); }
          30%  { opacity: 1; transform: scale(1); filter: blur(0); }
          90%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        @keyframes actionFlash {
          0%   { opacity: 0; transform: scale(0.6); filter: blur(20px); }
          50%  { opacity: 1; transform: scale(1.05); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        .preroll-line {
          width: 240px;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }
        .preroll-line span {
          position: absolute;
          inset: 0;
          background: var(--warm);
          transform-origin: left;
          transform: scaleX(0);
          animation: lineFill 2.55s linear forwards;
        }
        @keyframes lineFill {
          to { transform: scaleX(1); }
        }
        .preroll-meta {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }
        @keyframes prerollOut {
          to {
            opacity: 0;
            transform: scale(1.04);
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}
