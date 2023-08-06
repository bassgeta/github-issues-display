/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcssNesting from 'postcss-nesting';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      '@gql': path.resolve(__dirname, './src/gql'),
      '@data-access': path.resolve(__dirname, './src/data-access'),
      '@design-system': path.resolve(__dirname, './src/design-system'),
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    postcss: {
      plugins: [postcssNesting],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.spec.tsx', '**/*.spec.ts'],
    globals: true,
  },
});
