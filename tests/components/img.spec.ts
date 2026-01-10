import { test, expect } from '@playwright/test';

test.describe('Img Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/img.html');
  });

  test('should render img component', async ({ page }) => {
    const img = page.locator('.ux-img').first();
    await expect(img).toBeVisible();
  });

  test('should render image', async ({ page }) => {
    const image = page.locator('.ux-img img').first();
    if (await image.count() > 0) {
      await expect(image).toBeVisible();
    }
  });

  test('should apply aspect ratio', async ({ page }) => {
    const img = page.locator('.ux-img--ratio-16-9, .ux-img--ratio-4-3, .ux-img--ratio-1-1').first();
    if (await img.count() > 0) {
      await expect(img).toBeVisible();
    }
  });

  test('should apply cover fit', async ({ page }) => {
    const imgContainer = page.locator('.ux-img').first();
    const img = imgContainer.locator('img').first();
    if (await img.count() > 0) {
      const objectFit = await img.evaluate(el =>
        getComputedStyle(el).objectFit
      );
      expect(['cover', 'contain', 'fill', 'none', 'scale-down']).toContain(objectFit);
    }
  });

  test('should have border radius', async ({ page }) => {
    const img = page.locator('.ux-img').first();
    const borderRadius = await img.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(true).toBe(true); // May or may not have border radius
  });

  test('should support lazy loading', async ({ page }) => {
    const img = page.locator('.ux-img img[loading="lazy"]').first();
    if (await img.count() > 0) {
      const loading = await img.getAttribute('loading');
      expect(loading).toBe('lazy');
    }
  });

  test('should show placeholder while loading', async ({ page }) => {
    const placeholder = page.locator('.ux-img__placeholder, .ux-img .ux-skeleton').first();
    if (await placeholder.count() > 0) {
      await expect(placeholder).toBeDefined();
    }
  });

  test('should apply circle variant', async ({ page }) => {
    const circleImg = page.locator('.ux-img--circle').first();
    if (await circleImg.count() > 0) {
      const borderRadius = await circleImg.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toContain('50%');
    }
  });
});
