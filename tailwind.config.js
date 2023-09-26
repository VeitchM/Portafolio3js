/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "rgb(var(--primary-color) / <alpha-value>)",
        "text-color": "rgb(var(--color-text) / <alpha-value>)",
        "background-color": "rgb(var(--color-background) / <alpha-value>)",
        "background-variant": "rgb(var(--color-background-variant) / <alpha-value>)"
      },
    },
  },
  plugins: [],
}

