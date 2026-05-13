"use client";

import { useEffect, useRef } from "react";
import { Body, Sphere, Vec3, World } from "cannon-es";

export default function ScrollMachineOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const world = new World({ gravity: new Vec3(0, 0, 0) });
    const body = new Body({
      mass: 1.25,
      linearDamping: 0.74,
      position: new Vec3(0, 0, 0)
    });
    body.addShape(new Sphere(0.04));
    world.addBody(body);

    let raf = 0;
    let frame = 0;
    const force = new Vec3();

    const tick = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const target = Math.min(1, Math.max(0, window.scrollY / max));
      const compression = target - body.position.x;

      force.set(compression * 86, 0, 0);
      body.applyForce(force, body.position);
      world.step(1 / 60, 1 / 60, 2);

      const progress = Math.min(1, Math.max(0, body.position.x));
      const torque = body.velocity.x;
      const load = Math.min(99, Math.round(Math.abs(torque) * 520));

      root.style.setProperty("--machine-progress", progress.toFixed(4));
      root.style.setProperty("--machine-angle", `${progress * 900 + torque * 70}deg`);
      root.style.setProperty("--machine-torque", torque.toFixed(4));
      root.style.setProperty("--machine-load", `${load}%`);

      if (readoutRef.current && frame % 8 === 0) {
        readoutRef.current.textContent = `${String(Math.round(progress * 100)).padStart(
          2,
          "0"
        )}% / ${String(load).padStart(2, "0")}N`;
      }

      frame += 1;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      world.removeBody(body);
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-machine" aria-hidden>
      <div className="scroll-machine__rail">
        <span />
      </div>
      <div className="scroll-machine__gear scroll-machine__gear--top" />
      <div className="scroll-machine__gear scroll-machine__gear--mid" />
      <div className="scroll-machine__readout">
        <strong>LOAD VECTOR</strong>
        <span ref={readoutRef}>00% / 00N</span>
      </div>
    </div>
  );
}
