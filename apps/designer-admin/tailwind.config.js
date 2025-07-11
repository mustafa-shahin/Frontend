const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom colors for better dark mode support
        gray: {
          750: '#374151',
          850: '#1f2937',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Safelist dynamic color classes used in components
    'bg-blue-100',
    'bg-blue-900',
    'bg-green-100',
    'bg-green-900',
    'bg-yellow-100',
    'bg-yellow-900',
    'bg-purple-100',
    'bg-purple-900',
    'bg-gray-100',
    'bg-gray-900',
    'bg-slate-50',
    'bg-slate-100',
    'bg-slate-200',
    'bg-slate-800',
    'bg-slate-900',
    'bg-amber-50',
    'bg-amber-100',
    'bg-emerald-50',
    'bg-emerald-100',
    'text-blue-600',
    'text-blue-400',
    'text-green-600',
    'text-green-400',
    'text-yellow-600',
    'text-yellow-400',
    'text-purple-600',
    'text-purple-400',
    'text-gray-600',
    'text-gray-400',
    'text-slate-600',
    'text-slate-700',
    'text-slate-900',
    'text-amber-700',
    'text-emerald-700',
    'border-slate-200',
    'border-slate-300',
    'border-amber-200',
    'border-emerald-200',
    'hover:bg-blue-200',
    'hover:bg-green-200',
    'hover:bg-yellow-200',
    'hover:bg-purple-200',
    'hover:bg-gray-200',
    'hover:bg-slate-50',
    'hover:bg-slate-100',
    'dark:hover:bg-blue-800',
    'dark:hover:bg-green-800',
    'dark:hover:bg-yellow-800',
    'dark:hover:bg-purple-800',
    'dark:hover:bg-gray-800',
    'line-clamp-1',
    'line-clamp-2',
    'line-clamp-3',
  ],
};
