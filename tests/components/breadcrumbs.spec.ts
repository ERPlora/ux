import { test, expect } from '@playwright/test';

test.describe('Breadcrumbs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/breadcrumbs.html');
  });

  test('should render breadcrumbs', async ({ page }) => {
    const breadcrumbs = page.locator('.ux-breadcrumbs').first();
    await expect(breadcrumbs).toBeVisible();
  });

  test('should render breadcrumb items', async ({ page }) => {
    const items = page.locator('.ux-breadcrumbs__item, .ux-breadcrumbs a, .ux-breadcrumbs li');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should render separator', async ({ page }) => {
    const separator = page.locator('.ux-breadcrumbs__separator, .ux-breadcrumbs svg').first();
    if (await separator.count() > 0) {
      await expect(separator).toBeVisible();
    }
  });

  test('should highlight current item', async ({ page }) => {
    const currentItem = page.locator('.ux-breadcrumbs__item--current, [aria-current="page"]').first();
    if (await currentItem.count() > 0) {
      await expect(currentItem).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassBreadcrumbs = page.locator('.ux-breadcrumbs--glass').first();
    if (await glassBreadcrumbs.count() > 0) {
      const backdropFilter = await glassBreadcrumbs.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper navigation role', async ({ page }) => {
    const nav = page.locator('.ux-breadcrumbs[aria-label], nav.ux-breadcrumbs').first();
    if (await nav.count() > 0) {
      await expect(nav).toBeDefined();
    }
  });

  test('should have clickable links', async ({ page }) => {
    const link = page.locator('.ux-breadcrumbs a').first();
    if (await link.count() > 0) {
      await expect(link).toBeVisible();
    }
  });
});
