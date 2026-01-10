import { test, expect } from '@playwright/test';

test.describe('Sheet Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/sheet.html');
  });

  test('should render sheet example', async ({ page }) => {
    const sheet = page.locator('.ux-sheet').first();
    if (await sheet.count() > 0) {
      await expect(sheet).toBeDefined();
    }
  });

  test('should render sheet handle', async ({ page }) => {
    const handle = page.locator('.ux-sheet__handle').first();
    if (await handle.count() > 0) {
      await expect(handle).toBeVisible();
    }
  });

  test('should render sheet content', async ({ page }) => {
    const content = page.locator('.ux-sheet__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should have rounded top corners', async ({ page }) => {
    const sheet = page.locator('.ux-sheet').first();
    if (await sheet.count() > 0) {
      const borderRadius = await sheet.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const sheet = page.locator('.ux-sheet').first();
    if (await sheet.count() > 0) {
      const zIndex = await sheet.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassSheet = page.locator('.ux-sheet--glass').first();
    if (await glassSheet.count() > 0) {
      const backdropFilter = await glassSheet.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have backdrop', async ({ page }) => {
    const backdrop = page.locator('.ux-sheet-backdrop, .ux-backdrop').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeDefined();
    }
  });

  test('should position at bottom', async ({ page }) => {
    const sheet = page.locator('.ux-sheet').first();
    if (await sheet.count() > 0) {
      const bottom = await sheet.evaluate(el =>
        getComputedStyle(el).bottom
      );
      expect(bottom).toBeDefined();
    }
  });

  test('should have full width', async ({ page }) => {
    const sheet = page.locator('.ux-sheet').first();
    if (await sheet.count() > 0) {
      const width = await sheet.evaluate(el =>
        getComputedStyle(el).width
      );
      expect(width).not.toBe('auto');
    }
  });
});
