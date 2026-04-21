import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: './public',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'MetParam_index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: '/MetParam_index.html',  // ← добавляем эту строку
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});