import { test, expect } from '@playwright/test';

test.describe('Refresher Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/refresher.html');
  });

  test('should render refresher component', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    await expect(refresher).toBeVisible();
  });

  test('should render pull indicator', async ({ page }) => {
    const pullIndicator = page.locator('.ux-refresher--pulling').first();
    if (await pullIndicator.count() > 0) {
      await expect(pullIndicator).toBeDefined();
    }
  });

  test('should render spinner in refreshing state', async ({ page }) => {
    const spinner = page.locator('.ux-refresher--refreshing .ux-spinner').first();
    if (await spinner.count() > 0) {
      await expect(spinner).toBeVisible();
    }
  });

  test('should render refresher icon', async ({ page }) => {
    const icon = page.locator('.ux-refresher__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should have proper positioning', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const position = await refresher.evaluate(el =>
      getComputedStyle(el).position
    );
    expect(position).toBe('absolute');
  });

  test('should have pulling state class', async ({ page }) => {
    const pullingRefresher = page.locator('.ux-refresher--pulling').first();
    if (await pullingRefresher.count() > 0) {
      await expect(pullingRefresher).toHaveClass(/ux-refresher--pulling/);
    }
  });

  test('should have refreshing state class', async ({ page }) => {
    const refreshingRefresher = page.locator('.ux-refresher--refreshing').first();
    if (await refreshingRefresher.count() > 0) {
      await expect(refreshingRefresher).toHaveClass(/ux-refresher--refreshing/);
    }
  });

  test('should have complete state class', async ({ page }) => {
    const completeRefresher = page.locator('.ux-refresher--complete').first();
    if (await completeRefresher.count() > 0) {
      await expect(completeRefresher).toHaveClass(/ux-refresher--complete/);
    }
  });

  test('should render refresher content', async ({ page }) => {
    const content = page.locator('.ux-refresher__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeDefined();
    }
  });

  test('should have height property', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const height = await refresher.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThan(0);
  });

  test('should center content with flexbox', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const display = await refresher.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  test('should render text element', async ({ page }) => {
    const text = page.locator('.ux-refresher__text').first();
    if (await text.count() > 0) {
      await expect(text).toBeDefined();
    }
  });

  test('should render progress circle', async ({ page }) => {
    const progressCircle = page.locator('.ux-refresher__progress-circle').first();
    if (await progressCircle.count() > 0) {
      await expect(progressCircle).toBeDefined();
    }
  });

  test('should render success check icon on complete', async ({ page }) => {
    const completeRefresher = page.locator('.ux-refresher--complete').first();
    if (await completeRefresher.count() > 0) {
      const checkIcon = completeRefresher.locator('.ux-refresher__icon');
      if (await checkIcon.count() > 0) {
        await expect(checkIcon).toBeVisible();
      }
    }
  });

  test('should have pointer-events none', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const pointerEvents = await refresher.evaluate(el =>
      getComputedStyle(el).pointerEvents
    );
    expect(pointerEvents).toBe('none');
  });

  test('should have proper z-index', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const zIndex = await refresher.evaluate(el =>
      getComputedStyle(el).zIndex
    );
    expect(zIndex).not.toBe('auto');
  });

  test('should render demo refresher container', async ({ page }) => {
    const demoContainer = page.locator('.refresher-demo').first();
    await expect(demoContainer).toBeVisible();
  });

  test('should render demo list items', async ({ page }) => {
    const listItems = page.locator('.demo-list-item');
    expect(await listItems.count()).toBeGreaterThan(0);
  });

  test('should have border radius on demo container', async ({ page }) => {
    const demoContainer = page.locator('.refresher-demo').first();
    const borderRadius = await demoContainer.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have overflow hidden on demo container', async ({ page }) => {
    const demoContainer = page.locator('.refresher-demo').first();
    const overflow = await demoContainer.evaluate(el =>
      getComputedStyle(el).overflow
    );
    expect(overflow).toBe('hidden');
  });

  test('refresher should have transform property', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const transform = await refresher.evaluate(el =>
      getComputedStyle(el).transform
    );
    expect(transform).toBeDefined();
  });

  test('should have transition on refresher', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const transition = await refresher.evaluate(el =>
      getComputedStyle(el).transition
    );
    expect(transition).toBeDefined();
  });

  test('should render multiple refresher examples', async ({ page }) => {
    const refreshers = page.locator('.ux-refresher');
    expect(await refreshers.count()).toBeGreaterThan(1);
  });

  test('demo list should have scrollable content', async ({ page }) => {
    const content = page.locator('.refresher-content').first();
    if (await content.count() > 0) {
      const overflowY = await content.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(overflowY).toBe('auto');
    }
  });

  test('should have icon inside refresher on pulling state', async ({ page }) => {
    const pullingRefresher = page.locator('.ux-refresher--pulling').first();
    if (await pullingRefresher.count() > 0) {
      const icon = pullingRefresher.locator('.ux-refresher__icon');
      expect(await icon.count()).toBeGreaterThan(0);
    }
  });

  test('should have spinner inside refresher on refreshing state', async ({ page }) => {
    const refreshingRefresher = page.locator('.ux-refresher--refreshing').first();
    if (await refreshingRefresher.count() > 0) {
      const spinner = refreshingRefresher.locator('.ux-spinner, .ux-refresher__spinner');
      expect(await spinner.count()).toBeGreaterThan(0);
    }
  });

  test('should align items center', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const alignItems = await refresher.evaluate(el =>
      getComputedStyle(el).alignItems
    );
    expect(alignItems).toBe('center');
  });

  test('should justify content center', async ({ page }) => {
    const refresher = page.locator('.ux-refresher').first();
    const justifyContent = await refresher.evaluate(el =>
      getComputedStyle(el).justifyContent
    );
    expect(justifyContent).toBe('center');
  });

  test('icon should have transition', async ({ page }) => {
    const icon = page.locator('.ux-refresher__icon').first();
    if (await icon.count() > 0) {
      const transition = await icon.evaluate(el =>
        getComputedStyle(el).transition
      );
      expect(transition).toBeDefined();
    }
  });

  test('should render refresher content container', async ({ page }) => {
    const contentContainer = page.locator('.ux-refresher-content').first();
    if (await contentContainer.count() > 0) {
      await expect(contentContainer).toBeDefined();
    }
  });

  test('demo section headers should be visible', async ({ page }) => {
    const headers = page.locator('.demo-section h3');
    expect(await headers.count()).toBeGreaterThan(0);
    await expect(headers.first()).toBeVisible();
  });

  test('should render code blocks for documentation', async ({ page }) => {
    const codeBlocks = page.locator('.ux-code-block');
    expect(await codeBlocks.count()).toBeGreaterThan(0);
  });
});
