import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '667px',

  
        'md': '960px',
        // => @media (min-width: 960px) { ... }
  
        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
      },
      backgroundImage: {
        // "spaceBackground":"url('/space.png')"
      },
      colors: {
        primary:'#002131 0%',
        secondary:'#241a30 60%',
        inputColor:" #eee",
        buttonBorder:"#FF4B2B",
        backColor: "#201d3a",
        Golden: "#FFD700",
        
    },
    },
  },
  plugins: [require("daisyui")],
}
export default config
