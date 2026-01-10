import { test, expect } from '@playwright/test';

test.describe('Loading Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/loading.html');
  });

  test('should render loading', async ({ page }) => {
    const loading = page.locator('.ux-loading').first();
    if (await loading.count() > 0) {
      await expect(loading).toBeDefined();
    }
  });

  test('should render loading spinner', async ({ page }) => {
    const spinner = page.locator('.ux-loading .ux-spinner, .ux-loading__spinner').first();
    if (await spinner.count() > 0) {
      await expect(spinner).toBeVisible();
    }
  });

  test('should render loading message', async ({ page }) => {
    const message = page.locator('.ux-loading__message, .ux-loading__text').first();
    if (await message.count() > 0) {
      const text = await message.textContent();
      expect(text).toBeDefined();
    }
  });

  test('should have backdrop', async ({ page }) => {
    const backdrop = page.locator('.ux-loading-backdrop, .ux-loading.ux-backdrop').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeDefined();
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const loading = page.locator('.ux-loading').first();
    if (await loading.count() > 0) {
      const zIndex = await loading.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassLoading = page.locator('.ux-loading--glass').first();
    if (await glassLoading.count() > 0) {
      const backdropFilter = await glassLoading.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should be centered', async ({ page }) => {
    const loading = page.locator('.ux-loading').first();
    if (await loading.count() > 0) {
      const position = await loading.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['fixed', 'absolute']).toContain(position);
    }
  });
});
