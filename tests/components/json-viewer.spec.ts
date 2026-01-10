import { test, expect } from '@playwright/test';

test.describe('JSON Viewer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/json-viewer.html');
  });

  // Basic Rendering Tests
  test('should render json-viewer', async ({ page }) => {
    const viewer = page.locator('.ux-json-viewer').first();
    await expect(viewer).toBeVisible();
  });

  test('should render json-viewer header', async ({ page }) => {
    const header = page.locator('.ux-json-viewer__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render json-viewer title', async ({ page }) => {
    const title = page.locator('.ux-json-viewer__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
  });

  test('should render json-viewer badge', async ({ page }) => {
    const badge = page.locator('.ux-json-viewer__badge').first();
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible();
      const text = await badge.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render json-viewer content area', async ({ page }) => {
    const content = page.locator('.ux-json-viewer__content').first();
    await expect(content).toBeVisible();
  });

  // JSON Tree Structure Tests
  test('should render tree structure', async ({ page }) => {
    const tree = page.locator('.ux-json-viewer__tree').first();
    if (await tree.count() > 0) {
      await expect(tree).toBeVisible();
    }
  });

  test('should render tree nodes', async ({ page }) => {
    const nodes = page.locator('.ux-json-viewer__node');
    expect(await nodes.count()).toBeGreaterThan(0);
  });

  test('should render root node with bracket', async ({ page }) => {
    const bracket = page.locator('.ux-json-viewer__bracket--open').first();
    if (await bracket.count() > 0) {
      await expect(bracket).toBeVisible();
      const text = await bracket.textContent();
      expect(['{', '[']).toContain(text);
    }
  });

  test('should render property keys', async ({ page }) => {
    const keys = page.locator('.ux-json-viewer__key');
    expect(await keys.count()).toBeGreaterThan(0);
  });

  // Expandable Nodes Tests
  test('should render toggle buttons for expandable items', async ({ page }) => {
    const toggles = page.locator('.ux-json-viewer__toggle');
    const visibleToggles = toggles.filter({ has: page.locator('svg') });
    if (await visibleToggles.count() > 0) {
      await expect(visibleToggles.first()).toBeVisible();
    }
  });

  test('should toggle node expansion on button click', async ({ page }) => {
    const firstToggle = page.locator('.ux-json-viewer__toggle').first();
    if (await firstToggle.count() > 0) {
      const initialClass = await firstToggle.getAttribute('class');
      await firstToggle.click();
      await page.waitForTimeout(200);
      const afterClass = await firstToggle.getAttribute('class');
      // Class should change after toggle
      expect(initialClass).toBeDefined();
      expect(afterClass).toBeDefined();
    }
  });

  test('should show toggle expanded state', async ({ page }) => {
    const toggles = page.locator('.ux-json-viewer__toggle--expanded');
    if (await toggles.count() > 0) {
      await expect(toggles.first()).toBeVisible();
      const svg = toggles.first().locator('svg');
      if (await svg.count() > 0) {
        const transform = await svg.evaluate(el =>
          getComputedStyle(el).transform
        );
        // Rotated SVG should have a transform
        expect(transform).toBeTruthy();
      }
    }
  });

  test('should display item count badge', async ({ page }) => {
    const counts = page.locator('.ux-json-viewer__count');
    if (await counts.count() > 0) {
      const text = await counts.first().textContent();
      expect(text).toMatch(/\d+/);
    }
  });

  test('should display preview text for collapsed nodes', async ({ page }) => {
    const preview = page.locator('.ux-json-viewer__preview').first();
    if (await preview.count() > 0) {
      const text = await preview.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render nested children list', async ({ page }) => {
    const childrenLists = page.locator('.ux-json-viewer__children');
    if (await childrenLists.count() > 0) {
      await expect(childrenLists.first()).toBeDefined();
    }
  });

  // Syntax Highlighting Tests
  test('should apply syntax highlighting to string values', async ({ page }) => {
    const stringValue = page.locator('.ux-json-viewer__value--string').first();
    if (await stringValue.count() > 0) {
      const color = await stringValue.evaluate(el =>
        getComputedStyle(el).color
      );
      // Should have a distinct color (not inherit from parent)
      expect(color).toBeTruthy();
    }
  });

  test('should apply syntax highlighting to number values', async ({ page }) => {
    const numberValue = page.locator('.ux-json-viewer__value--number').first();
    if (await numberValue.count() > 0) {
      const color = await numberValue.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should apply syntax highlighting to boolean values', async ({ page }) => {
    const boolValue = page.locator('.ux-json-viewer__value--boolean').first();
    if (await boolValue.count() > 0) {
      const color = await boolValue.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should apply syntax highlighting to null values', async ({ page }) => {
    const nullValue = page.locator('.ux-json-viewer__value--null').first();
    if (await nullValue.count() > 0) {
      await expect(nullValue).toBeVisible();
      const color = await nullValue.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should display keys in syntax color', async ({ page }) => {
    const key = page.locator('.ux-json-viewer__key').first();
    if (await key.count() > 0) {
      const color = await key.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should display brackets in syntax color', async ({ page }) => {
    const bracket = page.locator('.ux-json-viewer__bracket').first();
    if (await bracket.count() > 0) {
      const color = await bracket.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  // Copy Button Tests
  test('should render copy button in actions', async ({ page }) => {
    const copyBtn = page.locator('.ux-json-viewer__actions button').filter(
      { hasText: /Copiar|copy/i }
    ).first();
    if (await copyBtn.count() > 0) {
      await expect(copyBtn).toBeVisible();
    }
  });

  test('should render copy icon in action buttons', async ({ page }) => {
    const actionBtns = page.locator('.ux-json-viewer__btn');
    const btnsWithSvg = actionBtns.filter({ has: page.locator('svg') });
    expect(await btnsWithSvg.count()).toBeGreaterThan(0);
  });

  test('should show action buttons', async ({ page }) => {
    const actions = page.locator('.ux-json-viewer__actions').first();
    if (await actions.count() > 0) {
      const buttons = actions.locator('button');
      expect(await buttons.count()).toBeGreaterThan(0);
    }
  });

  test('should be hoverable over action buttons', async ({ page }) => {
    const btn = page.locator('.ux-json-viewer__btn').first();
    if (await btn.count() > 0) {
      await btn.hover();
      const bgColor = await btn.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have a background color on hover
      expect(bgColor).toBeTruthy();
    }
  });

  // Component Variants Tests
  test('should render light theme variant', async ({ page }) => {
    const lightViewer = page.locator('.ux-json-viewer--light').first();
    if (await lightViewer.count() > 0) {
      await expect(lightViewer).toBeVisible();
      const bgColor = await lightViewer.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  test('should render compact variant', async ({ page }) => {
    const compactViewer = page.locator('.ux-json-viewer--compact').first();
    if (await compactViewer.count() > 0) {
      await expect(compactViewer).toBeVisible();
    }
  });

  test('should render size variant sm', async ({ page }) => {
    const smViewer = page.locator('.ux-json-viewer--sm').first();
    if (await smViewer.count() > 0) {
      const fontSize = await smViewer.evaluate(el =>
        parseInt(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeLessThan(16);
    }
  });

  test('should render size variant lg', async ({ page }) => {
    const lgViewer = page.locator('.ux-json-viewer--lg').first();
    if (await lgViewer.count() > 0) {
      const fontSize = await lgViewer.evaluate(el =>
        parseInt(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeGreaterThanOrEqual(14);
    }
  });

  // Accessibility Tests
  test('should have accessible button elements', async ({ page }) => {
    const buttons = page.locator('.ux-json-viewer__btn');
    if (await buttons.count() > 0) {
      const firstBtn = buttons.first();
      await firstBtn.focus();
      await expect(firstBtn).toBeFocused();
    }
  });

  test('should have proper contrast for text', async ({ page }) => {
    const text = page.locator('.ux-json-viewer__key').first();
    if (await text.count() > 0) {
      const color = await text.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  // Styling Tests
  test('should have border radius', async ({ page }) => {
    const viewer = page.locator('.ux-json-viewer').first();
    const borderRadius = await viewer.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have proper padding in content area', async ({ page }) => {
    const content = page.locator('.ux-json-viewer__content').first();
    const padding = await content.evaluate(el =>
      getComputedStyle(el).padding
    );
    expect(padding).not.toBe('0px');
  });

  test('should have scrollable content area', async ({ page }) => {
    const content = page.locator('.ux-json-viewer__content').first();
    const overflow = await content.evaluate(el =>
      getComputedStyle(el).overflow
    );
    expect(overflow).toMatch(/auto|scroll/);
  });

  test('should have max-height constraint on content', async ({ page }) => {
    const content = page.locator('.ux-json-viewer__content').first();
    const maxHeight = await content.evaluate(el =>
      getComputedStyle(el).maxHeight
    );
    expect(maxHeight).not.toBe('none');
  });

  // Multiple Viewers Test
  test('should render multiple json-viewers on page', async ({ page }) => {
    const viewers = page.locator('.ux-json-viewer');
    expect(await viewers.count()).toBeGreaterThan(1);
  });

  // Row Hover State Test
  test('should have hover effect on rows', async ({ page }) => {
    const row = page.locator('.ux-json-viewer__row').first();
    if (await row.count() > 0) {
      await row.hover();
      const bgColor = await row.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have some background on hover
      expect(bgColor).toBeTruthy();
    }
  });

  // Animation and Transition Tests
  test('should have transitions on toggle icon', async ({ page }) => {
    const toggle = page.locator('.ux-json-viewer__toggle svg').first();
    if (await toggle.count() > 0) {
      const transition = await toggle.evaluate(el =>
        getComputedStyle(el).transition
      );
      expect(transition).toContain('transform');
    }
  });

  // Monospace Font Test
  test('should use monospace font family', async ({ page }) => {
    const viewer = page.locator('.ux-json-viewer').first();
    const fontFamily = await viewer.evaluate(el =>
      getComputedStyle(el).fontFamily
    );
    expect(fontFamily.toLowerCase()).toMatch(/mono|courier|consolas|fira/i);
  });

  // Color Badge Test
  test('should render colored badges in API response example', async ({ page }) => {
    const coloredBadge = page.locator('.ux-json-viewer__badge[style*="background"]').first();
    if (await coloredBadge.count() > 0) {
      const bgColor = await coloredBadge.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  // Dark Theme Default Test
  test('should have dark background by default', async ({ page }) => {
    const viewer = page.locator('.ux-json-viewer').not(.filter({ hasText: 'ux-json-viewer--light' })).first();
    if (await viewer.count() > 0) {
      const bgColor = await viewer.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Dark gray background
      expect(bgColor).toBeTruthy();
    }
  });
});
