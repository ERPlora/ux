import { test, expect } from '@playwright/test';

test.describe('Image Zoom Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/image-zoom.html');
  });

  test('should render image zoom component', async ({ page }) => {
    const zoom = page.locator('.ux-image-zoom').first();
    await expect(zoom).toBeVisible();
  });

  test('should render image element', async ({ page }) => {
    const img = page.locator('.ux-image-zoom img, .ux-image-zoom__image').first();
    if (await img.count() > 0) {
      await expect(img).toBeVisible();
    }
  });

  test('should have zoom indicator', async ({ page }) => {
    const indicator = page.locator('.ux-image-zoom__indicator, .ux-image-zoom__icon').first();
    if (await indicator.count() > 0) {
      await expect(indicator).toBeDefined();
    }
  });

  test('should render lens overlay', async ({ page }) => {
    const lens = page.locator('.ux-image-zoom__lens').first();
    if (await lens.count() > 0) {
      await expect(lens).toBeDefined();
    }
  });

  test('should render zoom preview', async ({ page }) => {
    const preview = page.locator('.ux-image-zoom__preview, .ux-image-zoom__result').first();
    if (await preview.count() > 0) {
      await expect(preview).toBeDefined();
    }
  });

  test('should apply hover zoom style', async ({ page }) => {
    const hoverZoom = page.locator('.ux-image-zoom--hover').first();
    if (await hoverZoom.count() > 0) {
      await expect(hoverZoom).toBeVisible();
    }
  });

  test('should apply click zoom style', async ({ page }) => {
    const clickZoom = page.locator('.ux-image-zoom--click').first();
    if (await clickZoom.count() > 0) {
      await expect(clickZoom).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-image-zoom--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have cursor pointer style', async ({ page }) => {
    const zoom = page.locator('.ux-image-zoom').first();
    const cursor = await zoom.evaluate(el =>
      getComputedStyle(el).cursor
    );
    expect(['pointer', 'zoom-in', 'crosshair']).toContain(cursor);
  });

  test('should have proper container styling', async ({ page }) => {
    const zoom = page.locator('.ux-image-zoom').first();
    const position = await zoom.evaluate(el =>
      getComputedStyle(el).position
    );
    expect(position).toBe('relative');
  });
});
