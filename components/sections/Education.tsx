"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

export default function Education() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  const cards = [
    {
      yr: t.education.uomYear,
      h: t.education.uomTitle,
      loc: t.education.uomLoc,
      body: t.education.uomBody
    },
    {
      yr: t.education.schYear,
      h: t.education.schTitle,
      loc: t.education.schLoc,
      body: t.education.schBody
    }
  ];

  return (
    <section
      id="education"
      className="relative overflow-hidden px-[6vw] py-[120px]"
    >
      <Reveal>
        <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {t.education.eyebrow}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="section-title">{t.education.title}</h2>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.h} delay={0.1 + i * 0.1}>
            <div className="edu-card group relative h-full overflow-hidden border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-9 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-warm">
              {/* hover halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--warm) 30%, transparent), transparent 50%)"
                }}
              />
              <div
                className="relative font-mono text-[11px] uppercase tracking-[0.25em] text-cool"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {c.yr}
              </div>
              <h3
                className={[
                  "relative mt-4 leading-none uppercase text-white",
                  isAr ? "font-arabic font-bold" : "font-display"
                ].join(" ")}
                style={{
                  fontSize: isAr ? "26px" : "32px",
                  letterSpacing: isAr ? 0 : "0.01em",
                  whiteSpace: "pre-line"
                }}
              >
                {c.h}
              </h3>
              <div
                className="relative mt-2 text-sm text-paper/55"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {c.loc}
              </div>
              <p
                className="relative mt-5 text-sm leading-relaxed text-paper/65"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
