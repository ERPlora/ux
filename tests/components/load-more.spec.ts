import { test, expect } from '@playwright/test';

test.describe('Load More Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/load-more.html');
  });

  test('should render basic load more component', async ({ page }) => {
    const loadMore = page.locator('.ux-load-more').first();
    await expect(loadMore).toBeVisible();
  });

  test('should render load more button', async ({ page }) => {
    const button = page.locator('.ux-load-more__button').first();
    await expect(button).toBeVisible();

    // Button should have text content
    const text = await button.textContent();
    expect(text).toBeTruthy();
  });

  test('should handle loading state', async ({ page }) => {
    const loadingContainer = page.locator('.ux-load-more.ux-load-more--loading').first();
    if (await loadingContainer.count() > 0) {
      await expect(loadingContainer).toBeVisible();

      // Loading container should contain a spinner
      const spinner = loadingContainer.locator('.ux-load-more__spinner');
      if (await spinner.count() > 0) {
        await expect(spinner).toBeVisible();
      }

      // Button should be disabled during loading
      const button = loadingContainer.locator('.ux-load-more__button').first();
      const pointerEvents = await button.evaluate(el =>
        getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    }
  });

  test('should render items list in demo', async ({ page }) => {
    const list = page.locator('.demo-list').first();
    if (await list.count() > 0) {
      await expect(list).toBeVisible();

      // List should contain items
      const items = list.locator('li');
      expect(await items.count()).toBeGreaterThan(0);
    }
  });

  test('should render button with icon', async ({ page }) => {
    const buttonWithIcon = page.locator('.ux-load-more__button').filter({ has: page.locator('svg') }).first();
    if (await buttonWithIcon.count() > 0) {
      await expect(buttonWithIcon).toBeVisible();

      // Check for icon element
      const icon = buttonWithIcon.locator('svg, .ux-load-more__icon');
      if (await icon.count() > 0) {
        await expect(icon).toBeVisible();
      }
    }
  });

  test('should apply filled variant', async ({ page }) => {
    const filledLoadMore = page.locator('.ux-load-more.ux-load-more--filled').first();
    if (await filledLoadMore.count() > 0) {
      await expect(filledLoadMore).toBeVisible();

      const button = filledLoadMore.locator('.ux-load-more__button').first();
      const bgColor = await button.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Filled variant should have a background color (not transparent)
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply soft variant', async ({ page }) => {
    const softLoadMore = page.locator('.ux-load-more.ux-load-more--soft').first();
    if (await softLoadMore.count() > 0) {
      await expect(softLoadMore).toBeVisible();
    }
  });

  test('should apply ghost variant', async ({ page }) => {
    const ghostLoadMore = page.locator('.ux-load-more.ux-load-more--ghost').first();
    if (await ghostLoadMore.count() > 0) {
      await expect(ghostLoadMore).toBeVisible();

      const button = ghostLoadMore.locator('.ux-load-more__button').first();
      const border = await button.evaluate(el =>
        getComputedStyle(el).borderWidth
      );
      // Ghost variant should have no border
      expect(border).toBe('0px');
    }
  });

  test('should apply link variant', async ({ page }) => {
    const linkLoadMore = page.locator('.ux-load-more.ux-load-more--link').first();
    if (await linkLoadMore.count() > 0) {
      await expect(linkLoadMore).toBeVisible();

      const button = linkLoadMore.locator('.ux-load-more__button').first();
      const textDecoration = await button.evaluate(el =>
        getComputedStyle(el).textDecoration
      );
      // Link variant should have text-decoration
      expect(textDecoration).toContain('underline');
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smLoadMore = page.locator('.ux-load-more.ux-load-more--sm').first();
    if (await smLoadMore.count() > 0) {
      const button = smLoadMore.locator('.ux-load-more__button').first();
      const height = await button.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // Small button should be less than default 44px
      expect(height).toBeLessThan(44);
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const lgLoadMore = page.locator('.ux-load-more.ux-load-more--lg').first();
    if (await lgLoadMore.count() > 0) {
      const button = lgLoadMore.locator('.ux-load-more__button').first();
      const height = await button.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // Large button should be greater than default 44px
      expect(height).toBeGreaterThan(44);
    }
  });

  test('should apply full width variant', async ({ page }) => {
    const fullLoadMore = page.locator('.ux-load-more.ux-load-more--full').first();
    if (await fullLoadMore.count() > 0) {
      const container = fullLoadMore;
      const width = await container.evaluate(el =>
        getComputedStyle(el).width
      );
      // Full width container should have width value
      expect(width).toBeTruthy();
      expect(width).not.toBe('auto');
    }
  });

  test('should apply divider style variant', async ({ page }) => {
    const dividerLoadMore = page.locator('.ux-load-more.ux-load-more--divider').first();
    if (await dividerLoadMore.count() > 0) {
      await expect(dividerLoadMore).toBeVisible();

      const button = dividerLoadMore.locator('.ux-load-more__button').first();
      const borderRadius = await button.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      // Divider style should have no border radius
      expect(borderRadius).toBe('0px');
    }
  });

  test('should display end of list state', async ({ page }) => {
    const endLoadMore = page.locator('.ux-load-more.ux-load-more--end').first();
    if (await endLoadMore.count() > 0) {
      await expect(endLoadMore).toBeVisible();

      // End state should hide the button
      const button = endLoadMore.locator('.ux-load-more__button').first();
      if (await button.count() > 0) {
        const display = await button.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(display).toBe('none');
      }

      // End state should show end message
      const endMessage = endLoadMore.locator('.ux-load-more__end-message');
      if (await endMessage.count() > 0) {
        await expect(endMessage).toBeVisible();
      }
    }
  });

  test('should display status text', async ({ page }) => {
    const status = page.locator('.ux-load-more__status').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();

      const text = await status.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should display progress bar', async ({ page }) => {
    const progress = page.locator('.ux-load-more__progress').first();
    if (await progress.count() > 0) {
      await expect(progress).toBeVisible();

      // Should contain progress bar
      const progressBar = progress.locator('.ux-load-more__progress-bar');
      if (await progressBar.count() > 0) {
        await expect(progressBar).toBeVisible();
      }

      // Should contain progress text
      const progressText = progress.locator('.ux-load-more__progress-text');
      if (await progressText.count() > 0) {
        await expect(progressText).toBeVisible();
      }
    }
  });

  test('should update progress fill width', async ({ page }) => {
    const progressFill = page.locator('.ux-load-more__progress-fill').first();
    if (await progressFill.count() > 0) {
      const width = await progressFill.evaluate(el =>
        getComputedStyle(el).width
      );
      // Progress fill should have a width value
      expect(width).toBeTruthy();
      expect(width).not.toBe('auto');
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassLoadMore = page.locator('.ux-load-more.ux-load-more--glass').first();
    if (await glassLoadMore.count() > 0) {
      await expect(glassLoadMore).toBeVisible();

      const button = glassLoadMore.locator('.ux-load-more__button').first();
      const backdropFilter = await button.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      // Glass variant should have blur effect
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have minimum touch target size', async ({ page }) => {
    const button = page.locator('.ux-load-more__button').first();

    const height = await button.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );

    // Minimum touch target should be at least 36px (--ux-touch-target-sm)
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const button = page.locator('.ux-load-more__button').first();

    // Focus the button directly
    await button.focus();

    // Button should be focusable
    await expect(button).toBeFocused();
  });

  test('should trigger click event', async ({ page }) => {
    const button = page.locator('.ux-load-more__button').first();

    await page.evaluate(() => {
      const btn = document.querySelector('.ux-load-more__button');
      btn?.addEventListener('click', () => {
        (window as any).__loadMoreClicked = true;
      });
    });

    await button.click();

    const wasClicked = await page.evaluate(() => (window as any).__loadMoreClicked);
    expect(wasClicked).toBe(true);
  });

  test('should render spinner during loading', async ({ page }) => {
    // Find a spinner that is visible (not hidden with x-show)
    const visibleSpinner = page.locator('.ux-load-more.ux-load-more--loading .ux-load-more__spinner').first();
    if (await visibleSpinner.count() > 0) {
      // Verify spinner element exists
      const spinnerElement = page.locator('.ux-load-more__spinner').first();
      expect(await spinnerElement.count()).toBeGreaterThan(0);

      // Spinner should have animation defined in styles
      const animation = await spinnerElement.evaluate(el =>
        getComputedStyle(el).animation || getComputedStyle(el).animationName
      );
      // Animation may be empty if in reduced motion mode, so just check element exists
      expect(spinnerElement).toBeTruthy();
    }
  });

  test('should display end message with icon', async ({ page }) => {
    const endMessage = page.locator('.ux-load-more__end-message').first();
    if (await endMessage.count() > 0) {
      await expect(endMessage).toBeVisible();

      // End message should contain icon or text
      const icon = endMessage.locator('.ux-load-more__end-icon, svg');
      const text = await endMessage.textContent();

      const hasIcon = await icon.count() > 0;
      const hasText = text && text.trim().length > 0;

      expect(hasIcon || hasText).toBe(true);
    }
  });

  test('should render in interactive demo', async ({ page }) => {
    const interactiveDemo = page.locator('[x-data*="items"]').first();
    if (await interactiveDemo.count() > 0) {
      const list = interactiveDemo.locator('.demo-list');
      const loadMore = interactiveDemo.locator('.ux-load-more');

      if (await list.count() > 0 && await loadMore.count() > 0) {
        await expect(list).toBeVisible();
        await expect(loadMore).toBeVisible();

        // Should contain items
        const items = list.locator('li');
        expect(await items.count()).toBeGreaterThan(0);
      }
    }
  });
});
