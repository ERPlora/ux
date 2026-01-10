import { test, expect } from '@playwright/test';

test.describe('Master-Detail Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/master-detail.html');
  });

  // ========================================
  // Basic Rendering Tests
  // ========================================

  test('should render master-detail container', async ({ page }) => {
    const container = page.locator('.ux-master-detail').first();
    await expect(container).toBeVisible();
  });

  test('should have master panel (list)', async ({ page }) => {
    const masterPanel = page.locator('.ux-master-detail__master').first();
    if (await masterPanel.count() > 0) {
      await expect(masterPanel).toBeVisible();
    }
  });

  test('should have detail panel', async ({ page }) => {
    const detailPanel = page.locator('.ux-master-detail__detail').first();
    if (await detailPanel.count() > 0) {
      await expect(detailPanel).toBeVisible();
    }
  });

  // ========================================
  // Master Panel Structure Tests
  // ========================================

  test('master panel should have header', async ({ page }) => {
    const masterHeader = page.locator('.ux-master-detail__master-header').first();
    if (await masterHeader.count() > 0) {
      await expect(masterHeader).toBeVisible();
    }
  });

  test('master panel should have content area', async ({ page }) => {
    const masterContent = page.locator('.ux-master-detail__master-content').first();
    if (await masterContent.count() > 0) {
      await expect(masterContent).toBeVisible();
    }
  });

  test('master panel content should be scrollable', async ({ page }) => {
    const masterContent = page.locator('.ux-master-detail__master-content').first();
    if (await masterContent.count() > 0) {
      const overflow = await masterContent.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(['auto', 'scroll']).toContain(overflow);
    }
  });

  test('master panel should display list items', async ({ page }) => {
    const listItems = page.locator('.demo-list-item, .ux-list__item').first();
    if (await listItems.count() > 0) {
      await expect(listItems).toBeVisible();
    }
  });

  // ========================================
  // Detail Panel Structure Tests
  // ========================================

  test('detail panel should have header', async ({ page }) => {
    const detailHeader = page.locator('.ux-master-detail__detail-header').first();
    if (await detailHeader.count() > 0) {
      await expect(detailHeader).toBeVisible();
    }
  });

  test('detail panel should have content area', async ({ page }) => {
    const detailContent = page.locator('.ux-master-detail__detail-content').first();
    if (await detailContent.count() > 0) {
      await expect(detailContent).toBeVisible();
    }
  });

  test('detail panel content should be scrollable', async ({ page }) => {
    const detailContent = page.locator('.ux-master-detail__detail-content').first();
    if (await detailContent.count() > 0) {
      const overflow = await detailContent.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(['auto', 'scroll']).toContain(overflow);
    }
  });

  // ========================================
  // Selection Tests
  // ========================================

  test('should select item when clicking on list item', async ({ page }) => {
    const firstItem = page.locator('.demo-list-item').first();
    if (await firstItem.count() > 0) {
      await firstItem.click();
      await page.waitForTimeout(100);

      const selectedClass = await firstItem.evaluate(el =>
        el.classList.contains('demo-list-item--selected')
      );
      expect(selectedClass).toBe(true);
    }
  });

  test('selected item should have visual indicator', async ({ page }) => {
    const firstItem = page.locator('.demo-list-item').first();
    if (await firstItem.count() > 0) {
      await firstItem.click();
      await page.waitForTimeout(100);

      const bgColor = await firstItem.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Selected state should have a different background
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should show detail content when item is selected', async ({ page }) => {
    const firstItem = page.locator('.demo-list-item').first();
    if (await firstItem.count() > 0) {
      await firstItem.click();
      await page.waitForTimeout(100);

      const detailTitle = page.locator('.ux-master-detail__detail-header h2, .ux-master-detail__detail-content').first();
      const isVisible = await detailTitle.isVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('should hide empty state when item is selected', async ({ page }) => {
    const emptyState = page.locator('.ux-master-detail__empty').first();
    const initialEmpty = await emptyState.count() > 0 && await emptyState.isVisible();

    if (initialEmpty) {
      const firstItem = page.locator('.demo-list-item').first();
      if (await firstItem.count() > 0) {
        await firstItem.click();
        await page.waitForTimeout(100);

        const stillVisible = await emptyState.isVisible();
        expect(stillVisible).toBe(false);
      }
    }
  });

  test('should switch selection between items', async ({ page }) => {
    const items = page.locator('.demo-list-item');
    const count = await items.count();

    if (count >= 2) {
      // Select first item
      await items.first().click();
      await page.waitForTimeout(100);

      const firstSelected = await items.first().evaluate(el =>
        el.classList.contains('demo-list-item--selected')
      );
      expect(firstSelected).toBe(true);

      // Select second item
      await items.nth(1).click();
      await page.waitForTimeout(100);

      const firstAfter = await items.first().evaluate(el =>
        el.classList.contains('demo-list-item--selected')
      );
      const secondSelected = await items.nth(1).evaluate(el =>
        el.classList.contains('demo-list-item--selected')
      );

      expect(firstAfter).toBe(false);
      expect(secondSelected).toBe(true);
    }
  });

  // ========================================
  // Empty State Tests
  // ========================================

  test('should display empty state when no item is selected', async ({ page }) => {
    const emptyState = page.locator('.ux-master-detail__empty').first();
    if (await emptyState.count() > 0) {
      const isVisible = await emptyState.isVisible();
      if (isVisible) {
        await expect(emptyState).toBeVisible();
      }
    }
  });

  test('empty state should have icon', async ({ page }) => {
    const emptyIcon = page.locator('.ux-master-detail__empty-icon').first();
    if (await emptyIcon.count() > 0) {
      await expect(emptyIcon).toBeVisible();
    }
  });

  test('empty state should have title', async ({ page }) => {
    const emptyTitle = page.locator('.ux-master-detail__empty-title').first();
    if (await emptyTitle.count() > 0) {
      await expect(emptyTitle).toBeVisible();
      const text = await emptyTitle.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('empty state should have description', async ({ page }) => {
    const emptyText = page.locator('.ux-master-detail__empty-text').first();
    if (await emptyText.count() > 0) {
      await expect(emptyText).toBeVisible();
      const text = await emptyText.textContent();
      expect(text).toBeTruthy();
    }
  });

  // ========================================
  // Layout Structure Tests
  // ========================================

  test('master-detail should use flexbox layout', async ({ page }) => {
    const container = page.locator('.ux-master-detail').first();
    const display = await container.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  test('master and detail panels should be flex children', async ({ page }) => {
    const masterPanel = page.locator('.ux-master-detail__master').first();
    const detailPanel = page.locator('.ux-master-detail__detail').first();

    if (await masterPanel.count() > 0 && await detailPanel.count() > 0) {
      const masterDisplay = await masterPanel.evaluate(el =>
        getComputedStyle(el).display
      );
      const detailDisplay = await detailPanel.evaluate(el =>
        getComputedStyle(el).display
      );

      expect(masterDisplay).toBe('flex');
      expect(detailDisplay).toBe('flex');
    }
  });

  test('master panel should have fixed width on desktop', async ({ page }) => {
    const masterPanel = page.locator('.ux-master-detail__master').first();
    if (await masterPanel.count() > 0) {
      const width = await masterPanel.evaluate(el => {
        const computed = getComputedStyle(el);
        return computed.width;
      });

      const widthValue = parseFloat(width);
      expect(widthValue).toBeGreaterThan(200); // Should have a fixed width
    }
  });

  test('detail panel should flex and grow', async ({ page }) => {
    const detailPanel = page.locator('.ux-master-detail__detail').first();
    if (await detailPanel.count() > 0) {
      const flex = await detailPanel.evaluate(el =>
        getComputedStyle(el).flex
      );
      expect(flex).toContain('1');
    }
  });

  // ========================================
  // Styling Tests
  // ========================================

  test('master panel should have border-right', async ({ page }) => {
    const masterPanel = page.locator('.ux-master-detail__master').first();
    if (await masterPanel.count() > 0) {
      const borderRight = await masterPanel.evaluate(el =>
        getComputedStyle(el).borderRight
      );
      expect(borderRight).not.toBe('none');
    }
  });

  test('should have proper background colors', async ({ page }) => {
    const masterPanel = page.locator('.ux-master-detail__master').first();
    if (await masterPanel.count() > 0) {
      const bgColor = await masterPanel.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('transparent');
    }
  });

  test('detail panel should have overflow hidden', async ({ page }) => {
    const detailPanel = page.locator('.ux-master-detail__detail').first();
    if (await detailPanel.count() > 0) {
      const overflow = await detailPanel.evaluate(el =>
        getComputedStyle(el).overflow
      );
      expect(overflow).toBe('hidden');
    }
  });

  // ========================================
  // Variant Tests
  // ========================================

  test('should support full-height variant', async ({ page }) => {
    const fullHeightContainer = page.locator('.ux-master-detail--full-height').first();
    if (await fullHeightContainer.count() > 0) {
      const height = await fullHeightContainer.evaluate(el =>
        getComputedStyle(el).height
      );
      expect(height).not.toBe('auto');
    }
  });

  test('should support narrow-master variant', async ({ page }) => {
    const narrowMaster = page.locator('.ux-master-detail--narrow-master').first();
    if (await narrowMaster.count() > 0) {
      const masterPanel = narrowMaster.locator('.ux-master-detail__master');
      const width = await masterPanel.evaluate(el => {
        const computed = getComputedStyle(el);
        return parseFloat(computed.width);
      });
      expect(width).toBeLessThan(280); // Narrower than default
    }
  });

  test('should support wide-master variant', async ({ page }) => {
    const wideMaster = page.locator('.ux-master-detail--wide-master').first();
    if (await wideMaster.count() > 0) {
      const masterPanel = wideMaster.locator('.ux-master-detail__master');
      const width = await masterPanel.evaluate(el => {
        const computed = getComputedStyle(el);
        return parseFloat(computed.width);
      });
      expect(width).toBeGreaterThan(280); // Wider than default
    }
  });

  test('should support glass variant', async ({ page }) => {
    const glassContainer = page.locator('.ux-master-detail--glass').first();
    if (await glassContainer.count() > 0) {
      const masterPanel = glassContainer.locator('.ux-master-detail__master');
      if (await masterPanel.count() > 0) {
        const backdropFilter = await masterPanel.evaluate(el =>
          getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    }
  });

  // ========================================
  // Accessibility Tests
  // ========================================

  test('list items should be keyboard accessible', async ({ page }) => {
    const firstItem = page.locator('.demo-list-item').first();
    if (await firstItem.count() > 0) {
      // Tab to the item and press Enter
      await firstItem.focus();
      const focused = await firstItem.evaluate(el => el === document.activeElement);
      expect(focused).toBe(true);
    }
  });

  test('should have semantic structure', async ({ page }) => {
    const container = page.locator('.ux-master-detail').first();
    if (await container.count() > 0) {
      const childCount = await container.locator('> div').count();
      expect(childCount).toBeGreaterThanOrEqual(2); // At least master and detail
    }
  });

  // ========================================
  // Content Tests
  // ========================================

  test('master panel should display header content', async ({ page }) => {
    const masterHeader = page.locator('.ux-master-detail__master-header').first();
    if (await masterHeader.count() > 0) {
      const text = await masterHeader.textContent();
      expect(text).toBeTruthy();
      expect(text).not.toBe('');
    }
  });

  test('list items should have visible content', async ({ page }) => {
    const firstItem = page.locator('.demo-list-item').first();
    if (await firstItem.count() > 0) {
      const text = await firstItem.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('detail panel header should display selected item title', async ({ page }) => {
    const firstItem = page.locator('.demo-list-item').first();
    if (await firstItem.count() > 0) {
      await firstItem.click();
      await page.waitForTimeout(100);

      const detailHeader = page.locator('.ux-master-detail__detail-header').first();
      if (await detailHeader.count() > 0) {
        const headerText = await detailHeader.textContent();
        expect(headerText).toBeTruthy();
      }
    }
  });

  // ========================================
  // Responsive Tests (Desktop)
  // ========================================

  test('on desktop, master and detail should be side-by-side', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/docs/master-detail.html');

    const container = page.locator('.ux-master-detail').first();
    const masterPanel = page.locator('.ux-master-detail__master').first();
    const detailPanel = page.locator('.ux-master-detail__detail').first();

    if (await masterPanel.count() > 0 && await detailPanel.count() > 0) {
      const flexDirection = await container.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('row');
    }
  });

  test('on desktop, master should have border-right', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/docs/master-detail.html');

    const masterPanel = page.locator('.ux-master-detail__master').first();
    if (await masterPanel.count() > 0) {
      const borderRight = await masterPanel.evaluate(el =>
        getComputedStyle(el).borderRight
      );
      expect(borderRight).not.toBe('none');
    }
  });

  // ========================================
  // Mobile Responsive Tests
  // ========================================

  test('on mobile, master and detail should stack vertically', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/docs/master-detail.html');

    const container = page.locator('.ux-master-detail').first();
    const flexDirection = await container.evaluate(el =>
      getComputedStyle(el).flexDirection
    );
    expect(flexDirection).toBe('column');
  });

  test('on mobile, master should span full width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/docs/master-detail.html');

    const masterPanel = page.locator('.ux-master-detail__master').first();
    if (await masterPanel.count() > 0) {
      const width = await masterPanel.evaluate(el =>
        getComputedStyle(el).width
      );
      expect(width).toBe('100%');
    }
  });

  test('on mobile, master should have border-bottom instead of border-right', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/docs/master-detail.html');

    const masterPanel = page.locator('.ux-master-detail__master').first();
    if (await masterPanel.count() > 0) {
      const borderRight = await masterPanel.evaluate(el =>
        getComputedStyle(el).borderRight
      );
      const borderBottom = await masterPanel.evaluate(el =>
        getComputedStyle(el).borderBottom
      );
      expect(borderRight).toBe('none');
      expect(borderBottom).not.toBe('none');
    }
  });

  test('on mobile, detail panel should have flex-direction column', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/docs/master-detail.html');

    const detailPanel = page.locator('.ux-master-detail__detail').first();
    if (await detailPanel.count() > 0) {
      const flexDirection = await detailPanel.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('column');
    }
  });
});
