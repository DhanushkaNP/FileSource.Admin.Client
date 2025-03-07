/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["Montserrat"],
        inika: ["Inika"],
      },
      colors: {
        "default-background": "#F4F7FE",
        "dark-bg": "#E0E5F2",
        "dark-blue": "#2B3674",
        "dark-dark-blue": "#252B42",
        "light-blue": "#3056D3",
        "light-gray": "#A3AED0",
      },
    },
  },
  plugins: [],
};
