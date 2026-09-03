/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "background": "#F6F3EC",
        "surface": "#FFFFFF",
        "surface-container": "#F4F7F7",
        "surface-container-low": "#FAF7F2",
        "surface-container-lowest": "#F6F3EC",
        "surface-container-high": "#FFFFFF",
        "surface-container-highest": "#E8E1D5",
        "surface-dim": "#EEE8DE",
        "surface-bright": "#FFFFFF",
        "surface-variant": "#F4F7F7",
        "on-surface": "#222222",
        "on-surface-variant": "#3B5E63",
        "outline": "#D8C4B6",
        "outline-variant": "#D8C4B6",
        "primary": "#1C3D63",
        "primary-container": "#F4F7F7",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#1C3D63",
        "primary-fixed": "#F4F7F7",
        "primary-fixed-dim": "#D8C4B6",
        "on-primary-fixed": "#1C3D63",
        "on-primary-fixed-variant": "#3B5E63",
        "secondary": "#3B5E63",
        "secondary-container": "#1C3D63",
        "on-secondary": "#FFFFFF",
        "on-secondary-container": "#F4F7F7",
        "secondary-fixed": "#F4F7F7",
        "secondary-fixed-dim": "#D8C4B6",
        "on-secondary-fixed": "#1C3D63",
        "on-secondary-fixed-variant": "#3B5E63",
        "accent": "#E0AC6B",
        "tertiary": "#A37B73",
        "tertiary-container": "#F4F7F7",
        "on-tertiary": "#FFFFFF",
        "on-tertiary-container": "#1C3D63",
        "tertiary-fixed": "#F4F7F7",
        "tertiary-fixed-dim": "#D8C4B6",
        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#FFFFFF",
        "on-error-container": "#410002"
      },
      borderRadius: {
        "DEFAULT": "0.375rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "stitch-full": "9999px"
      },
      fontFamily: {
        headline: ["Newsreader", "serif"],
        body: ["Inter", "Noto Sans Georgian", "sans-serif"],
        label: ["Inter", "Noto Sans Georgian", "sans-serif"]
      }
    },
  },
  plugins: [],
}
