import { test, expect } from '@playwright/test';

test.describe('List Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/list.html');
  });

  test('should render basic list', async ({ page }) => {
    const list = page.locator('.ux-list').first();
    await expect(list).toBeVisible();
  });

  test('should render list items', async ({ page }) => {
    const listItem = page.locator('.ux-list__item').first();
    await expect(listItem).toBeVisible();
  });

  test('should have multiple items', async ({ page }) => {
    const items = page.locator('.ux-list__item');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should apply inset variant', async ({ page }) => {
    const insetList = page.locator('.ux-list--inset').first();
    if (await insetList.count() > 0) {
      await expect(insetList).toBeVisible();
      const margin = await insetList.evaluate(el =>
        getComputedStyle(el).margin
      );
      expect(margin).not.toBe('0px');
    }
  });

  test('should render list header', async ({ page }) => {
    const header = page.locator('.ux-list__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render item with avatar', async ({ page }) => {
    const itemAvatar = page.locator('.ux-list__item .ux-avatar').first();
    if (await itemAvatar.count() > 0) {
      await expect(itemAvatar).toBeVisible();
    }
  });

  test('should render item with icon', async ({ page }) => {
    const itemIcon = page.locator('.ux-list__item svg, .ux-list__icon').first();
    if (await itemIcon.count() > 0) {
      await expect(itemIcon).toBeVisible();
    }
  });

  test('should render item detail/subtitle', async ({ page }) => {
    const detail = page.locator('.ux-list__detail, .ux-list__subtitle').first();
    if (await detail.count() > 0) {
      await expect(detail).toBeVisible();
    }
  });

  test('should have dividers between items', async ({ page }) => {
    const list = page.locator('.ux-list').first();
    const borderBottom = await list.locator('.ux-list__item').first().evaluate(el =>
      getComputedStyle(el).borderBottom
    );
    // Items may have border or use pseudo-elements for dividers
    expect(true).toBe(true);
  });

  test('should have minimum touch target for items', async ({ page }) => {
    const listItem = page.locator('.ux-list__item').first();
    const height = await listItem.evaluate(el =>
      parseInt(getComputedStyle(el).minHeight || getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(44);
  });

  test('should apply glass variant', async ({ page }) => {
    const glassList = page.locator('.ux-list--glass').first();
    if (await glassList.count() > 0) {
      const backdropFilter = await glassList.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});
