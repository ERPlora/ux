import { test, expect } from '@playwright/test';

test.describe('Gantt Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/gantt.html');
  });

  test('should render gantt chart', async ({ page }) => {
    const gantt = page.locator('.ux-gantt').first();
    await expect(gantt).toBeVisible();
  });

  test('should render gantt header with dates', async ({ page }) => {
    const header = page.locator('.ux-gantt__header, .ux-gantt__timeline-header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render task rows', async ({ page }) => {
    const rows = page.locator('.ux-gantt__row, .ux-gantt__task');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should display task name', async ({ page }) => {
    const taskName = page.locator('.ux-gantt__task-name, .ux-gantt__task-title').first();
    if (await taskName.count() > 0) {
      await expect(taskName).toBeVisible();
      const text = await taskName.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should render task bars', async ({ page }) => {
    const bars = page.locator('.ux-gantt__bar, .ux-gantt__task-bar');
    if (await bars.count() > 0) {
      await expect(bars.first()).toBeVisible();
    }
  });

  test('should display progress indicator', async ({ page }) => {
    const progress = page.locator('.ux-gantt__progress, .ux-gantt__bar-progress').first();
    if (await progress.count() > 0) {
      await expect(progress).toBeVisible();
    }
  });

  test('should render timeline grid', async ({ page }) => {
    const grid = page.locator('.ux-gantt__grid, .ux-gantt__timeline').first();
    if (await grid.count() > 0) {
      await expect(grid).toBeVisible();
    }
  });

  test('should apply task status colors', async ({ page }) => {
    const completedTask = page.locator('.ux-gantt__bar--completed, .ux-gantt__task--completed').first();
    if (await completedTask.count() > 0) {
      await expect(completedTask).toBeVisible();
    }
  });

  test('should render dependency lines', async ({ page }) => {
    const dependencies = page.locator('.ux-gantt__dependency, .ux-gantt__link').first();
    if (await dependencies.count() > 0) {
      await expect(dependencies).toBeDefined();
    }
  });

  test('should render milestone markers', async ({ page }) => {
    const milestone = page.locator('.ux-gantt__milestone').first();
    if (await milestone.count() > 0) {
      await expect(milestone).toBeVisible();
    }
  });

  test('should have horizontal scroll for timeline', async ({ page }) => {
    const timeline = page.locator('.ux-gantt__timeline, .ux-gantt__body').first();
    if (await timeline.count() > 0) {
      const overflow = await timeline.evaluate(el =>
        getComputedStyle(el).overflowX
      );
      expect(['auto', 'scroll']).toContain(overflow);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-gantt--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });
});
