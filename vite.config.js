import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Base URL: viene sovrascritta da --base in CLI durante il build CI
  base: '/',

  build: {
    // Multi-page: include sia la root che /custom/
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        custom: resolve(__dirname, 'custom/index.html'),
      },
    },
  },
})
