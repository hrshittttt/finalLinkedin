/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "linkedin-bg": "#1D2226",
        "linkedin-card": "#0E1217",
        "linkedin-border": "#2D333A",
        "linkedin-text": "#FFFFFF",
        "linkedin-secondary-text": "#C4C4C4",
        "linkedin-blue": "#0077B5",
      },
    },
  },
  plugins: [],
};
