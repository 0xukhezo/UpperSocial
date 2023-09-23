import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        homeTitle: "#FFFFFFBF",
        greenDark: "#0B2A22",
      },
      borderWidth: { 1: "1px" },
      screens: {
        roadmap: "907px",
        treeDesktop: "1128px",
      },
      fontFamily: {
        spectral: ["Spectral", "regular"],
      },
      rotate: {
        "270": "270deg",
      },
    },
  },
  plugins: [],
};
export default config;
