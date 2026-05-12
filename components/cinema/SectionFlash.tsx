"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Fire the flash when this fraction of the section is visible. */
  threshold?: number;
};

/**
 * SectionFlash — wraps any element and triggers the existing `.section-flash`
 * → `.fired` CSS animation a single time when the section enters the viewport.
 * Used to give every section a consistent cinematic "cut to" entry.
 */
export default function SectionFlash({
  children,
  className,
  style,
  threshold = 0.18
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.remove("section-flash");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("fired");
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`section-flash ${className ?? ""}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
