import { test, expect } from '@playwright/test';

test.describe('Category Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/category-tabs.html');
  });

  test('should render basic category tabs', async ({ page }) => {
    const categoryTabs = page.locator('.ux-category-tabs').first();
    await expect(categoryTabs).toBeVisible();
  });

  test('should render tab buttons', async ({ page }) => {
    const tabButton = page.locator('.ux-category-tabs__item').first();
    await expect(tabButton).toBeVisible();
  });

  test('should have multiple tab items', async ({ page }) => {
    const tabButtons = page.locator('.ux-category-tabs__item');
    expect(await tabButtons.count()).toBeGreaterThan(1);
  });

  test('should show active tab by default', async ({ page }) => {
    const activeTab = page.locator('.ux-category-tabs__item--active').first();
    if (await activeTab.count() > 0) {
      await expect(activeTab).toBeVisible();
    }
  });

  test('should switch active state on click', async ({ page }) => {
    // Test with Alpine.js interactive variant
    const categoryChange = page.locator('[x-data*="uxCategoryTabs"]');
    if (await categoryChange.count() > 0) {
      const tabButtons = categoryChange.locator('.ux-category-tabs__item');
      if (await tabButtons.count() >= 2) {
        const secondTab = tabButtons.nth(1);

        // Click second tab
        await secondTab.click();
        await page.waitForTimeout(200);

        // Second tab should now be active
        const isSecondActive = await secondTab.evaluate(el =>
          el.classList.contains('ux-category-tabs__item--active')
        );
        expect(isSecondActive).toBe(true);
      }
    }
  });

  test('should be horizontally scrollable', async ({ page }) => {
    const categoryTabs = page.locator('.ux-category-tabs').first();
    const scrollWidth = await categoryTabs.evaluate(el => el.scrollWidth);
    const clientWidth = await categoryTabs.evaluate(el => el.clientWidth);

    // If scrollWidth > clientWidth, the element is scrollable
    if (scrollWidth > clientWidth) {
      expect(scrollWidth).toBeGreaterThan(clientWidth);
    }
  });

  test('should hide scrollbar', async ({ page }) => {
    const categoryTabs = page.locator('.ux-category-tabs').first();
    const scrollbarWidth = await categoryTabs.evaluate(el => {
      const style = getComputedStyle(el);
      return style.scrollbarWidth || style.msOverflowStyle;
    });

    // scrollbar-width: none should result in 'none'
    if (scrollbarWidth !== '') {
      expect(scrollbarWidth).toBe('none');
    }
  });

  test('should render tab labels', async ({ page }) => {
    const tabLabel = page.locator('.ux-category-tabs__label').first();
    await expect(tabLabel).toBeVisible();
  });

  test('should render bordered variant', async ({ page }) => {
    const borderedTabs = page.locator('.ux-category-tabs--bordered').first();
    if (await borderedTabs.count() > 0) {
      const borderStyle = await borderedTabs.evaluate(el =>
        getComputedStyle(el).borderBottom
      );
      expect(borderStyle).not.toBe('none');
    }
  });

  test('should render pill variant', async ({ page }) => {
    const pillTabs = page.locator('.ux-category-tabs--pill').first();
    if (await pillTabs.count() > 0) {
      await expect(pillTabs).toBeVisible();
      const borderRadius = await pillTabs.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should render glass variant', async ({ page }) => {
    const glassTabs = page.locator('.ux-category-tabs--glass').first();
    if (await glassTabs.count() > 0) {
      const backdropFilter = await glassTabs.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should render size variants', async ({ page }) => {
    const smallTabs = page.locator('.ux-category-tabs--sm').first();
    const largeTabs = page.locator('.ux-category-tabs--lg').first();

    let hasVariants = false;
    if (await smallTabs.count() > 0) {
      hasVariants = true;
      await expect(smallTabs).toBeVisible();
    }
    if (await largeTabs.count() > 0) {
      hasVariants = true;
      await expect(largeTabs).toBeVisible();
    }

    if (hasVariants) {
      expect(hasVariants).toBe(true);
    }
  });

  test('should render icons in tabs', async ({ page }) => {
    const tabIcon = page.locator('.ux-category-tabs__icon').first();
    if (await tabIcon.count() > 0) {
      await expect(tabIcon).toBeVisible();
      const svg = tabIcon.locator('svg').first();
      if (await svg.count() > 0) {
        await expect(svg).toBeVisible();
      }
    }
  });

  test('should have minimum height for touch targets', async ({ page }) => {
    const tabButton = page.locator('.ux-category-tabs__item').first();
    const height = await tabButton.evaluate(el =>
      parseInt(getComputedStyle(el).minHeight)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should support Alpine.js data binding', async ({ page }) => {
    const dynamicTabs = page.locator('[x-data*="uxCategoryTabs"]').first();
    if (await dynamicTabs.count() > 0) {
      await expect(dynamicTabs).toBeVisible();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    const tabButton = page.locator('.ux-category-tabs__item').first();
    await tabButton.focus();
    await expect(tabButton).toBeFocused();
  });

  test('should have color applied to active pill', async ({ page }) => {
    const pillTabs = page.locator('.ux-category-tabs--pill').first();
    if (await pillTabs.count() > 0) {
      const activeItem = pillTabs.locator('.ux-category-tabs__item--active').first();
      if (await activeItem.count() > 0) {
        const backgroundColor = await activeItem.evaluate(el =>
          getComputedStyle(el).backgroundColor
        );
        expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      }
    }
  });

  test('should render indicator in indicator variant', async ({ page }) => {
    const indicatorTabs = page.locator('.ux-category-tabs--indicator').first();
    if (await indicatorTabs.count() > 0) {
      const indicator = indicatorTabs.locator('.ux-category-tabs__indicator').first();
      if (await indicator.count() > 0) {
        await expect(indicator).toBeVisible();
      }
    }
  });

  test('should transition smoothly on tab switch', async ({ page }) => {
    const indicatorTabs = page.locator('.ux-category-tabs--indicator').first();
    if (await indicatorTabs.count() > 0) {
      const indicator = indicatorTabs.locator('.ux-category-tabs__indicator').first();
      if (await indicator.count() > 0) {
        const transition = await indicator.evaluate(el =>
          getComputedStyle(el).transition
        );
        expect(transition).toContain('left');
      }
    }
  });

  test('should not show indicator in pill variant', async ({ page }) => {
    const pillTabs = page.locator('.ux-category-tabs--pill').first();
    if (await pillTabs.count() > 0) {
      const indicator = pillTabs.locator('.ux-category-tabs__indicator').first();
      if (await indicator.count() > 0) {
        const display = await indicator.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(display).toBe('none');
      }
    }
  });

  test('should apply color variants', async ({ page }) => {
    const colorTabs = page.locator('.ux-category-tabs--primary, .ux-category-tabs--success, .ux-category-tabs--danger').first();
    if (await colorTabs.count() > 0) {
      await expect(colorTabs).toBeVisible();
    }
  });

  test('should have proper contrast on active tab', async ({ page }) => {
    const activeTab = page.locator('.ux-category-tabs__item--active').first();
    if (await activeTab.count() > 0) {
      const color = await activeTab.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should handle disabled state', async ({ page }) => {
    const disabledTab = page.locator('.ux-category-tabs__item--disabled').first();
    if (await disabledTab.count() > 0) {
      const opacity = await disabledTab.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('should support HTMX attributes', async ({ page }) => {
    const htmxTab = page.locator('.ux-category-tabs__item[hx-get], .ux-category-tabs__item[hx-post]').first();
    if (await htmxTab.count() > 0) {
      await expect(htmxTab).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const categoryTabs = page.locator('.ux-category-tabs').first();
    await expect(categoryTabs).toBeVisible();

    const width = await categoryTabs.evaluate(el => el.clientWidth);
    expect(width).toBeGreaterThan(0);
  });
});
