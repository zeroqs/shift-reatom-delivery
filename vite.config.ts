import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      {
        find: /^@api$/,
        replacement: fileURLToPath(new URL('./generated/api/index.ts', import.meta.url))
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://juniorsbootcamp.ru',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
