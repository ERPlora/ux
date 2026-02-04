/**
 * Vite config for ES Module build
 * Outputs: dist/ux.esm.js with named exports for tree-shaking
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
        entry: {
          ux: resolve(__dirname, 'src/js/ux.js'),
          'ux-core': resolve(__dirname, 'src/js/ux-core.js'),
        },
        formats: ['es'],
        fileName: (_, entryName) =>
          entryName === 'ux-core' ? 'ux-core.esm.js' : 'ux.esm.js',
      },
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
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
