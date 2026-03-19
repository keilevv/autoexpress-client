/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0D10",
        surface: "#11151B",
        border: "rgba(255,255,255,0.08)",
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255,255,255,0.72)",
        muted: "rgba(255,255,255,0.52)",
        accent: "#E10600",
        "accent-hover": "#FF1C14",
        whatsapp: "#22C55E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        btn: "12px",
        card: "16px",
      },
    },
  },
  plugins: [],
};
