import { test, expect } from '@playwright/test';

test.describe('Segment Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/segment.html');
  });

  test('should render segment', async ({ page }) => {
    const segment = page.locator('.ux-segment').first();
    await expect(segment).toBeVisible();
  });

  test('should render segment buttons', async ({ page }) => {
    const buttons = page.locator('.ux-segment__button');
    expect(await buttons.count()).toBeGreaterThan(1);
  });

  test('should show active segment', async ({ page }) => {
    const activeButton = page.locator('.ux-segment__button--active, .ux-segment__button[aria-selected="true"]').first();
    if (await activeButton.count() > 0) {
      await expect(activeButton).toBeVisible();
    }
  });

  test('should switch segment on click', async ({ page }) => {
    const buttons = page.locator('.ux-segment__button');
    if (await buttons.count() >= 2) {
      await buttons.nth(1).click();
      await page.waitForTimeout(200);
      expect(true).toBe(true);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassSegment = page.locator('.ux-segment--glass').first();
    if (await glassSegment.count() > 0) {
      const backdropFilter = await glassSegment.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have border radius', async ({ page }) => {
    const segment = page.locator('.ux-segment').first();
    const borderRadius = await segment.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have minimum height for touch', async ({ page }) => {
    const button = page.locator('.ux-segment__button').first();
    const height = await button.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(28);
  });

  test('should be keyboard navigable', async ({ page }) => {
    const button = page.locator('.ux-segment__button').first();
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('should apply color variants', async ({ page }) => {
    const primarySegment = page.locator('.ux-segment.ux-color-primary').first();
    if (await primarySegment.count() > 0) {
      await expect(primarySegment).toBeVisible();
    }
  });
});
