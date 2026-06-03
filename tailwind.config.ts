import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0b0f17',
          elevated: '#111827',
          card: '#161f2e',
          hover: '#1c2738',
          inset: '#0f1419',
        },
        fg: {
          DEFAULT: '#f1f5f9',
          secondary: '#94a3b8',
          muted: '#64748b',
          faint: '#475569',
        },
        line: {
          subtle: 'rgba(255, 255, 255, 0.05)',
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.12)',
        },
      },
      boxShadow: {
        card: '0 4px 24px -6px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        'card-hover': '0 8px 32px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config
