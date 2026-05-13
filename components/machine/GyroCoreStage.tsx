"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import type { Group, InstancedMesh, Mesh } from "three";
import { Color, Object3D } from "three";
import { useCannonSpringScalar } from "@/components/machine/useCannonSpring";
import { useDeviceProfile } from "@/components/machine/useDeviceProfile";

type GyroCoreStageProps = {
  className?: string;
};

export default function GyroCoreStage({ className }: GyroCoreStageProps) {
  const profile = useDeviceProfile();

  if (profile.isReducedMotion) {
    return <div className={`gyro-core-stage gyro-core-stage--static ${className ?? ""}`} />;
  }

  return (
    <div className={`gyro-core-stage ${className ?? ""}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.2, 6.4], fov: profile.isMobile ? 46 : 39 }}
        dpr={profile.dpr}
        gl={{
          alpha: true,
          antialias: !profile.isMobile,
          depth: true,
          powerPreference: "high-performance",
          stencil: false
        }}
      >
        <color attach="background" args={["#04060d"]} />
        <fog attach="fog" args={["#04060d", 5, 11]} />
        <ambientLight intensity={0.54} />
        <directionalLight position={[3.5, 4, 4]} intensity={1.65} color="#d9f7ff" />
        <pointLight position={[-2.4, 1.8, 3]} intensity={2.8} color="#00e5ff" />
        <pointLight position={[2.4, -1.5, 2.4]} intensity={1.75} color="#ff2d95" />
        <GyroCore isMobile={profile.isMobile} particleCount={profile.particleBudget} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}

function GyroCore({
  isMobile,
  particleCount
}: {
  isMobile: boolean;
  particleCount: number;
}) {
  const rootRef = useRef<Group>(null);
  const innerRef = useRef<Group>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const ringC = useRef<Mesh>(null);
  const scrollTarget = useRef(0);
  const scrollMass = useCannonSpringScalar(scrollTarget, {
    mass: 1.35,
    stiffness: 66,
    damping: 0.68
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();

    const update = () => {
      const now = performance.now();
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const dt = Math.max(16, now - lastT);
      const velocity = (window.scrollY - lastY) / dt;
      const impulse = Math.max(-0.28, Math.min(0.28, velocity * 0.045));

      scrollTarget.current = progress + impulse;
      lastY = window.scrollY;
      lastT = now;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const force = scrollMass.current;
    const torque = Math.abs(force) * 1.85;

    if (rootRef.current) {
      rootRef.current.rotation.y += delta * (0.16 + torque);
      rootRef.current.rotation.x = Math.sin(t * 0.36) * 0.09 + force * 0.34;
      rootRef.current.position.y = -0.1 - force * 0.34;
      rootRef.current.position.x = isMobile ? 0 : 1.15 - force * 0.42;
    }

    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * (0.46 + torque * 1.2);
      innerRef.current.rotation.y += delta * (0.22 + torque);
    }

    if (ringA.current) ringA.current.rotation.x += delta * (0.55 + torque * 2.4);
    if (ringB.current) ringB.current.rotation.y -= delta * (0.42 + torque * 1.9);
    if (ringC.current) ringC.current.rotation.z += delta * (0.34 + torque * 1.55);
  });

  const ringSegments = isMobile ? 54 : 96;
  const rodCount = isMobile ? 4 : 8;

  return (
    <group ref={rootRef} position={[isMobile ? 0 : 1.15, -0.1, 0]} scale={isMobile ? 0.84 : 1}>
      <StructuralGrid isMobile={isMobile} />

      <group ref={innerRef}>
        <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.42, 0.012, 8, ringSegments]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.42}
            metalness={0.74}
            roughness={0.28}
          />
        </mesh>

        <mesh ref={ringB} rotation={[0, Math.PI / 2.8, 0.2]}>
          <torusGeometry args={[1.08, 0.01, 8, ringSegments]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.34}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        <mesh ref={ringC} rotation={[0.82, 0.2, Math.PI / 2]}>
          <torusGeometry args={[0.72, 0.009, 8, ringSegments]} />
          <meshStandardMaterial
            color="#ff2d95"
            emissive="#ff2d95"
            emissiveIntensity={0.32}
            metalness={0.68}
            roughness={0.34}
          />
        </mesh>

        {Array.from({ length: rodCount }, (_, i) => {
          const angle = (i / rodCount) * Math.PI * 2;
          return (
            <group key={angle} rotation={[0, 0, angle]}>
              <mesh position={[0.86, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.008, 0.008, 1.72, 6]} />
                <meshBasicMaterial color="#e6eeff" transparent opacity={0.38} />
              </mesh>
              <mesh position={[1.68, 0, 0]}>
                <sphereGeometry args={[0.032, 10, 10]} />
                <meshStandardMaterial color="#e6eeff" emissive="#00e5ff" emissiveIntensity={0.3} />
              </mesh>
            </group>
          );
        })}

        <mesh>
          <icosahedronGeometry args={[0.38, isMobile ? 1 : 2]} />
          <meshStandardMaterial
            color="#e6eeff"
            emissive="#00e5ff"
            emissiveIntensity={0.28}
            metalness={0.82}
            roughness={0.2}
          />
        </mesh>

        <mesh rotation={[0.8, 0.3, 0.1]}>
          <boxGeometry args={[0.72, 0.06, 0.72]} />
          <meshStandardMaterial
            color="#07111d"
            emissive="#a78bfa"
            emissiveIntensity={0.12}
            metalness={0.86}
            roughness={0.22}
          />
        </mesh>
      </group>

      {particleCount > 0 && <OrbitingNodes count={particleCount} isMobile={isMobile} />}
    </group>
  );
}

function StructuralGrid({ isMobile }: { isMobile: boolean }) {
  return (
    <group position={[0, -1.62, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[isMobile ? 4.8 : 6.8, isMobile ? 2.8 : 3.8, 10, 6]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={isMobile ? 0.1 : 0.16} />
      </mesh>
      <mesh position={[0, 0, 0.014]}>
        <ringGeometry args={[1.84, 1.852, isMobile ? 48 : 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={isMobile ? 0.14 : 0.22} />
      </mesh>
    </group>
  );
}

function OrbitingNodes({ count, isMobile }: { count: number; isMobile: boolean }) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const color = useMemo(() => new Color("#00e5ff"), []);

  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        phase: (i / count) * Math.PI * 2,
        radius: 1.72 + ((i * 17) % 10) * 0.045,
        lift: (((i * 11) % 9) - 4) * 0.055,
        scale: 0.018 + ((i * 7) % 5) * 0.004,
        speed: 0.18 + ((i * 5) % 7) * 0.035
      })),
    [count]
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime();
    nodes.forEach((node, i) => {
      const a = node.phase + t * node.speed;
      dummy.position.set(
        Math.cos(a) * node.radius,
        Math.sin(a * 1.7) * 0.28 + node.lift,
        Math.sin(a) * node.radius * 0.34
      );
      dummy.scale.setScalar(isMobile ? node.scale * 0.82 : node.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00e5ff" transparent opacity={0.82} />
    </instancedMesh>
  );
}
