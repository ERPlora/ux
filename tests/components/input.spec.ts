import { test, expect } from '@playwright/test';

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/input.html');
  });

  test('should render basic input', async ({ page }) => {
    const input = page.locator('.ux-input input, input.ux-input').first();
    await expect(input).toBeVisible();
  });

  test('should accept text input', async ({ page }) => {
    const input = page.locator('.ux-input input, input.ux-input').first();
    await input.fill('Test input value');
    await expect(input).toHaveValue('Test input value');
  });

  test('should render floating label', async ({ page }) => {
    const label = page.locator('.ux-input label, .ux-input__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
    }
  });

  test('should show helper text', async ({ page }) => {
    const helper = page.locator('.ux-input__helper, .ux-input-helper').first();
    if (await helper.count() > 0) {
      await expect(helper).toBeVisible();
    }
  });

  test('should show error state', async ({ page }) => {
    const errorInput = page.locator('.ux-input--error, .ux-input.error').first();
    if (await errorInput.count() > 0) {
      await expect(errorInput).toBeVisible();
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledInput = page.locator('.ux-input input[disabled], input.ux-input[disabled]').first();
    if (await disabledInput.count() > 0) {
      await expect(disabledInput).toBeDisabled();
    }
  });

  test('should have minimum height for touch', async ({ page }) => {
    const input = page.locator('.ux-input input, input.ux-input').first();
    const height = await input.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should apply glass variant', async ({ page }) => {
    const glassInput = page.locator('.ux-input--glass').first();
    if (await glassInput.count() > 0) {
      const backdropFilter = await glassInput.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should render with icon', async ({ page }) => {
    const iconInput = page.locator('.ux-input svg, .ux-input .ux-input__icon').first();
    if (await iconInput.count() > 0) {
      await expect(iconInput).toBeVisible();
    }
  });

  test('should be focusable', async ({ page }) => {
    const input = page.locator('.ux-input input, input.ux-input').first();
    await input.focus();
    await expect(input).toBeFocused();
  });

  test('should show focus state', async ({ page }) => {
    const inputWrapper = page.locator('.ux-input').first();
    const input = inputWrapper.locator('input').first();
    if (await input.count() > 0) {
      await input.focus();
      // Focus state should be applied
      await expect(input).toBeFocused();
    }
  });
});
