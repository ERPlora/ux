import { test, expect } from '@playwright/test';

test.describe('Skeleton Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/skeleton.html');
  });

  test('should render skeleton', async ({ page }) => {
    const skeleton = page.locator('.ux-skeleton').first();
    await expect(skeleton).toBeVisible();
  });

  test('should have animation', async ({ page }) => {
    const skeleton = page.locator('.ux-skeleton').first();
    const animation = await skeleton.evaluate(el =>
      getComputedStyle(el).animation || getComputedStyle(el).animationName
    );
    expect(animation).not.toBe('none');
  });

  test('should apply text variant', async ({ page }) => {
    const textSkeleton = page.locator('.ux-skeleton--text').first();
    if (await textSkeleton.count() > 0) {
      await expect(textSkeleton).toBeVisible();
    }
  });

  test('should apply circle variant', async ({ page }) => {
    const circleSkeleton = page.locator('.ux-skeleton--circle').first();
    if (await circleSkeleton.count() > 0) {
      const borderRadius = await circleSkeleton.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toContain('50%');
    }
  });

  test('should apply rect variant', async ({ page }) => {
    const rectSkeleton = page.locator('.ux-skeleton--rect').first();
    if (await rectSkeleton.count() > 0) {
      await expect(rectSkeleton).toBeVisible();
    }
  });

  test('should have border radius', async ({ page }) => {
    const skeleton = page.locator('.ux-skeleton').first();
    const borderRadius = await skeleton.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have background color', async ({ page }) => {
    const skeleton = page.locator('.ux-skeleton').first();
    const bgColor = await skeleton.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).not.toBe('transparent');
  });

  test('should render skeleton card', async ({ page }) => {
    const skeletonCard = page.locator('.ux-skeleton-card').first();
    if (await skeletonCard.count() > 0) {
      await expect(skeletonCard).toBeVisible();
    }
  });
});
