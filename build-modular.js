#!/usr/bin/env node
/**
 * UX Modular Build Script
 * Generates separate CSS bundles for different component categories
 *
 * Usage:
 *   node build-modular.js           - Build all bundles
 *   node build-modular.js --watch   - Watch for changes
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Bundle definitions
const bundles = {
  // Core - always required
  core: {
    description: 'Variables, mixins, utilities, themes',
    components: []
  },

  // Basic components
  basic: {
    description: 'Essential UI components',
    components: [
      'button', 'button-group', 'badge', 'avatar', 'chip', 'spinner',
      'progress', 'progress-circle', 'divider', 'spacer', 'icon-btn',
      'icon-button', 'tag', 'status-badge', 'status-indicator'
    ]
  },

  // Form components
  forms: {
    description: 'Form inputs and controls',
    components: [
      'input', 'textarea', 'select', 'checkbox', 'radio', 'toggle',
      'range', 'searchbar', 'form', 'form-wizard', 'rating', 'datetime',
      'date-range-picker', 'color-picker', 'autocomplete', 'tag-input',
      'otp-input', 'currency-input', 'phone-input', 'signature-pad',
      'quantity-stepper', 'rich-text', 'upload', 'filter-chip'
    ]
  },

  // Navigation components
  navigation: {
    description: 'Navigation and menus',
    components: [
      'navbar', 'toolbar', 'tabs', 'segment', 'breadcrumbs', 'menu',
      'menu-button', 'menubar', 'mega-menu', 'dropdown', 'context-menu',
      'command', 'back-button', 'pagination', 'stepper', 'sidebar'
    ]
  },

  // Overlay components
  overlays: {
    description: 'Modals, sheets, and popups',
    components: [
      'modal', 'sheet', 'drawer', 'alert', 'toast', 'snackbar',
      'popover', 'tooltip', 'hover-card', 'loading', 'picker',
      'lightbox', 'fullscreen-modal', 'notifications'
    ]
  },

  // Data display components
  data: {
    description: 'Data visualization and tables',
    components: [
      'datatable', 'table', 'stats', 'sparkline', 'chart', 'bar-chart',
      'gauge', 'diff-viewer', 'code-block', 'json-viewer', 'calendar',
      'calendar-views', 'scheduler', 'tree', 'kpi-card', 'timeline'
    ]
  },

  // Feedback components
  feedback: {
    description: 'Loading states and feedback',
    components: [
      'skeleton', 'fab', 'refresher', 'banner', 'callout', 'pwa',
      'infinite-scroll', 'load-more', 'swipe', 'reorder'
    ]
  },

  // Media components
  media: {
    description: 'Images, video, and multimedia',
    components: [
      'img', 'image-gallery', 'image-crop', 'image-zoom', 'carousel',
      'video-player', 'audio-player', 'pdf-viewer', 'qr-code',
      'barcode-scanner', 'aspect-ratio'
    ]
  },

  // Layout components
  layout: {
    description: 'Layout and containers',
    components: [
      'card', 'list', 'content', 'section', 'panel', 'accordion',
      'masonry', 'master-detail', 'shell', 'dashboard-grid', 'kanban',
      'split-pane-right', 'scroll-area', 'resizable', 'app-icon',
      'event-card', 'toggle-group'
    ]
  },

  // POS/Retail components
  pos: {
    description: 'Point of sale and retail',
    components: [
      'numpad', 'onscreen-keyboard', 'calculator', 'product-card',
      'category-tabs', 'cart', 'order-ticket', 'kds-order', 'payment',
      'receipt', 'stock-indicator', 'quantity-badge', 'variant-selector',
      'loyalty-card'
    ]
  },

  // HR components
  hr: {
    description: 'HR and employee management',
    components: [
      'employee-card', 'time-clock', 'shift-calendar', 'attendance-list',
      'leave-request', 'org-chart', 'performance-meter'
    ]
  },

  // Manufacturing components
  manufacturing: {
    description: 'Manufacturing and industrial',
    components: [
      'work-order', 'machine-status', 'production-line', 'quality-check',
      'batch-tracker', 'bom-tree', 'gantt'
    ]
  },

  // Utilities
  utils: {
    description: 'Alpine utilities and helpers',
    components: [
      'alpine-utils', 'keyboard', 'electron'
    ]
  }
};

// Generate SCSS content for a bundle
function generateBundleScss(bundleName, components) {
  let scss = `/**
 * UX ${bundleName.charAt(0).toUpperCase() + bundleName.slice(1)} Bundle
 * ${bundles[bundleName].description}
 * Auto-generated - do not edit
 */

`;

  if (bundleName === 'core') {
    scss += `@use '../core/variables';
@use '../core/mixins';
@use '../core/utilities';
@use '../themes/themes';
`;
  } else {
    // Each bundle needs core variables for compilation
    scss += `@use '../core/variables';
@use '../core/mixins';

`;
    components.forEach(comp => {
      scss += `@use '../components/${comp}';\n`;
    });
  }

  return scss;
}

// Build a single bundle
function buildBundle(name, minify = true) {
  const bundleDir = join(__dirname, 'src/scss/bundles');
  const distDir = join(__dirname, 'dist/bundles');

  // Create directories if needed
  if (!existsSync(bundleDir)) mkdirSync(bundleDir, { recursive: true });
  if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });

  const components = bundles[name].components;
  const scssContent = generateBundleScss(name, components);
  const scssPath = join(bundleDir, `_${name}.scss`);

  // Write SCSS file
  writeFileSync(scssPath, scssContent);

  // Compile with sass
  const cssPath = join(distDir, `${name}.css`);
  const minCssPath = join(distDir, `${name}.min.css`);

  try {
    execSync(`npx sass ${scssPath}:${cssPath} --no-source-map --style=expanded`, {
      cwd: __dirname,
      stdio: 'pipe'
    });

    if (minify) {
      execSync(`npx lightningcss --minify ${cssPath} -o ${minCssPath}`, {
        cwd: __dirname,
        stdio: 'pipe'
      });
    }

    return true;
  } catch (error) {
    console.error(`Error building ${name}:`, error.message);
    return false;
  }
}

// Build core separately
function buildCore() {
  const distDir = join(__dirname, 'dist');
  const coreScssPath = join(__dirname, 'src/scss/core.scss');

  // Create core.scss if it doesn't exist
  if (!existsSync(coreScssPath)) {
    const coreScss = `/**
 * UX Core
 * Variables, mixins, utilities, and themes
 */
@use 'core/variables';
@use 'core/mixins';
@use 'core/utilities';
@use 'themes/themes';
`;
    writeFileSync(coreScssPath, coreScss);
  }

  const cssPath = join(distDir, 'core.css');
  const minCssPath = join(distDir, 'core.min.css');

  try {
    execSync(`npx sass ${coreScssPath}:${cssPath} --no-source-map --style=expanded`, {
      cwd: __dirname,
      stdio: 'pipe'
    });

    execSync(`npx lightningcss --minify ${cssPath} -o ${minCssPath}`, {
      cwd: __dirname,
      stdio: 'pipe'
    });

    return true;
  } catch (error) {
    console.error('Error building core:', error.message);
    return false;
  }
}

// Get file size
// Main build function
function build() {
  console.log('🔨 Building UX modular bundles...\n');

  const startTime = Date.now();
  const results = [];

  // Build core first
  process.stdout.write('  Building core... ');
  if (buildCore()) {
    console.log('✓');
    results.push({ name: 'core', success: true });
  } else {
    console.log('✗');
    results.push({ name: 'core', success: false });
  }

  // Build each bundle
  for (const [name, config] of Object.entries(bundles)) {
    if (name === 'core') continue;

    process.stdout.write(`  Building ${name} (${config.components.length} components)... `);
    if (buildBundle(name)) {
      console.log('✓');
      results.push({ name, success: true });
    } else {
      console.log('✗');
      results.push({ name, success: false });
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  const successful = results.filter(r => r.success).length;

  console.log(`\n✨ Built ${successful}/${results.length} bundles in ${elapsed}s`);

  // Print bundle sizes
  console.log('\n📦 Bundle sizes:\n');

  // Core
  try {
    const coreSize = statSync(join(__dirname, 'dist/core.min.css')).size;
    console.log(`  core.min.css        ${(coreSize / 1024).toFixed(1).padStart(6)} KB`);
  } catch {}

  // Bundles
  for (const name of Object.keys(bundles)) {
    if (name === 'core') continue;
    try {
      const size = statSync(join(__dirname, `dist/bundles/${name}.min.css`)).size;
      console.log(`  ${name}.min.css`.padEnd(24) + `${(size / 1024).toFixed(1).padStart(6)} KB`);
    } catch {}
  }

  console.log('\n📝 Usage:\n');
  console.log('  <!-- Core (required) -->');
  console.log('  <link rel="stylesheet" href="dist/core.min.css">');
  console.log('');
  console.log('  <!-- Add bundles as needed -->');
  console.log('  <link rel="stylesheet" href="dist/bundles/basic.min.css">');
  console.log('  <link rel="stylesheet" href="dist/bundles/forms.min.css">');
}

// Run
build();
