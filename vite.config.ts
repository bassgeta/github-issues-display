import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@gql': path.resolve(__dirname, './src/gql'),
      '@data-access': path.resolve(__dirname, './src/data-access'),
    },
  },
});
