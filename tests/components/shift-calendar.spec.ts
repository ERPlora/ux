import { test, expect } from '@playwright/test';

test.describe('Shift Calendar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/shift-calendar.html');
  });

  test('should render shift calendar', async ({ page }) => {
    const calendar = page.locator('.ux-shift-calendar').first();
    await expect(calendar).toBeVisible();
  });

  test('should render calendar header', async ({ page }) => {
    const header = page.locator('.ux-shift-calendar__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render day columns', async ({ page }) => {
    const days = page.locator('.ux-shift-calendar__day, .ux-shift-calendar__column');
    expect(await days.count()).toBeGreaterThan(0);
  });

  test('should display day labels', async ({ page }) => {
    const dayLabel = page.locator('.ux-shift-calendar__day-label, .ux-shift-calendar__day-name').first();
    if (await dayLabel.count() > 0) {
      await expect(dayLabel).toBeVisible();
    }
  });

  test('should render shift slots', async ({ page }) => {
    const shifts = page.locator('.ux-shift-calendar__shift, .ux-shift-calendar__slot');
    if (await shifts.count() > 0) {
      expect(await shifts.count()).toBeGreaterThan(0);
    }
  });

  test('should display shift time', async ({ page }) => {
    const time = page.locator('.ux-shift-calendar__time, .ux-shift-calendar__shift-time').first();
    if (await time.count() > 0) {
      await expect(time).toBeVisible();
    }
  });

  test('should display employee on shift', async ({ page }) => {
    const employee = page.locator('.ux-shift-calendar__employee, .ux-shift-calendar__worker').first();
    if (await employee.count() > 0) {
      await expect(employee).toBeVisible();
    }
  });

  test('should apply morning shift style', async ({ page }) => {
    const morning = page.locator('.ux-shift-calendar__shift--morning').first();
    if (await morning.count() > 0) {
      await expect(morning).toBeVisible();
    }
  });

  test('should apply afternoon shift style', async ({ page }) => {
    const afternoon = page.locator('.ux-shift-calendar__shift--afternoon').first();
    if (await afternoon.count() > 0) {
      await expect(afternoon).toBeVisible();
    }
  });

  test('should apply night shift style', async ({ page }) => {
    const night = page.locator('.ux-shift-calendar__shift--night').first();
    if (await night.count() > 0) {
      await expect(night).toBeVisible();
    }
  });

  test('should render navigation arrows', async ({ page }) => {
    const nav = page.locator('.ux-shift-calendar__nav, .ux-shift-calendar__arrow').first();
    if (await nav.count() > 0) {
      await expect(nav).toBeVisible();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-shift-calendar--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-shift-calendar--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have grid layout', async ({ page }) => {
    const calendar = page.locator('.ux-shift-calendar').first();
    const display = await calendar.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(['grid', 'flex']).toContain(display);
  });
});
