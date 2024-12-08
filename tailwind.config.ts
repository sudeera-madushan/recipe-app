import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#eae7e7",
        primary: "#fe5e7f",
        secondary: "#ffffff",
        fontGray: "#6b7280",
      },
    },
  },
  plugins: [],
} satisfies Config;
