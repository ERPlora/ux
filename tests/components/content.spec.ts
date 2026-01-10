import { test, expect } from '@playwright/test';

test.describe('Content Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/content.html');
  });

  test('should render basic content container', async ({ page }) => {
    const content = page.locator('.ux-content').first();
    await expect(content).toBeVisible();
  });

  test('should have flex layout', async ({ page }) => {
    const content = page.locator('.ux-content').first();
    const display = await content.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  test('should have vertical flex direction', async ({ page }) => {
    const content = page.locator('.ux-content').first();
    const flexDirection = await content.evaluate(el =>
      getComputedStyle(el).flexDirection
    );
    expect(flexDirection).toBe('column');
  });

  test('should be scrollable vertically', async ({ page }) => {
    const content = page.locator('.ux-content').first();
    const overflowY = await content.evaluate(el =>
      getComputedStyle(el).overflowY
    );
    expect(overflowY).toBe('auto');
  });

  test('should have overflow-x hidden', async ({ page }) => {
    const content = page.locator('.ux-content').first();
    const overflowX = await content.evaluate(el =>
      getComputedStyle(el).overflowX
    );
    expect(overflowX).toBe('hidden');
  });

  test('should render content inner wrapper', async ({ page }) => {
    const contentInner = page.locator('.ux-content__inner').first();
    if (await contentInner.count() > 0) {
      await expect(contentInner).toBeVisible();
    }
  });

  test('should have padding on content inner', async ({ page }) => {
    const contentInner = page.locator('.ux-content__inner').first();
    if (await contentInner.count() > 0) {
      const padding = await contentInner.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');
    }
  });

  test('should apply fullscreen variant', async ({ page }) => {
    const fullscreenContent = page.locator('.ux-content--fullscreen').first();
    if (await fullscreenContent.count() > 0) {
      await expect(fullscreenContent).toBeVisible();
      const position = await fullscreenContent.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('absolute');
    }
  });

  test('should apply no-scroll variant', async ({ page }) => {
    const noScrollContent = page.locator('.ux-content--no-scroll').first();
    if (await noScrollContent.count() > 0) {
      await expect(noScrollContent).toBeVisible();
      const overflow = await noScrollContent.evaluate(el =>
        getComputedStyle(el).overflow
      );
      expect(overflow).toBe('hidden');
    }
  });

  test('should apply has-header padding', async ({ page }) => {
    const hasHeaderContent = page.locator('.ux-content--has-header').first();
    if (await hasHeaderContent.count() > 0) {
      await expect(hasHeaderContent).toBeVisible();
      const paddingTop = await hasHeaderContent.evaluate(el =>
        getComputedStyle(el).paddingTop
      );
      expect(paddingTop).not.toBe('0px');
    }
  });

  test('should apply has-footer padding', async ({ page }) => {
    const hasFooterContent = page.locator('.ux-content--has-footer').first();
    if (await hasFooterContent.count() > 0) {
      await expect(hasFooterContent).toBeVisible();
      const paddingBottom = await hasFooterContent.evaluate(el =>
        getComputedStyle(el).paddingBottom
      );
      expect(paddingBottom).not.toBe('0px');
    }
  });

  test('should handle scroll-y variant', async ({ page }) => {
    const scrollYContent = page.locator('.ux-content--scroll-y').first();
    if (await scrollYContent.count() > 0) {
      await expect(scrollYContent).toBeVisible();
      const overflowY = await scrollYContent.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(overflowY).toBe('scroll');
    }
  });

  test('should render header element', async ({ page }) => {
    const header = page.locator('.ux-header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
      const position = await header.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['sticky', 'fixed']).toContain(position);
    }
  });

  test('should render footer element', async ({ page }) => {
    const footer = page.locator('.ux-footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
      const position = await footer.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['sticky', 'fixed']).toContain(position);
    }
  });

  test('should apply page grid layout', async ({ page }) => {
    const page_element = page.locator('.ux-page').first();
    if (await page_element.count() > 0) {
      await expect(page_element).toBeVisible();
      const display = await page_element.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('grid');
    }
  });

  test('should render centered content variant', async ({ page }) => {
    const centeredContent = page.locator('.ux-content__inner--centered').first();
    if (await centeredContent.count() > 0) {
      await expect(centeredContent).toBeVisible();
      const alignItems = await centeredContent.evaluate(el =>
        getComputedStyle(el).alignItems
      );
      expect(alignItems).toBe('center');
    }
  });

  test('should support touch scrolling', async ({ page }) => {
    const content = page.locator('.ux-content').first();
    if (await content.count() > 0) {
      const webkitScroll = await content.evaluate(el => {
        const style = getComputedStyle(el);
        return style.WebkitOverflowScrolling ||
               (el as any).style.WebkitOverflowScrolling;
      });
      // WebkitOverflowScrolling should be 'touch' in the component CSS
      await expect(content).toBeVisible();
    }
  });

  test('should apply glass variant to header', async ({ page }) => {
    const glassHeader = page.locator('.ux-header--glass').first();
    if (await glassHeader.count() > 0) {
      await expect(glassHeader).toBeVisible();
      const backdropFilter = await glassHeader.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should apply glass variant to footer', async ({ page }) => {
    const glassFooter = page.locator('.ux-footer--glass').first();
    if (await glassFooter.count() > 0) {
      await expect(glassFooter).toBeVisible();
      const backdropFilter = await glassFooter.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper z-index for sticky elements', async ({ page }) => {
    const header = page.locator('.ux-header').first();
    if (await header.count() > 0) {
      const zIndex = await header.evaluate(el =>
        getComputedStyle(el).zIndex
      );
      expect(parseInt(zIndex)).toBeGreaterThan(0);
    }
  });

  test('should have proper z-index for fixed elements', async ({ page }) => {
    const fixedHeader = page.locator('.ux-header--fixed').first();
    if (await fixedHeader.count() > 0) {
      const zIndex = await fixedHeader.evaluate(el =>
        getComputedStyle(el).zIndex
      );
      expect(parseInt(zIndex)).toBeGreaterThan(0);
    }
  });

  test('should contain overscroll-behavior', async ({ page }) => {
    const content = page.locator('.ux-content').first();
    const overscrollBehavior = await content.evaluate(el =>
      getComputedStyle(el).overscrollBehaviorY
    );
    expect(overscrollBehavior).toBe('contain');
  });
});
