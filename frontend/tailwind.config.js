/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      width: {
        '30p': '30%',
      },
    },
  },
  server: {
    host: '0.0.0.0',  // Listen on all addresses, including LAN
    port: 5173,       // Use port 5173
  },
  plugins: [],
}