/**
 * Vite config for IIFE build (browsers)
 * Outputs: dist/ux.js with window.UX = UX object directly
 */
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    root: '.',
    publicDir: false,

    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },

    build: {
      outDir: 'dist',
      emptyOutDir: false,
      lib: {
        // Use IIFE-specific entry that only exports default
        entry: resolve(__dirname, 'src/js/ux.iife.js'),
        name: 'UX',
        formats: ['iife'],
        fileName: () => 'ux.js',
      },
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          // Export as default so window.UX = UX object directly
          exports: 'default',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'ux.css';
            }
            return '[name][extname]';
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
        format: {
          comments: false,
        },
      },
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@scss': resolve(__dirname, 'src/scss'),
        '@js': resolve(__dirname, 'src/js'),
      },
    },
  };
});
