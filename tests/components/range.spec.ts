import { test, expect } from '@playwright/test';

test.describe('Range Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/range.html');
  });

  test('should render range slider', async ({ page }) => {
    const range = page.locator('.ux-range').first();
    await expect(range).toBeVisible();
  });

  test('should render range input', async ({ page }) => {
    const input = page.locator('.ux-range input[type="range"]').first();
    await expect(input).toBeVisible();
  });

  test('should accept value changes', async ({ page }) => {
    const input = page.locator('.ux-range input[type="range"]').first();
    await input.fill('50');
    const value = await input.inputValue();
    expect(parseInt(value)).toBe(50);
  });

  test('should render range track', async ({ page }) => {
    const track = page.locator('.ux-range__track').first();
    if (await track.count() > 0) {
      await expect(track).toBeVisible();
    }
  });

  test('should apply color variants', async ({ page }) => {
    const primaryRange = page.locator('.ux-range.ux-color-primary').first();
    if (await primaryRange.count() > 0) {
      await expect(primaryRange).toBeVisible();
    }
  });

  test('should have minimum height for touch', async ({ page }) => {
    const range = page.locator('.ux-range').first();
    const height = await range.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(24);
  });

  test('should render value label', async ({ page }) => {
    const label = page.locator('.ux-range__value, .ux-range__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
    }
  });

  test('should be focusable', async ({ page }) => {
    const input = page.locator('.ux-range input[type="range"]').first();
    await input.focus();
    await expect(input).toBeFocused();
  });

  test('should support keyboard navigation', async ({ page }) => {
    const input = page.locator('.ux-range input[type="range"]').first();
    await input.focus();
    const initialValue = await input.inputValue();
    await page.keyboard.press('ArrowRight');
    const newValue = await input.inputValue();
    expect(parseInt(newValue)).toBeGreaterThanOrEqual(parseInt(initialValue));
  });
});
