import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three-core': ['three'],
          'vendor-three-addons': ['@react-three/fiber', '@react-three/drei'],
          'vendor-framer': ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 700
  }
})
