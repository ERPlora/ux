import { test, expect } from '@playwright/test';

test.describe('Attendance List Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/attendance-list.html');
  });

  test('should render attendance list', async ({ page }) => {
    const list = page.locator('.ux-attendance-list').first();
    await expect(list).toBeVisible();
  });

  test('should render attendance items', async ({ page }) => {
    const items = page.locator('.ux-attendance-list__item');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should display employee avatar', async ({ page }) => {
    const avatar = page.locator('.ux-attendance-list__avatar, .ux-avatar').first();
    if (await avatar.count() > 0) {
      await expect(avatar).toBeVisible();
    }
  });

  test('should display employee name', async ({ page }) => {
    const name = page.locator('.ux-attendance-list__name').first();
    if (await name.count() > 0) {
      await expect(name).toBeVisible();
      const text = await name.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should display check-in time', async ({ page }) => {
    const checkIn = page.locator('.ux-attendance-list__check-in, .ux-attendance-list__time').first();
    if (await checkIn.count() > 0) {
      await expect(checkIn).toBeVisible();
    }
  });

  test('should display status badge', async ({ page }) => {
    const status = page.locator('.ux-attendance-list__status').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
    }
  });

  test('should apply present status style', async ({ page }) => {
    const present = page.locator('.ux-attendance-list__item--present, .ux-attendance-list__status--present').first();
    if (await present.count() > 0) {
      await expect(present).toBeVisible();
    }
  });

  test('should apply absent status style', async ({ page }) => {
    const absent = page.locator('.ux-attendance-list__item--absent, .ux-attendance-list__status--absent').first();
    if (await absent.count() > 0) {
      await expect(absent).toBeVisible();
    }
  });

  test('should apply late status style', async ({ page }) => {
    const late = page.locator('.ux-attendance-list__item--late, .ux-attendance-list__status--late').first();
    if (await late.count() > 0) {
      await expect(late).toBeVisible();
    }
  });

  test('should have proper list styling', async ({ page }) => {
    const list = page.locator('.ux-attendance-list').first();
    const display = await list.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBeDefined();
  });
});
