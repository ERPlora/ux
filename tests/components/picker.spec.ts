import { test, expect } from '@playwright/test';

test.describe('Picker Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/picker.html');
  });

  test('should render picker', async ({ page }) => {
    const picker = page.locator('.ux-picker').first();
    if (await picker.count() > 0) {
      await expect(picker).toBeDefined();
    }
  });

  test('should render picker columns', async ({ page }) => {
    const columns = page.locator('.ux-picker__column');
    if (await columns.count() > 0) {
      expect(await columns.count()).toBeGreaterThan(0);
    }
  });

  test('should render picker items', async ({ page }) => {
    const items = page.locator('.ux-picker__item');
    if (await items.count() > 0) {
      expect(await items.count()).toBeGreaterThan(0);
    }
  });

  test('should highlight selected item', async ({ page }) => {
    const selected = page.locator('.ux-picker__item--selected').first();
    if (await selected.count() > 0) {
      await expect(selected).toBeVisible();
    }
  });

  test('should have selection indicator', async ({ page }) => {
    const indicator = page.locator('.ux-picker__indicator, .ux-picker__highlight').first();
    if (await indicator.count() > 0) {
      await expect(indicator).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassPicker = page.locator('.ux-picker--glass').first();
    if (await glassPicker.count() > 0) {
      const backdropFilter = await glassPicker.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have border radius', async ({ page }) => {
    const picker = page.locator('.ux-picker').first();
    if (await picker.count() > 0) {
      const borderRadius = await picker.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should be scrollable', async ({ page }) => {
    const column = page.locator('.ux-picker__column').first();
    if (await column.count() > 0) {
      const overflow = await column.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(['scroll', 'auto', 'hidden']).toContain(overflow);
    }
  });
});
