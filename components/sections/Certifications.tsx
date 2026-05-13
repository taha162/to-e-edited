"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

export default function Certifications() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  return (
    <section
      id="certs"
      className="relative overflow-hidden px-[6vw] py-[120px]"
    >
      <Reveal>
        <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {t.certs.eyebrow}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="section-title">{t.certs.title}</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.certs.items.map((c, i) => (
          <Reveal key={c.h} delay={0.02 + i * 0.02}>
            <div
              className="relative h-full overflow-hidden border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cool"
              data-cursor
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4
                className="mt-2 text-[15px] font-medium leading-snug text-white"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {c.h}
              </h4>
              <div
                className="mt-1.5 font-mono text-[11px] tracking-wide text-paper/55"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {c.iss}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
