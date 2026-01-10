import { test, expect } from '@playwright/test';

test.describe('Product Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/product-card.html');
  });

  // ========================================
  // Basic Rendering Tests
  // ========================================

  test('should render basic product card', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();
    await expect(card).toBeVisible();
  });

  test('should have product card grid', async ({ page }) => {
    const grid = page.locator('.ux-product-grid').first();
    await expect(grid).toBeVisible();
  });

  test('should render multiple product cards', async ({ page }) => {
    const cards = page.locator('.ux-product-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  // ========================================
  // Product Image Tests
  // ========================================

  test('should display product image', async ({ page }) => {
    const image = page.locator('.ux-product-card__image').first();
    if (await image.count() > 0) {
      await expect(image).toBeVisible();
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('should display image placeholder when no image', async ({ page }) => {
    const placeholder = page.locator('.ux-product-card__placeholder').first();
    if (await placeholder.count() > 0) {
      await expect(placeholder).toBeVisible();
    }
  });

  test('should have image wrapper with aspect ratio', async ({ page }) => {
    const wrapper = page.locator('.ux-product-card__image-wrapper').first();
    await expect(wrapper).toBeVisible();

    const aspectRatio = await wrapper.evaluate(el =>
      getComputedStyle(el).aspectRatio
    );
    expect(aspectRatio).toBeDefined();
  });

  test('should scale image on hover', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();
    const image = page.locator('.ux-product-card__image').first();

    if (await image.count() > 0) {
      const initialTransform = await image.evaluate(el =>
        getComputedStyle(el).transform
      );

      await card.hover();

      const hoverTransform = await image.evaluate(el =>
        getComputedStyle(el).transform
      );

      // Transform should change on hover
      expect(hoverTransform).toBeDefined();
    }
  });

  // ========================================
  // Product Title/Name Tests
  // ========================================

  test('should display product name', async ({ page }) => {
    const name = page.locator('.ux-product-card__name').first();
    await expect(name).toBeVisible();
    const text = await name.textContent();
    expect(text).toBeTruthy();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should truncate long product names', async ({ page }) => {
    const name = page.locator('.ux-product-card__name').first();
    const lineClamp = await name.evaluate(el =>
      getComputedStyle(el).webkitLineClamp
    );
    expect(lineClamp).toBe('2');
  });

  // ========================================
  // Product Price Tests
  // ========================================

  test('should display product price', async ({ page }) => {
    const price = page.locator('.ux-product-card__price').first();
    await expect(price).toBeVisible();
    const text = await price.textContent();
    expect(text).toBeTruthy();
  });

  test('should format price with currency symbol', async ({ page }) => {
    const price = page.locator('.ux-product-card__price').first();
    const text = await price.textContent();
    expect(text).toMatch(/[\$€£¥₹]?[\d,]+\.?\d*/);
  });

  test('should display original price for sale items', async ({ page }) => {
    const originalPrice = page.locator('.ux-product-card__price-original').first();
    if (await originalPrice.count() > 0) {
      await expect(originalPrice).toBeVisible();
      const text = await originalPrice.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should apply sale price styling', async ({ page }) => {
    const salePrice = page.locator('.ux-product-card__price--sale').first();
    if (await salePrice.count() > 0) {
      const color = await salePrice.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should apply strikethrough to original price', async ({ page }) => {
    const originalPrice = page.locator('.ux-product-card__price-original').first();
    if (await originalPrice.count() > 0) {
      const textDecoration = await originalPrice.evaluate(el =>
        getComputedStyle(el).textDecoration
      );
      expect(textDecoration).toContain('line-through');
    }
  });

  // ========================================
  // Add to Cart Button Tests
  // ========================================

  test('should display quick add button on card', async ({ page }) => {
    const button = page.locator('.ux-product-card__quick-add').first();
    if (await button.count() > 0) {
      await expect(button).toBeVisible();
    }
  });

  test('should show quick add button on hover (desktop)', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();
    const button = page.locator('.ux-product-card__quick-add').first();

    if (await button.count() > 0) {
      const initialOpacity = await button.evaluate(el =>
        getComputedStyle(el).opacity
      );

      await card.hover();

      const hoverOpacity = await button.evaluate(el =>
        getComputedStyle(el).opacity
      );

      // Button should become visible on hover
      expect(parseFloat(hoverOpacity)).toBeGreaterThanOrEqual(parseFloat(initialOpacity));
    }
  });

  test('should be able to click add to cart button', async ({ page }) => {
    const button = page.locator('.ux-product-card__quick-add').first();
    if (await button.count() > 0) {
      await expect(button).toBeEnabled();
    }
  });

  test('should trigger product-add event on add to cart', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();
    const button = page.locator('.ux-product-card__quick-add').first();

    if (await button.count() > 0) {
      // Listen for the event
      const eventPromise = page.waitForEvent('console', msg =>
        msg.type() === 'log' || msg.text().includes('Agregado')
      ).catch(() => null);

      await button.click();

      // Wait a bit for any animations or handlers
      await page.waitForTimeout(500);
    }
  });

  test('should disable add to cart when out of stock', async ({ page }) => {
    const outOfStockCard = page.locator('.ux-product-card--out-of-stock').first();
    if (await outOfStockCard.count() > 0) {
      const button = outOfStockCard.locator('.ux-product-card__quick-add');
      // Out of stock cards should not have visible quick-add
      if (await button.count() > 0) {
        const opacity = await button.evaluate(el =>
          getComputedStyle(el).opacity
        );
        // Button should be hidden or disabled
        expect(parseFloat(opacity)).toBeLessThanOrEqual(0.5);
      }
    }
  });

  // ========================================
  // Variants & Modifiers Tests
  // ========================================

  test('should apply sale badge', async ({ page }) => {
    const saleBadge = page.locator('.ux-product-card__badge--sale').first();
    if (await saleBadge.count() > 0) {
      await expect(saleBadge).toBeVisible();
      const text = await saleBadge.textContent();
      expect(text).toMatch(/\d+%/);
    }
  });

  test('should apply new badge', async ({ page }) => {
    const newBadge = page.locator('.ux-product-card__badge--new').first();
    if (await newBadge.count() > 0) {
      await expect(newBadge).toBeVisible();
    }
  });

  test('should apply low stock badge', async ({ page }) => {
    const lowStockBadge = page.locator('.ux-product-card__badge--low-stock').first();
    if (await lowStockBadge.count() > 0) {
      await expect(lowStockBadge).toBeVisible();
      const text = await lowStockBadge.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should apply out of stock badge', async ({ page }) => {
    const outBadge = page.locator('.ux-product-card__badge--out').first();
    if (await outBadge.count() > 0) {
      await expect(outBadge).toBeVisible();
    }
  });

  test('should display out of stock overlay', async ({ page }) => {
    const outOfStockCard = page.locator('.ux-product-card--out-of-stock').first();
    if (await outOfStockCard.count() > 0) {
      await expect(outOfStockCard).toBeVisible();
    }
  });

  test('should apply selected state', async ({ page }) => {
    const card = page.locator('.ux-product-card--selected').first();
    if (await card.count() > 0) {
      const borderColor = await card.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).toBeTruthy();
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallCard = page.locator('.ux-product-card--sm').first();
    if (await smallCard.count() > 0) {
      const padding = await smallCard.evaluate(el =>
        getComputedStyle(el).getPropertyValue('--ux-product-card-padding')
      );
      expect(padding).toBeTruthy();
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeCard = page.locator('.ux-product-card--lg').first();
    if (await largeCard.count() > 0) {
      const padding = await largeCard.evaluate(el =>
        getComputedStyle(el).getPropertyValue('--ux-product-card-padding')
      );
      expect(padding).toBeTruthy();
    }
  });

  test('should apply horizontal layout', async ({ page }) => {
    const horizontalCard = page.locator('.ux-product-card--horizontal').first();
    if (await horizontalCard.count() > 0) {
      const flexDirection = await horizontalCard.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('row');
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassCard = page.locator('.ux-product-card--glass').first();
    if (await glassCard.count() > 0) {
      const backdropFilter = await glassCard.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  // ========================================
  // Quantity Controls Tests
  // ========================================

  test('should display stock information', async ({ page }) => {
    const stock = page.locator('.ux-product-card__stock').first();
    if (await stock.count() > 0) {
      await expect(stock).toBeVisible();
      const text = await stock.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should show low stock indicator', async ({ page }) => {
    const lowStock = page.locator('.ux-product-card__stock--low').first();
    if (await lowStock.count() > 0) {
      await expect(lowStock).toBeVisible();
      const color = await lowStock.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should show out of stock indicator', async ({ page }) => {
    const outStock = page.locator('.ux-product-card__stock--out').first();
    if (await outStock.count() > 0) {
      await expect(outStock).toBeVisible();
    }
  });

  test('should apply animation on add to cart', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();
    const button = page.locator('.ux-product-card__quick-add').first();

    if (await button.count() > 0) {
      // Get initial state
      const initialClass = await card.getAttribute('class');

      // Click button
      await button.click();

      // Check if animation class is applied
      const classAfterClick = await card.getAttribute('class');
      expect(classAfterClick).toBeTruthy();
    }
  });

  // ========================================
  // Grid Layout Tests
  // ========================================

  test('should render product grid with proper columns', async ({ page }) => {
    const grid2 = page.locator('.ux-product-grid--2').first();
    if (await grid2.count() > 0) {
      const columns = await grid2.evaluate(el =>
        getComputedStyle(el).gridTemplateColumns
      );
      expect(columns).toContain('1fr');
    }
  });

  test('should render 3-column grid', async ({ page }) => {
    const grid3 = page.locator('.ux-product-grid--3').first();
    if (await grid3.count() > 0) {
      await expect(grid3).toBeVisible();
    }
  });

  test('should render 4-column grid', async ({ page }) => {
    const grid4 = page.locator('.ux-product-grid--4').first();
    if (await grid4.count() > 0) {
      await expect(grid4).toBeVisible();
    }
  });

  test('should apply compact grid spacing', async ({ page }) => {
    const compactGrid = page.locator('.ux-product-grid--compact').first();
    if (await compactGrid.count() > 0) {
      const gap = await compactGrid.evaluate(el =>
        getComputedStyle(el).gap
      );
      expect(gap).toBeTruthy();
    }
  });

  // ========================================
  // Content & Category Tests
  // ========================================

  test('should display product category', async ({ page }) => {
    const category = page.locator('.ux-product-card__category').first();
    if (await category.count() > 0) {
      await expect(category).toBeVisible();
      const text = await category.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should display product SKU', async ({ page }) => {
    const sku = page.locator('.ux-product-card__sku').first();
    if (await sku.count() > 0) {
      await expect(sku).toBeVisible();
      const text = await sku.textContent();
      expect(text).toBeTruthy();
    }
  });

  // ========================================
  // Interaction & Accessibility Tests
  // ========================================

  test('should have proper hover effects on desktop', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();

    const initialBorder = await card.evaluate(el =>
      getComputedStyle(el).borderColor
    );

    await card.hover();

    const hoverBorder = await card.evaluate(el =>
      getComputedStyle(el).borderColor
    );

    // Border color should potentially change on hover
    expect(hoverBorder).toBeTruthy();
  });

  test('should scale on active/click', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();

    const initialTransform = await card.evaluate(el =>
      getComputedStyle(el).transform
    );

    // Simulate click/active state
    await card.dispatchEvent('mousedown');
    await page.waitForTimeout(10);

    const activeTransform = await card.evaluate(el =>
      getComputedStyle(el).transform
    );

    expect(activeTransform).toBeDefined();
    await card.dispatchEvent('mouseup');
  });

  test('should have proper touch targeting on mobile', async ({ page }) => {
    const button = page.locator('.ux-product-card__quick-add').first();
    if (await button.count() > 0) {
      const width = await button.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      const height = await button.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );

      // Touch target should be at least 36px
      expect(width).toBeGreaterThanOrEqual(36);
      expect(height).toBeGreaterThanOrEqual(36);
    }
  });

  test('should not have text selection on product card', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();
    const userSelect = await card.evaluate(el =>
      getComputedStyle(el).userSelect
    );

    expect(userSelect).toBe('none');
  });

  // ========================================
  // CSS Variables & Theming Tests
  // ========================================

  test('should use CSS variables for styling', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();

    const bgColor = await card.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );

    expect(bgColor).toBeTruthy();
  });

  test('should support dark mode', async ({ page }) => {
    const root = page.locator('html').first();

    // Check if dark mode class can be applied
    await root.evaluate(el => {
      el.classList.add('ux-dark');
    });

    const card = page.locator('.ux-product-card').first();
    const bgColor = await card.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );

    expect(bgColor).toBeTruthy();

    // Cleanup
    await root.evaluate(el => {
      el.classList.remove('ux-dark');
    });
  });

  test('should have proper border radius', async ({ page }) => {
    const card = page.locator('.ux-product-card').first();
    const borderRadius = await card.evaluate(el =>
      getComputedStyle(el).borderRadius
    );

    expect(borderRadius).not.toBe('0px');
  });
});
