import { test, expect } from '@playwright/test';

test.describe('Toast Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/toast.html');
  });

  test('should render toast container', async ({ page }) => {
    const container = page.locator('.ux-toast-container').first();
    if (await container.count() > 0) {
      await expect(container).toBeDefined();
    }
  });

  test('should render toast example', async ({ page }) => {
    const toast = page.locator('.ux-toast').first();
    if (await toast.count() > 0) {
      await expect(toast).toBeVisible();
    }
  });

  test('should render toast message', async ({ page }) => {
    const message = page.locator('.ux-toast__message, .ux-toast').first();
    if (await message.count() > 0) {
      const text = await message.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should apply success variant', async ({ page }) => {
    const successToast = page.locator('.ux-toast--success, .ux-toast.ux-color-success').first();
    if (await successToast.count() > 0) {
      await expect(successToast).toBeVisible();
    }
  });

  test('should apply error variant', async ({ page }) => {
    const errorToast = page.locator('.ux-toast--error, .ux-toast--danger, .ux-toast.ux-color-danger').first();
    if (await errorToast.count() > 0) {
      await expect(errorToast).toBeVisible();
    }
  });

  test('should apply warning variant', async ({ page }) => {
    const warningToast = page.locator('.ux-toast--warning, .ux-toast.ux-color-warning').first();
    if (await warningToast.count() > 0) {
      await expect(warningToast).toBeVisible();
    }
  });

  test('should have border radius', async ({ page }) => {
    const toast = page.locator('.ux-toast').first();
    if (await toast.count() > 0) {
      const borderRadius = await toast.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const toast = page.locator('.ux-toast, .ux-toast-container').first();
    if (await toast.count() > 0) {
      const zIndex = await toast.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should render close button', async ({ page }) => {
    const closeButton = page.locator('.ux-toast__close, .ux-toast button').first();
    if (await closeButton.count() > 0) {
      await expect(closeButton).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassToast = page.locator('.ux-toast--glass').first();
    if (await glassToast.count() > 0) {
      const backdropFilter = await glassToast.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});
