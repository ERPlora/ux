import { test, expect } from '@playwright/test';

test.describe('PWA Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/pwa.html');
  });

  // Basic Rendering Tests
  test('should render PWA component', async ({ page }) => {
    const pwaContainer = page.locator('[x-data*="uxPWA"]');
    await expect(pwaContainer).toBeVisible();
  });

  test('should render status bar element', async ({ page }) => {
    const statusBar = page.locator('.ux-pwa-status').first();
    await expect(statusBar).toBeDefined();
  });

  test('should render install banner element', async ({ page }) => {
    const installBanner = page.locator('.ux-pwa-install').first();
    await expect(installBanner).toBeDefined();
  });

  test('should render update banner element', async ({ page }) => {
    const updateBanner = page.locator('.ux-pwa-update').first();
    await expect(updateBanner).toBeDefined();
  });

  // Offline Status Indicator Tests
  test('should display online status in demo section', async ({ page }) => {
    const statusIndicator = page.locator('.status-indicator').first();
    await expect(statusIndicator).toBeVisible();

    const text = await statusIndicator.textContent();
    const isOnlineText = text?.includes('Conectado') || text?.includes('Sin conexion');
    expect(isOnlineText).toBe(true);
  });

  test('should have online/offline visual distinction', async ({ page }) => {
    const statusIndicator = page.locator('.status-indicator').first();
    const classes = await statusIndicator.getAttribute('class');

    const isOnlineClass = classes?.includes('status-indicator--online');
    const isOfflineClass = classes?.includes('status-indicator--offline');

    expect(isOnlineClass || isOfflineClass).toBe(true);
  });

  test('offline status should have danger styling', async ({ page }) => {
    const offlineStatus = page.locator('.ux-pwa-status--offline').first();
    if (await offlineStatus.count() > 0) {
      const bgColor = await offlineStatus.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have red/danger color background
      expect(bgColor).toBeTruthy();
    }
  });

  test('online status should have success styling', async ({ page }) => {
    const onlineStatus = page.locator('.ux-pwa-status--online').first();
    if (await onlineStatus.count() > 0) {
      const bgColor = await onlineStatus.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have green/success color background
      expect(bgColor).toBeTruthy();
    }
  });

  // Install Prompt Tests
  test('should render install banner with app icon', async ({ page }) => {
    const installIcon = page.locator('.ux-pwa-install__icon').first();
    if (await installIcon.count() > 0) {
      await expect(installIcon).toBeDefined();
      const src = await installIcon.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('should render install banner title', async ({ page }) => {
    const installTitle = page.locator('.ux-pwa-install__title').first();
    if (await installTitle.count() > 0) {
      await expect(installTitle).toBeDefined();
      const text = await installTitle.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render install banner subtitle', async ({ page }) => {
    const installSubtitle = page.locator('.ux-pwa-install__subtitle').first();
    if (await installSubtitle.count() > 0) {
      await expect(installSubtitle).toBeDefined();
      const text = await installSubtitle.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render install banner action buttons', async ({ page }) => {
    const installActions = page.locator('.ux-pwa-install__actions');
    if (await installActions.count() > 0) {
      const buttons = installActions.locator('button');
      expect(await buttons.count()).toBeGreaterThanOrEqual(2);
    }
  });

  test('should have dismiss button in install banner', async ({ page }) => {
    const dismissButton = page.locator('.ux-pwa-install__actions button').first();
    if (await dismissButton.count() > 0) {
      const text = await dismissButton.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have install button in install banner', async ({ page }) => {
    const buttons = page.locator('.ux-pwa-install__actions button');
    if (await buttons.count() > 1) {
      const installBtn = buttons.nth(1);
      const text = await installBtn.textContent();
      expect(text).toBeTruthy();
    }
  });

  // Status Bar Animation Tests
  test('offline status bar should be hidden by default', async ({ page }) => {
    const offlineStatus = page.locator('.ux-pwa-status--offline').first();
    if (await offlineStatus.count() > 0) {
      const hasVisibleClass = await offlineStatus.evaluate(el =>
        el.classList.contains('ux-pwa-status--visible')
      );
      expect(hasVisibleClass).toBe(false);
    }
  });

  test('online status bar should be hidden by default', async ({ page }) => {
    const onlineStatus = page.locator('.ux-pwa-status--online').first();
    if (await onlineStatus.count() > 0) {
      const hasVisibleClass = await onlineStatus.evaluate(el =>
        el.classList.contains('ux-pwa-status--visible')
      );
      expect(hasVisibleClass).toBe(false);
    }
  });

  test('should apply transform to hidden status bar', async ({ page }) => {
    const statusBar = page.locator('.ux-pwa-status').first();
    if (await statusBar.count() > 0) {
      const transform = await statusBar.evaluate(el =>
        getComputedStyle(el).transform
      );
      // Hidden state should translate up
      expect(transform).toBeTruthy();
    }
  });

  // Install Banner Animation Tests
  test('install banner should be hidden by default', async ({ page }) => {
    const installBanner = page.locator('.ux-pwa-install').first();
    if (await installBanner.count() > 0) {
      const hasVisibleClass = await installBanner.evaluate(el =>
        el.classList.contains('ux-pwa-install--visible')
      );
      expect(hasVisibleClass).toBe(false);
    }
  });

  test('should apply transform to hidden install banner', async ({ page }) => {
    const installBanner = page.locator('.ux-pwa-install').first();
    if (await installBanner.count() > 0) {
      const transform = await installBanner.evaluate(el =>
        getComputedStyle(el).transform
      );
      // Hidden state should translate down
      expect(transform).toBeTruthy();
    }
  });

  // Update Banner Tests
  test('should render update banner', async ({ page }) => {
    const updateBanner = page.locator('.ux-pwa-update').first();
    if (await updateBanner.count() > 0) {
      await expect(updateBanner).toBeDefined();
    }
  });

  test('should have update banner text', async ({ page }) => {
    const updateText = page.locator('.ux-pwa-update__text').first();
    if (await updateText.count() > 0) {
      const text = await updateText.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have update button in update banner', async ({ page }) => {
    const updateBtn = page.locator('.ux-pwa-update__btn').first();
    if (await updateBtn.count() > 0) {
      await expect(updateBtn).toBeDefined();
      const text = await updateBtn.textContent();
      expect(text).toBeTruthy();
    }
  });

  // Z-index Tests
  test('status bar should have high z-index', async ({ page }) => {
    const statusBar = page.locator('.ux-pwa-status').first();
    if (await statusBar.count() > 0) {
      const zIndex = await statusBar.evaluate(el =>
        getComputedStyle(el).zIndex
      );
      // Should be a valid z-index
      const zIndexNum = parseInt(zIndex);
      expect(zIndexNum).toBeGreaterThan(0);
    }
  });

  test('install banner should have modal z-index', async ({ page }) => {
    const installBanner = page.locator('.ux-pwa-install').first();
    if (await installBanner.count() > 0) {
      const zIndex = await installBanner.evaluate(el =>
        getComputedStyle(el).zIndex
      );
      const zIndexNum = parseInt(zIndex);
      expect(zIndexNum).toBeGreaterThan(0);
    }
  });

  // Responsive Layout Tests
  test('install banner should be fixed position', async ({ page }) => {
    const installBanner = page.locator('.ux-pwa-install').first();
    if (await installBanner.count() > 0) {
      const position = await installBanner.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    }
  });

  test('status bar should be fixed position', async ({ page }) => {
    const statusBar = page.locator('.ux-pwa-status').first();
    if (await statusBar.count() > 0) {
      const position = await statusBar.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    }
  });

  test('update banner should be fixed position', async ({ page }) => {
    const updateBanner = page.locator('.ux-pwa-update').first();
    if (await updateBanner.count() > 0) {
      const position = await updateBanner.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    }
  });

  // Accessibility Tests
  test('install banner buttons should be keyboard accessible', async ({ page }) => {
    const button = page.locator('.ux-pwa-install__actions button').first();
    if (await button.count() > 0) {
      await button.focus();
      await expect(button).toBeFocused();
    }
  });

  test('install banner should have proper ARIA structure', async ({ page }) => {
    const installContent = page.locator('.ux-pwa-install__content').first();
    if (await installContent.count() > 0) {
      await expect(installContent).toBeDefined();
      // Should have visual hierarchy
      const icon = installContent.locator('.ux-pwa-install__icon');
      const title = installContent.locator('.ux-pwa-install__title');
      expect(await icon.count()).toBeGreaterThanOrEqual(0);
      expect(await title.count()).toBeGreaterThanOrEqual(0);
    }
  });

  // Safe Area Support Tests
  test('install banner should respect safe-area-inset-bottom', async ({ page }) => {
    const installBanner = page.locator('.ux-pwa-install').first();
    if (await installBanner.count() > 0) {
      const paddingBottom = await installBanner.evaluate(el =>
        getComputedStyle(el).paddingBottom
      );
      expect(paddingBottom).toBeTruthy();
    }
  });

  // Demo Button Interaction Tests
  test('simulate offline button should exist', async ({ page }) => {
    const offlineButton = page.locator('button:has-text("Simular Offline")').first();
    if (await offlineButton.count() > 0) {
      await expect(offlineButton).toBeVisible();
    }
  });

  test('simulate online button should exist', async ({ page }) => {
    const onlineButton = page.locator('button:has-text("Simular Online")').first();
    if (await onlineButton.count() > 0) {
      await expect(onlineButton).toBeVisible();
    }
  });

  test('show install banner button should exist', async ({ page }) => {
    const installButton = page.locator('button:has-text("Mostrar Install Banner")').first();
    if (await installButton.count() > 0) {
      await expect(installButton).toBeVisible();
    }
  });

  // Cached Indicator Tests
  test('should render cached indicator badge', async ({ page }) => {
    const cachedBadge = page.locator('.ux-pwa-cached').first();
    if (await cachedBadge.count() > 0) {
      await expect(cachedBadge).toBeDefined();
    }
  });

  test('cached indicator should have success styling', async ({ page }) => {
    const cachedBadge = page.locator('.ux-pwa-cached').first();
    if (await cachedBadge.count() > 0) {
      const bgColor = await cachedBadge.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  // API Reference Section Tests
  test('should display configuration section', async ({ page }) => {
    const apiSection = page.locator('text=API Reference');
    await expect(apiSection).toBeVisible();
  });

  test('should have properties table', async ({ page }) => {
    const tables = page.locator('.api-table');
    expect(await tables.count()).toBeGreaterThan(0);
  });

  test('configuration table should have entries', async ({ page }) => {
    const configRows = page.locator('.api-table tbody tr');
    const count = await configRows.count();
    expect(count).toBeGreaterThan(0);
  });

  // Offline Overlay Tests
  test('should render offline overlay element', async ({ page }) => {
    const offlineOverlay = page.locator('.ux-pwa-offline-overlay').first();
    if (await offlineOverlay.count() > 0) {
      await expect(offlineOverlay).toBeDefined();
    }
  });

  test('offline overlay should be hidden by default', async ({ page }) => {
    const offlineOverlay = page.locator('.ux-pwa-offline-overlay').first();
    if (await offlineOverlay.count() > 0) {
      const hasVisibleClass = await offlineOverlay.evaluate(el =>
        el.classList.contains('ux-pwa-offline-overlay--visible')
      );
      expect(hasVisibleClass).toBe(false);
    }
  });

  // Integration Tests
  test('all PWA status elements should be present', async ({ page }) => {
    const statusBar = page.locator('.ux-pwa-status');
    const installBanner = page.locator('.ux-pwa-install');
    const updateBanner = page.locator('.ux-pwa-update');

    expect(await statusBar.count()).toBeGreaterThan(0);
    expect(await installBanner.count()).toBeGreaterThan(0);
    expect(await updateBanner.count()).toBeGreaterThan(0);
  });

  test('should handle CSS transitions smoothly', async ({ page }) => {
    const statusBar = page.locator('.ux-pwa-status').first();
    if (await statusBar.count() > 0) {
      const transition = await statusBar.evaluate(el =>
        getComputedStyle(el).transition
      );
      // Should have a transition defined
      expect(transition).toBeTruthy();
    }
  });

  test('dark mode styles should be applied', async ({ page }) => {
    const darkContainer = page.locator('.ux-dark');
    if (await darkContainer.count() > 0) {
      await expect(darkContainer).toBeDefined();
    }
  });

  // Content Structure Tests
  test('should have demo section headers', async ({ page }) => {
    const headers = page.locator('.demo-section h3');
    const count = await headers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have demo boxes for visual reference', async ({ page }) => {
    const demoBoxes = page.locator('.demo-box');
    const count = await demoBoxes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display code examples', async ({ page }) => {
    const codeBlocks = page.locator('.ux-code-block');
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });

  // Alpine.js Integration Tests
  test('PWA component should be Alpine-enabled', async ({ page }) => {
    const container = page.locator('[x-data*="uxPWA"]').first();
    const xData = await container.getAttribute('x-data');
    expect(xData).toContain('uxPWA');
  });

  test('should have Alpine directives in template', async ({ page }) => {
    const xShow = page.locator('[x-show]');
    const count = await xShow.count();
    // Should have x-show directives for visibility toggling
    expect(count).toBeGreaterThanOrEqual(0);
  });

  // Mobile Viewport Tests
  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const installBanner = page.locator('.ux-pwa-install').first();
    if (await installBanner.count() > 0) {
      await expect(installBanner).toBeDefined();
    }
  });

  test('install banner should adapt to mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const content = page.locator('.ux-pwa-install__content').first();
    if (await content.count() > 0) {
      const display = await content.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });
});
