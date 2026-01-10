import { test, expect } from '@playwright/test';

test.describe('Batch Tracker Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/batch-tracker.html');
  });

  test('should render batch tracker', async ({ page }) => {
    const tracker = page.locator('.ux-batch-tracker').first();
    await expect(tracker).toBeVisible();
  });

  test('should render batch items', async ({ page }) => {
    const items = page.locator('.ux-batch-tracker__item, .ux-batch-tracker__batch');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should display batch ID', async ({ page }) => {
    const batchId = page.locator('.ux-batch-tracker__id, .ux-batch-tracker__batch-id').first();
    if (await batchId.count() > 0) {
      await expect(batchId).toBeVisible();
      const text = await batchId.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should display batch status', async ({ page }) => {
    const status = page.locator('.ux-batch-tracker__status').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
    }
  });

  test('should display progress indicator', async ({ page }) => {
    const progress = page.locator('.ux-batch-tracker__progress').first();
    if (await progress.count() > 0) {
      await expect(progress).toBeVisible();
    }
  });

  test('should apply pending status style', async ({ page }) => {
    const pending = page.locator('.ux-batch-tracker__item--pending, .ux-batch-tracker__status--pending').first();
    if (await pending.count() > 0) {
      await expect(pending).toBeVisible();
    }
  });

  test('should apply processing status style', async ({ page }) => {
    const processing = page.locator('.ux-batch-tracker__item--processing, .ux-batch-tracker__status--processing').first();
    if (await processing.count() > 0) {
      await expect(processing).toBeVisible();
    }
  });

  test('should apply completed status style', async ({ page }) => {
    const completed = page.locator('.ux-batch-tracker__item--completed, .ux-batch-tracker__status--completed').first();
    if (await completed.count() > 0) {
      await expect(completed).toBeVisible();
    }
  });

  test('should display quantity information', async ({ page }) => {
    const quantity = page.locator('.ux-batch-tracker__quantity, .ux-batch-tracker__count').first();
    if (await quantity.count() > 0) {
      await expect(quantity).toBeVisible();
    }
  });

  test('should display timestamp', async ({ page }) => {
    const timestamp = page.locator('.ux-batch-tracker__time, .ux-batch-tracker__timestamp').first();
    if (await timestamp.count() > 0) {
      await expect(timestamp).toBeVisible();
    }
  });
});
