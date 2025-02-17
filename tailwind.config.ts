import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        border: {
          DEFAULT: '#e5e7eb',
          custom: "#e2e8f0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
