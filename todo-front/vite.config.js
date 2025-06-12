import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://3.128.200.151:80',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})