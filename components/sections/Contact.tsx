"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/cinema/Reveal";

const channels = [
  { key: "email", v: "tahajasim.info@gmail.com", href: "mailto:tahajasim.info@gmail.com" },
  { key: "phone", v: "+964 770 394 7744", href: "tel:+9647703947744" },
  { key: "linkedin", v: "in/tjd162", href: "https://linkedin.com/in/tjd162" },
  { key: "github", v: "github.com/taha162", href: "https://github.com/taha162" },
  { key: "web", v: "tjd162.vercel.app", href: "https://tjd162.vercel.app" }
] as const;

export default function Contact() {
  const { t, locale } = useLang();
  const isAr = locale === "ar";
  const [burst, setBurst] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBurst(true);
    setTimeout(() => setBurst(false), 2200);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section
      id="contact"
      className="relative grid min-h-svh items-center gap-20 overflow-hidden px-[6vw] py-[120px] lg:grid-cols-2"
    >
      {/* Left — info */}
      <div>
        <Reveal>
          <div className="eyebrow" style={{ direction: isAr ? "rtl" : "ltr" }}>
            {t.contact.eyebrow}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-title">{t.contact.title}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="max-w-[46ch] text-paper/70"
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              direction: isAr ? "rtl" : "ltr"
            }}
          >
            {t.contact.lead}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-0">
          {channels.map((c, i) => {
            const label = t.contact.labels[c.key];
            return (
              <Reveal key={c.key} delay={0.2 + i * 0.05}>
                <div
                  className="flex flex-col gap-1 border-b border-white/[0.08] py-4"
                  style={{ direction: "ltr" }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool"
                    style={{ direction: isAr ? "rtl" : "ltr" }}
                  >
                    {label}
                  </div>
                  <a
                    href={c.href}
                    target={c.key === "email" || c.key === "phone" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="text-[18px] text-white transition-colors hover:text-warm"
                    data-cursor
                  >
                    {c.v}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Right — form */}
      <Reveal blur delay={0.2}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <Field label={t.contact.form.name} id="cf-name" type="text" autoComplete="name" />
          <Field label={t.contact.form.email} id="cf-email" type="email" autoComplete="email" />
          <Field label={t.contact.form.message} id="cf-msg" textarea />
          <button
            type="submit"
            data-cursor
            className="group relative isolate self-start overflow-hidden border border-warm bg-transparent px-9 py-[18px] font-mono text-[12px] uppercase tracking-[0.3em] text-warm transition-colors duration-300 hover:text-black"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 -translate-x-full bg-warm transition-transform duration-[400ms] ease-[cubic-bezier(.86,0,.07,1)] group-hover:translate-x-0"
            />
            {t.contact.form.send}
          </button>
        </form>
      </Reveal>

      {/* Burst overlay on submit */}
      {burst && (
        <div
          className="fixed inset-0 z-[9700] flex items-center justify-center bg-black/85 backdrop-blur-xl"
          style={{ animation: "burstIn 0.6s" }}
        >
          <div
            className="font-display text-warm"
            style={{
              fontSize: 120,
              textShadow: "0 0 80px var(--warm), 0 0 160px var(--warm)",
              animation: "burstScale 1.2s cubic-bezier(.2,.8,.2,1)"
            }}
          >
            {t.contact.form.sent}
          </div>
        </div>
      )}

      {/* Local keyframes for burst */}
      <style jsx>{`
        @keyframes burstIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes burstScale {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  autoComplete,
  textarea = false
}: {
  label: string;
  id: string;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const baseCls =
    "border-0 border-b border-white/20 bg-transparent px-0 py-3 text-[18px] text-white outline-none transition-colors duration-300 focus:border-warm";
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool">
        {label}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required
          className={`${baseCls} min-h-[120px] resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required
          autoComplete={autoComplete}
          className={baseCls}
        />
      )}
    </label>
  );
}
