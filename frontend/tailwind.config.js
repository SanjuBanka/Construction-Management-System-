/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: '#1B2A41',      // deep blueprint navy - primary surfaces
        slate: '#2D3E50',    // secondary surfaces
        paper: '#F5F3EE',    // warm off-white background
        amber: '#FF6B35',    // signal/accent - actions, alerts
        teal: '#4A7C7C',     // status / secondary accent
        line: '#D8D3C4',     // hairline borders on paper
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
