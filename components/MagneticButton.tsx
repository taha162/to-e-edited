"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  intensity?: number;
};

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  intensity = 0.25
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) * intensity);
    my.set((e.clientY - cy) * intensity);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const baseClass = clsx(
    "btn-glow group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
    className
  );

  if (href) {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x, y }}
        className={baseClass}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as any}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x, y }}
      className={baseClass}
    >
      {children}
    </motion.button>
  );
}
