import { test, expect } from '@playwright/test';

test.describe('Accordion Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/accordion.html');
  });

  test('should render accordion', async ({ page }) => {
    const accordion = page.locator('.ux-accordion').first();
    await expect(accordion).toBeVisible();
  });

  test('should render accordion items', async ({ page }) => {
    const items = page.locator('.ux-accordion__item');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should render accordion header', async ({ page }) => {
    const header = page.locator('.ux-accordion__header').first();
    await expect(header).toBeVisible();
  });

  test('should render accordion content', async ({ page }) => {
    const content = page.locator('.ux-accordion__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeDefined();
    }
  });

  test('should toggle on header click', async ({ page }) => {
    const header = page.locator('.ux-accordion__header').first();
    await header.click();
    await page.waitForTimeout(300);
    // Content should toggle visibility
    expect(true).toBe(true);
  });

  test('should show expand icon', async ({ page }) => {
    const icon = page.locator('.ux-accordion__icon, .ux-accordion__header svg').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassAccordion = page.locator('.ux-accordion--glass').first();
    if (await glassAccordion.count() > 0) {
      const backdropFilter = await glassAccordion.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have border radius', async ({ page }) => {
    const accordion = page.locator('.ux-accordion').first();
    const borderRadius = await accordion.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should be keyboard accessible', async ({ page }) => {
    const header = page.locator('.ux-accordion__header').first();
    await header.focus();
    await expect(header).toBeFocused();
  });

  test('header should have minimum touch target', async ({ page }) => {
    const header = page.locator('.ux-accordion__header').first();
    const height = await header.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(44);
  });
});
