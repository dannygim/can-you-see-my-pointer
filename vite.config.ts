import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: '',
    build: {
      target: 'esnext',
      minify: isProduction,
      rollupOptions: {
        input: {
          background: resolve(__dirname, 'src/background/main.ts'),
          content: resolve(__dirname, 'src/content/main.ts'),
          content_loader: resolve(__dirname, 'src/content_loader.js'),
        },
        output: {
          entryFileNames: '[name].js'
        }
      }
    },
    esbuild: {
      drop: isProduction ? ['debugger'] : [],
      pure: isProduction ? [
        'console.log',
        'console.debug',
        'console.trace',
      ] : [],
    },
  }
});
