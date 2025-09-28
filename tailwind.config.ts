import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-sans)", "sans-serif"],
        heading: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        geist: ["var(--font-geist)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
