import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

/**
 * Main Vite config - used for development server (npm run dev)
 * For production builds, see:
 * - vite.config.esm.js (ES module with named exports)
 * - vite.config.iife.js (IIFE for browsers)
 */
export default defineConfig(() => {
  // Copy dist files to public folder so they're served without processing
  const publicDir = resolve(__dirname, 'public');
  const distDir = resolve(__dirname, 'dist');

  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  // Copy CSS and JS files if they exist
  const filesToCopy = ['ux.css', 'ux.min.css', 'ux.js', 'ux.min.js', 'ux.esm.js'];
  filesToCopy.forEach(file => {
    const src = resolve(distDir, file);
    const dest = resolve(publicDir, file);
    if (existsSync(src)) {
      try {
        copyFileSync(src, dest);
      } catch (e) {
        // Ignore copy errors
      }
    }
  });

  return {
    root: '.',
    publicDir: 'public',

    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },

    server: {
      port: 8000,
      open: '/docs/',
      cors: true,
      fs: {
        allow: ['.'],
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
