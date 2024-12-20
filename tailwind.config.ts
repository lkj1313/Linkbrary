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
        primary: "#6D6AFE", // 주 색상 (Primary)
        red: "#FF5B56", // 빨강색
        black: "#111322", // 검정색
        white: "#FFFFFF", // 흰색
        gray: {
          500: "#3E3E43", // 가장 어두운 회색
          400: "#9FA6B2", // 중간 회색
          300: "#CCD5E3", // 밝은 회색
          200: "#E7EFFB", // 더 밝은 회색
          100: "#F0F6FF", // 가장 밝은 회색
        },
      },
      backgroundImage: {
        linearGradient:
          "linear-gradient(90.99deg, #6D6AFE 0.12%, #6AE3FE 101.84%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
