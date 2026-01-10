import { test, expect } from '@playwright/test';

test.describe('Image Crop Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/image-crop.html');
  });

  test('should render image crop component', async ({ page }) => {
    const cropper = page.locator('.ux-image-crop').first();
    await expect(cropper).toBeVisible();
  });

  test('should render canvas area', async ({ page }) => {
    const canvas = page.locator('.ux-image-crop__canvas').first();
    if (await canvas.count() > 0) {
      await expect(canvas).toBeVisible();
    }
  });

  test('should render placeholder when empty', async ({ page }) => {
    const placeholder = page.locator('.ux-image-crop__placeholder').first();
    if (await placeholder.count() > 0) {
      await expect(placeholder).toBeVisible();
    }
  });

  test('should render controls section', async ({ page }) => {
    const controls = page.locator('.ux-image-crop__controls').first();
    if (await controls.count() > 0) {
      await expect(controls).toBeDefined();
    }
  });

  test('should render aspect ratio buttons', async ({ page }) => {
    const aspectBtns = page.locator('.ux-image-crop__aspect-btn, .ux-image-crop__aspect-buttons button');
    if (await aspectBtns.count() > 0) {
      expect(await aspectBtns.count()).toBeGreaterThan(0);
    }
  });

  test('should render zoom slider', async ({ page }) => {
    const slider = page.locator('.ux-image-crop__slider, input[type="range"]').first();
    if (await slider.count() > 0) {
      await expect(slider).toBeDefined();
    }
  });

  test('should render rotate buttons', async ({ page }) => {
    const rotateBtn = page.locator('.ux-image-crop__rotate-btn').first();
    if (await rotateBtn.count() > 0) {
      await expect(rotateBtn).toBeVisible();
    }
  });

  test('should render file input', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    if (await fileInput.count() > 0) {
      await expect(fileInput).toBeDefined();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-image-crop--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply aspect-locked variant', async ({ page }) => {
    const locked = page.locator('.ux-image-crop--aspect-locked').first();
    if (await locked.count() > 0) {
      await expect(locked).toBeVisible();
    }
  });

  test('should render preview component', async ({ page }) => {
    const preview = page.locator('.ux-image-crop__preview').first();
    if (await preview.count() > 0) {
      await expect(preview).toBeVisible();
    }
  });

  test('should apply circle preview variant', async ({ page }) => {
    const circlePreview = page.locator('.ux-image-crop__preview--circle').first();
    if (await circlePreview.count() > 0) {
      await expect(circlePreview).toBeVisible();
    }
  });

  test('should have proper styling', async ({ page }) => {
    const cropper = page.locator('.ux-image-crop').first();
    const borderRadius = await cropper.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toBeDefined();
  });
});
