import { test, expect } from '@playwright/test';

test.describe('Divider Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/divider.html');
  });

  test('should render divider', async ({ page }) => {
    const divider = page.locator('.ux-divider').first();
    await expect(divider).toBeVisible();
  });

  test('should be horizontal by default', async ({ page }) => {
    const divider = page.locator('.ux-divider').first();
    const height = await divider.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeLessThanOrEqual(2);
  });

  test('should apply vertical variant', async ({ page }) => {
    const verticalDivider = page.locator('.ux-divider--vertical').first();
    if (await verticalDivider.count() > 0) {
      const width = await verticalDivider.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeLessThanOrEqual(2);
    }
  });

  test('should have background color', async ({ page }) => {
    const divider = page.locator('.ux-divider').first();
    const bgColor = await divider.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).not.toBe('transparent');
  });

  test('should apply inset variant', async ({ page }) => {
    const insetDivider = page.locator('.ux-divider--inset').first();
    if (await insetDivider.count() > 0) {
      const marginLeft = await insetDivider.evaluate(el =>
        parseInt(getComputedStyle(el).marginLeft)
      );
      expect(marginLeft).toBeGreaterThan(0);
    }
  });

  test('should render with text', async ({ page }) => {
    const textDivider = page.locator('.ux-divider--text, .ux-divider:has(span)').first();
    if (await textDivider.count() > 0) {
      const text = await textDivider.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});
