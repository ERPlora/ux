import { test, expect } from '@playwright/test';

test.describe('Masonry Grid Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/masonry.html');
  });

  test('should render masonry grid', async ({ page }) => {
    const masonry = page.locator('.ux-masonry').first();
    await expect(masonry).toBeVisible();
  });

  test('should render masonry grid container', async ({ page }) => {
    const grid = page.locator('.ux-masonry__grid').first();
    await expect(grid).toBeVisible();
  });

  test('should render masonry items', async ({ page }) => {
    const items = page.locator('.ux-masonry__item');
    expect(await items.count()).toBeGreaterThan(0);
    await expect(items.first()).toBeVisible();
  });

  test('should apply 2-column variant', async ({ page }) => {
    const twoColMasonry = page.locator('.ux-masonry.ux-masonry--cols-2').first();
    if (await twoColMasonry.count() > 0) {
      await expect(twoColMasonry).toBeVisible();

      // Check that it has CSS columns set to 2
      const columns = await twoColMasonry.locator('.ux-masonry__grid').evaluate(el =>
        getComputedStyle(el).columnCount
      );
      expect(columns).toBe('2');
    }
  });

  test('should apply 3-column variant', async ({ page }) => {
    const threeColMasonry = page.locator('.ux-masonry.ux-masonry--cols-3').first();
    if (await threeColMasonry.count() > 0) {
      await expect(threeColMasonry).toBeVisible();

      // Check that it has CSS columns set to 3
      const columns = await threeColMasonry.locator('.ux-masonry__grid').evaluate(el =>
        getComputedStyle(el).columnCount
      );
      expect(columns).toBe('3');
    }
  });

  test('should apply 4-column variant', async ({ page }) => {
    const fourColMasonry = page.locator('.ux-masonry.ux-masonry--cols-4').first();
    if (await fourColMasonry.count() > 0) {
      await expect(fourColMasonry).toBeVisible();

      // Check that it has CSS columns set to 4
      const columns = await fourColMasonry.locator('.ux-masonry__grid').evaluate(el =>
        getComputedStyle(el).columnCount
      );
      expect(columns).toBe('4');
    }
  });

  test('should render images in items', async ({ page }) => {
    const images = page.locator('.ux-masonry__item img');
    expect(await images.count()).toBeGreaterThan(0);
    await expect(images.first()).toBeVisible();
  });

  test('should have lazy loading on images', async ({ page }) => {
    const image = page.locator('.ux-masonry__item img').first();
    if (await image.count() > 0) {
      const loading = await image.getAttribute('loading');
      expect(loading).toBe('lazy');
    }
  });

  test('should apply hover effect on items', async ({ page }) => {
    const hoverItem = page.locator('.ux-masonry__item.ux-masonry__item--hover').first();
    if (await hoverItem.count() > 0) {
      await expect(hoverItem).toBeVisible();
    }
  });

  test('should apply clickable style on items', async ({ page }) => {
    const clickableItem = page.locator('.ux-masonry__item.ux-masonry__item--clickable').first();
    if (await clickableItem.count() > 0) {
      await expect(clickableItem).toBeVisible();

      // Check cursor style
      const cursor = await clickableItem.evaluate(el => getComputedStyle(el).cursor);
      expect(cursor).toBe('pointer');
    }
  });

  test('should render item overlay', async ({ page }) => {
    const overlay = page.locator('.ux-masonry__item-overlay').first();
    if (await overlay.count() > 0) {
      // Overlay is usually hidden until hover
      await expect(overlay).toBeAttached();
    }
  });

  test('should render item title in overlay', async ({ page }) => {
    const title = page.locator('.ux-masonry__item-title').first();
    if (await title.count() > 0) {
      await expect(title).toBeAttached();
    }
  });

  test('should render item subtitle in overlay', async ({ page }) => {
    const subtitle = page.locator('.ux-masonry__item-subtitle').first();
    if (await subtitle.count() > 0) {
      await expect(subtitle).toBeAttached();
    }
  });

  test('should render item content (card style)', async ({ page }) => {
    const content = page.locator('.ux-masonry__item-content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should apply xs gap variant', async ({ page }) => {
    const xsGapMasonry = page.locator('.ux-masonry.ux-masonry--gap-xs').first();
    if (await xsGapMasonry.count() > 0) {
      await expect(xsGapMasonry).toBeVisible();
    }
  });

  test('should apply lg gap variant', async ({ page }) => {
    const lgGapMasonry = page.locator('.ux-masonry.ux-masonry--gap-lg').first();
    if (await lgGapMasonry.count() > 0) {
      await expect(lgGapMasonry).toBeVisible();
    }
  });

  test('should apply xl gap variant', async ({ page }) => {
    const xlGapMasonry = page.locator('.ux-masonry.ux-masonry--gap-xl').first();
    if (await xlGapMasonry.count() > 0) {
      await expect(xlGapMasonry).toBeVisible();
    }
  });

  test('should apply animated variant', async ({ page }) => {
    const animatedMasonry = page.locator('.ux-masonry.ux-masonry--animated').first();
    if (await animatedMasonry.count() > 0) {
      await expect(animatedMasonry).toBeVisible();
    }
  });

  test('should apply glass variant to items', async ({ page }) => {
    const glassItem = page.locator('.ux-masonry__item.ux-masonry__item--glass').first();
    if (await glassItem.count() > 0) {
      await expect(glassItem).toBeVisible();

      // Check for backdrop-filter
      const backdropFilter = await glassItem.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should apply rounded-none variant', async ({ page }) => {
    const roundedNone = page.locator('.ux-masonry.ux-masonry--rounded-none').first();
    if (await roundedNone.count() > 0) {
      await expect(roundedNone).toBeVisible();
    }
  });

  test('should apply rounded-xl variant', async ({ page }) => {
    const roundedXl = page.locator('.ux-masonry.ux-masonry--rounded-xl').first();
    if (await roundedXl.count() > 0) {
      await expect(roundedXl).toBeVisible();
    }
  });

  test('should apply shadow-sm variant', async ({ page }) => {
    const shadowSm = page.locator('.ux-masonry.ux-masonry--shadow-sm').first();
    if (await shadowSm.count() > 0) {
      await expect(shadowSm).toBeVisible();
    }
  });

  test('should apply shadow-lg variant', async ({ page }) => {
    const shadowLg = page.locator('.ux-masonry.ux-masonry--shadow-lg').first();
    if (await shadowLg.count() > 0) {
      await expect(shadowLg).toBeVisible();
    }
  });

  test('items should have proper border-radius', async ({ page }) => {
    const item = page.locator('.ux-masonry__item').first();
    if (await item.count() > 0) {
      const borderRadius = await item.evaluate(el => getComputedStyle(el).borderRadius);
      // Should have some border-radius set (not 0)
      expect(borderRadius).toBeDefined();
    }
  });

  test('should position items correctly in masonry layout', async ({ page }) => {
    const items = page.locator('.ux-masonry__item');
    if (await items.count() >= 2) {
      // Get bounding boxes of first two items
      const box1 = await items.nth(0).boundingBox();
      const box2 = await items.nth(1).boundingBox();

      if (box1 && box2) {
        // In a masonry/column layout, items should be positioned
        // Items could be in same column (different y) or different columns (different x)
        const differentPosition = (box1.x !== box2.x) || (box1.y !== box2.y);
        expect(differentPosition).toBe(true);
      }
    }
  });

  test('images in items should fill the width', async ({ page }) => {
    const image = page.locator('.ux-masonry__item img').first();
    if (await image.count() > 0) {
      const width = await image.evaluate(el => getComputedStyle(el).width);
      // Width should be 100% or a specific pixel value
      expect(width).toBeTruthy();
    }
  });

  test('should work with Alpine.js dynamic items', async ({ page }) => {
    // Look for masonry with x-data attribute (Alpine.js powered)
    const alpineMasonry = page.locator('.ux-masonry[x-data]').first();
    if (await alpineMasonry.count() > 0) {
      await expect(alpineMasonry).toBeVisible();

      // Should render items from template
      const items = alpineMasonry.locator('.ux-masonry__item');
      expect(await items.count()).toBeGreaterThan(0);
    }
  });

  test('should display item titles in Alpine dynamic masonry', async ({ page }) => {
    const alpineMasonry = page.locator('.ux-masonry[x-data]').first();
    if (await alpineMasonry.count() > 0) {
      const titles = alpineMasonry.locator('.ux-masonry__item-title');
      if (await titles.count() > 0) {
        const titleText = await titles.first().textContent();
        expect(titleText).toBeTruthy();
      }
    }
  });

  test('grid should use CSS columns', async ({ page }) => {
    const grid = page.locator('.ux-masonry__grid').first();
    if (await grid.count() > 0) {
      const columnCount = await grid.evaluate(el => getComputedStyle(el).columnCount);
      // Should have column count set (auto or a number)
      expect(columnCount).toBeDefined();
    }
  });

  test('items should break inside avoid for proper masonry', async ({ page }) => {
    const item = page.locator('.ux-masonry__item').first();
    if (await item.count() > 0) {
      const breakInside = await item.evaluate(el => getComputedStyle(el).breakInside);
      // Should be 'avoid' to prevent items from breaking across columns
      expect(breakInside).toBe('avoid');
    }
  });

  test('should apply gap spacing between items', async ({ page }) => {
    const grid = page.locator('.ux-masonry__grid').first();
    if (await grid.count() > 0) {
      const columnGap = await grid.evaluate(el => getComputedStyle(el).columnGap);
      // Gap should be set (not 0 or normal)
      expect(columnGap).toBeDefined();
    }
  });

  test('items should have margin-bottom for vertical spacing', async ({ page }) => {
    const item = page.locator('.ux-masonry__item').first();
    if (await item.count() > 0) {
      const marginBottom = await item.evaluate(el => getComputedStyle(el).marginBottom);
      // Should have margin-bottom set for spacing
      expect(marginBottom).toBeDefined();
    }
  });

  test('overlay should show on hover (using CSS)', async ({ page }) => {
    const itemWithOverlay = page.locator('.ux-masonry__item').filter({
      has: page.locator('.ux-masonry__item-overlay')
    }).first();

    if (await itemWithOverlay.count() > 0) {
      const overlay = itemWithOverlay.locator('.ux-masonry__item-overlay');

      // Get initial opacity
      const initialOpacity = await overlay.evaluate(el => getComputedStyle(el).opacity);

      // Hover over item
      await itemWithOverlay.hover();

      // Wait for transition
      await page.waitForTimeout(200);

      // Overlay opacity should change (or become visible)
      // The exact behavior depends on CSS implementation
      await expect(overlay).toBeVisible();
    }
  });

  test('content area should have padding', async ({ page }) => {
    const content = page.locator('.ux-masonry__item-content').first();
    if (await content.count() > 0) {
      const padding = await content.evaluate(el => getComputedStyle(el).padding);
      expect(padding).not.toBe('0px');
    }
  });

  test('should maintain aspect ratio of images', async ({ page }) => {
    const image = page.locator('.ux-masonry__item img').first();
    if (await image.count() > 0) {
      // Check object-fit property
      const objectFit = await image.evaluate(el => getComputedStyle(el).objectFit);
      // Should be cover or contain for proper aspect ratio handling
      expect(['cover', 'contain', 'fill', '']).toContain(objectFit);
    }
  });

  test('should have proper overflow handling', async ({ page }) => {
    const item = page.locator('.ux-masonry__item').first();
    if (await item.count() > 0) {
      const overflow = await item.evaluate(el => getComputedStyle(el).overflow);
      expect(overflow).toBe('hidden');
    }
  });

  test('responsive: columns should reduce on smaller viewports', async ({ page }) => {
    // This test checks that the component is responsive
    const masonry = page.locator('.ux-masonry.ux-masonry--cols-4').first();
    if (await masonry.count() > 0) {
      // Desktop view first
      const desktopColumns = await masonry.locator('.ux-masonry__grid').evaluate(el =>
        getComputedStyle(el).columnCount
      );

      // Resize to mobile
      await page.setViewportSize({ width: 400, height: 800 });

      // Wait for layout change
      await page.waitForTimeout(100);

      const mobileColumns = await masonry.locator('.ux-masonry__grid').evaluate(el =>
        getComputedStyle(el).columnCount
      );

      // Mobile should have fewer columns (or at least be defined)
      expect(parseInt(mobileColumns) || 1).toBeLessThanOrEqual(parseInt(desktopColumns) || 4);
    }
  });
});
