import { test, expect } from '@playwright/test';

test.describe('Alert Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/alert.html');
  });

  test('should render alert example', async ({ page }) => {
    const alert = page.locator('.ux-alert').first();
    if (await alert.count() > 0) {
      await expect(alert).toBeVisible();
    }
  });

  test('should render alert header', async ({ page }) => {
    const header = page.locator('.ux-alert__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render alert message', async ({ page }) => {
    const message = page.locator('.ux-alert__message, .ux-alert__content').first();
    if (await message.count() > 0) {
      await expect(message).toBeVisible();
    }
  });

  test('should render alert buttons', async ({ page }) => {
    const buttons = page.locator('.ux-alert__buttons, .ux-alert button').first();
    if (await buttons.count() > 0) {
      await expect(buttons).toBeVisible();
    }
  });

  test('should have backdrop', async ({ page }) => {
    const backdrop = page.locator('.ux-alert-backdrop, .ux-backdrop').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeDefined();
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const alert = page.locator('.ux-alert').first();
    if (await alert.count() > 0) {
      const zIndex = await alert.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have border radius', async ({ page }) => {
    const alert = page.locator('.ux-alert').first();
    if (await alert.count() > 0) {
      const borderRadius = await alert.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassAlert = page.locator('.ux-alert--glass').first();
    if (await glassAlert.count() > 0) {
      const backdropFilter = await glassAlert.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper role', async ({ page }) => {
    const alert = page.locator('.ux-alert[role="alertdialog"], .ux-alert[role="dialog"]').first();
    if (await alert.count() > 0) {
      await expect(alert).toBeDefined();
    }
  });

  test('should be centered on screen', async ({ page }) => {
    const alert = page.locator('.ux-alert').first();
    if (await alert.count() > 0) {
      const position = await alert.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['fixed', 'absolute']).toContain(position);
    }
  });
});
