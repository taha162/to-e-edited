"use client";

import { useFrame } from "@react-three/fiber";
import { Body, Sphere, Vec3, World } from "cannon-es";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";

type SpringOptions = {
  mass?: number;
  stiffness?: number;
  damping?: number;
  maxStep?: number;
};

export function useCannonSpringScalar(
  target: MutableRefObject<number>,
  options: SpringOptions = {}
) {
  const value = useRef(target.current);
  const stiffness = options.stiffness ?? 72;
  const maxStep = options.maxStep ?? 0.05;

  const force = useMemo(() => new Vec3(), []);
  const world = useMemo(() => {
    const w = new World({ gravity: new Vec3(0, 0, 0) });
    w.allowSleep = false;
    return w;
  }, []);
  const body = useMemo(() => {
    const b = new Body({
      mass: options.mass ?? 1,
      linearDamping: options.damping ?? 0.62,
      position: new Vec3(target.current, 0, 0)
    });
    b.addShape(new Sphere(0.04));
    world.addBody(b);
    return b;
  }, [options.damping, options.mass, target, world]);

  useEffect(() => {
    return () => {
      world.removeBody(body);
    };
  }, [body, world]);

  useFrame((_, delta) => {
    const error = target.current - body.position.x;
    force.set(error * stiffness, 0, 0);
    body.applyForce(force, body.position);
    world.step(1 / 60, Math.min(delta, maxStep), 2);
    value.current = body.position.x;
  });

  return value;
}
