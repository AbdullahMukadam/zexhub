/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './index.html',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Existing Project Theme
      fontFamily:{
        sans: ['Bricolage Grotesque', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Existing custom border radius
        'none': '0',
        // 'sm': '0', // Conflict with shadcn sm, commenting out to prefer shadcn
        // DEFAULT: '0', // Conflict, commenting out
        // 'md': '0',
        // 'lg': '0',
        // 'xl': '0',
        // '2xl': '0',
        // '3xl': '0',
        // 'full': '0',
      },
      colors: {
        // Shadcn Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Existing Project Colors
        util: {
          black: '#0a0a0a',
          gray: '#e5e5e5',
          accent: '#ff3300', // International Orange
          border: '#333333'
        },
        // Neumorphic Music UI Colors
        neu: {
          base: '#EFEEEE', 
          text: '#4A5568',
          accent: '#FF7F50',
          black: '#2D3748'
        }
      },
      boxShadow: {
        'neu-out': '6px 6px 12px rgba(163, 145, 145, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.9)',
        'neu-card': '6px 6px 12px rgba(163, 145, 145, 0.2), -6px -6px 12px rgba(255, 255, 255, 0.8)',
        'neu-in': 'inset 5px 5px 10px rgba(163, 145, 145, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.9)',
        'neu-in-sm': 'inset 3px 3px 6px rgba(163, 145, 145, 0.4), inset -3px -3px 6px rgba(255, 255, 255, 0.9)',
        'neu-dark': '6px 6px 12px rgba(45, 55, 72, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'grid-overlay': "linear-gradient(to right, #333333 1px, transparent 1px), linear-gradient(to bottom, #333333 1px, transparent 1px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'spin-slow': 'spin 10s linear infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
