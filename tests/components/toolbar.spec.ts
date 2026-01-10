import { test, expect } from '@playwright/test';

test.describe('Toolbar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/toolbar.html');
  });

  test('should render toolbar', async ({ page }) => {
    const toolbar = page.locator('.ux-toolbar').first();
    await expect(toolbar).toBeVisible();
  });

  test('should render toolbar buttons', async ({ page }) => {
    const buttons = page.locator('.ux-toolbar button, .ux-toolbar .ux-button');
    if (await buttons.count() > 0) {
      await expect(buttons.first()).toBeVisible();
    }
  });

  test('should apply sticky variant', async ({ page }) => {
    const stickyToolbar = page.locator('.ux-toolbar--sticky').first();
    if (await stickyToolbar.count() > 0) {
      const position = await stickyToolbar.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['sticky', 'fixed']).toContain(position);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassToolbar = page.locator('.ux-toolbar--glass').first();
    if (await glassToolbar.count() > 0) {
      const backdropFilter = await glassToolbar.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have appropriate height', async ({ page }) => {
    const toolbar = page.locator('.ux-toolbar').first();
    const height = await toolbar.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(44);
  });

  test('should render start section', async ({ page }) => {
    const start = page.locator('.ux-toolbar__start').first();
    if (await start.count() > 0) {
      await expect(start).toBeVisible();
    }
  });

  test('should render center section', async ({ page }) => {
    const center = page.locator('.ux-toolbar__center').first();
    if (await center.count() > 0) {
      await expect(center).toBeVisible();
    }
  });

  test('should render end section', async ({ page }) => {
    const end = page.locator('.ux-toolbar__end').first();
    if (await end.count() > 0) {
      await expect(end).toBeVisible();
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const toolbar = page.locator('.ux-toolbar').first();
    const zIndex = await toolbar.evaluate(el =>
      parseInt(getComputedStyle(el).zIndex) || 0
    );
    expect(zIndex).toBeGreaterThanOrEqual(0);
  });
});
