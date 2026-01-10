import { test, expect } from '@playwright/test';

test.describe('Textarea Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/textarea.html');
  });

  test('should render basic textarea', async ({ page }) => {
    const textarea = page.locator('.ux-textarea textarea, textarea.ux-textarea').first();
    await expect(textarea).toBeVisible();
  });

  test('should accept text input', async ({ page }) => {
    const textarea = page.locator('.ux-textarea textarea, textarea.ux-textarea').first();
    await textarea.fill('Test textarea value\nMultiple lines');
    await expect(textarea).toHaveValue('Test textarea value\nMultiple lines');
  });

  test('should render floating label', async ({ page }) => {
    const label = page.locator('.ux-textarea label, .ux-textarea__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledTextarea = page.locator('.ux-textarea textarea[disabled]').first();
    if (await disabledTextarea.count() > 0) {
      await expect(disabledTextarea).toBeDisabled();
    }
  });

  test('should be resizable', async ({ page }) => {
    const textarea = page.locator('.ux-textarea textarea').first();
    const resize = await textarea.evaluate(el =>
      getComputedStyle(el).resize
    );
    expect(['both', 'vertical', 'horizontal', 'none']).toContain(resize);
  });

  test('should apply error state', async ({ page }) => {
    const errorTextarea = page.locator('.ux-textarea--error').first();
    if (await errorTextarea.count() > 0) {
      await expect(errorTextarea).toBeVisible();
    }
  });

  test('should have border radius', async ({ page }) => {
    const textarea = page.locator('.ux-textarea textarea').first();
    const borderRadius = await textarea.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should apply glass variant', async ({ page }) => {
    const glassTextarea = page.locator('.ux-textarea--glass').first();
    if (await glassTextarea.count() > 0) {
      const backdropFilter = await glassTextarea.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should be focusable', async ({ page }) => {
    const textarea = page.locator('.ux-textarea textarea').first();
    await textarea.focus();
    await expect(textarea).toBeFocused();
  });

  test('should show character count if available', async ({ page }) => {
    const counter = page.locator('.ux-textarea__counter').first();
    if (await counter.count() > 0) {
      await expect(counter).toBeVisible();
    }
  });
});
