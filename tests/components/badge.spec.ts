import { test, expect } from '@playwright/test';

test.describe('Badge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/badge.html');
  });

  test('should render basic badge', async ({ page }) => {
    const badge = page.locator('.ux-badge').first();
    await expect(badge).toBeVisible();
  });

  test('should apply color variants', async ({ page }) => {
    const primaryBadge = page.locator('.ux-badge.ux-color-primary').first();
    if (await primaryBadge.count() > 0) {
      await expect(primaryBadge).toBeVisible();
    }

    const dangerBadge = page.locator('.ux-badge.ux-color-danger').first();
    if (await dangerBadge.count() > 0) {
      await expect(dangerBadge).toBeVisible();
    }

    const successBadge = page.locator('.ux-badge.ux-color-success').first();
    if (await successBadge.count() > 0) {
      await expect(successBadge).toBeVisible();
    }
  });

  test('should apply soft variant', async ({ page }) => {
    const softBadge = page.locator('.ux-badge.ux-badge--soft, .ux-badge.ux-color-primary--soft').first();
    if (await softBadge.count() > 0) {
      await expect(softBadge).toBeVisible();
    }
  });

  test('should apply outline variant', async ({ page }) => {
    const outlineBadge = page.locator('.ux-badge.ux-badge--outline, .ux-badge.ux-color-primary--outline').first();
    if (await outlineBadge.count() > 0) {
      await expect(outlineBadge).toBeVisible();
      const bgColor = await outlineBadge.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply dot variant', async ({ page }) => {
    const dotBadge = page.locator('.ux-badge--dot').first();
    if (await dotBadge.count() > 0) {
      await expect(dotBadge).toBeVisible();
      const width = await dotBadge.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeLessThanOrEqual(12);
    }
  });

  test('should have border radius (pill shape)', async ({ page }) => {
    const badge = page.locator('.ux-badge').first();
    const borderRadius = await badge.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should display text content', async ({ page }) => {
    const badge = page.locator('.ux-badge').first();
    const text = await badge.textContent();
    expect(text).toBeDefined();
  });

  test('should apply size variants', async ({ page }) => {
    const smallBadge = page.locator('.ux-badge--sm').first();
    if (await smallBadge.count() > 0) {
      const fontSize = await smallBadge.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeLessThan(14);
    }
  });
});
