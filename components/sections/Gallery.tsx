"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

type Cat = "all" | "design" | "photo" | "ui";

const items: { cat: Exclude<Cat, "all">; aspect: string; tone: string }[] = [
  { cat: "design", aspect: "1/1", tone: "from-warm/40 to-cool/20" },
  { cat: "photo", aspect: "4/5", tone: "from-cool/40 to-warm/10" },
  { cat: "design", aspect: "1/1", tone: "from-warm-soft/50 to-cool/10" },
  { cat: "ui", aspect: "3/4", tone: "from-cool-soft/50 to-warm/20" },
  { cat: "design", aspect: "5/4", tone: "from-cool/30 to-warm/30" },
  { cat: "photo", aspect: "1/1", tone: "from-warm/50 to-warm-soft/20" },
  { cat: "ui", aspect: "4/5", tone: "from-cool/50 to-warm-soft/20" },
  { cat: "photo", aspect: "1/1", tone: "from-cool-soft/30 to-cool/30" },
  { cat: "design", aspect: "3/4", tone: "from-warm/40 to-warm-soft/30" }
];

export default function Gallery() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";
  const [active, setActive] = useState<Cat>("all");

  const filters: { id: Cat; label: string }[] = [
    { id: "all", label: t.gallery.filters.all },
    { id: "design", label: t.gallery.filters.design },
    { id: "photo", label: t.gallery.filters.photo },
    { id: "ui", label: t.gallery.filters.ui }
  ];

  return (
    <section
      id="gallery"
      className="relative overflow-hidden px-[6vw] py-[120px]"
    >
      <Reveal>
        <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {t.gallery.eyebrow}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="section-title">{t.gallery.title}</h2>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.1}>
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                data-cursor
                className={[
                  "border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all",
                  isActive
                    ? "border-warm bg-warm/10 text-warm"
                    : "border-white/15 text-paper/70 hover:border-warm hover:text-warm"
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50"
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          {t.gallery.hint}
        </p>
      </Reveal>

      {/* Masonry */}
      <div className="columns-2 gap-4 md:columns-3">
        {items.map((it, i) => {
          const visible = active === "all" || active === it.cat;
          return (
            <Reveal key={i} delay={0.05 + (i % 6) * 0.05}>
              <a
                className={[
                  "group relative mb-4 block break-inside-avoid overflow-hidden border border-white/[0.06] bg-[#0a0e14]",
                  "transition-all duration-500 hover:-translate-y-1 hover:border-warm",
                  visible ? "opacity-100" : "pointer-events-none opacity-25"
                ].join(" ")}
                style={{ aspectRatio: it.aspect }}
                data-cursor
              >
                {/* Frame art — gradient + cinematic motif */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${it.tone}`}
                />
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full opacity-40 mix-blend-screen"
                  aria-hidden
                >
                  {Array.from({ length: 30 }).map((_, k) => {
                    const x = (k * 13) % 100;
                    const y = (k * 27) % 100;
                    return (
                      <circle
                        key={k}
                        cx={x}
                        cy={y}
                        r={1 + (k % 2)}
                        fill={k % 2 === 0 ? "#fff" : "var(--warm)"}
                        opacity={0.3}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl uppercase text-white/30 sm:text-7xl">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                {/* Label on hover */}
                <div
                  className="absolute bottom-0 start-0 end-0 z-[2] translate-y-2 bg-gradient-to-t from-black/85 to-transparent p-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ direction: isAr ? "rtl" : "ltr" }}
                >
                  {t.gallery.labels[i]}
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
