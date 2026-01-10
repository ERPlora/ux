import { test, expect } from '@playwright/test';

test.describe('Radio Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/radio.html');
  });

  test('should render basic radio', async ({ page }) => {
    const radio = page.locator('.ux-radio').first();
    await expect(radio).toBeVisible();
  });

  test('should select on click', async ({ page }) => {
    const radio = page.locator('.ux-radio input[type="radio"]').first();
    await radio.click({ force: true });
    await expect(radio).toBeChecked();
  });

  test('should render radio label', async ({ page }) => {
    const label = page.locator('.ux-radio span, .ux-radio__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledRadio = page.locator('.ux-radio input[disabled]').first();
    if (await disabledRadio.count() > 0) {
      await expect(disabledRadio).toBeDisabled();
    }
  });

  test('should only allow one selection in group', async ({ page }) => {
    const radios = page.locator('.ux-radio input[type="radio"][name]');
    const count = await radios.count();
    if (count >= 2) {
      await radios.first().click({ force: true });
      await expect(radios.first()).toBeChecked();
      await radios.nth(1).click({ force: true });
      await expect(radios.nth(1)).toBeChecked();
      await expect(radios.first()).not.toBeChecked();
    }
  });

  test('should have minimum touch target', async ({ page }) => {
    const radio = page.locator('.ux-radio').first();
    const height = await radio.evaluate(el =>
      parseInt(getComputedStyle(el).minHeight || getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const radio = page.locator('.ux-radio input[type="radio"]').first();
    await radio.focus();
    await expect(radio).toBeFocused();
  });
});
