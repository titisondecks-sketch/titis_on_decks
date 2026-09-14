import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    /* Vite's default (4 kB). It was 300 kB, which base64'd several large
       images straight into the shared bundle that every visitor
       downloaded, most of it for archived pages nobody opens. As files
       they are fetched only by the one page that shows them. */
    assetsInlineLimit: 4096,
    /* one bundle, no chunks - Rolldown's name for inlineDynamicImports */
    rolldownOptions: { output: { codeSplitting: false } }
  }
})
