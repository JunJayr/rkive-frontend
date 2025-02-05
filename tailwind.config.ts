import type { Config } from "tailwindcss";

export default {
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
        brandNavy: {
          DEFAULT: '#1A2E4F', // or any deep navy
          '50': '#E3E7EE',
          '100': '#BDC5D6',
          '200': '#8D9BBF',
          '300': '#5E70A8',
          '400': '#304591',
          '500': '#1A2E4F', // primary brand color
          '600': '#14243F',
        },
        brandGold: {
          DEFAULT: '#FFC300', // bright golden shade
          '50': '#FFF8E1',
          '100': '#FFECA3',
          '200': '#FFE07A',
          '300': '#FFD452',
          '400': '#FFC300', // primary accent
          '500': '#E6AE00',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
