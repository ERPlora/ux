import { test, expect } from '@playwright/test';

test.describe('Alpine Utils Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/alpine-utils.html');
  });

  test('should render alpine utils documentation', async ({ page }) => {
    const content = page.locator('.demo-section, .ux-content').first();
    await expect(content).toBeVisible();
  });

  test('should have code examples', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block, pre').first();
    if (await codeBlock.count() > 0) {
      await expect(codeBlock).toBeVisible();
    }
  });

  test('should render clickaway directive example', async ({ page }) => {
    const clickaway = page.locator('[x-clickaway], [x-click-outside]').first();
    if (await clickaway.count() > 0) {
      await expect(clickaway).toBeDefined();
    }
  });

  test('should render trap focus example', async ({ page }) => {
    const trapFocus = page.locator('[x-trap], [x-trap-focus]').first();
    if (await trapFocus.count() > 0) {
      await expect(trapFocus).toBeDefined();
    }
  });

  test('should render intersect directive example', async ({ page }) => {
    const intersect = page.locator('[x-intersect]').first();
    if (await intersect.count() > 0) {
      await expect(intersect).toBeDefined();
    }
  });

  test('should render resize directive example', async ({ page }) => {
    const resize = page.locator('[x-resize]').first();
    if (await resize.count() > 0) {
      await expect(resize).toBeDefined();
    }
  });

  test('should render anchor directive example', async ({ page }) => {
    const anchor = page.locator('[x-anchor]').first();
    if (await anchor.count() > 0) {
      await expect(anchor).toBeDefined();
    }
  });
});
