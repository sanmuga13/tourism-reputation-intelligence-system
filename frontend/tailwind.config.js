/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D12',
        surface: {
          dark: '#14171D',
          elevated: '#1C2028',
          card: '#11141A',
        },
        border: {
          DEFAULT: '#30343B',
          subtle: '#22262E',
          focus: '#E16B42',
        },
        ivory: '#F5F1EA',
        cream: '#FAF9F6',
        copper: {
          DEFAULT: '#E16B42',
          hover: '#EE7E57',
          muted: '#BC674F',
          glow: 'rgba(225, 107, 66, 0.15)',
        },
        champagne: {
          DEFAULT: '#D7BFA1',
          light: '#EADBC8',
          muted: '#9E8B75',
        },
        muted: {
          DEFAULT: '#9EA3AE',
          dark: '#686D76',
        },
        semantic: {
          positive: '#22C55E',
          negative: '#EF4444',
          warning: '#F59E0B',
          neutral: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'grain-radial': 'radial-gradient(circle at 50% 20%, rgba(225, 107, 66, 0.08) 0%, transparent 60%)',
        'subtle-radial': 'radial-gradient(circle at 50% 50%, rgba(215, 191, 161, 0.05) 0%, transparent 70%)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
