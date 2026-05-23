import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a090b",
          900: "#111111",
          800: "#1a1a1a",
        },
        lime: {
          DEFAULT: "#d9ff6b",
        },
        lavender: {
          DEFAULT: "#d28eff",
          600: "#c277ff",
        },
        prize: {
          purple: "#7A4DFF",
          peach: "#FFB084",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1440px",
      },
      letterSpacing: {
        wideish: "0.88px",
        oval: "5px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 75s linear infinite",
        "float-y": "floatY 6s ease-in-out infinite",
        "spin-slow": "spinSlow 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
