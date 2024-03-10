/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }
			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }
			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }
			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
    extend: {
      transform: ['group-hover', 'hover'],
    },
  },
  plugins: [],
}
