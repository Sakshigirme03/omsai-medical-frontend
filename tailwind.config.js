/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        accent: "#14B8A6",
        background: "#F8FAFC",
        textmain: "#1E293B",
      },
    },
  },
  plugins: [],
}