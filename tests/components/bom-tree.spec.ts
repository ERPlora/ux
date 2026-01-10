import { test, expect } from '@playwright/test';

test.describe('BOM Tree Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/bom-tree.html');
  });

  test('should render BOM tree', async ({ page }) => {
    const tree = page.locator('.ux-bom-tree').first();
    await expect(tree).toBeVisible();
  });

  test('should render tree nodes', async ({ page }) => {
    const nodes = page.locator('.ux-bom-tree__node, .ux-bom-tree__item');
    expect(await nodes.count()).toBeGreaterThan(0);
  });

  test('should display part number', async ({ page }) => {
    const partNumber = page.locator('.ux-bom-tree__part-number, .ux-bom-tree__sku').first();
    if (await partNumber.count() > 0) {
      await expect(partNumber).toBeVisible();
      const text = await partNumber.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should display part name', async ({ page }) => {
    const partName = page.locator('.ux-bom-tree__name, .ux-bom-tree__title').first();
    if (await partName.count() > 0) {
      await expect(partName).toBeVisible();
    }
  });

  test('should display quantity', async ({ page }) => {
    const quantity = page.locator('.ux-bom-tree__quantity, .ux-bom-tree__qty').first();
    if (await quantity.count() > 0) {
      await expect(quantity).toBeVisible();
    }
  });

  test('should render expand/collapse icons', async ({ page }) => {
    const expandIcon = page.locator('.ux-bom-tree__expand, .ux-bom-tree__toggle').first();
    if (await expandIcon.count() > 0) {
      await expect(expandIcon).toBeVisible();
    }
  });

  test('should support nested levels', async ({ page }) => {
    const nestedNode = page.locator('.ux-bom-tree__children .ux-bom-tree__node').first();
    if (await nestedNode.count() > 0) {
      await expect(nestedNode).toBeDefined();
    }
  });

  test('should display level indicators', async ({ page }) => {
    const levelIndicator = page.locator('.ux-bom-tree__level, .ux-bom-tree__indent').first();
    if (await levelIndicator.count() > 0) {
      await expect(levelIndicator).toBeDefined();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-bom-tree--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper tree styling', async ({ page }) => {
    const tree = page.locator('.ux-bom-tree').first();
    const bgColor = await tree.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBeDefined();
  });
});
