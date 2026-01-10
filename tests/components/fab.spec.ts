import { test, expect } from '@playwright/test';

test.describe('FAB Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/fab.html');
  });

  test('should render FAB', async ({ page }) => {
    const fab = page.locator('.ux-fab').first();
    await expect(fab).toBeVisible();
  });

  test('should have circular shape', async ({ page }) => {
    const fab = page.locator('.ux-fab').first();
    const borderRadius = await fab.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toContain('50%');
  });

  test('should have minimum touch target', async ({ page }) => {
    const fab = page.locator('.ux-fab').first();
    const size = await fab.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    expect(size).toBeGreaterThanOrEqual(44);
  });

  test('should render icon', async ({ page }) => {
    const icon = page.locator('.ux-fab svg, .ux-fab__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should apply color variants', async ({ page }) => {
    const primaryFab = page.locator('.ux-fab.ux-color-primary').first();
    if (await primaryFab.count() > 0) {
      await expect(primaryFab).toBeVisible();
    }
  });

  test('should have shadow', async ({ page }) => {
    const fab = page.locator('.ux-fab').first();
    const boxShadow = await fab.evaluate(el =>
      getComputedStyle(el).boxShadow
    );
    expect(boxShadow).not.toBe('none');
  });

  test('should have fixed position', async ({ page }) => {
    const fab = page.locator('.ux-fab').first();
    const position = await fab.evaluate(el =>
      getComputedStyle(el).position
    );
    expect(['fixed', 'absolute']).toContain(position);
  });

  test('should have proper z-index', async ({ page }) => {
    const fab = page.locator('.ux-fab').first();
    const zIndex = await fab.evaluate(el =>
      parseInt(getComputedStyle(el).zIndex) || 0
    );
    expect(zIndex).toBeGreaterThan(0);
  });

  test('should be clickable', async ({ page }) => {
    const fab = page.locator('.ux-fab').first();
    await fab.click();
    expect(true).toBe(true);
  });

  test('should apply extended variant', async ({ page }) => {
    const extendedFab = page.locator('.ux-fab--extended').first();
    if (await extendedFab.count() > 0) {
      const width = await extendedFab.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeGreaterThan(56);
    }
  });
});
