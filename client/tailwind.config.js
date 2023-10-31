/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { colors: { primary: "#E74646", primary_dark: "#D64040" } },
  },
  plugins: [],
};
