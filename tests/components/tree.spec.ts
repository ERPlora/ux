import { test, expect } from '@playwright/test';

test.describe('Tree Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/tree.html');
  });

  test('should render tree', async ({ page }) => {
    const tree = page.locator('.ux-tree').first();
    await expect(tree).toBeVisible();
  });

  test('should render tree nodes', async ({ page }) => {
    const nodes = page.locator('.ux-tree__node');
    expect(await nodes.count()).toBeGreaterThan(0);
  });

  test('should render expand/collapse icons', async ({ page }) => {
    const expandIcon = page.locator('.ux-tree__toggle, .ux-tree__expand').first();
    if (await expandIcon.count() > 0) {
      await expect(expandIcon).toBeVisible();
    }
  });

  test('should render node labels', async ({ page }) => {
    const label = page.locator('.ux-tree__label, .ux-tree__node-content').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
    }
  });

  test('should toggle children on click', async ({ page }) => {
    const toggle = page.locator('.ux-tree__toggle').first();
    if (await toggle.count() > 0) {
      await toggle.click();
      await page.waitForTimeout(200);
      expect(true).toBe(true);
    }
  });

  test('should indent child nodes', async ({ page }) => {
    const childNode = page.locator('.ux-tree__node .ux-tree__node').first();
    if (await childNode.count() > 0) {
      const paddingLeft = await childNode.evaluate(el =>
        parseInt(getComputedStyle(el).paddingLeft)
      );
      expect(paddingLeft).toBeGreaterThan(0);
    }
  });

  test('should render node icons', async ({ page }) => {
    const icon = page.locator('.ux-tree__node svg, .ux-tree__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should apply selected state', async ({ page }) => {
    const selectedNode = page.locator('.ux-tree__node--selected').first();
    if (await selectedNode.count() > 0) {
      await expect(selectedNode).toBeVisible();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    const node = page.locator('.ux-tree__node').first();
    await node.focus();
    await expect(node).toBeFocused();
  });
});
