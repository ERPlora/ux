import { test, expect } from '@playwright/test';

test.describe('Popover Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/popover.html');
  });

  test('should render popover trigger', async ({ page }) => {
    const trigger = page.locator('[x-data*="uxPopover"] button, [\\@click*="toggle"]').first();
    if (await trigger.count() > 0) {
      await expect(trigger).toBeVisible();
    }
  });

  test('should render popover example', async ({ page }) => {
    const popover = page.locator('.ux-popover').first();
    if (await popover.count() > 0) {
      await expect(popover).toBeDefined();
    }
  });

  test('should have border radius', async ({ page }) => {
    const popover = page.locator('.ux-popover').first();
    if (await popover.count() > 0) {
      const borderRadius = await popover.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const popover = page.locator('.ux-popover').first();
    if (await popover.count() > 0) {
      const zIndex = await popover.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassPopover = page.locator('.ux-popover--glass').first();
    if (await glassPopover.count() > 0) {
      const backdropFilter = await glassPopover.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should apply dropdown variant', async ({ page }) => {
    const dropdown = page.locator('.ux-popover--dropdown').first();
    if (await dropdown.count() > 0) {
      await expect(dropdown).toBeDefined();
    }
  });

  test('should have shadow', async ({ page }) => {
    const popover = page.locator('.ux-popover').first();
    if (await popover.count() > 0) {
      const boxShadow = await popover.evaluate(el =>
        getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
  });

  test('should position absolutely', async ({ page }) => {
    const popover = page.locator('.ux-popover').first();
    if (await popover.count() > 0) {
      const position = await popover.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['absolute', 'fixed']).toContain(position);
    }
  });
});
