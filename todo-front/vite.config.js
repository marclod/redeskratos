import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.128.200.151:80',
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/^\/api/, '') // use isso se o backend não espera o prefixo /api
      }
    }
  }
})