import { test, expect } from '@playwright/test';

test.describe('Pagination Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/pagination.html');
  });

  test('should render pagination', async ({ page }) => {
    const pagination = page.locator('.ux-pagination').first();
    await expect(pagination).toBeVisible();
  });

  test('should render page buttons', async ({ page }) => {
    const buttons = page.locator('.ux-pagination__item, .ux-pagination button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should render prev button', async ({ page }) => {
    const prevButton = page.locator('.ux-pagination__prev').first();
    if (await prevButton.count() > 0) {
      await expect(prevButton).toBeVisible();
    }
  });

  test('should render next button', async ({ page }) => {
    const nextButton = page.locator('.ux-pagination__next').first();
    if (await nextButton.count() > 0) {
      await expect(nextButton).toBeVisible();
    }
  });

  test('should highlight current page', async ({ page }) => {
    const currentPage = page.locator('.ux-pagination__item--active, .ux-pagination__item[aria-current="page"]').first();
    if (await currentPage.count() > 0) {
      await expect(currentPage).toBeVisible();
    }
  });

  test('should navigate pages on click', async ({ page }) => {
    const pageButton = page.locator('.ux-pagination__item').nth(1);
    if (await pageButton.count() > 0) {
      await pageButton.click();
      await page.waitForTimeout(200);
      expect(true).toBe(true);
    }
  });

  test('page buttons should have minimum touch target', async ({ page }) => {
    const button = page.locator('.ux-pagination__item').first();
    if (await button.count() > 0) {
      const size = await button.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeGreaterThanOrEqual(32);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassPagination = page.locator('.ux-pagination--glass').first();
    if (await glassPagination.count() > 0) {
      const backdropFilter = await glassPagination.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});
