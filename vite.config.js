import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  // Override TypeScript handling to bypass project references
  esbuild: {
    target: 'es2020',
    format: 'esm',
    platform: 'browser'
  },
  // Ensure build works without TypeScript project references
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress TypeScript config warnings
        if (warning.code === 'UNRESOLVED_IMPORT') return
        if (warning.message?.includes('tsconfig')) return
        warn(warning)
      }
    }
  }
}))