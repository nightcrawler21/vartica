/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#0E1112",
        surface:   "#1A1D1F",
        primary:   { blue: "#87A7AC", tan: "#E7B97F" },
        neutral:   { warm: "#EAE6D8", cool: "#E4EDEE" },
        accent:    "#677A67",
        text:      "#F7F8F9",
      },
    },
  },
  plugins: [],
};
