import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
        "gray-rgb": "var(--gray-rgb)",
        "gray-alpha-200": "var(--gray-alpha-200)",
        "gray-alpha-100": "var(--gray-alpha-100)",
        "button-primary-hover": "var(--button-primary-hover)",
        "button-secondary-hover": "var(--button-secondary-hover)",
      },
      fontFamily: {
        sans: ["Geist"],
        mono: ["Geist Mono"],
      },
    },
  },
  plugins: [],
};
export default config;
