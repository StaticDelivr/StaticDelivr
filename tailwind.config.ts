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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--foreground)",
            a: {
              color: "var(--foreground)", // Ensures links match the foreground
              textDecoration: "underline",
              "&:hover": {
                color: "var(--primary-color)", // Customize hover behavior
              },
            },
            code: {
              backgroundColor: "var(--code-bg)", // Custom background for inline code
              color: "var(--code-color)", // Custom inline code color
              padding: "0.2em 0.4em",
              borderRadius: "0.3em",
            },
            pre: {
              backgroundColor: "var(--pre-bg)", // Custom background for code blocks
              color: "var(--pre-color)", // Custom color for code blocks
              padding: "1em",
              borderRadius: "0.5em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")], // Add the typography plugin here
  safelist: [
    "bg-blue-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-purple-500",
  ], // Add any additional colors here
} satisfies Config;
