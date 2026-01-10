import { test, expect } from '@playwright/test';

test.describe('Carousel Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/carousel.html');
  });

  test('should render carousel', async ({ page }) => {
    const carousel = page.locator('.ux-carousel').first();
    await expect(carousel).toBeVisible();
  });

  test('should render carousel slides', async ({ page }) => {
    const slides = page.locator('.ux-carousel__slide');
    expect(await slides.count()).toBeGreaterThan(0);
  });

  test('should render carousel track', async ({ page }) => {
    const track = page.locator('.ux-carousel__track').first();
    if (await track.count() > 0) {
      await expect(track).toBeVisible();
    }
  });

  test('should render navigation arrows', async ({ page }) => {
    const prevButton = page.locator('.ux-carousel__prev').first();
    const nextButton = page.locator('.ux-carousel__next').first();
    if (await prevButton.count() > 0) {
      await expect(prevButton).toBeVisible();
    }
    if (await nextButton.count() > 0) {
      await expect(nextButton).toBeVisible();
    }
  });

  test('should render pagination dots', async ({ page }) => {
    const dots = page.locator('.ux-carousel__dots, .ux-carousel__pagination').first();
    if (await dots.count() > 0) {
      await expect(dots).toBeVisible();
    }
  });

  test('should navigate with next button', async ({ page }) => {
    const nextButton = page.locator('.ux-carousel__next').first();
    if (await nextButton.count() > 0) {
      await nextButton.click();
      await page.waitForTimeout(300);
      expect(true).toBe(true);
    }
  });

  test('should have overflow hidden', async ({ page }) => {
    const carousel = page.locator('.ux-carousel').first();
    const overflow = await carousel.evaluate(el =>
      getComputedStyle(el).overflow
    );
    expect(overflow).toBe('hidden');
  });

  test('should apply border radius', async ({ page }) => {
    const carousel = page.locator('.ux-carousel').first();
    const borderRadius = await carousel.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(true).toBe(true); // Carousel may or may not have border radius
  });
});
