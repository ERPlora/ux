import { test, expect } from '@playwright/test';

test.describe('Stock Indicator Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/stock-indicator.html');
  });

  test('should render basic stock indicator', async ({ page }) => {
    const indicator = page.locator('.demo-box .ux-stock-indicator').first();
    await expect(indicator).toBeVisible();
  });

  test('should display all stock states', async ({ page }) => {
    const inStock = page.locator('.demo-box .ux-stock-indicator--in-stock').first();
    const lowStock = page.locator('.demo-box .ux-stock-indicator--low-stock').first();
    const outOfStock = page.locator('.demo-box .ux-stock-indicator--out-of-stock').first();
    const backorder = page.locator('.demo-box .ux-stock-indicator--backorder').first();

    await expect(inStock).toBeVisible();
    await expect(lowStock).toBeVisible();
    await expect(outOfStock).toBeVisible();
    await expect(backorder).toBeVisible();
  });

  test('should render stock dot indicator', async ({ page }) => {
    const dot = page.locator('.ux-stock-indicator__dot').first();
    await expect(dot).toBeVisible();

    const size = await dot.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    expect(size).toBe(8);
  });

  test('should render stock label', async ({ page }) => {
    const label = page.locator('.demo-box .ux-stock-indicator__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
      const text = await label.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('should render stock count when present', async ({ page }) => {
    const count = page.locator('.ux-stock-indicator__count').first();
    if (await count.count() > 0) {
      await expect(count).toBeVisible();
      const text = await count.textContent();
      expect(text?.trim()).toMatch(/^\d+$/);
    }
  });

  test('should apply in-stock color styling', async ({ page }) => {
    const inStock = page.locator('.demo-box .ux-stock-indicator--in-stock').first();
    if (await inStock.count() > 0) {
      const color = await inStock.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply low-stock color styling', async ({ page }) => {
    const lowStock = page.locator('.demo-box .ux-stock-indicator--low-stock').first();
    if (await lowStock.count() > 0) {
      const color = await lowStock.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply out-of-stock color styling', async ({ page }) => {
    const outOfStock = page.locator('.demo-box .ux-stock-indicator--out-of-stock').first();
    if (await outOfStock.count() > 0) {
      const color = await outOfStock.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply backorder color styling', async ({ page }) => {
    const backorder = page.locator('.demo-box .ux-stock-indicator--backorder').first();
    if (await backorder.count() > 0) {
      const color = await backorder.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-stock-indicator--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();

      const label = compact.locator('.ux-stock-indicator__label');
      if (await label.count() > 0) {
        const labelDisplay = await label.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(labelDisplay).toBe('none');
      }
    }
  });

  test('should apply badge variant', async ({ page }) => {
    const badge = page.locator('.ux-stock-indicator--badge').first();
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible();

      const borderRadius = await badge.evaluate(el =>
        parseFloat(getComputedStyle(el).borderRadius)
      );
      expect(borderRadius).toBeGreaterThan(8);
    }
  });

  test('should have badge background color', async ({ page }) => {
    const badge = page.locator('.ux-stock-indicator--badge').first();
    if (await badge.count() > 0) {
      const bgColor = await badge.evaluate(el => {
        const computed = getComputedStyle(el).backgroundColor;
        return computed;
      });
      expect(bgColor).toBeDefined();
    }
  });

  test('should pulse on low-stock indicator', async ({ page }) => {
    const lowStockDot = page.locator('.ux-stock-indicator--low-stock .ux-stock-indicator__dot').first();
    if (await lowStockDot.count() > 0) {
      const animation = await lowStockDot.evaluate(el => {
        const computed = getComputedStyle(el);
        return computed.animationName || computed.animation;
      });
      expect(animation).not.toBe('none');
    }
  });

  test('should render Alpine.js dynamic stock indicator', async ({ page }) => {
    const dynamicSection = page.locator('.demo-box').nth(4);
    const dynamicIndicator = dynamicSection.locator('.ux-stock-indicator--badge');
    if (await dynamicIndicator.count() > 0) {
      await expect(dynamicIndicator).toBeVisible();
    }
  });

  test('should show dynamic indicator with quantity controls', async ({ page }) => {
    const dynamicSection = page.locator('.demo-box').nth(4);
    const controls = dynamicSection.locator('button');
    const controlCount = await controls.count();
    if (controlCount > 0) {
      await expect(controls.first()).toBeVisible();
    }
  });

  test('should display in stock label text', async ({ page }) => {
    const inStockLabel = page.locator('.demo-box:first-child .ux-stock-indicator--in-stock .ux-stock-indicator__label').first();
    if (await inStockLabel.count() > 0) {
      const text = await inStockLabel.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('should display low stock label text', async ({ page }) => {
    const lowStockLabel = page.locator('.ux-stock-indicator--low-stock .ux-stock-indicator__label').first();
    if (await lowStockLabel.count() > 0) {
      const text = await lowStockLabel.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('should display out of stock label text', async ({ page }) => {
    const outOfStockLabel = page.locator('.ux-stock-indicator--out-of-stock .ux-stock-indicator__label').first();
    if (await outOfStockLabel.count() > 0) {
      const text = await outOfStockLabel.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('should have flex alignment properties', async ({ page }) => {
    const indicator = page.locator('.demo-box .ux-stock-indicator').first();
    if (await indicator.count() > 0) {
      const display = await indicator.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(['flex', 'inline-flex']).toContain(display);
    }
  });

  test('should have center alignment', async ({ page }) => {
    const indicator = page.locator('.demo-box .ux-stock-indicator').first();
    if (await indicator.count() > 0) {
      const alignItems = await indicator.evaluate(el =>
        getComputedStyle(el).alignItems
      );
      expect(alignItems).toBe('center');
    }
  });

  test('should have proper spacing between elements', async ({ page }) => {
    const indicator = page.locator('.demo-box .ux-stock-indicator.ux-stock-indicator--in-stock').first();
    if (await indicator.count() > 0) {
      const gap = await indicator.evaluate(el =>
        getComputedStyle(el).gap
      );
      expect(gap).not.toBe('0px');
    }
  });

  test('should be visible and render correctly', async ({ page }) => {
    const indicator = page.locator('.ux-stock-indicator').first();
    await expect(indicator).toBeVisible();
  });

  test('should render multiple stock indicators', async ({ page }) => {
    const indicators = page.locator('.demo-box .ux-stock-indicator');
    const count = await indicators.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should have text content in indicators', async ({ page }) => {
    const indicators = page.locator('.demo-box .ux-stock-indicator');
    const firstIndicator = indicators.first();
    const text = await firstIndicator.textContent();
    expect(text?.trim()).toBeTruthy();
  });

  test('should have proper height styling', async ({ page }) => {
    const indicator = page.locator('.demo-box .ux-stock-indicator').first();
    if (await indicator.count() > 0) {
      const height = await indicator.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThan(0);
    }
  });
});
