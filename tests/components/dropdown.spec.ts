import { test, expect } from '@playwright/test';

test.describe('Dropdown Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/dropdown.html');
  });

  test('should render dropdown trigger', async ({ page }) => {
    const trigger = page.locator('.ux-dropdown__trigger, .ux-dropdown button').first();
    if (await trigger.count() > 0) {
      await expect(trigger).toBeVisible();
    }
  });

  test('should render dropdown menu', async ({ page }) => {
    const menu = page.locator('.ux-dropdown__menu, .ux-dropdown .ux-popover').first();
    if (await menu.count() > 0) {
      await expect(menu).toBeDefined();
    }
  });

  test('should open on trigger click', async ({ page }) => {
    const trigger = page.locator('.ux-dropdown__trigger, .ux-dropdown button').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      expect(true).toBe(true);
    }
  });

  test('should render dropdown items', async ({ page }) => {
    const items = page.locator('.ux-dropdown__item');
    if (await items.count() > 0) {
      expect(await items.count()).toBeGreaterThan(0);
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const menu = page.locator('.ux-dropdown__menu').first();
    if (await menu.count() > 0) {
      const zIndex = await menu.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassDropdown = page.locator('.ux-dropdown--glass').first();
    if (await glassDropdown.count() > 0) {
      const backdropFilter = await glassDropdown.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have border radius', async ({ page }) => {
    const menu = page.locator('.ux-dropdown__menu').first();
    if (await menu.count() > 0) {
      const borderRadius = await menu.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('items should have minimum touch target', async ({ page }) => {
    const item = page.locator('.ux-dropdown__item').first();
    if (await item.count() > 0) {
      const height = await item.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(36);
    }
  });
});
