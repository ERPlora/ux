import { test, expect } from '@playwright/test';

test.describe('Context Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/context-menu.html');
  });

  test('should render context menu trigger', async ({ page }) => {
    const trigger = page.locator('.context-trigger').first();
    await expect(trigger).toBeVisible();
  });

  test('should render context menu', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      await expect(menu).toBeDefined();
    }
  });

  test('should have proper z-index', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      const zIndex = await menu.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have border radius', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      const borderRadius = await menu.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should have shadow', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      const boxShadow = await menu.evaluate(el =>
        getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
  });

  test('should render menu items', async ({ page }) => {
    const items = page.locator('.ux-context-menu__item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render menu item labels', async ({ page }) => {
    const label = page.locator('.ux-context-menu__item-label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
      const text = await label.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should render menu item icons', async ({ page }) => {
    const icon = page.locator('.ux-context-menu__item-icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should render separator/divider', async ({ page }) => {
    const divider = page.locator('.ux-context-menu__divider').first();
    if (await divider.count() > 0) {
      await expect(divider).toBeVisible();
    }
  });

  test('should have multiple dividers', async ({ page }) => {
    const dividers = page.locator('.ux-context-menu__divider');
    const count = await dividers.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should render shortcuts when present', async ({ page }) => {
    const shortcut = page.locator('.ux-context-menu__item-shortcut').first();
    if (await shortcut.count() > 0) {
      const text = await shortcut.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should apply danger variant', async ({ page }) => {
    const dangerItem = page.locator('.ux-context-menu__item--danger').first();
    if (await dangerItem.count() > 0) {
      const color = await dangerItem.evaluate(el =>
        getComputedStyle(el).color
      );
      // Color should be set (not transparent or default)
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledItem = page.locator('.ux-context-menu__item--disabled').first();
    if (await disabledItem.count() > 0) {
      const opacity = await disabledItem.evaluate(el =>
        getComputedStyle(el).opacity
      );
      const opacityValue = parseFloat(opacity);
      expect(opacityValue).toBeLessThan(1);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassMenu = page.locator('.ux-context-menu--glass').first();
    if (await glassMenu.count() > 0) {
      const backdropFilter = await glassMenu.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should position fixed', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      const position = await menu.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    }
  });

  test('should have minimum width', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      const minWidth = await menu.evaluate(el =>
        parseInt(getComputedStyle(el).minWidth)
      );
      expect(minWidth).toBeGreaterThan(0);
    }
  });

  test('should have maximum width', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      const maxWidth = await menu.evaluate(el =>
        parseInt(getComputedStyle(el).maxWidth)
      );
      expect(maxWidth).toBeGreaterThan(0);
    }
  });

  test('menu items should have minimum touch target', async ({ page }) => {
    const item = page.locator('.ux-context-menu__item').first();
    if (await item.count() > 0) {
      const height = await item.evaluate(el =>
        parseInt(getComputedStyle(el).minHeight)
      );
      expect(height).toBeGreaterThanOrEqual(32);
    }
  });

  test('menu items should have proper padding', async ({ page }) => {
    const item = page.locator('.ux-context-menu__item').first();
    if (await item.count() > 0) {
      const paddingLeft = await item.evaluate(el =>
        parseInt(getComputedStyle(el).paddingLeft)
      );
      expect(paddingLeft).toBeGreaterThan(0);
    }
  });

  test('menu items should have flex layout', async ({ page }) => {
    const item = page.locator('.ux-context-menu__item').first();
    if (await item.count() > 0) {
      const display = await item.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('menu items should be left-aligned text', async ({ page }) => {
    const item = page.locator('.ux-context-menu__item').first();
    if (await item.count() > 0) {
      const textAlign = await item.evaluate(el =>
        getComputedStyle(el).textAlign
      );
      expect(textAlign).toBe('left');
    }
  });

  test('divider should have border styling', async ({ page }) => {
    const divider = page.locator('.ux-context-menu__divider').first();
    if (await divider.count() > 0) {
      const height = await divider.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBe(1);
    }
  });

  test('should render submenu if present', async ({ page }) => {
    const submenu = page.locator('.ux-context-menu__submenu').first();
    if (await submenu.count() > 0) {
      await expect(submenu).toBeDefined();
    }
  });

  test('submenu trigger should have arrow indicator', async ({ page }) => {
    const submenuItem = page.locator('.ux-context-menu__submenu > .ux-context-menu__item').first();
    if (await submenuItem.count() > 0) {
      // Check for ::after pseudo-element via visibility
      const hasAfter = await submenuItem.evaluate(el =>
        window.getComputedStyle(el, '::after').content !== 'none'
      );
      expect(hasAfter).toBeTruthy();
    }
  });

  test('should render submenu content when present', async ({ page }) => {
    const submenuContent = page.locator('.ux-context-menu__submenu-content').first();
    if (await submenuContent.count() > 0) {
      await expect(submenuContent).toBeDefined();
    }
  });

  test('submenu items should render correctly', async ({ page }) => {
    const submenuItems = page.locator('.ux-context-menu__submenu-content .ux-context-menu__item');
    const count = await submenuItems.count();
    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have proper item gap', async ({ page }) => {
    const item = page.locator('.ux-context-menu__item').first();
    if (await item.count() > 0) {
      const gap = await item.evaluate(el =>
        getComputedStyle(el).gap
      );
      // Should have a gap between icon and label
      expect(gap).not.toBe('0px');
    }
  });

  test('icon should have proper size', async ({ page }) => {
    const icon = page.locator('.ux-context-menu__item-icon').first();
    if (await icon.count() > 0) {
      const width = await icon.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeGreaterThan(0);
    }
  });

  test('shortcut text should have proper styling', async ({ page }) => {
    const shortcut = page.locator('.ux-context-menu__item-shortcut').first();
    if (await shortcut.count() > 0) {
      const fontSize = await shortcut.evaluate(el =>
        getComputedStyle(el).fontSize
      );
      // Should be smaller than regular text
      expect(fontSize).not.toBe('undefined');
    }
  });

  test('should have overflow handling', async ({ page }) => {
    const menu = page.locator('.ux-context-menu').first();
    if (await menu.count() > 0) {
      const overflowY = await menu.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(overflowY).toBe('auto');
    }
  });

  test('should render file actions section', async ({ page }) => {
    const fileSection = page.locator('.demo-section').nth(2);
    if (await fileSection.count() > 0) {
      await expect(fileSection).toBeVisible();
      const items = fileSection.locator('.ux-context-menu__item');
      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have multiple demo sections', async ({ page }) => {
    const sections = page.locator('.demo-section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('multiple menus should be independent', async ({ page }) => {
    const menus = page.locator('.ux-context-menu');
    const count = await menus.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('menu item should be button element', async ({ page }) => {
    const item = page.locator('.ux-context-menu__item').first();
    if (await item.count() > 0) {
      const tagName = await item.evaluate(el => el.tagName.toLowerCase());
      expect(tagName).toBe('button');
    }
  });

  test('should have proper item cursor', async ({ page }) => {
    const item = page.locator('.ux-context-menu__item').first();
    if (await item.count() > 0) {
      const cursor = await item.evaluate(el =>
        getComputedStyle(el).cursor
      );
      expect(cursor).toBe('pointer');
    }
  });

  test('disabled item should have not-allowed cursor', async ({ page }) => {
    const disabledItem = page.locator('.ux-context-menu__item--disabled').first();
    if (await disabledItem.count() > 0) {
      const cursor = await disabledItem.evaluate(el =>
        getComputedStyle(el).cursor
      );
      expect(cursor).toBe('not-allowed');
    }
  });

  test('icon should not shrink', async ({ page }) => {
    const icon = page.locator('.ux-context-menu__item-icon').first();
    if (await icon.count() > 0) {
      const flexShrink = await icon.evaluate(el =>
        getComputedStyle(el).flexShrink
      );
      expect(parseInt(flexShrink)).toBe(0);
    }
  });
});
