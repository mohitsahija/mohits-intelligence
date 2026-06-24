/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberBg: '#020617',
        panelSurface: 'rgba(15, 23, 42, 0.7)',
        neonCyan: '#06b6d4',
        neonEmerald: '#10b981',
        neonMagenta: '#d946ef'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.6) 100%)',
      }
    },
  },
  plugins: [],
}