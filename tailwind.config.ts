import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Anton", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        arabic: ["var(--font-arabic)", "Tajawal", "system-ui", "sans-serif"]
      },
      colors: {
        ink: {
          DEFAULT: "#04060d",
          950: "#04060d",
          900: "#0a0e1a",
          800: "#0f1422",
          700: "#161c2e",
          600: "#1f2540",
          500: "#2a3050"
        },
        paper: "#e6eeff",
        // Tech tokens (kept under legacy names to minimise diff)
        warm: {
          DEFAULT: "#00E5FF",
          soft: "#22D3EE"
        },
        cool: {
          DEFAULT: "#A78BFA",
          soft: "#7C3AED"
        },
        neon: {
          DEFAULT: "#FF2D95",
          soft: "#F472B6"
        },
        aurora: {
          violet: "#A78BFA",
          indigo: "#818CF8",
          cyan: "#22D3EE",
          pink: "#F472B6",
          mint: "#34D399"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(167,139,250,0.15), 0 8px 30px rgba(167,139,250,0.18)",
        "glow-lg": "0 0 0 1px rgba(167,139,250,0.18), 0 30px 80px rgba(167,139,250,0.25)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.18), 0 20px 60px rgba(34,211,238,0.20)",
        elevate: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 80px -20px rgba(0,0,0,0.7)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "aurora-1":
          "radial-gradient(60% 60% at 20% 20%, rgba(167,139,250,0.35) 0%, transparent 60%), radial-gradient(50% 50% at 80% 30%, rgba(34,211,238,0.28) 0%, transparent 60%), radial-gradient(60% 60% at 50% 90%, rgba(244,114,182,0.22) 0%, transparent 60%)",
        grid:
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        grain: {
          "0%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-3%,2%)" },
          "40%": { transform: "translate(2%,-2%)" },
          "60%": { transform: "translate(-1%,3%)" },
          "80%": { transform: "translate(3%,-1%)" },
          "100%": { transform: "translate(0,0)" }
        },
        leakDrift: {
          "0%": { transform: "translate(0,0) rotate(0deg)", opacity: "0.7" },
          "100%": { transform: "translate(-4%,3%) rotate(2deg)", opacity: "1" }
        },
        auroraPulse: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(-3%,2%) scale(1.08)" }
        },
        pulseRec: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" }
        },
        cueDown: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        float: "float 6s ease-in-out infinite",
        grain: "grain 1.2s steps(6) infinite",
        leakDrift: "leakDrift 18s ease-in-out infinite alternate",
        leakDriftSlow: "leakDrift 28s ease-in-out infinite alternate",
        auroraPulse: "auroraPulse 12s ease-in-out infinite alternate",
        auroraPulseSlow: "auroraPulse 18s ease-in-out infinite alternate",
        pulseRec: "pulseRec 1.6s ease-in-out infinite",
        cueDown: "cueDown 2s ease-in-out infinite",
        marquee: "marquee 40s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
