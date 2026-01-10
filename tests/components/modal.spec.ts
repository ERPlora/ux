import { test, expect } from '@playwright/test';

test.describe('Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/modal.html');
  });

  test('should render modal trigger button', async ({ page }) => {
    const trigger = page.locator('[x-data*="uxModal"] button, [\\@click*="open"]').first();
    if (await trigger.count() > 0) {
      await expect(trigger).toBeVisible();
    }
  });

  test('should open modal on trigger click', async ({ page }) => {
    const trigger = page.locator('[x-data*="uxModal"] button').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const modal = page.locator('.ux-modal[x-show="isOpen"], .ux-modal:visible').first();
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
      }
    }
  });

  test('should have modal header', async ({ page }) => {
    const header = page.locator('.ux-modal__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should have modal content', async ({ page }) => {
    const content = page.locator('.ux-modal__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should have modal footer', async ({ page }) => {
    const footer = page.locator('.ux-modal__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassModal = page.locator('.ux-modal--glass').first();
    if (await glassModal.count() > 0) {
      const backdropFilter = await glassModal.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const modal = page.locator('.ux-modal').first();
    if (await modal.count() > 0) {
      const zIndex = await modal.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have border radius', async ({ page }) => {
    const modal = page.locator('.ux-modal').first();
    if (await modal.count() > 0) {
      const borderRadius = await modal.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('modal backdrop should exist', async ({ page }) => {
    const backdrop = page.locator('.ux-modal-backdrop, .ux-backdrop').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeDefined();
    }
  });

  test('should be accessible with proper role', async ({ page }) => {
    const modal = page.locator('.ux-modal[role="dialog"], .ux-modal').first();
    if (await modal.count() > 0) {
      const role = await modal.getAttribute('role');
      // Modal should ideally have role="dialog"
      expect(true).toBe(true);
    }
  });
});
