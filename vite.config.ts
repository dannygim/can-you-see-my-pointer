import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: '',
    define: {
      "__KEY_IS_ENABLED__": "'is_enabled'",
      "__TYPE_CUSTOM_EVENT__": "'x-on-custom-event'",
    },
    build: {
      target: 'esnext',
      minify: isProduction,
      rollupOptions: {
        input: {
          background: resolve(__dirname, 'src/background/main.ts'),
          content: resolve(__dirname, 'src/content/main.ts'),
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
