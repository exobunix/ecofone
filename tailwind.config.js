/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        surface: 'var(--surface)',
        dark: 'var(--dark)',
        'green-light': 'var(--green-light)',
        'green-mid': 'var(--green-mid)',
        charcoal: 'var(--charcoal)',
        warning: 'var(--warning)',
        'eco-error': 'var(--error)',
        success: 'var(--success)',
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
        '2xl': 'calc(var(--radius) + 16px)',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
      },
      screens: {
        xs: '390px',
      },
      boxShadow: {
        'card-green': '0 4px 20px rgba(45, 139, 78, 0.1)',
        'card-hover': '0 12px 32px rgba(45, 139, 78, 0.15)',
        'bottom-nav': '0 -4px 20px rgba(0, 0, 0, 0.06)',
        'cta-green': '0 8px 24px rgba(45, 139, 78, 0.35)',
      },
      animation: {
        'float-device': 'float-device 3s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'skeleton': 'skeleton-loading 1.5s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};