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
        "linkedin-secondary-text": "#DCDCDC",
        "linkedin-blue": "#0077B5",
        "linkedin-hover-blue": "#00649B",
        "linkedin-link-blue": "#0A66C2",
        "linkedin-bg-lighter": "#1A1F26",
      },
    },
  },
  plugins: [],
};
