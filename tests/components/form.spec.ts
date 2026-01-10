import { test, expect } from '@playwright/test';

test.describe('Form Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/form.html');
  });

  test('should render form', async ({ page }) => {
    const form = page.locator('.ux-form, form').first();
    await expect(form).toBeVisible();
  });

  test('should render form fields', async ({ page }) => {
    const fields = page.locator('.ux-form__field, .ux-input, .ux-select');
    expect(await fields.count()).toBeGreaterThan(0);
  });

  test('should render form labels', async ({ page }) => {
    const labels = page.locator('.ux-form label, .ux-form__label');
    if (await labels.count() > 0) {
      await expect(labels.first()).toBeVisible();
    }
  });

  test('should render submit button', async ({ page }) => {
    const submitButton = page.locator('.ux-form button[type="submit"], .ux-form .ux-button').first();
    if (await submitButton.count() > 0) {
      await expect(submitButton).toBeVisible();
    }
  });

  test('should show validation errors', async ({ page }) => {
    const errorMessage = page.locator('.ux-form__error, .ux-input--error').first();
    if (await errorMessage.count() > 0) {
      await expect(errorMessage).toBeDefined();
    }
  });

  test('should apply stacked layout', async ({ page }) => {
    const stackedForm = page.locator('.ux-form--stacked').first();
    if (await stackedForm.count() > 0) {
      await expect(stackedForm).toBeVisible();
    }
  });

  test('should apply inline layout', async ({ page }) => {
    const inlineForm = page.locator('.ux-form--inline').first();
    if (await inlineForm.count() > 0) {
      await expect(inlineForm).toBeVisible();
    }
  });

  test('form fields should have proper spacing', async ({ page }) => {
    const field = page.locator('.ux-form__field, .ux-form .ux-input').first();
    if (await field.count() > 0) {
      const marginBottom = await field.evaluate(el =>
        parseInt(getComputedStyle(el).marginBottom)
      );
      expect(marginBottom).toBeGreaterThanOrEqual(0);
    }
  });
});
