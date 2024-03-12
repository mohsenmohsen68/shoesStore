/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',  
  ],
  theme: {
    fontFamily: {
      'BYekan': 'Byekan',
      'BYekanBold': 'BYekanBold' // Ensure fonts with spaces have " " surrounding it.
    },
    container: {
      center: true,
    },
    screens: {
			xl: { max: "1200px" },
			lg: { max: "992px" },
			md: { max: "768px" },
			sm: { max: "576px" },
		},
    extend: {
      transform: ['group-hover', 'hover'],
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("@xpd/tailwind-3dtransforms"),
  ],
}
