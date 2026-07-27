import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Ağır bağımlılıkları ayrı vendor chunk'larına al: sayfa kodu
        // değişince bu chunk'lar cache'te kalır, ayrıca paralel yüklenir.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) {
            return 'vendor-motion'
          }
          if (id.includes('/@sanity/') || id.includes('/get-it/') || id.includes('/rxjs/')) {
            return 'vendor-sanity'
          }
        },
      },
    },
  },
})
