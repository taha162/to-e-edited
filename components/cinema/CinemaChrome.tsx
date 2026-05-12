"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CinemaChrome — full-screen cinematic chrome:
 *  - Filmstrip top scroll progress
 *  - Letterbox bars (top/bottom)
 *  - Light leaks (warm + cool)
 *  - Vignette
 *  - Film grain (animated SVG noise)
 */
export default function CinemaChrome() {
  const fillRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
        fill.style.width = (p * 100).toFixed(2) + "%";
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="filmstrip" aria-hidden>
        <div ref={fillRef} />
      </div>
      <div className="cine-bar top" aria-hidden />
      <div className="cine-bar bot" aria-hidden />
      <div className="cine-leak" aria-hidden />
      <div className="cine-vignette" aria-hidden />
      <div className="cine-grain" aria-hidden />
    </>
  );
}

/**
 * CinematicCursor — dot + ring with screen blend mode.
 * Auto-disabled on touch devices and when reduced motion is preferred.
 */
export function CinematicCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;
    setEnabled(true);
    document.body.classList.add("cursor-cinema");
    return () => document.body.classList.remove("cursor-cinema");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dx = window.innerWidth / 2;
    let dy = window.innerHeight / 2;
    let rx = dx;
    let ry = dy;

    const onMove = (e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      dot.style.left = dx + "px";
      dot.style.top = dy + "px";
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.closest("a, button, [data-cursor], input, textarea, label") !==
        null;
      ring.classList.toggle("active", isInteractive);
    };

    let raf = 0;
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
