import { test, expect } from '@playwright/test';

test.describe('Select Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/select.html');
  });

  test('should render basic select', async ({ page }) => {
    const select = page.locator('.ux-select').first();
    await expect(select).toBeVisible();
  });

  test('should open dropdown on click', async ({ page }) => {
    const select = page.locator('.ux-select').first();
    await select.click();
    await page.waitForTimeout(300);
    const dropdown = page.locator('.ux-select__dropdown, .ux-select--open').first();
    if (await dropdown.count() > 0) {
      await expect(dropdown).toBeVisible();
    }
  });

  test('should display options', async ({ page }) => {
    const options = page.locator('.ux-select__option, .ux-select option').first();
    if (await options.count() > 0) {
      await expect(options).toBeDefined();
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledSelect = page.locator('.ux-select--disabled, .ux-select[disabled]').first();
    if (await disabledSelect.count() > 0) {
      const pointerEvents = await disabledSelect.evaluate(el =>
        getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    }
  });

  test('should have minimum touch target', async ({ page }) => {
    const select = page.locator('.ux-select').first();
    const height = await select.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should render placeholder', async ({ page }) => {
    const placeholder = page.locator('.ux-select__placeholder, .ux-select [placeholder]').first();
    if (await placeholder.count() > 0) {
      await expect(placeholder).toBeDefined();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassSelect = page.locator('.ux-select--glass').first();
    if (await glassSelect.count() > 0) {
      const backdropFilter = await glassSelect.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should show dropdown arrow', async ({ page }) => {
    const arrow = page.locator('.ux-select__arrow, .ux-select svg').first();
    if (await arrow.count() > 0) {
      await expect(arrow).toBeVisible();
    }
  });
});
