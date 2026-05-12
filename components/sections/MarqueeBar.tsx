"use client";

import { useLang } from "@/components/LanguageProvider";

/**
 * MarqueeBar — two infinite ticker rows scrolling opposite directions
 * displaying skills + tools + languages + locations.
 *
 *   row 1 → ←   warm + outline tokens
 *   row 2 ← →   cool + outline tokens
 *
 * Hover or focus pauses the scroll. RTL-safe (font-family swaps to Tajawal).
 */
export default function MarqueeBar() {
  const { t } = useLang();

  // Row 1 — skills + roles
  const row1 = [
    { txt: t.hero.tag1, tone: "warm" },
    { txt: "★", tone: "neon", isStar: true },
    { txt: t.hero.tag2, tone: "outline" },
    { txt: "★", tone: "neon", isStar: true },
    { txt: t.hero.tag3, tone: "warm" },
    { txt: "★", tone: "neon", isStar: true },
    { txt: t.hero.tag4, tone: "outline" },
    { txt: "★", tone: "neon", isStar: true },
    { txt: t.skills.cats.design, tone: "warm" },
    { txt: "★", tone: "neon", isStar: true },
    { txt: t.skills.cats.code, tone: "outline" },
    { txt: "★", tone: "neon", isStar: true },
    { txt: t.skills.cats.soft, tone: "warm" }
  ] as const;

  // Row 2 — languages + tools + meta
  const row2 = [
    { txt: t.languages.items[0].name, tone: "cool" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: t.languages.items[1].name, tone: "outline" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: t.languages.items[2].name, tone: "cool" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: t.languages.items[3].name, tone: "outline" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: t.languages.items[4].name, tone: "cool" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: "Adobe Illustrator", tone: "outline" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: "Adobe XD", tone: "cool" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: "InDesign", tone: "outline" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: "C++", tone: "cool" },
    { txt: "◆", tone: "neon", isStar: true },
    { txt: "Python", tone: "outline" }
  ] as const;

  return (
    <section
      aria-hidden
      className="relative z-[1] -mt-[6vh] overflow-hidden border-y border-white/[0.06] bg-gradient-to-b from-ink-900/60 via-ink-900/40 to-ink-900/60 py-6 backdrop-blur-sm"
    >
      <div
        className="marquee"
        style={{ ["--mq-duration" as never]: "42s" }}
      >
        <Track items={row1} />
        <Track items={row1} />
      </div>

      <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div
        className="marquee marquee--reverse"
        style={{ ["--mq-duration" as never]: "56s" }}
      >
        <Track items={row2} />
        <Track items={row2} />
      </div>
    </section>
  );
}

function Track({
  items
}: {
  items: readonly { txt: string; tone: string; isStar?: boolean }[];
}) {
  return (
    <div className="marquee__track">
      {items.map((it, i) => (
        <span
          key={i}
          className={
            it.isStar
              ? "marquee__star"
              : `marquee__token marquee__token--${it.tone}`
          }
        >
          {it.txt}
        </span>
      ))}
    </div>
  );
}
