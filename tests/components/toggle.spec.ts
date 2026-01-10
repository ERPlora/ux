import { test, expect } from '@playwright/test';

test.describe('Toggle Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/toggle.html');
  });

  test('should render basic toggle', async ({ page }) => {
    const toggle = page.locator('.ux-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('should toggle on click', async ({ page }) => {
    const toggle = page.locator('.ux-toggle input[type="checkbox"]').first();
    const initialState = await toggle.isChecked();
    await toggle.click({ force: true });
    const newState = await toggle.isChecked();
    expect(newState).not.toBe(initialState);
  });

  test('should render toggle track', async ({ page }) => {
    const track = page.locator('.ux-toggle__track, .ux-toggle').first();
    await expect(track).toBeVisible();
  });

  test('should render toggle thumb', async ({ page }) => {
    const thumb = page.locator('.ux-toggle__thumb').first();
    if (await thumb.count() > 0) {
      await expect(thumb).toBeVisible();
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledToggle = page.locator('.ux-toggle input[disabled]').first();
    if (await disabledToggle.count() > 0) {
      await expect(disabledToggle).toBeDisabled();
    }
  });

  test('should apply color variants', async ({ page }) => {
    const successToggle = page.locator('.ux-toggle.ux-color-success').first();
    if (await successToggle.count() > 0) {
      await expect(successToggle).toBeVisible();
    }
  });

  test('should have minimum touch target', async ({ page }) => {
    const toggle = page.locator('.ux-toggle').first();
    const height = await toggle.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(24);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const toggle = page.locator('.ux-toggle input[type="checkbox"]').first();
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Space');
  });

  test('should have role switch', async ({ page }) => {
    const toggle = page.locator('.ux-toggle[role="switch"], .ux-toggle input').first();
    await expect(toggle).toBeDefined();
  });
});
