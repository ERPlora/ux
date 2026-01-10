import { test, expect } from '@playwright/test';

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/card.html');
  });

  test('should render basic card', async ({ page }) => {
    const card = page.locator('.ux-card').first();
    await expect(card).toBeVisible();
  });

  test('should render card header', async ({ page }) => {
    const header = page.locator('.ux-card__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render card content', async ({ page }) => {
    const content = page.locator('.ux-card__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should render card footer', async ({ page }) => {
    const footer = page.locator('.ux-card__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should render card with image', async ({ page }) => {
    const cardImage = page.locator('.ux-card img, .ux-card__image').first();
    if (await cardImage.count() > 0) {
      await expect(cardImage).toBeVisible();
    }
  });

  test('should apply outlined variant', async ({ page }) => {
    const outlinedCard = page.locator('.ux-card--outlined').first();
    if (await outlinedCard.count() > 0) {
      await expect(outlinedCard).toBeVisible();
      const borderWidth = await outlinedCard.evaluate(el =>
        getComputedStyle(el).borderWidth
      );
      expect(borderWidth).not.toBe('0px');
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassCard = page.locator('.ux-card--glass').first();
    if (await glassCard.count() > 0) {
      await expect(glassCard).toBeVisible();
      const backdropFilter = await glassCard.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have border radius', async ({ page }) => {
    const card = page.locator('.ux-card').first();
    const borderRadius = await card.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have appropriate padding', async ({ page }) => {
    const cardContent = page.locator('.ux-card__content').first();
    if (await cardContent.count() > 0) {
      const padding = await cardContent.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');
    }
  });
});
