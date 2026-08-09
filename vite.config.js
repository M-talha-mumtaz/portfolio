import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

try {
  fs.copyFileSync('src/assets/logo.png', 'public/favicon.png')
} catch (err) {
  console.error('Failed to copy logo to favicon:', err)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
