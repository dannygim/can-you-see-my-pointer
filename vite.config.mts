import { defineConfig } from 'npm:vite@^4.0.0';
import { resolve } from "https://deno.land/std@0.171.0/path/mod.ts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  console.info('build mode:', mode);

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
          background: resolve('src/background/main.ts'),
          content: resolve('src/content/main.ts'),
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
