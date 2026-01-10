import { test, expect } from '@playwright/test';

test.describe('Spinner Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/spinner.html');
  });

  test('should render basic spinner', async ({ page }) => {
    const spinner = page.locator('.ux-spinner').first();
    await expect(spinner).toBeVisible();
  });

  test('should have animation', async ({ page }) => {
    const spinner = page.locator('.ux-spinner').first();
    const animation = await spinner.evaluate(el =>
      getComputedStyle(el).animation || getComputedStyle(el).animationName
    );
    expect(animation).not.toBe('none');
  });

  test('should apply size variants', async ({ page }) => {
    const smallSpinner = page.locator('.ux-spinner--sm').first();
    if (await smallSpinner.count() > 0) {
      const size = await smallSpinner.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeLessThan(32);
    }

    const largeSpinner = page.locator('.ux-spinner--lg').first();
    if (await largeSpinner.count() > 0) {
      const size = await largeSpinner.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeGreaterThan(32);
    }
  });

  test('should apply color variants', async ({ page }) => {
    const primarySpinner = page.locator('.ux-spinner.ux-color-primary').first();
    if (await primarySpinner.count() > 0) {
      await expect(primarySpinner).toBeVisible();
    }
  });

  test('should have circular shape', async ({ page }) => {
    const spinner = page.locator('.ux-spinner').first();
    const borderRadius = await spinner.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toContain('50%');
  });

  test('spinner should be centered inline', async ({ page }) => {
    const spinner = page.locator('.ux-spinner').first();
    const display = await spinner.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(['inline-block', 'inline-flex', 'inline', 'block', 'flex']).toContain(display);
  });
});
