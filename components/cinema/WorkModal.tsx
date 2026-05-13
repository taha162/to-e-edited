"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/components/LanguageProvider";
import ExplodedPortfolioStage from "@/components/machine/ExplodedPortfolioStage";

export type WorkDetail = {
  tag: string;
  h: string;
  p: string;
  year?: string;
  role?: string;
  client?: string;
  tools?: string[];
  color?: string;
  summary?: string;
  highlights?: string[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  work: WorkDetail | null;
  index: number;
  total: number;
};

/**
 * WorkModal — cinematic case-study popover.
 *
 *   - Locks body scroll while open.
 *   - Closes on ESC, on backdrop click, on Close button click.
 *   - Renders a film-frame chrome (corner brackets, REC dot, timecode).
 *   - Bilingual via useLang().
 */
export default function WorkModal({
  open,
  onClose,
  work,
  index,
  total
}: Props) {
  const { t, locale } = useLang();
  const isAr = locale === "ar";
  const dialogRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close + initial focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Focus the dialog so screen readers and keyboard users land inside.
    const id = window.setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  if (!open || !work) return null;

  // Color accent — fall back to warm
  const accent =
    work.color === "cool"
      ? "var(--cool)"
      : work.color === "neon"
        ? "var(--neon)"
        : "var(--warm)";
  const accentSoft =
    work.color === "cool"
      ? "var(--cool-soft)"
      : work.color === "neon"
        ? "var(--neon-soft)"
        : "var(--warm-soft)";

  const labels = t.works.labels;
  const totalStr = String(total).padStart(2, "0");
  const idxStr = String(index + 1).padStart(2, "0");

  return (
    <div
      className="work-modal"
      role="dialog"
      aria-modal="true"
      aria-label={work.h}
      style={{ ["--accent" as never]: accent, ["--accent-soft" as never]: accentSoft }}
    >
      <button
        type="button"
        className="work-modal__backdrop"
        aria-label={labels.close}
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="work-modal__frame"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Frame corners */}
        {[
          "left-3 top-3 border-t border-l",
          "right-3 top-3 border-t border-r",
          "left-3 bottom-3 border-b border-l",
          "right-3 bottom-3 border-b border-r"
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`pointer-events-none absolute h-6 w-6 ${pos}`}
            style={{ borderColor: accent }}
          />
        ))}

        {/* HUD top-bar */}
        <div
          className="work-modal__hud"
          style={{ direction: "ltr" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 animate-pulseRec rounded-full"
              style={{
                background: accent,
                boxShadow: `0 0 10px ${accent}`
              }}
            />
            <span className="text-[10px] uppercase tracking-[0.32em] text-paper/70">
              REC · CASE {idxStr} / {totalStr}
            </span>
          </div>

          <button
            type="button"
            className="work-modal__close"
            onClick={onClose}
            data-cursor
            aria-label={labels.close}
          >
            <span aria-hidden>×</span>
            <span className="text-[10px] uppercase tracking-[0.3em]">
              {labels.close}
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="work-modal__body">
          {/* Visual side */}
          <div className="work-modal__visual">
            <div
              className="work-modal__art work-modal__art--machine"
              style={{
                background: `radial-gradient(60% 50% at 30% 30%, color-mix(in srgb, ${accent} 65%, transparent), transparent 70%), radial-gradient(50% 60% at 70% 70%, color-mix(in srgb, ${accentSoft} 55%, transparent), transparent 70%), linear-gradient(135deg, var(--ink-2), var(--ink))`
              }}
            >
              <ExplodedPortfolioStage index={index} color={work.color} />
              <span
                className="work-modal__big-num"
                style={{ color: `color-mix(in srgb, ${accent} 80%, #fff)` }}
              >
                {idxStr}
              </span>
              <span className="work-modal__tag">ASSEMBLY {idxStr}</span>
            </div>
          </div>

          {/* Text side */}
          <div className="work-modal__text">
            <div
              className="work-modal__eyebrow"
              style={{ color: accent, direction: isAr ? "rtl" : "ltr" }}
            >
              {work.tag}
            </div>

            <h3
              className={`work-modal__title ${isAr ? "arabic-display" : "font-display"}`}
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: isAr ? 1.1 : 0.95,
                letterSpacing: isAr ? 0 : "-0.01em"
              }}
            >
              {work.h}
            </h3>

            {work.summary && (
              <p
                className="work-modal__summary"
                style={{ direction: isAr ? "rtl" : "ltr" }}
              >
                {work.summary}
              </p>
            )}

            <dl className="work-modal__meta">
              {work.year && (
                <>
                  <dt>{labels.year}</dt>
                  <dd>{work.year}</dd>
                </>
              )}
              {work.role && (
                <>
                  <dt>{labels.role}</dt>
                  <dd>{work.role}</dd>
                </>
              )}
              {work.client && (
                <>
                  <dt>{labels.client}</dt>
                  <dd>{work.client}</dd>
                </>
              )}
              {work.tools && work.tools.length > 0 && (
                <>
                  <dt>{labels.tools}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {work.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/85"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </>
              )}
            </dl>

            {work.highlights && work.highlights.length > 0 && (
              <div className="work-modal__highlights">
                <div
                  className="work-modal__hl-label"
                  style={{ color: accent }}
                >
                  {labels.highlights}
                </div>
                <ul>
                  {work.highlights.map((h) => (
                    <li key={h} style={{ direction: isAr ? "rtl" : "ltr" }}>
                      <span
                        aria-hidden
                        className="work-modal__hl-bullet"
                        style={{ background: accent }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom timecode */}
        <div
          className="work-modal__footer"
          style={{ direction: "ltr" }}
        >
          <span>TJM · WORKS · {idxStr}/{totalStr}</span>
          <span style={{ color: accent }}>2.39 : 1 · CASE STUDY</span>
        </div>
      </div>

      <style jsx>{`
        .work-modal {
          position: fixed;
          inset: 0;
          z-index: 9700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(16px, 4vw, 48px);
          animation: modalIn 0.45s var(--ease-cinema) both;
        }
        .work-modal__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(14px) saturate(120%);
          -webkit-backdrop-filter: blur(14px) saturate(120%);
          border: none;
          padding: 0;
          cursor: pointer;
          animation: bdIn 0.45s var(--ease-cinema) both;
        }
        .work-modal__frame {
          position: relative;
          z-index: 1;
          width: min(1100px, 100%);
          max-height: min(86vh, 880px);
          overflow-y: auto;
          background:
            linear-gradient(180deg, var(--ink-2), var(--ink));
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
          border-radius: 6px;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.7),
            0 0 0 1px rgba(255, 255, 255, 0.06) inset,
            0 0 60px color-mix(in srgb, var(--accent) 20%, transparent);
          animation: frameIn 0.6s var(--ease-cinema) 0.05s both;
          outline: none;
        }
        .work-modal__hud {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 24px;
          background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--ink) 90%, transparent),
            transparent
          );
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .work-modal__close {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          cursor: pointer;
          transition:
            background 0.3s var(--ease-cinema),
            border-color 0.3s var(--ease-cinema),
            transform 0.3s var(--ease-cinema);
        }
        .work-modal__close:hover {
          background: color-mix(in srgb, var(--accent) 18%, transparent);
          border-color: var(--accent);
          transform: scale(1.04);
        }
        .work-modal__close span:first-child {
          font-size: 18px;
          line-height: 1;
        }
        .work-modal__body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          padding: 8px 28px 28px;
        }
        @media (min-width: 900px) {
          .work-modal__body {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 40px;
            padding: 8px 40px 40px;
          }
        }
        .work-modal__visual {
          position: relative;
        }
        .work-modal__art {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 4px;
          overflow: hidden;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .work-modal__art--machine {
          isolation: isolate;
        }
        .work-modal__art--machine::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(circle at 50% 45%, black, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at 50% 45%, black, transparent 75%);
        }
        .work-modal__big-num {
          position: absolute;
          top: 16px;
          inset-inline-end: 18px;
          z-index: 2;
          font-family: var(--font-bebas), Anton, Impact, sans-serif;
          font-size: clamp(80px, 14vw, 180px);
          line-height: 0.85;
          letter-spacing: -0.02em;
          opacity: 0.28;
          text-shadow:
            0 0 30px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .work-modal__tag {
          position: absolute;
          left: 16px;
          bottom: 16px;
          z-index: 2;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          padding: 6px 10px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .work-modal__text {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .work-modal__eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
        }
        .work-modal__title {
          color: #fff;
          text-transform: uppercase;
          margin: 4px 0 8px;
          text-wrap: balance;
        }
        .work-modal__summary {
          color: rgba(230, 238, 255, 0.78);
          font-size: clamp(15px, 1.05vw, 17px);
          line-height: 1.6;
          max-width: 60ch;
        }
        .work-modal__meta {
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 8px 18px;
          margin: 18px 0 6px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .work-modal__meta dt {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(230, 238, 255, 0.5);
          align-self: center;
        }
        .work-modal__meta dd {
          color: rgba(230, 238, 255, 0.92);
          font-size: 14px;
        }
        .work-modal__highlights {
          margin-top: 12px;
          padding: 18px;
          border: 1px dashed color-mix(in srgb, var(--accent) 30%, rgba(255, 255, 255, 0.1));
          border-radius: 4px;
          background: color-mix(in srgb, var(--accent) 5%, transparent);
        }
        .work-modal__hl-label {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .work-modal__highlights ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .work-modal__highlights li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(230, 238, 255, 0.86);
          font-size: 14px;
          line-height: 1.55;
        }
        .work-modal__hl-bullet {
          flex: 0 0 auto;
          width: 6px;
          height: 6px;
          margin-top: 8px;
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent);
        }
        .work-modal__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(230, 238, 255, 0.5);
        }
        @media (min-width: 900px) {
          .work-modal__footer { padding: 14px 40px; }
        }
        @keyframes bdIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes frameIn {
          0%   { opacity: 0; transform: scale(0.94) translateY(24px); filter: blur(24px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .work-modal,
          .work-modal__backdrop,
          .work-modal__frame {
            animation-duration: 0.001ms;
          }
        }
      `}</style>
    </div>
  );
}
