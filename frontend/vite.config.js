import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Individual simulation pages
        'binomial-random-walk': resolve(__dirname, 'src/binomial_random_walk/index.html'),
        'blackscholes': resolve(__dirname, 'src/blackscholes/index.html'),
        'options': resolve(__dirname, 'src/options/index.html'),
        'ou-process': resolve(__dirname, 'src/ou_process/index.html'),
        'normal-distribution': resolve(__dirname, 'src/normal_distribution/index.html')
      }
    }
  },
  publicDir: 'public',
  server: {
    open: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['three', 'cannon', 'lil-gui']
  }
})
