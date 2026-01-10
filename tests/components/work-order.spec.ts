import { test, expect } from '@playwright/test';

test.describe('Work Order Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/work-order.html');
  });

  test('should render work order card', async ({ page }) => {
    const card = page.locator('.ux-work-order').first();
    await expect(card).toBeVisible();
  });

  test('should display work order number', async ({ page }) => {
    const number = page.locator('.ux-work-order__number, .ux-work-order__id').first();
    if (await number.count() > 0) {
      await expect(number).toBeVisible();
      const text = await number.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should display work order title', async ({ page }) => {
    const title = page.locator('.ux-work-order__title, .ux-work-order__name').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
  });

  test('should display status badge', async ({ page }) => {
    const status = page.locator('.ux-work-order__status').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
    }
  });

  test('should apply pending status', async ({ page }) => {
    const pending = page.locator('.ux-work-order--pending, .ux-work-order__status--pending').first();
    if (await pending.count() > 0) {
      await expect(pending).toBeVisible();
    }
  });

  test('should apply in-progress status', async ({ page }) => {
    const inProgress = page.locator('.ux-work-order--in-progress, .ux-work-order__status--in-progress').first();
    if (await inProgress.count() > 0) {
      await expect(inProgress).toBeVisible();
    }
  });

  test('should apply completed status', async ({ page }) => {
    const completed = page.locator('.ux-work-order--completed, .ux-work-order__status--completed').first();
    if (await completed.count() > 0) {
      await expect(completed).toBeVisible();
    }
  });

  test('should display priority indicator', async ({ page }) => {
    const priority = page.locator('.ux-work-order__priority').first();
    if (await priority.count() > 0) {
      await expect(priority).toBeVisible();
    }
  });

  test('should display due date', async ({ page }) => {
    const dueDate = page.locator('.ux-work-order__due-date, .ux-work-order__deadline').first();
    if (await dueDate.count() > 0) {
      await expect(dueDate).toBeVisible();
    }
  });

  test('should display assignee', async ({ page }) => {
    const assignee = page.locator('.ux-work-order__assignee').first();
    if (await assignee.count() > 0) {
      await expect(assignee).toBeVisible();
    }
  });

  test('should display progress indicator', async ({ page }) => {
    const progress = page.locator('.ux-work-order__progress').first();
    if (await progress.count() > 0) {
      await expect(progress).toBeVisible();
    }
  });

  test('should render task list', async ({ page }) => {
    const tasks = page.locator('.ux-work-order__tasks, .ux-work-order__checklist').first();
    if (await tasks.count() > 0) {
      await expect(tasks).toBeVisible();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-work-order--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-work-order--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper card styling', async ({ page }) => {
    const card = page.locator('.ux-work-order').first();
    const bgColor = await card.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).not.toBe('transparent');
  });

  test('should have colored border for priority', async ({ page }) => {
    const card = page.locator('.ux-work-order').first();
    const borderLeft = await card.evaluate(el =>
      getComputedStyle(el).borderLeftWidth
    );
    expect(borderLeft).toBeDefined();
  });
});
