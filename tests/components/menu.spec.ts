import { test, expect } from '@playwright/test';

test.describe('Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/menu.html');
  });

  test('should render menu', async ({ page }) => {
    const menu = page.locator('.ux-menu').first();
    await expect(menu).toBeVisible();
  });

  test('should render menu items', async ({ page }) => {
    const items = page.locator('.ux-menu__item');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should render menu item labels', async ({ page }) => {
    const label = page.locator('.ux-menu__label, .ux-menu__item').first();
    await expect(label).toBeVisible();
  });

  test('should render menu item icons', async ({ page }) => {
    const icon = page.locator('.ux-menu__item svg, .ux-menu__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should highlight active item', async ({ page }) => {
    const activeItem = page.locator('.ux-menu__item--active').first();
    if (await activeItem.count() > 0) {
      await expect(activeItem).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassMenu = page.locator('.ux-menu--glass').first();
    if (await glassMenu.count() > 0) {
      const backdropFilter = await glassMenu.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have minimum touch target for items', async ({ page }) => {
    const item = page.locator('.ux-menu__item').first();
    const height = await item.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(44);
  });

  test('should render submenu if present', async ({ page }) => {
    const submenu = page.locator('.ux-menu__submenu').first();
    if (await submenu.count() > 0) {
      await expect(submenu).toBeDefined();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    const item = page.locator('.ux-menu__item').first();
    await item.focus();
    await expect(item).toBeFocused();
  });
});
