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
        cream: {
          50: "#FAF9F5",
          100: "#F8F6F0",
          200: "#F0ECE1",
          300: "#E5DEC9",
          DEFAULT: "#F8F6F0",
        },
        brand: {
          deep: "#38205F",
          primary: "#6845A0",
          hover: "#553685",
          light: "#825FBD",
          lavender: "#DCD4EC",
          subtle: "#F4F0FA",
        },
        teal: {
          50: "#F2F8F8",
          100: "#E1EFEB",
          200: "#B9DDD8",
          DEFAULT: "#2E7775",
          dark: "#215958",
          accent: "#3BA19E",
        },
        charcoal: {
          DEFAULT: "#25232B",
          light: "#4B4755",
          muted: "#767283",
        },
        border: {
          DEFAULT: "#E5E1E8",
          subtle: "#ECE8EE",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(56, 32, 95, 0.05), 0 4px 16px -4px rgba(56, 32, 95, 0.06)",
        cardHover: "0 6px 20px -4px rgba(56, 32, 95, 0.1), 0 12px 32px -8px rgba(46, 119, 117, 0.08)",
        elevation: "0 10px 30px -10px rgba(56, 32, 95, 0.12)",
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
