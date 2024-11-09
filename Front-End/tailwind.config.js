/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#221B2C",
        blk: "#191223",
        pin: "#FF204E",
        "prim-dark": "#A95275",
        "prime-white": "#EEF6F9",
        "prim-button": "#FF7F9F",
        "hover-button": "#FFA8B9",
      },
    },
  },
  plugins: [],
};
