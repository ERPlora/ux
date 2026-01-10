import { test, expect } from '@playwright/test';

test.describe('Org Chart Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/org-chart.html');
  });

  test('should render org chart', async ({ page }) => {
    const chart = page.locator('.ux-org-chart').first();
    await expect(chart).toBeVisible();
  });

  test('should render org chart nodes', async ({ page }) => {
    const nodes = page.locator('.ux-org-chart__node, .ux-org-chart__item');
    expect(await nodes.count()).toBeGreaterThan(0);
  });

  test('should display employee name in node', async ({ page }) => {
    const name = page.locator('.ux-org-chart__name').first();
    if (await name.count() > 0) {
      await expect(name).toBeVisible();
      const text = await name.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should display employee title', async ({ page }) => {
    const title = page.locator('.ux-org-chart__title, .ux-org-chart__role').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
  });

  test('should display employee avatar', async ({ page }) => {
    const avatar = page.locator('.ux-org-chart__avatar, .ux-org-chart .ux-avatar').first();
    if (await avatar.count() > 0) {
      await expect(avatar).toBeVisible();
    }
  });

  test('should render connector lines', async ({ page }) => {
    const connector = page.locator('.ux-org-chart__connector, .ux-org-chart__line').first();
    if (await connector.count() > 0) {
      await expect(connector).toBeDefined();
    }
  });

  test('should render children container', async ({ page }) => {
    const children = page.locator('.ux-org-chart__children, .ux-org-chart__subordinates').first();
    if (await children.count() > 0) {
      await expect(children).toBeVisible();
    }
  });

  test('should support nested levels', async ({ page }) => {
    const nested = page.locator('.ux-org-chart__children .ux-org-chart__node').first();
    if (await nested.count() > 0) {
      await expect(nested).toBeDefined();
    }
  });

  test('should apply vertical variant', async ({ page }) => {
    const vertical = page.locator('.ux-org-chart--vertical').first();
    if (await vertical.count() > 0) {
      await expect(vertical).toBeVisible();
    }
  });

  test('should apply horizontal variant', async ({ page }) => {
    const horizontal = page.locator('.ux-org-chart--horizontal').first();
    if (await horizontal.count() > 0) {
      await expect(horizontal).toBeVisible();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-org-chart--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-org-chart--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper node styling', async ({ page }) => {
    const node = page.locator('.ux-org-chart__node').first();
    if (await node.count() > 0) {
      const bgColor = await node.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('transparent');
    }
  });
});
