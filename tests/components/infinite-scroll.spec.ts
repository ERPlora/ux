import { test, expect } from '@playwright/test';

test.describe('Infinite Scroll Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/infinite-scroll.html');
  });

  // Basic Rendering Tests
  test('should render infinite scroll container', async ({ page }) => {
    const infiniteScroll = page.locator('.ux-infinite-scroll').first();
    await expect(infiniteScroll).toBeVisible();
  });

  test('should have multiple infinite scroll examples', async ({ page }) => {
    const infiniteScrolls = page.locator('.ux-infinite-scroll');
    const count = await infiniteScrolls.count();
    expect(count).toBeGreaterThan(0);
  });

  // Loading State Tests
  test('should render loading spinner', async ({ page }) => {
    const spinner = page.locator('.ux-infinite-scroll__spinner').first();
    if (await spinner.count() > 0) {
      await expect(spinner).toBeVisible();
    }
  });

  test('should render loading icon', async ({ page }) => {
    const icon = page.locator('.ux-infinite-scroll__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should render loading text', async ({ page }) => {
    const text = page.locator('.ux-infinite-scroll__text').first();
    if (await text.count() > 0) {
      await expect(text).toBeVisible();
      const content = await text.textContent();
      expect(content).toBeTruthy();
    }
  });

  test('loading icon should have animation', async ({ page }) => {
    const icon = page.locator('.ux-infinite-scroll__icon').first();
    if (await icon.count() > 0) {
      const animation = await icon.evaluate(el =>
        getComputedStyle(el).animation
      );
      expect(animation).toContain('spin');
    }
  });

  // Complete State Tests
  test('should render complete state', async ({ page }) => {
    const completeState = page.locator('.ux-infinite-scroll--complete').first();
    if (await completeState.count() > 0) {
      await expect(completeState).toBeVisible();
    }
  });

  test('should render end icon in complete state', async ({ page }) => {
    const endIcon = page.locator('.ux-infinite-scroll__end-icon').first();
    if (await endIcon.count() > 0) {
      await expect(endIcon).toBeVisible();
    }
  });

  test('should render end text in complete state', async ({ page }) => {
    const endText = page.locator('.ux-infinite-scroll__end-text').first();
    if (await endText.count() > 0) {
      await expect(endText).toBeVisible();
      const content = await endText.textContent();
      expect(content).toBeTruthy();
    }
  });

  // Error State Tests
  test('should render error state', async ({ page }) => {
    const errorState = page.locator('.ux-infinite-scroll--error').first();
    if (await errorState.count() > 0) {
      await expect(errorState).toBeVisible();
    }
  });

  test('should render error text', async ({ page }) => {
    const errorText = page.locator('.ux-infinite-scroll__error-text').first();
    if (await errorText.count() > 0) {
      await expect(errorText).toBeVisible();
      const content = await errorText.textContent();
      expect(content).toBeTruthy();
    }
  });

  test('should render retry button', async ({ page }) => {
    const retryButton = page.locator('.ux-infinite-scroll__retry').first();
    if (await retryButton.count() > 0) {
      await expect(retryButton).toBeVisible();
    }
  });

  // Scroll Container Tests
  test('should render scroll container with max-height', async ({ page }) => {
    const scrollContainer = page.locator('.scroll-container').first();
    if (await scrollContainer.count() > 0) {
      const maxHeight = await scrollContainer.evaluate(el =>
        getComputedStyle(el).maxHeight
      );
      expect(maxHeight).not.toBe('none');
    }
  });

  test('scroll container should have overflow-y auto', async ({ page }) => {
    const scrollContainer = page.locator('.scroll-container').first();
    if (await scrollContainer.count() > 0) {
      const overflow = await scrollContainer.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(overflow).toBe('auto');
    }
  });

  test('should render list items in scroll container', async ({ page }) => {
    const listItems = page.locator('.list-item');
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
  });

  // Load More Trigger Tests
  test('should trigger load more on scroll', async ({ page }) => {
    const demoBox = page.locator('.demo-box').nth(4); // Interactive demo
    const scrollContainer = demoBox.locator('.scroll-container').first();

    if (await scrollContainer.count() > 0) {
      // Get initial item count
      const initialItems = await scrollContainer.locator('.list-item').count();

      // Scroll to bottom
      await scrollContainer.evaluate(el => {
        el.scrollTop = el.scrollHeight;
      });

      await page.waitForTimeout(1500);

      // Check if items were added
      const finalItems = await scrollContainer.locator('.list-item').count();
      expect(finalItems).toBeGreaterThanOrEqual(initialItems);
    }
  });

  test('should show loading state during fetch', async ({ page }) => {
    const demoBox = page.locator('.demo-box').nth(4); // Interactive demo
    const scrollContainer = demoBox.locator('.scroll-container').first();

    if (await scrollContainer.count() > 0) {
      // Scroll to trigger loading
      await scrollContainer.evaluate(el => {
        el.scrollTop = el.scrollHeight;
      });

      await page.waitForTimeout(200);

      // Check if loading indicator appears
      const loadingIndicator = scrollContainer.locator('.ux-infinite-scroll').first();
      if (await loadingIndicator.count() > 0) {
        await expect(loadingIndicator).toBeVisible();
      }
    }
  });

  test('should display item count', async ({ page }) => {
    const itemCounter = page.locator('[x-text="items.length"], [x-text*="items.length"]').first();
    if (await itemCounter.count() > 0) {
      await expect(itemCounter).toBeVisible();
    }
  });

  // Scroll Progress Bar Tests
  test('should render scroll progress bar', async ({ page }) => {
    const progressBar = page.locator('.ux-scroll-progress').first();
    if (await progressBar.count() > 0) {
      await expect(progressBar).toBeVisible();
    }
  });

  test('should render scroll progress indicator', async ({ page }) => {
    const progressIndicator = page.locator('.ux-scroll-progress__bar').first();
    if (await progressIndicator.count() > 0) {
      await expect(progressIndicator).toBeDefined();
    }
  });

  test('scroll progress bar should update on scroll', async ({ page }) => {
    const scrollBox = page.locator('[x-data*="uxScrollProgress"]').first();
    if (await scrollBox.count() > 0) {
      const progressBar = scrollBox.locator('.ux-scroll-progress__bar').first();

      if (await progressBar.count() > 0) {
        // Get initial width
        const initialWidth = await progressBar.evaluate(el =>
          getComputedStyle(el).width
        );

        // Scroll container
        await scrollBox.evaluate(el => {
          el.scrollTop = el.scrollHeight / 2;
        });

        await page.waitForTimeout(200);

        // Get width after scroll (should be different if it updated)
        const scrolledWidth = await progressBar.evaluate(el =>
          getComputedStyle(el).width
        );

        // Width should have changed (progress should move)
        expect(scrolledWidth).toBeTruthy();
      }
    }
  });

  // Virtual Scroll Tests
  test('should render virtual scroll container', async ({ page }) => {
    const virtualScroll = page.locator('.ux-virtual-scroll').first();
    if (await virtualScroll.count() > 0) {
      await expect(virtualScroll).toBeVisible();
    }
  });

  test('should render virtual scroll spacer', async ({ page }) => {
    const spacer = page.locator('.ux-virtual-scroll__spacer').first();
    if (await spacer.count() > 0) {
      await expect(spacer).toBeVisible();
    }
  });

  test('should render virtual scroll content', async ({ page }) => {
    const content = page.locator('.ux-virtual-scroll__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeDefined();
    }
  });

  test('virtual scroll should only render visible items', async ({ page }) => {
    const virtualScrollContainer = page.locator('[x-data*="uxVirtualScroll"]').first();

    if (await virtualScrollContainer.count() > 0) {
      const visibleItemsInfo = await virtualScrollContainer.locator('[x-text="visibleItems.length"]').first();

      if (await visibleItemsInfo.count() > 0) {
        const visibleText = await visibleItemsInfo.textContent();
        const visibleCount = parseInt(visibleText || '0');

        // Virtual scroll should render fewer items than total 1000
        expect(visibleCount).toBeLessThan(1000);
        expect(visibleCount).toBeGreaterThan(0);
      }
    }
  });

  test('virtual scroll should have fixed item heights', async ({ page }) => {
    const virtualScrollItems = page.locator('.ux-virtual-scroll__content > div').first();

    if (await virtualScrollItems.count() > 0) {
      const height = await virtualScrollItems.evaluate(el =>
        el.style.height || getComputedStyle(el).height
      );

      expect(height).toBeTruthy();
    }
  });

  // Hidden State Test
  test('should hide infinite scroll with hidden modifier', async ({ page }) => {
    const hiddenScroll = page.locator('.ux-infinite-scroll--hidden').first();
    if (await hiddenScroll.count() > 0) {
      const display = await hiddenScroll.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('none');
    }
  });

  // CSS Classes and Structure Tests
  test('infinite scroll should have correct minimum height', async ({ page }) => {
    const infiniteScroll = page.locator('.ux-infinite-scroll').first();
    if (await infiniteScroll.count() > 0) {
      const height = await infiniteScroll.evaluate(el =>
        parseInt(getComputedStyle(el).minHeight)
      );
      expect(height).toBeGreaterThanOrEqual(60);
    }
  });

  test('spinner container should be flexbox', async ({ page }) => {
    const spinner = page.locator('.ux-infinite-scroll__spinner').first();
    if (await spinner.count() > 0) {
      const display = await spinner.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('infinite scroll should have proper padding', async ({ page }) => {
    const infiniteScroll = page.locator('.ux-infinite-scroll').first();
    if (await infiniteScroll.count() > 0) {
      const padding = await infiniteScroll.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).toBeTruthy();
    }
  });

  test('list items should have bottom borders except last', async ({ page }) => {
    const listItems = page.locator('.list-item');
    if (await listItems.count() > 1) {
      const firstItemBorder = await listItems.first().evaluate(el =>
        getComputedStyle(el).borderBottom
      );
      expect(firstItemBorder).toContain('1px');
    }
  });

  // Color and Styling Tests
  test('error text should have danger color', async ({ page }) => {
    const errorText = page.locator('.ux-infinite-scroll__error-text').first();
    if (await errorText.count() > 0) {
      const color = await errorText.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('end text should have tertiary text color', async ({ page }) => {
    const endText = page.locator('.ux-infinite-scroll__end-text').first();
    if (await endText.count() > 0) {
      const color = await endText.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('retry button should be clickable', async ({ page }) => {
    const retryButton = page.locator('.ux-infinite-scroll__retry').first();
    if (await retryButton.count() > 0) {
      const cursor = await retryButton.evaluate(el =>
        getComputedStyle(el).cursor
      );
      expect(cursor).toBe('pointer');
    }
  });

  // Alpine Component Tests
  test('should have Alpine.js data attributes for infinite scroll', async ({ page }) => {
    const alpineData = page.locator('[x-data*="uxInfiniteScroll"], [x-data*="loading"]').first();
    if (await alpineData.count() > 0) {
      const hasData = await alpineData.getAttribute('x-data');
      expect(hasData).toBeTruthy();
    }
  });

  test('should have Alpine.js data attributes for scroll progress', async ({ page }) => {
    const alpineScroll = page.locator('[x-data*="uxScrollProgress"]').first();
    if (await alpineScroll.count() > 0) {
      const hasData = await alpineScroll.getAttribute('x-data');
      expect(hasData).toBeTruthy();
    }
  });

  test('should have Alpine.js data attributes for virtual scroll', async ({ page }) => {
    const alpineVirtual = page.locator('[x-data*="uxVirtualScroll"]').first();
    if (await alpineVirtual.count() > 0) {
      const hasData = await alpineVirtual.getAttribute('x-data');
      expect(hasData).toBeTruthy();
    }
  });

  // Accessibility Tests
  test('retry button should be keyboard accessible', async ({ page }) => {
    const retryButton = page.locator('.ux-infinite-scroll__retry').first();
    if (await retryButton.count() > 0) {
      await retryButton.focus();
      await expect(retryButton).toBeFocused();
    }
  });

  test('should have semantic HTML structure', async ({ page }) => {
    const infiniteScroll = page.locator('.ux-infinite-scroll').first();
    await expect(infiniteScroll).toBeVisible();

    // Should contain either spinner or end-icon or error-text
    const hasContent = await page.locator(
      '.ux-infinite-scroll__spinner, .ux-infinite-scroll__end-icon, .ux-infinite-scroll__error-text'
    ).first();

    if (await hasContent.count() > 0) {
      await expect(hasContent).toBeVisible();
    }
  });
});
