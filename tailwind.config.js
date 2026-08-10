/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eaf7f0",
          100: "#d5f0e2",
          500: "#159c69",
          600: "#118e60",
          700: "#0d754f"
        }
      },
      boxShadow: {
        panel: "0 3px 15px rgba(28,40,49,.035)"
      }
    }
  },
  plugins: []
};