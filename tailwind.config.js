import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            primary: {
              50: "#FDF2F8",
              100: "#FCE7F3",
              200: "#FBCFE8",
              300: "#F9A8D4",
              400: "#F472B6",
              500: "#c13584",
              600: "#BE185D",
              700: "#9D174D",
              800: "#831843",
              900: "#500724",
              DEFAULT: "#c13584",
            },
          },
        },
        dark: {
          colors: {
            background: "#000000",
            primary: {
              50: "#500724",
              100: "#831843",
              200: "#9D174D",
              300: "#BE185D",
              400: "#c13584",
              500: "#F472B6",
              600: "#F9A8D4",
              700: "#FBCFE8",
              800: "#FCE7F3",
              900: "#FDF2F8",
              DEFAULT: "#c13584",
            },
          },
        },
        purple: {
          colors: {
            background: "#F5F3FF",
            primary: {
              50: "#F5F3FF",
              100: "#EDE9FE",
              200: "#DDD6FE",
              300: "#C4B5FD",
              400: "#A78BFA",
              500: "#8B5CF6",
              600: "#7C3AED",
              700: "#6D28D9",
              800: "#5B21B6",
              900: "#4C1D95",
              DEFAULT: "#8B5CF6",
            },
          },
        },
      },
    }),
  ],
};
