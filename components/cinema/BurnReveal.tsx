"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import clsx from "clsx";

/**
 * BurnReveal — splits text into words and reveals them with a film-burn
 * effect (blur + brightness + translate up).
 */
export default function BurnReveal({
  text,
  className,
  delay = 0,
  perWordDelay = 0.08,
  trigger = "view"
}: {
  text: string;
  className?: string;
  delay?: number;
  perWordDelay?: number;
  trigger?: "view" | "mount";
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(trigger === "mount");

  useEffect(() => {
    if (trigger === "mount") {
      const t = setTimeout(() => setShown(true), 50);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={clsx("inline-block", className)}>
      {words.map((w, i) => {
        const style: CSSProperties = {
          ["--d" as never]: `${delay + i * perWordDelay}s`
        };
        return (
          <span
            key={`${w}-${i}`}
            className={clsx("burn-word mr-[0.25em] last:mr-0", shown && "in")}
            style={style}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}
