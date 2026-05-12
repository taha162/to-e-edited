"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

type Skill = { name: string; value: number };

export default function Skills() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const groups: { title: string; items: Skill[]; delay: number }[] = [
    { title: t.skills.cats.design, items: t.skills.design, delay: 0.1 },
    { title: t.skills.cats.code, items: t.skills.code, delay: 0.2 },
    { title: t.skills.cats.soft, items: t.skills.soft, delay: 0.3 }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden px-[6vw] py-[120px]"
    >
      <Reveal>
        <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {t.skills.eyebrow}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="section-title">{t.skills.title}</h2>
      </Reveal>

      <div className="mt-10 grid items-center gap-20 lg:grid-cols-2">
        {/* Skill bar groups */}
        <div className="flex flex-col gap-9">
          {groups.map((g) => (
            <Reveal key={g.title} delay={g.delay}>
              <div>
                <h4
                  className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-cool"
                  style={{ direction: isAr ? "rtl" : "ltr" }}
                >
                  {g.title}
                </h4>
                {g.items.map((s) => (
                  <div key={s.name} className="mb-3.5">
                    <div
                      className="mb-1.5 flex items-center justify-between font-mono text-[12px] tracking-wide text-paper/85"
                      style={{ direction: isAr ? "rtl" : "ltr" }}
                    >
                      <span>{s.name}</span>
                      <span className="text-warm">{s.value}</span>
                    </div>
                    <div className="relative h-[2px] overflow-hidden bg-white/[0.08]">
                      <div
                        className="h-full bg-gradient-to-r from-warm to-cool shadow-[0_0_12px_var(--warm)]"
                        style={{
                          width: active ? `${s.value}%` : "0%",
                          transition:
                            "width 1.4s cubic-bezier(.2,.8,.2,1) " +
                            (s.value / 800).toFixed(2) +
                            "s"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Radial chart */}
        <Reveal blur delay={0.2}>
          <div className="flex w-full items-center justify-center">
            <RadialChart axes={t.skills.radar} active={active} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RadialChart({
  axes,
  active
}: {
  axes: { label: string; v: number }[];
  active: boolean;
}) {
  const N = axes.length;
  const R = 130;

  const points = axes.map((a, i) => {
    const ang = -Math.PI / 2 + (i / N) * Math.PI * 2;
    const r = R * a.v;
    return { x: Math.cos(ang) * r, y: Math.sin(ang) * r, ang, v: a.v };
  });
  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      viewBox="-220 -220 440 440"
      className="w-full max-w-[480px]"
      style={{
        filter:
          "drop-shadow(0 0 40px color-mix(in srgb, var(--warm) 40%, transparent))"
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="rad-grad" x1="0" x2="1">
          <stop offset="0" stopColor="var(--warm)" />
          <stop offset="1" stopColor="var(--cool)" />
        </linearGradient>
      </defs>
      {/* Concentric guides */}
      <circle r="40" fill="none" stroke="rgba(255,255,255,0.08)" />
      <circle r="70" fill="none" stroke="rgba(255,255,255,0.08)" />
      <circle r="100" fill="none" stroke="rgba(255,255,255,0.08)" />
      <circle r="130" fill="none" stroke="rgba(255,255,255,0.06)" />
      {/* Axes + labels */}
      {axes.map((a, i) => {
        const ang = -Math.PI / 2 + (i / N) * Math.PI * 2;
        const xl = Math.cos(ang) * R;
        const yl = Math.sin(ang) * R;
        const lx = Math.cos(ang) * (R + 28);
        const ly = Math.sin(ang) * (R + 28);
        return (
          <g key={a.label}>
            <line
              x1="0"
              y1="0"
              x2={xl}
              y2={yl}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="2"
              fill="rgba(255,255,255,0.6)"
            >
              {a.label.toUpperCase()}
            </text>
            <circle
              cx={Math.cos(ang) * R * a.v}
              cy={Math.sin(ang) * R * a.v}
              r="3"
              fill="var(--warm)"
            />
          </g>
        );
      })}
      {/* Active polygon */}
      <polygon
        points={polyPoints}
        fill="url(#rad-grad)"
        fillOpacity="0.18"
        stroke="url(#rad-grad)"
        strokeWidth="1.5"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform 1.6s cubic-bezier(.2,.8,.2,1), opacity 1.6s",
          transform: active ? "scale(1)" : "scale(0)",
          opacity: active ? 1 : 0,
          filter: "drop-shadow(0 0 8px var(--warm))"
        }}
      />
      <circle r="3" fill="var(--warm)" />
    </svg>
  );
}
