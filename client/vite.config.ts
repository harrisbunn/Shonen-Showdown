import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }, // Proxy API requests to your back-end server
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }, // Proxy API requests to your back-end server
      
    },
  },
})
