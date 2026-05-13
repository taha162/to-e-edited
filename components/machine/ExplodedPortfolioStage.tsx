"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import type { Group } from "three";
import { useCannonSpringScalar } from "@/components/machine/useCannonSpring";
import { useDeviceProfile } from "@/components/machine/useDeviceProfile";

type AccentName = "warm" | "cool" | "neon";

type ExplodedPortfolioStageProps = {
  index: number;
  color?: string;
};

type PartKind = "box" | "cylinder" | "torus";

type AssemblyPartSpec = {
  id: string;
  kind: PartKind;
  size: [number, number, number];
  assembled: [number, number, number];
  exploded: [number, number, number];
  rotation?: [number, number, number];
  explodedRotation?: [number, number, number];
  color: string;
  emissive?: string;
  opacity?: number;
  delay: number;
  wireframe?: boolean;
};

const palettes: Record<AccentName, { accent: string; soft: string; deep: string }> = {
  warm: { accent: "#00e5ff", soft: "#22d3ee", deep: "#061927" },
  cool: { accent: "#a78bfa", soft: "#7c3aed", deep: "#100b24" },
  neon: { accent: "#ff2d95", soft: "#f472b6", deep: "#240717" }
};

export default function ExplodedPortfolioStage({
  index,
  color = "warm"
}: ExplodedPortfolioStageProps) {
  const profile = useDeviceProfile();
  const accentName: AccentName =
    color === "cool" || color === "neon" || color === "warm" ? color : "warm";
  const palette = palettes[accentName];

  if (profile.isReducedMotion) {
    return (
      <div className="exploded-stage exploded-stage--static" aria-hidden>
        <span style={{ background: palette.accent }} />
      </div>
    );
  }

  return (
    <div className="exploded-stage" aria-hidden>
      <Canvas
        camera={{ position: [0, 1.1, profile.isMobile ? 5.9 : 5.2], fov: profile.isMobile ? 48 : 42 }}
        dpr={profile.dpr}
        gl={{
          alpha: true,
          antialias: !profile.isMobile,
          depth: true,
          powerPreference: "high-performance",
          stencil: false
        }}
      >
        <ambientLight intensity={0.68} />
        <directionalLight position={[3, 4, 4]} intensity={1.35} color="#ffffff" />
        <pointLight position={[-2, 2, 3]} intensity={2.4} color={palette.accent} />
        <pointLight position={[2.5, -1, 2]} intensity={1.4} color={palette.soft} />
        <ExplodedAssembly index={index} palette={palette} isMobile={profile.isMobile} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}

function ExplodedAssembly({
  index,
  palette,
  isMobile
}: {
  index: number;
  palette: { accent: string; soft: string; deep: string };
  isMobile: boolean;
}) {
  const rootRef = useRef<Group>(null);
  const target = useRef(0);
  const progress = useCannonSpringScalar(target, {
    mass: 0.88,
    stiffness: 92,
    damping: 0.58
  });

  useEffect(() => {
    target.current = 0;
    const id = window.setTimeout(() => {
      target.current = 1;
    }, 80);
    return () => window.clearTimeout(id);
  }, [index, target]);

  useFrame(({ clock }, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const t = clock.getElapsedTime();
    const p = Math.min(1.15, Math.max(0, progress.current));
    root.rotation.y += delta * (0.08 + p * 0.1);
    root.rotation.x = -0.14 + Math.sin(t * 0.32) * 0.025;
    root.position.y = isMobile ? -0.12 : -0.02;
  });

  const parts = useMemo(
    () => createParts(index, palette, isMobile),
    [index, isMobile, palette]
  );

  return (
    <group ref={rootRef} scale={isMobile ? 0.82 : 1}>
      <mesh position={[0, -1.15, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 2.4, 8, 5]} />
        <meshBasicMaterial color={palette.accent} wireframe transparent opacity={isMobile ? 0.09 : 0.14} />
      </mesh>

      {parts.map((part) => (
        <AssemblyPart key={part.id} part={part} progress={progress} />
      ))}
    </group>
  );
}

function AssemblyPart({
  part,
  progress
}: {
  part: AssemblyPartSpec;
  progress: MutableRefObject<number>;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;

    const raw = (progress.current - part.delay) / Math.max(0.001, 1 - part.delay);
    const p = Math.min(1.12, Math.max(0, raw));
    const eased = p * p * (3 - 2 * Math.min(1, p));
    const recoil = Math.sin(Math.min(1, p) * Math.PI) * 0.045;
    const amount = eased + recoil;

    group.position.set(
      lerp(part.assembled[0], part.exploded[0], amount),
      lerp(part.assembled[1], part.exploded[1], amount),
      lerp(part.assembled[2], part.exploded[2], amount)
    );

    const base = part.rotation ?? [0, 0, 0];
    const open = part.explodedRotation ?? base;
    group.rotation.set(
      lerp(base[0], open[0], amount) + Math.sin(clock.elapsedTime * 0.7 + part.delay * 9) * 0.008 * p,
      lerp(base[1], open[1], amount),
      lerp(base[2], open[2], amount)
    );
  });

  return (
    <group ref={ref} position={part.assembled} rotation={part.rotation}>
      <PartMesh part={part} />
    </group>
  );
}

function PartMesh({ part }: { part: AssemblyPartSpec }) {
  const material = (
    <meshStandardMaterial
      color={part.color}
      emissive={part.emissive ?? part.color}
      emissiveIntensity={part.emissive ? 0.18 : 0.06}
      metalness={0.72}
      roughness={0.28}
      transparent={typeof part.opacity === "number"}
      opacity={part.opacity ?? 1}
      wireframe={part.wireframe}
    />
  );

  if (part.kind === "cylinder") {
    return (
      <mesh>
        <cylinderGeometry args={[part.size[0], part.size[1], part.size[2], 12]} />
        {material}
      </mesh>
    );
  }

  if (part.kind === "torus") {
    return (
      <mesh>
        <torusGeometry args={[part.size[0], part.size[1], 8, 52]} />
        {material}
      </mesh>
    );
  }

  return (
    <mesh>
      <boxGeometry args={part.size} />
      {material}
    </mesh>
  );
}

function createParts(
  index: number,
  palette: { accent: string; soft: string; deep: string },
  isMobile: boolean
): AssemblyPartSpec[] {
  const spread = isMobile ? 0.78 : 1;
  const twist = (index - 1.5) * 0.08;
  const zLift = (index % 2 === 0 ? 1 : -1) * 0.16;

  return [
    {
      id: "base-plate",
      kind: "box",
      size: [2.45, 0.08, 1.36],
      assembled: [0, -0.2, 0],
      exploded: [0, -0.72 * spread, -0.46],
      explodedRotation: [0.06, twist, 0],
      color: palette.deep,
      emissive: palette.accent,
      delay: 0
    },
    {
      id: "glass-plane",
      kind: "box",
      size: [2.1, 0.035, 1.02],
      assembled: [0, -0.1, 0.04],
      exploded: [0, 0.48 * spread, 0.64 + zLift],
      explodedRotation: [-0.18, -twist, 0],
      color: "#e6eeff",
      emissive: palette.soft,
      opacity: 0.36,
      delay: 0.05
    },
    {
      id: "data-core",
      kind: "torus",
      size: [0.38, 0.016, 0],
      assembled: [0, 0.02, 0.12],
      exploded: [0, 0.86 * spread, 0.12],
      rotation: [Math.PI / 2, 0, 0],
      explodedRotation: [Math.PI / 2 + 0.4, 0.32, 0],
      color: palette.accent,
      emissive: palette.accent,
      delay: 0.1
    },
    {
      id: "left-rail",
      kind: "box",
      size: [0.08, 0.18, 1.36],
      assembled: [-1.3, -0.05, 0],
      exploded: [-1.88 * spread, 0.12, 0.2],
      explodedRotation: [0, -0.22, 0.08],
      color: palette.accent,
      emissive: palette.accent,
      delay: 0.12
    },
    {
      id: "right-rail",
      kind: "box",
      size: [0.08, 0.18, 1.36],
      assembled: [1.3, -0.05, 0],
      exploded: [1.88 * spread, 0.12, 0.2],
      explodedRotation: [0, 0.22, -0.08],
      color: palette.accent,
      emissive: palette.accent,
      delay: 0.12
    },
    {
      id: "signal-spine",
      kind: "box",
      size: [1.64, 0.05, 0.08],
      assembled: [0, 0.03, -0.46],
      exploded: [0, 0.32 * spread, -0.92],
      color: palette.soft,
      emissive: palette.soft,
      delay: 0.18
    },
    {
      id: "logic-slab-a",
      kind: "box",
      size: [0.52, 0.06, 0.35],
      assembled: [-0.46, 0.04, 0.08],
      exploded: [-0.76 * spread, 0.72 * spread, 0.32],
      explodedRotation: [0.18, -0.36, -0.05],
      color: "#0b1624",
      emissive: palette.accent,
      delay: 0.2
    },
    {
      id: "logic-slab-b",
      kind: "box",
      size: [0.52, 0.06, 0.35],
      assembled: [0.46, 0.04, 0.08],
      exploded: [0.76 * spread, 0.72 * spread, 0.32],
      explodedRotation: [0.18, 0.36, 0.05],
      color: "#0b1624",
      emissive: palette.soft,
      delay: 0.24
    },
    ...boltParts(palette, spread)
  ];
}

function boltParts(
  palette: { accent: string; soft: string; deep: string },
  spread: number
): AssemblyPartSpec[] {
  const corners: Array<[number, number, number]> = [
    [-1.02, 0.02, -0.5],
    [1.02, 0.02, -0.5],
    [-1.02, 0.02, 0.5],
    [1.02, 0.02, 0.5]
  ];

  return corners.map(([x, y, z], i) => ({
    id: `bolt-${i}`,
    kind: "cylinder",
    size: [0.045, 0.045, 0.08],
    assembled: [x, y, z],
    exploded: [x * (1.25 + 0.15 * spread), 0.36 * spread + i * 0.025, z * (1.35 + 0.1 * spread)],
    rotation: [Math.PI / 2, 0, 0],
    explodedRotation: [Math.PI / 2, i % 2 === 0 ? 0.42 : -0.42, 0],
    color: i % 2 === 0 ? palette.accent : palette.soft,
    emissive: i % 2 === 0 ? palette.accent : palette.soft,
    delay: 0.22 + i * 0.04
  }));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
