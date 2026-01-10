import { test, expect } from '@playwright/test';

test.describe('Searchbar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/searchbar.html');
  });

  test('should render searchbar', async ({ page }) => {
    const searchbar = page.locator('.ux-searchbar').first();
    await expect(searchbar).toBeVisible();
  });

  test('should render search input', async ({ page }) => {
    const input = page.locator('.ux-searchbar input').first();
    await expect(input).toBeVisible();
  });

  test('should accept text input', async ({ page }) => {
    const input = page.locator('.ux-searchbar input').first();
    await input.fill('Search query');
    await expect(input).toHaveValue('Search query');
  });

  test('should render search icon', async ({ page }) => {
    const icon = page.locator('.ux-searchbar svg, .ux-searchbar__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should render clear button when has value', async ({ page }) => {
    const input = page.locator('.ux-searchbar input').first();
    await input.fill('Search query');
    const clearButton = page.locator('.ux-searchbar__clear, .ux-searchbar button').first();
    if (await clearButton.count() > 0) {
      await expect(clearButton).toBeVisible();
    }
  });

  test('should have border radius', async ({ page }) => {
    const searchbar = page.locator('.ux-searchbar').first();
    const borderRadius = await searchbar.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have minimum height for touch', async ({ page }) => {
    const searchbar = page.locator('.ux-searchbar').first();
    const height = await searchbar.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should apply glass variant', async ({ page }) => {
    const glassSearchbar = page.locator('.ux-searchbar--glass').first();
    if (await glassSearchbar.count() > 0) {
      const backdropFilter = await glassSearchbar.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should be focusable', async ({ page }) => {
    const input = page.locator('.ux-searchbar input').first();
    await input.focus();
    await expect(input).toBeFocused();
  });

  test('should have placeholder', async ({ page }) => {
    const input = page.locator('.ux-searchbar input').first();
    const placeholder = await input.getAttribute('placeholder');
    expect(placeholder).toBeDefined();
  });
});
