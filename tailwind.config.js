/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#633CFF",
        "purple-hover": "#BEADFF",
        "light-purple": "#EFEBFF",
        "dark-grey": "#333333",
        grey: "#737373",
        borders: "#D9D9D9",
        "light-grey": "#FAFAFA",
        white: "#FFFFFF",
        red: "#FF3939",
      },
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
