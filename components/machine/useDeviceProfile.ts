"use client";

import { useEffect, useState } from "react";

export type MachineQuality = "high" | "mobile" | "reduced";

export type DeviceProfile = {
  isMobile: boolean;
  isReducedMotion: boolean;
  quality: MachineQuality;
  dpr: [number, number];
  particleBudget: number;
};

const initialProfile: DeviceProfile = {
  isMobile: false,
  isReducedMotion: false,
  quality: "high",
  dpr: [1, 1.65],
  particleBudget: 36
};

export function useDeviceProfile() {
  const [profile, setProfile] = useState<DeviceProfile>(initialProfile);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 820px), (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const read = () => {
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        hardwareConcurrency?: number;
      };
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
      const lowCores =
        typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
      const isMobile = mobileQuery.matches || lowMemory || lowCores;
      const isReducedMotion = motionQuery.matches;
      const quality: MachineQuality = isReducedMotion
        ? "reduced"
        : isMobile
          ? "mobile"
          : "high";

      setProfile({
        isMobile,
        isReducedMotion,
        quality,
        dpr: isReducedMotion ? [1, 1] : isMobile ? [1, 1.2] : [1, 1.65],
        particleBudget: isReducedMotion ? 0 : isMobile ? 12 : 36
      });
    };

    read();
    mobileQuery.addEventListener("change", read);
    motionQuery.addEventListener("change", read);

    return () => {
      mobileQuery.removeEventListener("change", read);
      motionQuery.removeEventListener("change", read);
    };
  }, []);

  return profile;
}
