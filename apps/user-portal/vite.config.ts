/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/user-portal',
  server: {
    port: 4201,
    host: 'localhost',
    open: true,
  },
  preview: {
    port: 4301,
    host: 'localhost',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@frontend/shared': path.resolve(__dirname, '../../shared/src/index.ts'),
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@frontend/shared'],
        },
      },
    },
  },
}));
