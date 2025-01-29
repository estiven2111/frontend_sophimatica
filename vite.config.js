// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const port = 4180;

export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
  },
  preview: {
    port: port, 
  },
})