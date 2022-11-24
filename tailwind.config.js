/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#00005C",

          secondary: "#fff",

          accent: "#D59B6C",

          neutral: "#836B5D",

          "base-100": "#F2F2F2",

          info: "#42AEBD",

          success: "#489380",

          warning: "#EB8014",

          error: "#E01A2E",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
