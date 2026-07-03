import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['"Times New Roman"', 'Times', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced brand colors with more sophisticated palette
				brand: {
					primary: '#4F1B59',
					secondary: '#8B5A96',
					tertiary: '#C19BBB',
					accent: '#A67BA8',
					light: '#F3E8FF',
					'ultra-light': '#FDFBFF',
					'text-primary': '#2D1B3D',
					'text-secondary': '#6B7280',
					'text-muted': '#9CA3AF',
					'text-light': '#F8FAFC',
					'border-primary': '#E2D1E8',
					'border-soft': '#F1E7F4',
					'surface-primary': '#FFFFFF',
					'surface-secondary': '#F8F9FA',
					'surface-tertiary': '#F3E8FF',
					'surface-accent': 'rgba(79, 27, 89, 0.02)',
					'gradient-start': '#4F1B59',
					'gradient-middle': '#8B5A96',
					'gradient-end': '#C19BBB'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem'
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
				'26': '6.5rem',
				'30': '7.5rem',
				'34': '8.5rem',
				'38': '9.5rem'
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1.2' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
				'7xl': ['4.5rem', { lineHeight: '1.1' }],
				'8xl': ['6rem', { lineHeight: '1.1' }],
				'9xl': ['8rem', { lineHeight: '1.1' }],
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(79, 27, 89, 0.07), 0 10px 20px -2px rgba(79, 27, 89, 0.04)',
				'medium': '0 4px 25px -5px rgba(79, 27, 89, 0.1), 0 10px 20px -5px rgba(79, 27, 89, 0.05)',
				'large': '0 10px 40px -10px rgba(79, 27, 89, 0.15), 0 20px 25px -5px rgba(79, 27, 89, 0.08)',
				'glow': '0 0 20px rgba(79, 27, 89, 0.3), 0 0 40px rgba(79, 27, 89, 0.2)',
				'glow-lg': '0 0 40px rgba(79, 27, 89, 0.4), 0 0 80px rgba(79, 27, 89, 0.3)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(79, 27, 89, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(79, 27, 89, 0.8)'
					}
				},
				// Enhanced animations
				'float-enhanced': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)',
						opacity: '0.8'
					},
					'50%': {
						transform: 'translateY(-15px) rotate(2deg)',
						opacity: '1'
					}
				},
				'slide-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(60px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				// Enhanced animations
				'float-enhanced': 'float-enhanced 4s ease-in-out infinite',
				'slide-in-up': 'slide-in-up 0.8s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'slide-in': 'slide-in-right 0.3s ease-out'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'hero-gradient': 'linear-gradient(135deg, #4F1B59 0%, #6B2C7A 25%, #8B5A96 50%, #A67BA8 75%, #C19BBB 100%)',
				'section-gradient': 'linear-gradient(135deg, rgba(79, 27, 89, 0.02) 0%, rgba(139, 90, 150, 0.05) 100%)',
				'premium-gradient': 'linear-gradient(135deg, #4F1B59 0%, #7B3F7E 25%, #A67BA8 50%, #D1B3CE 75%, #F3E8FF 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)'
			},
			backdropBlur: {
				'xs': '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
