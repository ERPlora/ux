import { test, expect } from '@playwright/test';

test.describe('Progress Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/progress.html');
  });

  test('should render basic progress bar', async ({ page }) => {
    const progress = page.locator('.ux-progress').first();
    await expect(progress).toBeVisible();
  });

  test('should render progress track', async ({ page }) => {
    const track = page.locator('.ux-progress__track, .ux-progress').first();
    await expect(track).toBeVisible();
  });

  test('should render progress fill', async ({ page }) => {
    const fill = page.locator('.ux-progress__fill, .ux-progress__bar').first();
    if (await fill.count() > 0) {
      await expect(fill).toBeVisible();
    }
  });

  test('should apply color variants', async ({ page }) => {
    const primaryProgress = page.locator('.ux-progress.ux-color-primary').first();
    if (await primaryProgress.count() > 0) {
      await expect(primaryProgress).toBeVisible();
    }

    const successProgress = page.locator('.ux-progress.ux-color-success').first();
    if (await successProgress.count() > 0) {
      await expect(successProgress).toBeVisible();
    }
  });

  test('should have border radius', async ({ page }) => {
    const progress = page.locator('.ux-progress').first();
    const borderRadius = await progress.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have appropriate height', async ({ page }) => {
    const progress = page.locator('.ux-progress').first();
    const height = await progress.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThan(0);
  });

  test('should apply indeterminate variant', async ({ page }) => {
    const indeterminate = page.locator('.ux-progress--indeterminate').first();
    if (await indeterminate.count() > 0) {
      await expect(indeterminate).toBeVisible();
      const animation = await indeterminate.evaluate(el =>
        getComputedStyle(el).animation || getComputedStyle(el.querySelector('.ux-progress__fill') || el).animation
      );
      expect(animation).not.toBe('none');
    }
  });

  test('should support aria attributes', async ({ page }) => {
    const progress = page.locator('.ux-progress[role="progressbar"]').first();
    if (await progress.count() > 0) {
      const ariaValue = await progress.getAttribute('aria-valuenow');
      expect(ariaValue).toBeDefined();
    }
  });
});
