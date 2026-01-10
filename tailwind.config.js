/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#fef7ee',
					100: '#fdecd3',
					200: '#fad5a5',
					300: '#f6b76d',
					400: '#f19132',
					500: '#ee7712',
					600: '#df5c08',
					700: '#b94409',
					800: '#93360f',
					900: '#772f10',
					950: '#401506'
				},
				secondary: {
					50: '#f4f7fb',
					100: '#e8eff6',
					200: '#cbdceb',
					300: '#9dbeda',
					400: '#689bc4',
					500: '#457fae',
					600: '#346592',
					700: '#2b5177',
					800: '#274663',
					900: '#253c54',
					950: '#182738'
				},
				accent: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					950: '#052e16'
				},
				surface: {
					50: '#fafaf9',
					100: '#f5f5f4',
					200: '#e7e5e4',
					300: '#d6d3d1',
					400: '#a8a29e',
					500: '#78716c',
					600: '#57534e',
					700: '#44403c',
					800: '#292524',
					900: '#1c1917',
					950: '#0c0a09'
				}
			},
			fontFamily: {
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
				display: ['Lexend', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'glow': '0 0 20px rgba(241, 145, 50, 0.3)',
				'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)'
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-in-right': 'slideInRight 0.3s ease-out',
				'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
				'bounce-soft': 'bounceSoft 0.5s ease-out'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				pulseSoft: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				bounceSoft: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				}
			}
		}
	},
	plugins: []
};
