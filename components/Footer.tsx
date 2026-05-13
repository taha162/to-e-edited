"use client";

import { useLang } from "@/components/LanguageProvider";

export default function Footer() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";

  return (
    <footer
      className="relative z-10 border-t border-white/[0.06] px-[6vw] py-20 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40"
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      <div>{t.footer.end}</div>
      <div className="mt-6 text-[10px] text-paper/25">{t.footer.credits}</div>
    </footer>
  );
}
