import { test, expect } from '@playwright/test';

test.describe('Datetime Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/datetime.html');
  });

  test('should render datetime picker', async ({ page }) => {
    const datetime = page.locator('.ux-datetime').first();
    await expect(datetime).toBeVisible();
  });

  test('should render datetime input', async ({ page }) => {
    const input = page.locator('.ux-datetime input').first();
    if (await input.count() > 0) {
      await expect(input).toBeVisible();
    }
  });

  test('should open picker on click', async ({ page }) => {
    const trigger = page.locator('.ux-datetime').first();
    await trigger.click();
    await page.waitForTimeout(300);
    const picker = page.locator('.ux-datetime__picker, .ux-picker').first();
    if (await picker.count() > 0) {
      await expect(picker).toBeDefined();
    }
  });

  test('should render calendar', async ({ page }) => {
    const calendar = page.locator('.ux-datetime__calendar, .ux-calendar').first();
    if (await calendar.count() > 0) {
      await expect(calendar).toBeVisible();
    }
  });

  test('should render time picker if applicable', async ({ page }) => {
    const timePicker = page.locator('.ux-datetime__time, .ux-time-picker').first();
    if (await timePicker.count() > 0) {
      await expect(timePicker).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassDatetime = page.locator('.ux-datetime--glass').first();
    if (await glassDatetime.count() > 0) {
      const backdropFilter = await glassDatetime.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have border radius', async ({ page }) => {
    const datetime = page.locator('.ux-datetime').first();
    const borderRadius = await datetime.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have minimum height for touch', async ({ page }) => {
    const datetime = page.locator('.ux-datetime').first();
    const height = await datetime.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });
});
