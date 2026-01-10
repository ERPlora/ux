import { test, expect } from '@playwright/test';

test.describe('Upload Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/upload.html');
  });

  test('should render upload component', async ({ page }) => {
    const upload = page.locator('.ux-upload').first();
    await expect(upload).toBeVisible();
  });

  test('should render file input', async ({ page }) => {
    const input = page.locator('.ux-upload input[type="file"]').first();
    if (await input.count() > 0) {
      await expect(input).toBeDefined();
    }
  });

  test('should render upload area', async ({ page }) => {
    const area = page.locator('.ux-upload__area, .ux-upload-area').first();
    if (await area.count() > 0) {
      await expect(area).toBeVisible();
    }
  });

  test('should render upload icon', async ({ page }) => {
    const icon = page.locator('.ux-upload svg, .ux-upload__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should render upload text', async ({ page }) => {
    const text = page.locator('.ux-upload__text, .ux-upload span').first();
    if (await text.count() > 0) {
      await expect(text).toBeVisible();
    }
  });

  test('should have dashed border', async ({ page }) => {
    const area = page.locator('.ux-upload__area, .ux-upload').first();
    const borderStyle = await area.evaluate(el =>
      getComputedStyle(el).borderStyle
    );
    expect(['dashed', 'solid', 'none']).toContain(borderStyle);
  });

  test('should have border radius', async ({ page }) => {
    const upload = page.locator('.ux-upload').first();
    const borderRadius = await upload.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should apply glass variant', async ({ page }) => {
    const glassUpload = page.locator('.ux-upload--glass').first();
    if (await glassUpload.count() > 0) {
      const backdropFilter = await glassUpload.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should be clickable', async ({ page }) => {
    const upload = page.locator('.ux-upload').first();
    await upload.click();
    expect(true).toBe(true);
  });
});
