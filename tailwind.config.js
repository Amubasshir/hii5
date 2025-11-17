// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... your files
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d0617', // Main background for the page/component
        'text-dark': '#b0a4c2', // Light gray text for descriptions
        'secondary-btn': '#281e3a', // Dark button background
        'border-color': '#4d4455', // General border color
        'dashboard-bg': '#1a112c', // Main dashboard background (slightly lighter than dark-bg)
        'dashboard-card': '#251b38', // Card backgrounds inside dashboard
        'chart-line-green': '#00ff00', // Bright green for up-trends
        'chart-line-red': '#ff0000', // Bright red for down-trends
        'chart-gradient-start': 'rgba(0, 255, 0, 0.2)', // Green gradient start for filled charts
        'chart-gradient-end': 'rgba(0, 255, 0, 0)', // Green gradient end for filled charts
      },
      backgroundImage: {
        'pink-purple-gradient': 'linear-gradient(90deg, #ff69b4, #8a2be2)',
        // Add a subtle radial gradient for the overall background glow effect if desired
        'radial-glow-top-left':
          'radial-gradient(circle at 10% 10%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)',
        'radial-glow-bottom-right':
          'radial-gradient(circle at 90% 90%, rgba(255, 105, 180, 0.3) 0%, transparent 50%)',
        // Example for card background gradients if needed
        'card-gradient-dark':
          'linear-gradient(180deg, #251b38 0%, #1a112c 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-fill-transparent': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent',
        },
        '.border-image-gradient': {
          'border-image-source': 'linear-gradient(90deg, #ff69b4, #8a2be2)',
          'border-image-slice': '1',
          'border-style': 'solid',
        },
        // For the subtle background glows
        '.bg-radial-glow': {
          'background-image': 'var(--tw-gradient-stops)',
        },
      });
    },
  ],
};
