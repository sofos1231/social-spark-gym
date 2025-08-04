import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
console.log('Loading Vite configuration...')
console.log('Current working directory:', process.cwd())
console.log('Checking for tsconfig files...')
try {
  const fs = require('fs')
  console.log('tsconfig.json exists:', fs.existsSync('./tsconfig.json'))
  console.log('tsconfig.app.json exists:', fs.existsSync('./tsconfig.app.json'))
  console.log('tsconfig.node.json exists:', fs.existsSync('./tsconfig.node.json'))
} catch (e) {
  console.log('Error checking files:', e.message)
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  }
})