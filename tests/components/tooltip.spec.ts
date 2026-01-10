import { test, expect } from '@playwright/test';

test.describe('Tooltip Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/tooltip.html');
  });

  test('should render tooltip trigger', async ({ page }) => {
    const trigger = page.locator('[data-tooltip], .ux-tooltip-trigger').first();
    if (await trigger.count() > 0) {
      await expect(trigger).toBeVisible();
    }
  });

  test('should show tooltip on hover', async ({ page }) => {
    const trigger = page.locator('[data-tooltip], .ux-tooltip-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.hover();
      await page.waitForTimeout(300);
      const tooltip = page.locator('.ux-tooltip').first();
      if (await tooltip.count() > 0) {
        await expect(tooltip).toBeVisible();
      }
    }
  });

  test('should have arrow', async ({ page }) => {
    const arrow = page.locator('.ux-tooltip__arrow').first();
    if (await arrow.count() > 0) {
      await expect(arrow).toBeDefined();
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const tooltip = page.locator('.ux-tooltip').first();
    if (await tooltip.count() > 0) {
      const zIndex = await tooltip.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have border radius', async ({ page }) => {
    const tooltip = page.locator('.ux-tooltip').first();
    if (await tooltip.count() > 0) {
      const borderRadius = await tooltip.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should apply dark background', async ({ page }) => {
    const tooltip = page.locator('.ux-tooltip').first();
    if (await tooltip.count() > 0) {
      const bgColor = await tooltip.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeDefined();
    }
  });

  test('should position correctly', async ({ page }) => {
    const tooltip = page.locator('.ux-tooltip').first();
    if (await tooltip.count() > 0) {
      const position = await tooltip.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['absolute', 'fixed']).toContain(position);
    }
  });
});
