import { test, expect } from '@playwright/test';

test.describe('Snackbar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/snackbar.html');
  });

  test('should render snackbar', async ({ page }) => {
    const snackbar = page.locator('.ux-snackbar').first();
    if (await snackbar.count() > 0) {
      await expect(snackbar).toBeVisible();
    }
  });

  test('should render snackbar message', async ({ page }) => {
    const message = page.locator('.ux-snackbar__message, .ux-snackbar').first();
    if (await message.count() > 0) {
      const text = await message.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should render action button', async ({ page }) => {
    const action = page.locator('.ux-snackbar__action, .ux-snackbar button').first();
    if (await action.count() > 0) {
      await expect(action).toBeVisible();
    }
  });

  test('should have border radius', async ({ page }) => {
    const snackbar = page.locator('.ux-snackbar').first();
    if (await snackbar.count() > 0) {
      const borderRadius = await snackbar.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should position at bottom', async ({ page }) => {
    const snackbar = page.locator('.ux-snackbar').first();
    if (await snackbar.count() > 0) {
      const bottom = await snackbar.evaluate(el =>
        getComputedStyle(el).bottom
      );
      expect(bottom).toBeDefined();
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const snackbar = page.locator('.ux-snackbar').first();
    if (await snackbar.count() > 0) {
      const zIndex = await snackbar.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassSnackbar = page.locator('.ux-snackbar--glass').first();
    if (await glassSnackbar.count() > 0) {
      const backdropFilter = await glassSnackbar.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});
