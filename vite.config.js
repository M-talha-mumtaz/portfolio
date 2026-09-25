import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

try {
  if (fs.existsSync('src/assets/logo.webp')) {
    fs.copyFileSync('src/assets/logo.webp', 'public/favicon.webp')
  }
} catch (err) {
  console.error('Failed to copy logo to favicon:', err)
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: [
        '**/src/assets/*.png',
        '**/*.tmp',
        '**/.git/**'
      ]
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
