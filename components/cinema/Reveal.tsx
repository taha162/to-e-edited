"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from "react";
import clsx from "clsx";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "ul"
  | "li"
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

/**
 * Reveal — adds the `.in` class once the element scrolls into view, allowing
 * the CSS transitions in globals.css (`.reveal` / `.reveal-blur`) to fire.
 */
export default function Reveal({
  blur = false,
  delay = 0,
  className,
  style,
  children,
  tag = "div"
}: {
  blur?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  tag?: RevealTag;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
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
  }, []);

  const finalStyle: CSSProperties = {
    ...(style ?? {}),
    ["--d" as never]: `${delay}s`
  };
  const cls = clsx(blur ? "reveal-blur" : "reveal", shown && "in", className);

  return createElement(
    tag,
    {
      ref,
      className: cls,
      style: finalStyle
    },
    children
  );
}
