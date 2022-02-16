module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        primary: "#273043",
        danger: "#FB2343",
				accent: "#6CD4FF ",
				background: "#171C27",
				twitter: "#1DA1F2",
				github: "#6e5494"
      }
    },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }