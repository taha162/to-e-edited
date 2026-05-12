"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";
import WorkModal from "@/components/cinema/WorkModal";
import type { ReactNode } from "react";

export default function Works() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  const arts: ReactNode[] = [
    <MagazineArt key="0" />,
    <PhoneArt key="1" />,
    <SchoolArt key="2" />,
    <BrandArt key="3" />
  ];

  // Modal state
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const items = t.works.items;
  const total = items.length;
  const active = activeIdx !== null ? items[activeIdx] : null;

  const open = (i: number) => setActiveIdx(i);
  const close = () => setActiveIdx(null);

  return (
    <section
      id="works"
      className="relative overflow-hidden px-[6vw] py-[120px]"
    >
      <Reveal>
        <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {t.works.eyebrow}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="section-title">{t.works.title}</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {items.map((p, i) => (
          <Reveal key={p.h} delay={0.05 + i * 0.05}>
            <article
              role="button"
              tabIndex={0}
              aria-label={`${p.tag} — ${p.h}`}
              onClick={() => open(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(i);
                }
              }}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden border border-white/[0.08] bg-[#0a0e14] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-warm"
              data-cursor
            >
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center transition-transform duration-[8000ms] ease-linear group-hover:scale-[1.08]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 70%)"
                }}
              >
                <div
                  className="max-h-[60%] max-w-[60%]"
                  style={{
                    filter:
                      "drop-shadow(0 0 30px color-mix(in srgb, var(--warm) 60%, transparent))"
                  }}
                >
                  {arts[i] ?? <MagazineArt />}
                </div>
              </div>

              {/* Open-case hint chip (top-right) */}
              <div
                aria-hidden
                className="absolute end-3 top-3 z-[3] flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-paper/85 backdrop-blur-sm transition-all duration-500 group-hover:border-warm group-hover:text-warm"
                style={{ direction: "ltr" }}
              >
                <span className="inline-block h-1 w-1 rounded-full bg-warm shadow-[0_0_6px_var(--warm)]" />
                {t.works.labels.view}
              </div>

              {/* Meta */}
              <div className="absolute bottom-0 start-0 end-0 z-[2] bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool"
                  style={{ direction: isAr ? "rtl" : "ltr" }}
                >
                  {p.tag}
                </div>
                <h3
                  className={[
                    "mt-1.5 leading-[1.05] uppercase text-white",
                    isAr ? "arabic-display" : "font-display"
                  ].join(" ")}
                  style={{ fontSize: isAr ? "22px" : "28px" }}
                >
                  {p.h}
                </h3>
                <p
                  className="mt-1.5 max-w-[46ch] text-[13px] text-paper/60"
                  style={{ direction: isAr ? "rtl" : "ltr" }}
                >
                  {p.p}
                </p>
              </div>

              {/* Hover halo border */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-warm group-hover:shadow-[inset_0_0_60px_rgba(0,229,255,0.18),0_0_60px_rgba(0,229,255,0.28)]"
              />
            </article>
          </Reveal>
        ))}
      </div>

      {/* Detail modal */}
      <WorkModal
        open={activeIdx !== null}
        onClose={close}
        work={active}
        index={activeIdx ?? 0}
        total={total}
      />
    </section>
  );
}

/* ───────── SVG arts (cinematic minimal) ───────── */

function MagazineArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <rect
        x="50"
        y="20"
        width="100"
        height="160"
        fill="none"
        stroke="var(--warm)"
        strokeWidth="1.5"
      />
      <rect x="58" y="32" width="84" height="3" fill="var(--warm)" />
      <rect x="58" y="42" width="64" height="2" fill="rgba(255,255,255,0.5)" />
      <rect
        x="58"
        y="50"
        width="84"
        height="60"
        fill="rgba(255,255,255,0.08)"
        stroke="var(--cool)"
        strokeWidth="0.5"
      />
      <rect x="58" y="120" width="40" height="2" fill="rgba(255,255,255,0.5)" />
      <rect x="58" y="128" width="84" height="1" fill="rgba(255,255,255,0.3)" />
      <rect x="58" y="134" width="84" height="1" fill="rgba(255,255,255,0.3)" />
      <rect x="58" y="140" width="60" height="1" fill="rgba(255,255,255,0.3)" />
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fontFamily="var(--font-bebas)"
        fontSize="12"
        fill="var(--warm)"
        letterSpacing="2"
      >
        AL-BU&#39;RAH
      </text>
    </svg>
  );
}

function PhoneArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <rect
        x="70"
        y="20"
        width="60"
        height="160"
        rx="8"
        fill="none"
        stroke="var(--cool)"
        strokeWidth="1.5"
      />
      <rect x="76" y="34" width="48" height="32" fill="var(--warm)" opacity="0.25" />
      <circle cx="100" cy="50" r="10" fill="var(--warm)" />
      <rect x="76" y="74" width="48" height="3" fill="rgba(255,255,255,0.7)" />
      <rect x="76" y="82" width="32" height="2" fill="rgba(255,255,255,0.5)" />
      <rect
        x="76"
        y="92"
        width="22"
        height="22"
        fill="rgba(255,255,255,0.08)"
        stroke="var(--cool)"
        strokeWidth="0.5"
      />
      <rect
        x="102"
        y="92"
        width="22"
        height="22"
        fill="rgba(255,255,255,0.08)"
        stroke="var(--cool)"
        strokeWidth="0.5"
      />
      <rect
        x="76"
        y="120"
        width="22"
        height="22"
        fill="rgba(255,255,255,0.08)"
        stroke="var(--cool)"
        strokeWidth="0.5"
      />
      <rect
        x="102"
        y="120"
        width="22"
        height="22"
        fill="rgba(255,255,255,0.08)"
        stroke="var(--cool)"
        strokeWidth="0.5"
      />
      <rect x="76" y="156" width="48" height="14" rx="2" fill="var(--warm)" />
    </svg>
  );
}

function SchoolArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <rect
        x="40"
        y="40"
        width="120"
        height="120"
        fill="none"
        stroke="var(--warm)"
        strokeWidth="1.5"
      />
      <circle
        cx="100"
        cy="80"
        r="14"
        fill="var(--warm)"
        opacity="0.3"
        stroke="var(--warm)"
      />
      <path
        d="M86 90 Q100 102 114 90"
        stroke="var(--warm)"
        fill="none"
        strokeWidth="1.5"
      />
      <rect x="60" y="120" width="80" height="3" fill="rgba(255,255,255,0.6)" />
      <rect x="60" y="130" width="60" height="2" fill="rgba(255,255,255,0.4)" />
      <rect x="60" y="138" width="80" height="2" fill="rgba(255,255,255,0.4)" />
      <circle cx="170" cy="50" r="8" fill="var(--cool)" />
      <text
        x="170"
        y="54"
        textAnchor="middle"
        fontFamily="var(--font-inter)"
        fontSize="9"
        fill="#000"
        fontWeight="700"
      >
        3
      </text>
    </svg>
  );
}

function BrandArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <circle cx="70" cy="70" r="28" fill="var(--warm)" opacity="0.7" />
      <circle
        cx="130"
        cy="70"
        r="28"
        fill="var(--cool)"
        opacity="0.7"
        style={{ mixBlendMode: "screen" }}
      />
      <rect
        x="50"
        y="120"
        width="40"
        height="40"
        fill="none"
        stroke="var(--warm)"
        strokeWidth="2"
      />
      <polygon
        points="130,120 150,160 110,160"
        fill="none"
        stroke="var(--cool)"
        strokeWidth="2"
      />
    </svg>
  );
}
