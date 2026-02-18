import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4002,
  },
  preview: {
    port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4002,
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true
    }),
    react(),
    tsconfigPaths()
  ]
});
