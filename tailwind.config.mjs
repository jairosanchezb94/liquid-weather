/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      animation: {
        'fall-rain': 'fall-rain 1s linear infinite',
        'fall-snow': 'fall-snow 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cloud-move-1': 'cloud-move 60s linear infinite',
        'cloud-move-2': 'cloud-move 45s linear infinite reverse',
        'flash': 'flash 3s infinite',
      },
      keyframes: {
        'fall-rain': {
          '0%': { transform: 'translateY(-50px) translateX(0)' },
          '100%': { transform: 'translateY(120vh) translateX(var(--wind-x, -20px))' },
        },
        'fall-snow': {
          '0%': { transform: 'translateY(-50px) translateX(0)' },
          '100%': { transform: 'translateY(120vh) translateX(var(--wind-x, 20px))' },
        },
        'cloud-move': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'flash': {
          '0%, 90%, 100%': { opacity: '0' },
          '92%, 98%': { opacity: '0.8' },
          '96%': { opacity: '1' },
        }
      }
    },
	},
	plugins: [
    require('tailwindcss-animate')
  ],
}
