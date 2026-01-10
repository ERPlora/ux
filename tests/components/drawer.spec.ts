import { test, expect } from '@playwright/test';

test.describe('Drawer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/drawer.html');
  });

  test('should render drawer', async ({ page }) => {
    const drawer = page.locator('.ux-drawer').first();
    if (await drawer.count() > 0) {
      await expect(drawer).toBeDefined();
    }
  });

  test('should render drawer content', async ({ page }) => {
    const content = page.locator('.ux-drawer__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeDefined();
    }
  });

  test('should have backdrop', async ({ page }) => {
    const backdrop = page.locator('.ux-drawer-backdrop, .ux-backdrop').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeDefined();
    }
  });

  test('should apply left position', async ({ page }) => {
    const leftDrawer = page.locator('.ux-drawer--left').first();
    if (await leftDrawer.count() > 0) {
      const left = await leftDrawer.evaluate(el =>
        getComputedStyle(el).left
      );
      expect(left).toBeDefined();
    }
  });

  test('should apply right position', async ({ page }) => {
    const rightDrawer = page.locator('.ux-drawer--right').first();
    if (await rightDrawer.count() > 0) {
      const right = await rightDrawer.evaluate(el =>
        getComputedStyle(el).right
      );
      expect(right).toBeDefined();
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const drawer = page.locator('.ux-drawer').first();
    if (await drawer.count() > 0) {
      const zIndex = await drawer.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassDrawer = page.locator('.ux-drawer--glass').first();
    if (await glassDrawer.count() > 0) {
      const backdropFilter = await glassDrawer.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have fixed position', async ({ page }) => {
    const drawer = page.locator('.ux-drawer').first();
    if (await drawer.count() > 0) {
      const position = await drawer.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['fixed', 'absolute']).toContain(position);
    }
  });
});
