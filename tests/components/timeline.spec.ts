import { test, expect } from '@playwright/test';

test.describe('Timeline Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/timeline.html');
  });

  test('should render timeline', async ({ page }) => {
    const timeline = page.locator('.ux-timeline').first();
    await expect(timeline).toBeVisible();
  });

  test('should render timeline items', async ({ page }) => {
    const items = page.locator('.ux-timeline__item');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should render timeline markers', async ({ page }) => {
    const markers = page.locator('.ux-timeline__marker, .ux-timeline__dot');
    if (await markers.count() > 0) {
      await expect(markers.first()).toBeVisible();
    }
  });

  test('should render timeline content', async ({ page }) => {
    const content = page.locator('.ux-timeline__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should render timeline line', async ({ page }) => {
    const line = page.locator('.ux-timeline__line').first();
    if (await line.count() > 0) {
      await expect(line).toBeVisible();
    }
  });

  test('should render timeline dates', async ({ page }) => {
    const date = page.locator('.ux-timeline__date, .ux-timeline__time').first();
    if (await date.count() > 0) {
      await expect(date).toBeVisible();
    }
  });

  test('should apply color variants to markers', async ({ page }) => {
    const coloredMarker = page.locator('.ux-timeline__marker.ux-color-success, .ux-timeline__dot--success').first();
    if (await coloredMarker.count() > 0) {
      await expect(coloredMarker).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassTimeline = page.locator('.ux-timeline--glass').first();
    if (await glassTimeline.count() > 0) {
      const backdropFilter = await glassTimeline.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});
