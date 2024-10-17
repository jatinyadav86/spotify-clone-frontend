/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        movingDot: {
          '0%, 100%': { transform: 'scale(0.2)', backgroundColor:  "#bd0036"},
          '40%': { transform: 'scale(1)', backgroundColor:  "#f25330" },
          '50%': { transform: 'scale(1)', backgroundColor:  "#f2b900" },
        }
      },
      animation: {
        movingDot: 'movingDot 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      const newUtilities = {

        // song seekbar
        ".range": {
          "-webkit-appearance": "none",
          "appearance": "none",
          "outline": "none",
          "border-radius": "6px",
          "background" : "transparent"
        },
        
        ".range::-webkit-slider-thumb": {
          "-webkit-appearance": "none",
          "appearance": "none", 
          "opacity": 0,
          "height": "12px",
          "width": "12px",
          "cursor": "pointer"
        },
        
        ".range::-moz-range-thumb": {
          "height": "12px",
          "width": "12px",
          "opacity": 0,
          "border-radius": "50%",
          "cursor": "pointer"
        }
      };
      
      addUtilities(newUtilities);
    },
  ]
})

