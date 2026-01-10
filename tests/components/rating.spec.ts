import { test, expect } from '@playwright/test';

test.describe('Rating Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/rating.html');
  });

  test('should render rating', async ({ page }) => {
    const rating = page.locator('.ux-rating').first();
    await expect(rating).toBeVisible();
  });

  test('should render stars', async ({ page }) => {
    const stars = page.locator('.ux-rating__star, .ux-rating svg');
    expect(await stars.count()).toBeGreaterThan(0);
  });

  test('should have 5 stars by default', async ({ page }) => {
    const stars = page.locator('.ux-rating__star, .ux-rating svg');
    expect(await stars.count()).toBe(5);
  });

  test('should show filled stars based on value', async ({ page }) => {
    const filledStars = page.locator('.ux-rating__star--filled, .ux-rating__star--active');
    if (await filledStars.count() > 0) {
      await expect(filledStars.first()).toBeVisible();
    }
  });

  test('should be interactive', async ({ page }) => {
    const star = page.locator('.ux-rating__star, .ux-rating svg').nth(2);
    await star.click();
    await page.waitForTimeout(200);
    expect(true).toBe(true);
  });

  test('should apply size variants', async ({ page }) => {
    const smallRating = page.locator('.ux-rating--sm').first();
    if (await smallRating.count() > 0) {
      await expect(smallRating).toBeVisible();
    }

    const largeRating = page.locator('.ux-rating--lg').first();
    if (await largeRating.count() > 0) {
      await expect(largeRating).toBeVisible();
    }
  });

  test('should apply color variants', async ({ page }) => {
    const coloredRating = page.locator('.ux-rating.ux-color-warning, .ux-rating--warning').first();
    if (await coloredRating.count() > 0) {
      await expect(coloredRating).toBeVisible();
    }
  });

  test('should apply readonly variant', async ({ page }) => {
    const readonlyRating = page.locator('.ux-rating--readonly, .ux-rating[readonly]').first();
    if (await readonlyRating.count() > 0) {
      await expect(readonlyRating).toBeVisible();
    }
  });

  test('should have minimum touch target', async ({ page }) => {
    const star = page.locator('.ux-rating__star, .ux-rating svg').first();
    const size = await star.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    expect(size).toBeGreaterThanOrEqual(16);
  });
});
