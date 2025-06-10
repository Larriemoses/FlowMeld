// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
import { accentColorSafelist } from './src/utils/colors'; // <-- Import safelist from your utils folder

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Ensure these paths correctly point to your React files
    { raw: accentColorSafelist.join(' '), extension: 'html' } // <-- CRITICAL: Uses the safelist for dynamic colors
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}