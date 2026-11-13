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
        forest: {
          50: "#F1F7F3",
          100: "#D8ECE0",
          200: "#B4DAC3",
          300: "#87C2A1",
          400: "#5CA880",
          500: "#3D8E60",
          600: "#2E734C",
          700: "#277A54",
          800: "#235339",
          850: "#1E4832",
          900: "#183826",
          950: "#0F2619",
        },
        craft: {
          tape: "#E5D9C2",
          paper: "#FCFBF7",
          card: "#F9F7F1",
          border: "#DED7C9",
          yellow: "#F4BF28",
          ochre: "#E69D1E",
        },
        cream: {
          50: "#FAF9F5",
          100: "#F8F6F0",
          200: "#F0ECE1",
          300: "#E5DEC9",
          DEFAULT: "#F8F6F0",
        },
        brand: {
          deep: "#1E4832",
          primary: "#235339",
          hover: "#183826",
          light: "#3D8E60",
          lavender: "#D8ECE0",
          subtle: "#F1F7F3",
        },
        teal: {
          50: "#F1F7F3",
          100: "#D8ECE0",
          200: "#B4DAC3",
          DEFAULT: "#277A54",
          dark: "#1E4832",
          accent: "#3D8E60",
        },
        charcoal: {
          DEFAULT: "#1C2520",
          light: "#3A4540",
          muted: "#65726B",
        },
        border: {
          DEFAULT: "#DED7C9",
          subtle: "#EAE5D9",
          grid: "rgba(140, 215, 170, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["Consolas", "Monaco", "Courier New", "monospace"],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(12, 30, 20, 0.08), 0 4px 16px -4px rgba(12, 30, 20, 0.06)",
        cardHover: "0 6px 20px -4px rgba(12, 30, 20, 0.14), 0 12px 32px -8px rgba(39, 122, 84, 0.12)",
        elevation: "0 10px 30px -10px rgba(12, 30, 20, 0.2)",
        tape: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
