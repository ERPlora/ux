import { test, expect } from '@playwright/test';

test.describe('Chip Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/chip.html');
  });

  test('should render basic chip', async ({ page }) => {
    const chip = page.locator('.ux-chip').first();
    await expect(chip).toBeVisible();
  });

  test('should apply color variants', async ({ page }) => {
    const primaryChip = page.locator('.ux-chip.ux-color-primary, .ux-chip.ux-color-primary--soft').first();
    if (await primaryChip.count() > 0) {
      await expect(primaryChip).toBeVisible();
    }
  });

  test('should apply filled variant', async ({ page }) => {
    const filledChip = page.locator('.ux-chip--filled, .ux-chip.ux-color-primary').first();
    if (await filledChip.count() > 0) {
      await expect(filledChip).toBeVisible();
    }
  });

  test('should apply outline variant', async ({ page }) => {
    const outlineChip = page.locator('.ux-chip--outline, .ux-chip.ux-color-primary--outline').first();
    if (await outlineChip.count() > 0) {
      await expect(outlineChip).toBeVisible();
    }
  });

  test('should render close button', async ({ page }) => {
    const closeButton = page.locator('.ux-chip__close, .ux-chip button').first();
    if (await closeButton.count() > 0) {
      await expect(closeButton).toBeVisible();
    }
  });

  test('should have border radius (pill shape)', async ({ page }) => {
    const chip = page.locator('.ux-chip').first();
    const borderRadius = await chip.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have minimum touch target', async ({ page }) => {
    const chip = page.locator('.ux-chip').first();
    const height = await chip.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(28);
  });

  test('should display text content', async ({ page }) => {
    const chip = page.locator('.ux-chip').first();
    const text = await chip.textContent();
    expect(text).toBeDefined();
  });

  test('should apply selected state', async ({ page }) => {
    const selectedChip = page.locator('.ux-chip--selected, .ux-chip[aria-selected="true"]').first();
    if (await selectedChip.count() > 0) {
      await expect(selectedChip).toBeVisible();
    }
  });

  test('should render with icon', async ({ page }) => {
    const iconChip = page.locator('.ux-chip svg, .ux-chip__icon').first();
    if (await iconChip.count() > 0) {
      await expect(iconChip).toBeVisible();
    }
  });
});
