/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.html", "./**/*.njk"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
