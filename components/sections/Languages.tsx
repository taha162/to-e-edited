"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

export default function Languages() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  return (
    <section
      id="languages"
      className="relative overflow-hidden px-[6vw] py-[120px]"
    >
      <Reveal>
        <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {t.languages.eyebrow}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="section-title">{t.languages.title}</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {t.languages.items.map((l, i) => (
          <Reveal key={l.code} delay={0.05 + i * 0.05}>
            <div
              className="relative border border-white/[0.08] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-warm"
              data-cursor
              style={{ direction: "ltr" }}
            >
              <div
                className="font-display text-warm leading-none text-warm-glow"
                style={{ fontSize: 56 }}
              >
                {l.code}
              </div>
              <div
                className="mt-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {l.name}
              </div>
              <div
                className="mt-1.5 font-mono text-[11px] tracking-[0.15em] text-cool"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {l.level}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
