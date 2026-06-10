import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#125DD9",
          orange: "#F68B0A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
