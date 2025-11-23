import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mind'], // allow MindAR target files
  base: './', // Use relative paths for deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    // Allow the Host used by the Cloudflare simulation so vite won't block requests
    allowedHosts: ['https://offset-authorization-fancy-canal.trycloudflare.com'],
    https: false,
    host: true
  },
  publicDir: 'public'
})
