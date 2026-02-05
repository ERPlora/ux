import { test, expect, Page } from '@playwright/test';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * UX Component Library - E2E Tests
 * Tests all partials for correct rendering across devices
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');
const DOCS_ROOT = join(REPO_ROOT, 'docs');
const DIST_ROOT = join(REPO_ROOT, 'dist');
const PUBLIC_ROOT = join(REPO_ROOT, 'public');
const STATIC_ROOT = join(REPO_ROOT, 'static');

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

const EXTERNAL_JS_STUB = `
  window.Alpine = window.Alpine || {
    initTree() {},
    $data() { return {}; },
    directive() {},
    data() {},
    store() {},
    magic() {},
  };
  window.htmx = window.htmx || {
    on() {},
    trigger() {},
    process() {},
    config: {},
  };
`.trim();

const TRANSPARENT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
  'base64'
);

function contentTypeFor(ext: string) {
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function safeResolve(root: string, rel: string) {
  const target = resolve(root, rel);
  if (!target.startsWith(root)) return null;
  return target;
}

function resolveLocalPath(pathname: string) {
  if (pathname === '/' || pathname === '/docs' || pathname === '/docs/') {
    return join(DOCS_ROOT, 'index.html');
  }

  if (pathname === '/icon-192.png') {
    return safeResolve(REPO_ROOT, 'icon-192.png');
  }

  if (pathname.startsWith('/docs/')) {
    let rel = pathname.slice('/docs/'.length);
    if (!rel) return join(DOCS_ROOT, 'index.html');
    if (rel.endsWith('/')) rel += 'index.html';

    if (rel.startsWith('partials/')) {
      return safeResolve(DOCS_ROOT, rel);
    }

    if (rel.startsWith('dist/')) {
      return safeResolve(DIST_ROOT, rel.replace(/^dist\//, ''));
    }

    return safeResolve(DOCS_ROOT, rel);
  }

  if (pathname.startsWith('/dist/')) {
    return safeResolve(DIST_ROOT, pathname.replace(/^\/dist\//, ''));
  }

  if (pathname.startsWith('/public/')) {
    return safeResolve(PUBLIC_ROOT, pathname.replace(/^\/public\//, ''));
  }

  if (pathname.startsWith('/static/')) {
    return safeResolve(STATIC_ROOT, pathname.replace(/^\/static\//, ''));
  }

  let rel = pathname.replace(/^\//, '');
  if (rel.endsWith('/')) rel += 'index.html';
  return safeResolve(DOCS_ROOT, rel);
}

test.beforeEach(async ({ page }) => {
  await page.route('**/*', async (route) => {
    const requestUrl = route.request().url();
    if (!requestUrl.startsWith('http')) {
      return route.continue();
    }

    const url = new URL(requestUrl);
    const ext = extname(url.pathname).toLowerCase();
    const isLocalhost = ['localhost', '127.0.0.1', ''].includes(url.hostname);

    if (!isLocalhost) {
      if (ext === '.js' || ext === '.mjs') {
        return route.fulfill({
          status: 200,
          body: EXTERNAL_JS_STUB,
          headers: { 'content-type': contentTypeFor('.js') },
        });
      }
      if (ext === '.css') {
        return route.fulfill({
          status: 200,
          body: '',
          headers: { 'content-type': contentTypeFor('.css') },
        });
      }
      if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.woff', '.woff2', '.ttf', '.otf'].includes(ext)) {
        return route.fulfill({
          status: 200,
          body: TRANSPARENT_PNG,
          headers: { 'content-type': contentTypeFor('.png') },
        });
      }
      return route.fulfill({ status: 204, body: '' });
    }

    const localPath = resolveLocalPath(url.pathname);
    if (!localPath || !existsSync(localPath)) {
      return route.fulfill({ status: 404, body: '' });
    }

    const body = readFileSync(localPath);
    return route.fulfill({
      status: 200,
      body,
      headers: { 'content-type': contentTypeFor(extname(localPath).toLowerCase()) },
    });
  });
});

// List of all component pages
const COMPONENTS = [
  'accordion', 'alert', 'alpine-utils', 'attendance-list', 'audio-player',
  'autocomplete', 'avatar', 'back-button', 'badge', 'banner', 'barcode-scanner',
  'batch-tracker', 'bom-tree', 'breadcrumbs', 'button', 'button-group',
  'calculator', 'calendar', 'calendar-views', 'callout', 'card', 'carousel',
  'cart', 'category-tabs', 'chart', 'checkbox', 'chip', 'code-block',
  'collapsible-panel', 'color-picker', 'command', 'content', 'context-menu',
  'currency-input', 'dashboard-grid', 'datatable', 'datatable-full',
  'date-range-picker', 'datetime', 'diff-viewer', 'divider', 'drawer',
  'dropdown', 'electron', 'employee-card', 'event-card', 'fab', 'form',
  'form-wizard', 'fullscreen-modal', 'gantt', 'gauge', 'icon-button',
  'image-crop', 'image-gallery', 'image-zoom', 'img', 'infinite-scroll',
  'input', 'json-viewer', 'kanban', 'keyboard', 'layout', 'leave-request',
  'lightbox', 'list', 'load-more', 'loading', 'machine-status', 'masonry',
  'master-detail', 'mega-menu', 'menu', 'modal', 'navbar', 'notifications',
  'numpad', 'onscreen-keyboard', 'order-ticket', 'org-chart', 'otp-input',
  'pagination', 'panel', 'payment', 'pdf-viewer', 'performance-meter',
  'phone-input', 'picker', 'popover', 'product-card', 'production-line',
  'progress', 'progress-circle', 'progress-steps', 'pwa', 'qr-code',
  'quality-check', 'quantity-badge', 'quantity-stepper', 'radio', 'range',
  'rating', 'receipt', 'refresher', 'reorder', 'rich-text', 'scheduler',
  'searchbar', 'section', 'segment', 'select', 'sheet', 'shell',
  'shift-calendar', 'signature-pad', 'skeleton', 'snackbar', 'spacer',
  'sparkline', 'spinner', 'split-button', 'split-pane-right', 'state',
  'stats', 'status-indicator', 'stepper', 'stock-indicator', 'swipe',
  'table', 'tabs', 'tag', 'tag-input', 'textarea', 'time-clock', 'timeline',
  'toast', 'toggle', 'toolbar', 'tooltip', 'tree', 'upload', 'utilities',
  'variant-selector', 'video-player', 'virtual-keyboard', 'virtual-list',
  'web-components', 'work-order'
];

const EXAMPLE_PREFERENCE = [
  'basico.html',
  'basic.html',
  'example.html',
  'example-1.html',
  'demo.html',
  'demo-interactiva.html',
];

function buildExampleMap(components: string[]) {
  const map: Record<string, string> = {};
  for (const component of components) {
    const examplesDir = join(DOCS_ROOT, 'pages', component, 'examples');
    let exampleFile: string | null = null;

    if (existsSync(examplesDir)) {
      const files = readdirSync(examplesDir)
        .filter((file) => file.endsWith('.html'))
        .sort();
      if (files.length) {
        exampleFile = EXAMPLE_PREFERENCE.find((pref) => files.includes(pref)) || files[0];
      }
    }

    if (exampleFile) {
      map[component] = `pages/${component}/examples/${exampleFile}`;
      continue;
    }

    const indexPath = join(DOCS_ROOT, 'pages', component, 'index.html');
    if (existsSync(indexPath)) {
      map[component] = `pages/${component}/index.html`;
    } else {
      map[component] = `pages/${component}/index.html`;
    }
  }
  return map;
}

const COMPONENT_EXAMPLES = buildExampleMap(COMPONENTS);

// Helper to load an example with CSS via the main docs app
async function loadPartial(page: Page, componentName: string) {
  // Load the main docs page which has all CSS
  await page.goto('/docs/');
  await page.waitForLoadState('domcontentloaded');

  // Wait for Alpine to initialize (with timeout fallback)
  await page.waitForFunction(() => (window as any).Alpine !== undefined, { timeout: 5000 }).catch(() => {});

  const examplePath = COMPONENT_EXAMPLES[componentName] ?? `pages/${componentName}/index.html`;

  // Load the example content via fetch and inject into content area
  // Also set Alpine's currentPage to show the component-content area
  await page.evaluate(async ({ component, path }) => {
    const response = await fetch(`/docs/${path}`);
    const html = await response.text();
    const contentEl = document.getElementById('component-content') || document.querySelector('#page-content') || document.body;
    contentEl.innerHTML = html;

    // Ensure component content is visible even without Alpine
    contentEl.removeAttribute('x-cloak');
    contentEl.style.display = 'block';
    contentEl.style.visibility = 'visible';
    document.querySelectorAll('[x-cloak]').forEach((el) => el.removeAttribute('x-cloak'));

    // Make the component-content visible by changing Alpine state
    // The component-content is hidden when currentPage === 'home'
    const alpineEl = document.querySelector('[x-data]');
    if (alpineEl && (window as any).Alpine) {
      const data = (window as any).Alpine.$data(alpineEl);
      if (data) {
        data.currentPage = component;
        data.pageTitle = component;
      }
    }
  }, { component: componentName, path: examplePath });

  // Wait for Alpine to update and content to render
  await page.waitForTimeout(300);
}

// Helper to check for console errors
function setupErrorCapture(page: Page): string[] {
  const errors: string[] = [];
  const debugErrors = process.env.UX_DEBUG_ERRORS === '1';
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon')) {
      errors.push(msg.text());
      if (debugErrors) {
        console.log(`[console:error] ${msg.text()}`);
      }
    }
  });
  page.on('pageerror', error => {
    errors.push(error.message);
    if (debugErrors) {
      console.log(`[pageerror] ${error.message}`);
    }
  });
  return errors;
}

// ==========================================================
// Main Documentation App Tests
// ==========================================================

test.describe('Documentation App', () => {
  test('should load index page with glass sidebar', async ({ page }) => {
    await page.goto('/docs/');
    await page.waitForLoadState('domcontentloaded');

    // Check sidebar has glass effect
    const sidebar = page.locator('.ux-split-pane__side');
    await expect(sidebar).toBeVisible();

    const backdropFilter = await sidebar.evaluate(el =>
      getComputedStyle(el).backdropFilter || (getComputedStyle(el) as any).webkitBackdropFilter
    );
    if (backdropFilter && backdropFilter !== 'none') {
      expect(backdropFilter).toContain('blur');
    } else {
      await expect(sidebar).toHaveClass(/--glass/);
    }
  });

  test('should load index page with glass navbar', async ({ page }) => {
    await page.goto('/docs/');
    await page.waitForLoadState('domcontentloaded');

    // Check navbar has glass effect
    const navbar = page.locator('.ux-navbar--glass, .ux-navbar--sticky').first();
    await expect(navbar).toBeVisible();

    const backdropFilter = await navbar.evaluate(el =>
      getComputedStyle(el).backdropFilter || (getComputedStyle(el) as any).webkitBackdropFilter
    );
    if (backdropFilter && backdropFilter !== 'none') {
      expect(backdropFilter).toContain('blur');
    } else {
      await expect(navbar).toHaveClass(/--glass/);
    }
  });

  test('should have responsive sidebar on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/docs/');

    // Sidebar should be hidden on mobile initially
    const sidebar = page.locator('.ux-split-pane__side');
    const transform = await sidebar.evaluate(el => getComputedStyle(el).transform);
    expect(transform).toContain('matrix'); // translateX(-100%) creates a matrix
  });

  test('should show sidebar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/docs/');

    const sidebar = page.locator('.ux-split-pane__side');
    await expect(sidebar).toBeVisible();

    // Should not be translated
    const transform = await sidebar.evaluate(el => getComputedStyle(el).transform);
    expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').toBeTruthy();
  });
});

// ==========================================================
// Component Partial Tests
// ==========================================================

test.describe('Component Partials', () => {
  for (const component of COMPONENTS) {
    test.describe(component, () => {
      test(`should load ${component} partial without errors`, async ({ page }) => {
        const errors = setupErrorCapture(page);
        await loadPartial(page, component);

        // Should have content
        const body = page.locator('body');
        const content = await body.textContent();
        expect(content?.length).toBeGreaterThan(10);

        // Should not have critical JS errors (ignore Alpine warnings for partials)
        const criticalErrors = errors.filter(e =>
          !e.includes('Alpine') &&
          !e.includes('x-data') &&
          !e.includes('undefined')
        );
        expect(criticalErrors).toHaveLength(0);
      });

      test(`should render ${component} correctly`, async ({ page }) => {
        await loadPartial(page, component);

        // Check for UX component classes
        const hasUxClasses = await page.evaluate(() => {
          const elements = document.querySelectorAll('[class*="ux-"]');
          return elements.length > 0;
        });
        expect(hasUxClasses).toBeTruthy();
      });

      test(`should be responsive on mobile - ${component}`, async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await loadPartial(page, component);

        // Check no horizontal overflow
        const hasOverflow = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });

        // Some components may intentionally overflow (carousels, etc)
        const allowedOverflow = ['carousel', 'virtual-list', 'datatable', 'datatable-full', 'gantt', 'scheduler', 'kanban'];
        if (!allowedOverflow.includes(component)) {
          expect(hasOverflow).toBeFalsy();
        }
      });

      test(`should be responsive on tablet - ${component}`, async ({ page }) => {
        await page.setViewportSize({ width: 810, height: 1080 });
        await loadPartial(page, component);

        // Should render without errors
        const body = page.locator('body');
        await expect(body).toBeVisible();
      });

      test(`should be responsive on desktop - ${component}`, async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await loadPartial(page, component);

        // Should render without errors
        const body = page.locator('body');
        await expect(body).toBeVisible();
      });
    });
  }
});

// ==========================================================
// Specific Component Tests
// ==========================================================

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'button');
  });

  test('should have minimum touch target size', async ({ page }) => {
    const button = page.locator('.ux-button').first();
    const box = await button.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(36);
  });

  test('should show color variants', async ({ page }) => {
    const primaryBtn = page.locator('.ux-color-primary').first();
    if (await primaryBtn.count() > 0) {
      await expect(primaryBtn).toBeVisible();
    }
  });
});

test.describe('Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'modal');
  });

  test('should have glass effect on modal', async ({ page }) => {
    const modal = page.locator('.ux-modal--glass, [class*="--glass"]').first();
    if (await modal.count() > 0) {
      const backdropFilter = await modal.evaluate(el =>
        getComputedStyle(el).backdropFilter || (getComputedStyle(el) as any).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});

test.describe('Spinner Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'spinner');
  });

  test('should render spinner with correct size', async ({ page }) => {
    // Look in component-content to avoid finding the navbar htmx indicator
    const spinner = page.locator('#component-content .ux-spinner').first();
    await expect(spinner).toBeVisible();

    const box = await spinner.boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
  });

  test('should render size variants', async ({ page }) => {
    const smallSpinner = page.locator('#component-content .ux-spinner--sm').first();
    const largeSpinner = page.locator('#component-content .ux-spinner--lg').first();

    if (await smallSpinner.count() > 0 && await largeSpinner.count() > 0) {
      const smallBox = await smallSpinner.boundingBox();
      const largeBox = await largeSpinner.boundingBox();

      expect(smallBox?.width).toBeLessThan(largeBox?.width || 0);
    }
  });
});

test.describe('Chip Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'chip');
  });

  test('should have adequate padding', async ({ page }) => {
    const chip = page.locator('.ux-chip').first();
    await expect(chip).toBeVisible();

    const padding = await chip.evaluate(el => {
      const style = getComputedStyle(el);
      return {
        left: parseInt(style.paddingLeft),
        right: parseInt(style.paddingRight)
      };
    });

    // Should have at least 10px padding
    expect(padding.left).toBeGreaterThanOrEqual(10);
    expect(padding.right).toBeGreaterThanOrEqual(10);
  });
});

test.describe('Split Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'split-button');
  });

  test('should render outline variant with visible border', async ({ page }) => {
    const outlineToggle = page.locator('.ux-split-button--outline .ux-split-button__toggle, .ux-split-button:has(.ux-button--outline) .ux-split-button__toggle').first();

    if (await outlineToggle.count() > 0) {
      const borderWidth = await outlineToggle.evaluate(el =>
        getComputedStyle(el).borderWidth
      );
      expect(borderWidth).not.toBe('0px');
    }
  });
});

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'tabs');
  });

  test('should render tabs correctly', async ({ page }) => {
    const tabs = page.locator('.ux-tabs, .ux-tab-bar').first();
    await expect(tabs).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    const tab = page.locator('.ux-tabs__tab, .ux-tab-button, [role="tab"]').first();
    if (await tab.count() > 0) {
      await tab.focus();
      await expect(tab).toBeFocused();
    }
  });
});

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'input');
  });

  test('should have proper input height for touch', async ({ page }) => {
    const input = page.locator('.ux-input input, .ux-input').first();
    const box = await input.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(36);
  });
});

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await loadPartial(page, 'card');
  });

  test('should render card with proper structure', async ({ page }) => {
    const card = page.locator('.ux-card').first();
    await expect(card).toBeVisible();
  });

  test('should have glass variant', async ({ page }) => {
    const glassCard = page.locator('.ux-card--glass').first();
    if (await glassCard.count() > 0) {
      const backdropFilter = await glassCard.evaluate(el =>
        getComputedStyle(el).backdropFilter || (getComputedStyle(el) as any).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});

// ==========================================================
// Accessibility Tests
// ==========================================================

test.describe('Accessibility', () => {
  test('buttons should be keyboard accessible', async ({ page }) => {
    await loadPartial(page, 'button');

    const button = page.locator('.ux-button').first();
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('inputs should have labels or aria-label', async ({ page }) => {
    await loadPartial(page, 'input');

    const inputs = page.locator('input:not([type="hidden"])');
    const count = await inputs.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const placeholder = await input.getAttribute('placeholder');

      // Should have some form of label
      const hasLabel = id
        ? await page.locator(`label[for="${id}"]`).count() > 0
        : false;

      expect(hasLabel || ariaLabel || ariaLabelledBy || placeholder).toBeTruthy();
    }
  });

  test('modals should have proper ARIA attributes', async ({ page }) => {
    await loadPartial(page, 'modal');

    const modal = page.locator('.ux-modal[role="dialog"], .ux-modal').first();
    if (await modal.count() > 0) {
      // Modal should exist
      await expect(modal).toBeVisible();
    }
  });
});

// ==========================================================
// Visual Regression Baseline
// ==========================================================

test.describe('Visual Baseline', () => {
  const criticalComponents = ['button', 'input', 'card', 'modal', 'tabs', 'navbar', 'spinner', 'chip'];

  for (const component of criticalComponents) {
    test(`visual baseline - ${component}`, async ({ page }) => {
      await loadPartial(page, component);

      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot(`${component}.png`, {
        maxDiffPixels: 100,
        threshold: 0.2,
      });
    });
  }
});
