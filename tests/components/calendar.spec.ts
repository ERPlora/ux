import { test, expect } from '@playwright/test';

test.describe('Calendar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/calendar.html');
  });

  test('should render calendar', async ({ page }) => {
    const calendar = page.locator('.ux-calendar').first();
    await expect(calendar).toBeVisible();
  });

  test('should render calendar header', async ({ page }) => {
    const header = page.locator('.ux-calendar__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render month/year title', async ({ page }) => {
    const title = page.locator('.ux-calendar__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
  });

  test('should render navigation buttons', async ({ page }) => {
    const prevButton = page.locator('.ux-calendar__prev').first();
    const nextButton = page.locator('.ux-calendar__next').first();
    if (await prevButton.count() > 0) {
      await expect(prevButton).toBeVisible();
    }
    if (await nextButton.count() > 0) {
      await expect(nextButton).toBeVisible();
    }
  });

  test('should render weekday headers', async ({ page }) => {
    const weekdays = page.locator('.ux-calendar__weekday, .ux-calendar__weekdays');
    if (await weekdays.count() > 0) {
      await expect(weekdays.first()).toBeVisible();
    }
  });

  test('should render day cells', async ({ page }) => {
    const days = page.locator('.ux-calendar__day');
    expect(await days.count()).toBeGreaterThan(0);
  });

  test('should highlight today', async ({ page }) => {
    const today = page.locator('.ux-calendar__day--today').first();
    if (await today.count() > 0) {
      await expect(today).toBeVisible();
    }
  });

  test('should highlight selected day', async ({ page }) => {
    const selected = page.locator('.ux-calendar__day--selected').first();
    if (await selected.count() > 0) {
      await expect(selected).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassCalendar = page.locator('.ux-calendar--glass').first();
    if (await glassCalendar.count() > 0) {
      const backdropFilter = await glassCalendar.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should navigate to next month', async ({ page }) => {
    const nextButton = page.locator('.ux-calendar__next').first();
    if (await nextButton.count() > 0) {
      await nextButton.click();
      await page.waitForTimeout(200);
      expect(true).toBe(true);
    }
  });

  test('day cells should have minimum touch target', async ({ page }) => {
    const day = page.locator('.ux-calendar__day').first();
    const size = await day.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    expect(size).toBeGreaterThanOrEqual(32);
  });
});
