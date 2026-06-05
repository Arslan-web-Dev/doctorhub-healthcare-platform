import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        accent: 'hsl(var(--accent))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))'
      },
      boxShadow: {
        glow: '0 0 40px hsl(var(--primary) / 0.28)'
      }
    }
  },
  plugins: []
} satisfies Config;
