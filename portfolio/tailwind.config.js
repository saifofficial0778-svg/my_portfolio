/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0A0A0F',
          raised: '#13131B',
          overlay: '#191922',
        },
        border: {
          DEFAULT: '#26262F',
          soft: '#1C1C24',
        },
        ink: {
          DEFAULT: '#F2F2F5',
          muted: '#9494A8',
          faint: '#5E5E70',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          soft: '#A78BFA',
          dim: '#6D28D9',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          soft: '#67E8F9',
          dim: '#0E7490',
        },
        // Light theme surface set (used via [data-theme="light"] overrides in index.css)
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        content: '72ch',
        shell: '1120px',
      },
      boxShadow: {
        glow: '0 0 80px -20px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 80px -20px rgba(34, 211, 238, 0.3)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(10,10,15,0) 0%, rgba(10,10,15,1) 100%)',
      },
    },
  },
  plugins: [],
}
