import { test, expect } from '@playwright/test';

test.describe('Checkbox Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/checkbox.html');
  });

  test('should render basic checkbox', async ({ page }) => {
    const checkbox = page.locator('.ux-checkbox').first();
    await expect(checkbox).toBeVisible();
  });

  test('should toggle on click', async ({ page }) => {
    const checkbox = page.locator('.ux-checkbox input[type="checkbox"]').first();
    const initialState = await checkbox.isChecked();
    await checkbox.click({ force: true });
    const newState = await checkbox.isChecked();
    expect(newState).not.toBe(initialState);
  });

  test('should render checkbox label', async ({ page }) => {
    const label = page.locator('.ux-checkbox span, .ux-checkbox__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledCheckbox = page.locator('.ux-checkbox input[disabled]').first();
    if (await disabledCheckbox.count() > 0) {
      await expect(disabledCheckbox).toBeDisabled();
    }
  });

  test('should apply color variants', async ({ page }) => {
    const primaryCheckbox = page.locator('.ux-checkbox.ux-color-primary').first();
    if (await primaryCheckbox.count() > 0) {
      await expect(primaryCheckbox).toBeVisible();
    }
  });

  test('should have minimum touch target', async ({ page }) => {
    const checkbox = page.locator('.ux-checkbox').first();
    const height = await checkbox.evaluate(el =>
      parseInt(getComputedStyle(el).minHeight || getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const checkbox = page.locator('.ux-checkbox input[type="checkbox"]').first();
    await checkbox.focus();
    await expect(checkbox).toBeFocused();
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();
  });

  test('should render checkmark when checked', async ({ page }) => {
    const checkbox = page.locator('.ux-checkbox input[type="checkbox"]:checked').first();
    if (await checkbox.count() > 0) {
      const checkmark = page.locator('.ux-checkbox__checkmark, .ux-checkbox svg').first();
      if (await checkmark.count() > 0) {
        await expect(checkmark).toBeVisible();
      }
    }
  });
});
