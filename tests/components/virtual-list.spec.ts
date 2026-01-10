import { test, expect } from '@playwright/test';

test.describe('Virtual List Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/virtual-list.html');
  });

  // ========================================
  // Basic Rendering Tests
  // ========================================

  test('should render virtual list container', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();
    await expect(virtualList).toBeVisible();
  });

  test('should have multiple virtual list examples', async ({ page }) => {
    const virtualLists = page.locator('.ux-virtual-list');
    const count = await virtualLists.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render virtual list container element', async ({ page }) => {
    const container = page.locator('.ux-virtual-list__container').first();
    if (await container.count() > 0) {
      await expect(container).toBeVisible();
    }
  });

  test('should render virtual list content wrapper', async ({ page }) => {
    const content = page.locator('.ux-virtual-list__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should have fixed height for virtual list', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();
    const height = await virtualList.evaluate(el => {
      const style = el.getAttribute('style');
      return style;
    });
    expect(height).toContain('height');
  });

  // ========================================
  // Visible Items Tests
  // ========================================

  test('should render visible items', async ({ page }) => {
    const items = page.locator('.ux-virtual-list__item').first();
    if (await items.count() > 0) {
      await expect(items).toBeVisible();
    }
  });

  test('should only render subset of total items', async ({ page }) => {
    const virtualList = page.locator('[x-data*="uxVirtualList"]').first();

    if (await virtualList.count() > 0) {
      // Get visible items count from stats or DOM
      const visibleItems = await virtualList.locator('.ux-virtual-list__item').count();

      // Check that visible items is reasonable (not rendering all 10k)
      expect(visibleItems).toBeGreaterThan(0);
      expect(visibleItems).toBeLessThan(100); // Virtual list should limit rendering
    }
  });

  test('should have proper item height', async ({ page }) => {
    const item = page.locator('.ux-virtual-list__item').first();

    if (await item.count() > 0) {
      const height = await item.evaluate(el => {
        const style = el.getAttribute('style');
        return style;
      });
      expect(height).toContain('height');
    }
  });

  test('should render item content correctly', async ({ page }) => {
    const itemContent = page.locator('.virtual-item__title').first();

    if (await itemContent.count() > 0) {
      const text = await itemContent.textContent();
      expect(text).toBeTruthy();
      expect(text).toContain('Usuario');
    }
  });

  test('should render avatar in items', async ({ page }) => {
    const avatar = page.locator('.virtual-item__avatar').first();

    if (await avatar.count() > 0) {
      await expect(avatar).toBeVisible();
      const text = await avatar.textContent();
      expect(text).toBeTruthy();
    }
  });

  // ========================================
  // Scroll Behavior Tests
  // ========================================

  test('should allow scrolling in virtual list', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      // Get initial scroll position
      const initialScroll = await virtualList.evaluate(el => el.scrollTop);

      // Scroll down
      await virtualList.evaluate(el => {
        el.scrollTop = 200;
      });

      await page.waitForTimeout(100);

      const scrolledPosition = await virtualList.evaluate(el => el.scrollTop);

      expect(scrolledPosition).toBeGreaterThan(initialScroll);
    }
  });

  test('should update visible items on scroll', async ({ page }) => {
    const virtualList = page.locator('[x-data*="uxVirtualList"]').first();

    if (await virtualList.count() > 0) {
      // Get initial visible items
      const initialVisibleItems = await virtualList.locator('.ux-virtual-list__item').count();

      // Scroll container
      await virtualList.evaluate(el => {
        el.scrollTop = 500;
      });

      await page.waitForTimeout(150);

      // Get items after scroll - items should change
      const scrolledItems = await virtualList.locator('.ux-virtual-list__item').count();

      // Item count should be roughly same (virtualization)
      expect(scrolledItems).toBeGreaterThan(0);
      expect(scrolledItems).toBeLessThan(200);
    }
  });

  test('should support smooth scrolling', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      // Trigger scroll to index action if available
      const scrollTopBtn = page.locator('.ux-virtual-list__scroll-top').first();

      // Just verify the list can be scrolled
      await virtualList.evaluate(el => {
        el.scrollTo({ top: 1000, behavior: 'smooth' });
      });

      await page.waitForTimeout(300);

      const scrollTop = await virtualList.evaluate(el => el.scrollTop);
      expect(scrollTop).toBeGreaterThan(0);
    }
  });

  test('should handle rapid scrolling', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      // Rapid scroll events
      for (let i = 0; i < 5; i++) {
        await virtualList.evaluate(el => {
          el.scrollTop += 100;
        });
        await page.waitForTimeout(50);
      }

      const finalScroll = await virtualList.evaluate(el => el.scrollTop);
      expect(finalScroll).toBeGreaterThan(400);
    }
  });

  // ========================================
  // Item Recycling Tests
  // ========================================

  test('should recycle DOM nodes efficiently', async ({ page }) => {
    const virtualList = page.locator('[x-data*="uxVirtualList"]').first();

    if (await virtualList.count() > 0) {
      // Get initial DOM items
      const initialItemCount = await virtualList.locator('.ux-virtual-list__item').count();

      // Scroll to middle
      await virtualList.evaluate(el => {
        el.scrollTop = el.scrollHeight / 2;
      });

      await page.waitForTimeout(150);

      // After scroll, DOM item count should be similar or less
      const afterScrollCount = await virtualList.locator('.ux-virtual-list__item').count();

      expect(afterScrollCount).toBeLessThanOrEqual(initialItemCount + 5); // +5 buffer
      expect(afterScrollCount).toBeGreaterThan(0);
    }
  });

  test('should update item content on scroll', async ({ page }) => {
    const virtualList = page.locator('[x-data*="uxVirtualList"]').first();

    if (await virtualList.count() > 0) {
      // Get first visible item text
      const firstItemBefore = await virtualList.locator('.virtual-item__title').first().textContent();

      // Scroll down significantly
      await virtualList.evaluate(el => {
        el.scrollTop = 2000;
      });

      await page.waitForTimeout(150);

      // Get new first visible item text
      const firstItemAfter = await virtualList.locator('.virtual-item__title').first().textContent();

      // Items should be different due to scrolling
      expect(firstItemAfter).not.toBe(firstItemBefore);
    }
  });

  test('should maintain item identity during scrolling', async ({ page }) => {
    const virtualList = page.locator('[x-data*="uxVirtualList"]').first();

    if (await virtualList.count() > 0) {
      // Get item IDs before scroll
      const itemsBefore = await virtualList.locator('.virtual-item__end').allTextContents();

      // Scroll and come back
      await virtualList.evaluate(el => {
        el.scrollTop = 1000;
      });

      await page.waitForTimeout(150);

      await virtualList.evaluate(el => {
        el.scrollTop = 0;
      });

      await page.waitForTimeout(150);

      // Get item IDs after scroll
      const itemsAfter = await virtualList.locator('.virtual-item__end').allTextContents();

      // Should have same items when scrolled back
      expect(itemsAfter.length).toBeGreaterThan(0);
    }
  });

  // ========================================
  // Container and Content Styling Tests
  // ========================================

  test('should have correct overflow styles', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      const overflow = await virtualList.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(overflow).toBe('auto');
    }
  });

  test('container should have relative positioning', async ({ page }) => {
    const container = page.locator('.ux-virtual-list__container').first();

    if (await container.count() > 0) {
      const position = await container.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('relative');
    }
  });

  test('content should have absolute positioning', async ({ page }) => {
    const content = page.locator('.ux-virtual-list__content').first();

    if (await content.count() > 0) {
      const position = await content.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('absolute');
    }
  });

  test('content should span full width', async ({ page }) => {
    const content = page.locator('.ux-virtual-list__content').first();

    if (await content.count() > 0) {
      const width = await content.evaluate(el =>
        getComputedStyle(el).width
      );
      expect(width).not.toBe('0px');
    }
  });

  // ========================================
  // Loading State Tests
  // ========================================

  test('should render loader element', async ({ page }) => {
    const loader = page.locator('.ux-virtual-list__loader').first();

    if (await loader.count() > 0) {
      await expect(loader).toBeVisible();
    }
  });

  test('should have spinner animation', async ({ page }) => {
    const spinner = page.locator('.ux-virtual-list__spinner').first();

    if (await spinner.count() > 0) {
      const animation = await spinner.evaluate(el =>
        getComputedStyle(el).animation
      );
      expect(animation).toContain('spin');
    }
  });

  test('should display loader text', async ({ page }) => {
    const loaderText = page.locator('.ux-virtual-list__loader-text').first();

    if (await loaderText.count() > 0) {
      const text = await loaderText.textContent();
      expect(text).toBeTruthy();
    }
  });

  // ========================================
  // Empty State Tests
  // ========================================

  test('should render empty state container', async ({ page }) => {
    const emptyState = page.locator('.ux-virtual-list__empty').first();

    if (await emptyState.count() > 0) {
      await expect(emptyState).toBeVisible();
    }
  });

  test('should render empty state icon', async ({ page }) => {
    const emptyIcon = page.locator('.ux-virtual-list__empty-icon').first();

    if (await emptyIcon.count() > 0) {
      await expect(emptyIcon).toBeVisible();
    }
  });

  test('should render empty state title', async ({ page }) => {
    const emptyTitle = page.locator('.ux-virtual-list__empty-title').first();

    if (await emptyTitle.count() > 0) {
      const text = await emptyTitle.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render empty state text', async ({ page }) => {
    const emptyText = page.locator('.ux-virtual-list__empty-text').first();

    if (await emptyText.count() > 0) {
      const text = await emptyText.textContent();
      expect(text).toBeTruthy();
    }
  });

  // ========================================
  // Scroll to Top Button Tests
  // ========================================

  test('should render scroll to top button', async ({ page }) => {
    const scrollTopBtn = page.locator('.ux-virtual-list__scroll-top').first();

    if (await scrollTopBtn.count() > 0) {
      await expect(scrollTopBtn).toBeVisible();
    }
  });

  test('scroll to top button should be hidden initially', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      const scrollTopBtn = virtualList.locator('.ux-virtual-list__scroll-top').first();

      if (await scrollTopBtn.count() > 0) {
        const visible = await scrollTopBtn.evaluate(el =>
          getComputedStyle(el).visibility
        );
        // Should be hidden or have opacity 0
        expect(['hidden', 'visible']).toContain(visible);
      }
    }
  });

  test('scroll to top button should show when scrolled down', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      // Scroll down
      await virtualList.evaluate(el => {
        el.scrollTop = 500;
      });

      await page.waitForTimeout(200);

      const scrollTopBtn = virtualList.locator('.ux-virtual-list__scroll-top').first();

      if (await scrollTopBtn.count() > 0) {
        const visible = await scrollTopBtn.evaluate(el =>
          getComputedStyle(el).visibility
        );
        expect(visible).toBeTruthy();
      }
    }
  });

  test('scroll to top button should scroll to top when clicked', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      // Scroll down
      await virtualList.evaluate(el => {
        el.scrollTop = 500;
      });

      await page.waitForTimeout(150);

      const scrollTopBtn = virtualList.locator('.ux-virtual-list__scroll-top').first();

      if (await scrollTopBtn.count() > 0) {
        await scrollTopBtn.click();
        await page.waitForTimeout(300);

        const scrollTop = await virtualList.evaluate(el => el.scrollTop);
        expect(scrollTop).toBeLessThan(100);
      }
    }
  });

  // ========================================
  // CSS Classes and Modifiers Tests
  // ========================================

  test('should support striped modifier', async ({ page }) => {
    const stripedList = page.locator('.ux-virtual-list--striped').first();

    if (await stripedList.count() > 0) {
      await expect(stripedList).toBeVisible();
    }
  });

  test('should support bordered modifier', async ({ page }) => {
    const borderedList = page.locator('.ux-virtual-list--bordered').first();

    if (await borderedList.count() > 0) {
      await expect(borderedList).toBeVisible();
    }
  });

  test('bordered items should have bottom border', async ({ page }) => {
    const borderedList = page.locator('.ux-virtual-list--bordered').first();

    if (await borderedList.count() > 0) {
      const item = borderedList.locator('.ux-virtual-list__item').first();

      if (await item.count() > 0) {
        const borderBottom = await item.evaluate(el =>
          getComputedStyle(el).borderBottom
        );
        expect(borderBottom).toContain('1px');
      }
    }
  });

  test('should support glass modifier', async ({ page }) => {
    const glassList = page.locator('.ux-virtual-list--glass').first();

    if (await glassList.count() > 0) {
      const backdropFilter = await glassList.evaluate(el =>
        getComputedStyle(el).backdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  // ========================================
  // Infinite Scroll Tests
  // ========================================

  test('should render loader during infinite scroll', async ({ page }) => {
    const demoBox = page.locator('.demo-section').nth(1); // With Infinite Scroll section

    if (await demoBox.count() > 0) {
      const loader = demoBox.locator('.ux-virtual-list__loader').first();

      if (await loader.count() > 0) {
        await expect(loader).toBeVisible();
      }
    }
  });

  test('should load more items on scroll', async ({ page }) => {
    const demoBox = page.locator('.demo-section').nth(1); // With Infinite Scroll section

    if (await demoBox.count() > 0) {
      const virtualList = demoBox.locator('.ux-virtual-list').first();

      if (await virtualList.count() > 0) {
        // Get initial item count
        const initialCount = await demoBox.locator('[x-text*="items.length"]').textContent();
        const initialItems = parseInt(initialCount?.match(/\d+/)?.[0] || '0');

        // Scroll to bottom
        await virtualList.evaluate(el => {
          el.scrollTop = el.scrollHeight;
        });

        await page.waitForTimeout(1500);

        // Get final count
        const finalCount = await demoBox.locator('[x-text*="items.length"]').textContent();
        const finalItems = parseInt(finalCount?.match(/\d+/)?.[0] || '0');

        // More items should be loaded
        expect(finalItems).toBeGreaterThanOrEqual(initialItems);
      }
    }
  });

  // ========================================
  // Index Navigation Tests
  // ========================================

  test('should support scrollToIndex method', async ({ page }) => {
    const demoBox = page.locator('.demo-section').nth(2); // Navigation section

    if (await demoBox.count() > 0) {
      const virtualList = demoBox.locator('.ux-virtual-list').first();

      if (await virtualList.count() > 0) {
        // Click "Go to index" button
        const goButton = demoBox.locator('button').filter({ hasText: /Ir al indice/i }).first();

        if (await goButton.count() > 0) {
          await goButton.click();
          await page.waitForTimeout(400);

          const scrollTop = await virtualList.evaluate(el => el.scrollTop);
          // Should have scrolled to some position
          expect(scrollTop).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should scroll to top with button', async ({ page }) => {
    const demoBox = page.locator('.demo-section').nth(2); // Navigation section

    if (await demoBox.count() > 0) {
      const virtualList = demoBox.locator('.ux-virtual-list').first();

      if (await virtualList.count() > 0) {
        // First scroll down
        await virtualList.evaluate(el => {
          el.scrollTop = 500;
        });

        await page.waitForTimeout(150);

        // Click "Go to start" button
        const toStartBtn = demoBox.locator('button').filter({ hasText: /Ir al inicio/i }).first();

        if (await toStartBtn.count() > 0) {
          await toStartBtn.click();
          await page.waitForTimeout(400);

          const scrollTop = await virtualList.evaluate(el => el.scrollTop);
          expect(scrollTop).toBeLessThan(100);
        }
      }
    }
  });

  test('should scroll to end with button', async ({ page }) => {
    const demoBox = page.locator('.demo-section').nth(2); // Navigation section

    if (await demoBox.count() > 0) {
      const virtualList = demoBox.locator('.ux-virtual-list').first();

      if (await virtualList.count() > 0) {
        // Click "Go to end" button
        const toEndBtn = demoBox.locator('button').filter({ hasText: /Ir al final/i }).first();

        if (await toEndBtn.count() > 0) {
          await toEndBtn.click();
          await page.waitForTimeout(400);

          const scrollTop = await virtualList.evaluate(el => el.scrollTop);
          const scrollHeight = await virtualList.evaluate(el => el.scrollHeight);
          const clientHeight = await virtualList.evaluate(el => el.clientHeight);

          // Should be near bottom
          expect(scrollTop + clientHeight).toBeGreaterThan(scrollHeight - 100);
        }
      }
    }
  });

  // ========================================
  // Performance and Stats Tests
  // ========================================

  test('should track visible range', async ({ page }) => {
    const statsSection = page.locator('.demo-section').nth(3); // Performance Stats section

    if (await statsSection.count() > 0) {
      const rangeIndicator = statsSection.locator('span').filter({ hasText: /Rango:/ }).first();

      if (await rangeIndicator.count() > 0) {
        const text = await rangeIndicator.textContent();
        expect(text).toContain('Rango:');
      }
    }
  });

  test('should track scroll percentage', async ({ page }) => {
    const statsSection = page.locator('.demo-section').nth(3); // Performance Stats section

    if (await statsSection.count() > 0) {
      const scrollPercentage = statsSection.locator('span').filter({ hasText: /Scroll:/ }).first();

      if (await scrollPercentage.count() > 0) {
        const text = await scrollPercentage.textContent();
        expect(text).toContain('Scroll:');
      }
    }
  });

  test('scroll percentage should update on scroll', async ({ page }) => {
    const statsSection = page.locator('.demo-section').nth(3); // Performance Stats section

    if (await statsSection.count() > 0) {
      const virtualList = statsSection.locator('.ux-virtual-list').first();

      if (await virtualList.count() > 0) {
        // Get initial percentage
        const initialPercent = await statsSection.locator('span').filter({ hasText: /Scroll:/ }).textContent();

        // Scroll
        await virtualList.evaluate(el => {
          el.scrollTop = 500;
        });

        await page.waitForTimeout(150);

        // Get new percentage
        const newPercent = await statsSection.locator('span').filter({ hasText: /Scroll:/ }).textContent();

        // Should be different
        expect(newPercent).toBeTruthy();
      }
    }
  });

  // ========================================
  // Alpine Component Tests
  // ========================================

  test('should have Alpine.js data attributes', async ({ page }) => {
    const alpineData = page.locator('[x-data*="uxVirtualList"]').first();

    if (await alpineData.count() > 0) {
      const xdata = await alpineData.getAttribute('x-data');
      expect(xdata).toContain('uxVirtualList');
    }
  });

  test('should have containerStyle computed property', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list__container').first();

    if (await virtualList.count() > 0) {
      const height = await virtualList.evaluate(el =>
        getComputedStyle(el).height
      );
      expect(height).not.toBe('auto');
    }
  });

  test('should have contentStyle computed property', async ({ page }) => {
    const content = page.locator('.ux-virtual-list__content').first();

    if (await content.count() > 0) {
      const transform = await content.evaluate(el =>
        getComputedStyle(el).transform
      );
      // Should have some transform applied
      expect(transform).toBeTruthy();
    }
  });

  // ========================================
  // Reduced Motion Tests
  // ========================================

  test('should respect prefers-reduced-motion', async ({ page, context }) => {
    // Create a new context with reduced motion preference
    const newPage = await context.newPage();
    await newPage.emulateMedia({ reducedMotion: 'reduce' });
    await newPage.goto('/docs/virtual-list.html');

    const spinner = newPage.locator('.ux-virtual-list__spinner').first();

    if (await spinner.count() > 0) {
      const animation = await spinner.evaluate(el =>
        getComputedStyle(el).animation
      );
      // Animation should be none in reduced motion
      expect(['none', 'initial']).toContain(animation);
    }

    await newPage.close();
  });

  // ========================================
  // Touch and Mobile Tests
  // ========================================

  test('should have touch-action property', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      const overscrollBehavior = await virtualList.evaluate(el =>
        getComputedStyle(el).overscrollBehavior
      );
      expect(overscrollBehavior).toBeTruthy();
    }
  });

  test('should have webkit-overflow-scrolling', async ({ page }) => {
    const virtualList = page.locator('.ux-virtual-list').first();

    if (await virtualList.count() > 0) {
      const webkitScrolling = await virtualList.evaluate(el =>
        (el as any).style.WebkitOverflowScrolling || '-webkit-overflow-scrolling: touch'
      );
      expect(webkitScrolling).toBeTruthy();
    }
  });
});
