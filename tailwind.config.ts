import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					color: 'var(--foreground)',
  					a: {
  						color: 'var(--foreground)',
  						textDecoration: 'underline',
  						'&:hover': {
  							color: 'var(--primary-color)'
  						}
  					},
  					code: {
  						backgroundColor: 'var(--code-bg)',
  						color: 'var(--code-color)',
  						padding: '0.2em 0.4em',
  						borderRadius: '0.3em'
  					},
  					pre: {
  						backgroundColor: 'var(--pre-bg)',
  						color: 'var(--pre-color)',
  						padding: '1em',
  						borderRadius: '0.5em'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			aurora: "aurora 8s ease-in-out infinite alternate",
  		},
  		keyframes: {
  			aurora: {
  				"0%": { backgroundPosition: "0% 50%", transform: "rotate(-5deg) scale(1.2)" },
  				"25%": { backgroundPosition: "50% 100%", transform: "rotate(5deg) scale(1.1)" },
  				"50%": { backgroundPosition: "100% 50%", transform: "rotate(-3deg) scale(1.25)" },
  				"75%": { backgroundPosition: "50% 0%", transform: "rotate(3deg) scale(1.05)" },
  				"100%": { backgroundPosition: "0% 50%", transform: "rotate(-5deg) scale(1.2)" },
  			},
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")], // Add the typography plugin here
  safelist: [
    "bg-blue-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-purple-500",
  ], // Add any additional colors here
} satisfies Config;
