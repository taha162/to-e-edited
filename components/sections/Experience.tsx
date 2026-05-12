"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

export default function Experience() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-[6vw] py-[120px]"
    >
      <Reveal>
        <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {t.experience.eyebrow}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="section-title">{t.experience.title}</h2>
      </Reveal>

      {/* Reel */}
      <div className="relative mt-14 ps-[80px]">
        {/* Glowing reel line */}
        <div
          aria-hidden
          className="absolute bottom-0 top-0 w-[2px] shadow-[0_0_20px_var(--warm)]"
          style={{
            insetInlineStart: "32px",
            background: "linear-gradient(180deg, var(--warm), var(--cool))"
          }}
        />
        {/* Sprocket holes */}
        <div
          aria-hidden
          className="absolute bottom-0 top-0 w-[64px] border-x border-white/[0.06]"
          style={{
            insetInlineStart: 0,
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0 36px, rgba(255,255,255,0.04) 36px 56px, transparent 56px 80px)",
            backgroundSize: "64px 80px"
          }}
        />

        {t.experience.items.map((item, i) => (
          <Reveal key={item.h} delay={0.05 + i * 0.05}>
            <div className="exp-row relative grid gap-10 py-8 pb-14 md:grid-cols-[160px_1fr]">
              {/* Marker dot on the line */}
              <span
                aria-hidden
                className="absolute top-[44px] inline-block h-[18px] w-[18px] rounded-full border-2 border-warm bg-ink shadow-[0_0_16px_var(--warm),inset_0_0_8px_var(--warm)]"
                style={{ insetInlineStart: "-56px" }}
              />
              <div
                className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-warm"
                style={{
                  direction: isAr ? "rtl" : "ltr",
                  whiteSpace: "pre-line"
                }}
              >
                {item.when}
              </div>
              <div>
                <div
                  className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cool"
                  style={{ direction: isAr ? "rtl" : "ltr" }}
                >
                  {item.role}
                </div>
                <h3
                  className={[
                    "mb-3 leading-[1.05] uppercase text-white",
                    isAr ? "font-arabic font-bold" : "font-display"
                  ].join(" ")}
                  style={{
                    fontSize: isAr ? "30px" : "36px",
                    letterSpacing: 0
                  }}
                >
                  {item.h}
                </h3>
                {"bullets" in item && item.bullets ? (
                  <ul
                    className="mt-2.5 space-y-2 text-paper/70"
                    style={{ direction: isAr ? "rtl" : "ltr" }}
                  >
                    {item.bullets.map((b: string) => (
                      <li
                        key={b}
                        className="relative max-w-[64ch] text-[15px] leading-relaxed ps-5"
                      >
                        <span
                          aria-hidden
                          className="absolute top-[7px] text-[9px] text-cool"
                          style={{ insetInlineStart: 0 }}
                        >
                          ►
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "p" in item && item.p ? (
                    <p
                      className="max-w-[64ch] text-[15px] leading-relaxed text-paper/70"
                      style={{ direction: isAr ? "rtl" : "ltr" }}
                    >
                      {item.p}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
