import path from 'node:path'
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3333,
    // port: import.meta.env.VITE_PORT || 3333,
  },
})
