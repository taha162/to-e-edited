"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useLang } from "@/components/LanguageProvider";

const sections = ["about", "experience", "works", "gallery", "contact"] as const;

export default function Navigation() {
  const { t, locale, toggle } = useLang();
  const [tc, setTc] = useState("T+00:00:00");
  const [open, setOpen] = useState(false);

  // Live timecode tied to scroll position (cinematic feel)
  useEffect(() => {
    let raf = 0;
    const fmt = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      const totalSeconds = Math.floor(p * 60 * 30); // 30 minute "film"
      const hh = Math.floor(totalSeconds / 3600);
      const mm = Math.floor((totalSeconds % 3600) / 60);
      const ss = totalSeconds % 60;
      setTc(`T+${fmt(hh)}:${fmt(mm)}:${fmt(ss)}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onJump = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={clsx(
        "fixed left-0 right-0 top-6 z-[8700] flex items-center justify-between px-[6vw]",
        "font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60"
      )}
      style={{ mixBlendMode: "difference" }}
    >
      {/* Brand */}
      <button
        onClick={() => onJump("hero")}
        className="font-mono text-[11px] font-semibold tracking-[0.3em] text-white transition-colors hover:text-warm"
        data-cursor
      >
        {t.nav.brand}
      </button>

      {/* Desktop nav */}
      <nav className="hidden gap-7 md:flex">
        {sections.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            onClick={(e) => {
              e.preventDefault();
              onJump(s);
            }}
            className="transition-colors hover:text-warm"
            data-cursor
          >
            {t.nav[s]}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {/* Timecode (LTR even in Arabic) */}
        <div
          className="hidden tabular-nums sm:block"
          style={{ direction: "ltr" }}
        >
          {tc}
        </div>

        {/* Language toggle */}
        <button
          onClick={toggle}
          title={t.nav.langTitle}
          aria-label={t.nav.langTitle}
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-[3px] border px-2.5 py-[5px] uppercase tracking-[0.18em] transition-colors",
            "border-white/30 bg-white/10 text-white hover:border-warm hover:bg-white/[0.22]"
          )}
          data-cursor
        >
          <span className="text-[16px] leading-none">
            {locale === "en" ? "🇮🇶" : "🇬🇧"}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em]">
            {locale === "en" ? "ع" : "EN"}
          </span>
        </button>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          data-cursor
        >
          <span className="block h-px w-5 bg-white" />
          <span className="mt-1 block h-px w-5 bg-white" />
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div
          className="fixed inset-x-0 top-[60px] z-[8700] mx-[6vw] rounded-md border border-white/10 bg-ink-900/95 p-4 backdrop-blur-xl md:hidden"
          style={{ mixBlendMode: "normal" }}
        >
          <ul className="flex flex-col gap-3">
            {sections.map((s) => (
              <li key={s}>
                <button
                  onClick={() => onJump(s)}
                  className="w-full text-start font-mono text-xs uppercase tracking-[0.22em] text-paper/80 hover:text-warm"
                >
                  {t.nav[s]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
