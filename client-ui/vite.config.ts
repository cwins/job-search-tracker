import { defineConfig, type BuildEnvironmentOptions } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import devServer from '@hono/vite-dev-server';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

const ssrBuild: BuildEnvironmentOptions = {
  manifest: true,
  ssr: true,
  outDir: 'dist/server',
  ssrManifest: true,
  copyPublicDir: false,
  emptyOutDir: true,
  target: 'es2017',
  rolldownOptions: {
    input: 'src/entry-server.tsx',
    output: {
      entryFileNames: '[name].js',
      chunkFileNames: 'assets/[name].js',
      assetFileNames: 'assets/[name].[ext]',
      format: 'cjs'
    }
  }
};

const clientBuild: BuildEnvironmentOptions = {
  manifest: true,
  outDir: 'dist/client',
  ssrManifest: true,
  copyPublicDir: true,
  emptyOutDir: true,
  target: 'es2017',
  rollupOptions: {
    input: 'src/entry-client.tsx',
    output: {
      entryFileNames: 'static/[name].js',
      chunkFileNames: 'static/assets/[name].[hash].js',
      assetFileNames: 'static/assets/[name].[ext]'
    }
  }
};

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  return {
    server: {
      port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4000
    },
    preview: {
      port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4000,
      host: true
    },
    plugins: [
      devServer({
        entry: 'src/server.ts'
      }),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true
      }),
      react(),
      tsconfigPaths()
    ],
    build: configEnv.isSsrBuild ? ssrBuild : clientBuild
  };
});
