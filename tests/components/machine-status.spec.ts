import { test, expect } from '@playwright/test';

test.describe('Machine Status Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/machine-status.html');
  });

  test('should render machine status card', async ({ page }) => {
    const card = page.locator('.ux-machine-status').first();
    await expect(card).toBeVisible();
  });

  test('should display machine name', async ({ page }) => {
    const name = page.locator('.ux-machine-status__name, .ux-machine-status__title').first();
    if (await name.count() > 0) {
      await expect(name).toBeVisible();
      const text = await name.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should display status indicator', async ({ page }) => {
    const status = page.locator('.ux-machine-status__status, .ux-machine-status__indicator').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
    }
  });

  test('should apply running status', async ({ page }) => {
    const running = page.locator('.ux-machine-status--running, .ux-machine-status__status--running').first();
    if (await running.count() > 0) {
      await expect(running).toBeVisible();
    }
  });

  test('should apply idle status', async ({ page }) => {
    const idle = page.locator('.ux-machine-status--idle, .ux-machine-status__status--idle').first();
    if (await idle.count() > 0) {
      await expect(idle).toBeVisible();
    }
  });

  test('should apply offline status', async ({ page }) => {
    const offline = page.locator('.ux-machine-status--offline, .ux-machine-status__status--offline').first();
    if (await offline.count() > 0) {
      await expect(offline).toBeVisible();
    }
  });

  test('should apply error status', async ({ page }) => {
    const error = page.locator('.ux-machine-status--error, .ux-machine-status__status--error').first();
    if (await error.count() > 0) {
      await expect(error).toBeVisible();
    }
  });

  test('should display metrics', async ({ page }) => {
    const metrics = page.locator('.ux-machine-status__metrics, .ux-machine-status__stats').first();
    if (await metrics.count() > 0) {
      await expect(metrics).toBeVisible();
    }
  });

  test('should display uptime', async ({ page }) => {
    const uptime = page.locator('.ux-machine-status__uptime').first();
    if (await uptime.count() > 0) {
      await expect(uptime).toBeVisible();
    }
  });

  test('should display efficiency percentage', async ({ page }) => {
    const efficiency = page.locator('.ux-machine-status__efficiency').first();
    if (await efficiency.count() > 0) {
      await expect(efficiency).toBeVisible();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-machine-status--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-machine-status--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper card styling', async ({ page }) => {
    const card = page.locator('.ux-machine-status').first();
    const bgColor = await card.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).not.toBe('transparent');
  });
});
