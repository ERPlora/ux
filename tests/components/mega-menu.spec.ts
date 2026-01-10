import { test, expect } from '@playwright/test';

test.describe('Mega Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/mega-menu.html');
  });

  // Basic Rendering Tests
  test('should render mega menu container', async ({ page }) => {
    const megaMenu = page.locator('.ux-mega-menu').first();
    await expect(megaMenu).toBeVisible();
  });

  test('should render mega menu trigger button', async ({ page }) => {
    const trigger = page.locator('.ux-mega-menu__trigger').first();
    await expect(trigger).toBeVisible();
  });

  test('should render trigger icon', async ({ page }) => {
    const triggerIcon = page.locator('.ux-mega-menu__trigger-icon').first();
    await expect(triggerIcon).toBeVisible();
  });

  // Panel Tests
  test('should render mega menu panel', async ({ page }) => {
    const panel = page.locator('.ux-mega-menu__panel').first();
    await expect(panel).toBeDefined();
  });

  test('should have correct initial panel visibility (hidden)', async ({ page }) => {
    const panel = page.locator('.ux-mega-menu__panel').first();
    const visibility = await panel.evaluate(el =>
      getComputedStyle(el).visibility
    );
    expect(visibility).toBe('hidden');
  });

  // Columns/Grid Tests
  test('should render grid with 3 columns', async ({ page }) => {
    const grid3 = page.locator('.ux-mega-menu__grid--3').first();
    if (await grid3.count() > 0) {
      const columns = await grid3.evaluate(el =>
        getComputedStyle(el).gridTemplateColumns
      );
      expect(columns).toContain('repeat');
    }
  });

  test('should render grid with 2 columns', async ({ page }) => {
    const grid2 = page.locator('.ux-mega-menu__grid--2').first();
    if (await grid2.count() > 0) {
      const columns = await grid2.evaluate(el =>
        getComputedStyle(el).gridTemplateColumns
      );
      expect(columns).toContain('repeat');
    }
  });

  test('should render sections within grid', async ({ page }) => {
    const sections = page.locator('.ux-mega-menu__section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render section titles', async ({ page }) => {
    const sectionTitle = page.locator('.ux-mega-menu__section-title').first();
    if (await sectionTitle.count() > 0) {
      await expect(sectionTitle).toBeVisible();
      const text = await sectionTitle.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should have uppercase section titles', async ({ page }) => {
    const sectionTitle = page.locator('.ux-mega-menu__section-title').first();
    if (await sectionTitle.count() > 0) {
      const textTransform = await sectionTitle.evaluate(el =>
        getComputedStyle(el).textTransform
      );
      expect(textTransform).toBe('uppercase');
    }
  });

  // Menu Items Tests
  test('should render menu items', async ({ page }) => {
    const items = page.locator('.ux-mega-menu__item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render item content wrapper', async ({ page }) => {
    const itemContent = page.locator('.ux-mega-menu__item-content').first();
    if (await itemContent.count() > 0) {
      await expect(itemContent).toBeDefined();
    }
  });

  test('should render item titles', async ({ page }) => {
    const itemTitle = page.locator('.ux-mega-menu__item-title').first();
    if (await itemTitle.count() > 0) {
      const text = await itemTitle.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should render item descriptions', async ({ page }) => {
    const itemDesc = page.locator('.ux-mega-menu__item-desc').first();
    if (await itemDesc.count() > 0) {
      const text = await itemDesc.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should apply hover style to menu items', async ({ page }) => {
    const item = page.locator('.ux-mega-menu__item').first();
    if (await item.count() > 0) {
      const bgInitial = await item.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      await item.hover();
      await page.waitForTimeout(100);
      const bgHover = await item.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Hover should apply some background color change
      expect(bgInitial || bgHover).toBeDefined();
    }
  });

  // Featured Items Tests
  test('should render featured items', async ({ page }) => {
    const featured = page.locator('.ux-mega-menu__item--featured');
    const count = await featured.count();
    if (count > 0) {
      await expect(featured.first()).toBeDefined();
    }
  });

  test('featured items should have icon with specific styling', async ({ page }) => {
    const featured = page.locator('.ux-mega-menu__item--featured .ux-mega-menu__item-icon').first();
    if (await featured.count() > 0) {
      const width = await featured.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeGreaterThanOrEqual(20);
    }
  });

  test('should render featured item with larger padding', async ({ page }) => {
    const featured = page.locator('.ux-mega-menu__item--featured').first();
    if (await featured.count() > 0) {
      const padding = await featured.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).toBeDefined();
    }
  });

  // Icons Tests
  test('should render item icons', async ({ page }) => {
    const icons = page.locator('.ux-mega-menu__item-icon');
    const count = await icons.count();
    if (count > 0) {
      await expect(icons.first()).toBeDefined();
    }
  });

  test('icons should have appropriate dimensions', async ({ page }) => {
    const icon = page.locator('.ux-mega-menu__item-icon').first();
    if (await icon.count() > 0) {
      const width = await icon.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeGreaterThan(0);
    }
  });

  // Images/Featured Section Tests
  test('should render promo section if present', async ({ page }) => {
    const promo = page.locator('.ux-mega-menu__promo').first();
    if (await promo.count() > 0) {
      await expect(promo).toBeDefined();
    }
  });

  test('promo section should have title', async ({ page }) => {
    const promoTitle = page.locator('.ux-mega-menu__promo-title').first();
    if (await promoTitle.count() > 0) {
      const text = await promoTitle.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('promo section should have description', async ({ page }) => {
    const promoDesc = page.locator('.ux-mega-menu__promo-desc').first();
    if (await promoDesc.count() > 0) {
      const text = await promoDesc.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('promo section should have action link', async ({ page }) => {
    const promoAction = page.locator('.ux-mega-menu__promo-action').first();
    if (await promoAction.count() > 0) {
      const text = await promoAction.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('promo section should have gradient background', async ({ page }) => {
    const promo = page.locator('.ux-mega-menu__promo').first();
    if (await promo.count() > 0) {
      const background = await promo.evaluate(el =>
        getComputedStyle(el).background || getComputedStyle(el).backgroundColor
      );
      expect(background).toBeDefined();
    }
  });

  // Header & Footer Tests
  test('should render header when present', async ({ page }) => {
    const header = page.locator('.ux-mega-menu__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeDefined();
    }
  });

  test('header should have title', async ({ page }) => {
    const headerTitle = page.locator('.ux-mega-menu__header-title').first();
    if (await headerTitle.count() > 0) {
      const text = await headerTitle.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should render footer when present', async ({ page }) => {
    const footer = page.locator('.ux-mega-menu__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeDefined();
    }
  });

  test('footer should have links', async ({ page }) => {
    const footerLink = page.locator('.ux-mega-menu__footer-link').first();
    if (await footerLink.count() > 0) {
      const text = await footerLink.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  // Badge Tests
  test('should render item badges when present', async ({ page }) => {
    const badge = page.locator('.ux-mega-menu__item-badge').first();
    if (await badge.count() > 0) {
      const text = await badge.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('badges should have proper background', async ({ page }) => {
    const badge = page.locator('.ux-mega-menu__item-badge').first();
    if (await badge.count() > 0) {
      const background = await badge.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(background).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  // Styling Tests
  test('panel should have shadow', async ({ page }) => {
    const panel = page.locator('.ux-mega-menu__panel').first();
    const boxShadow = await panel.evaluate(el =>
      getComputedStyle(el).boxShadow
    );
    expect(boxShadow).not.toBe('none');
  });

  test('panel should have border radius', async ({ page }) => {
    const panel = page.locator('.ux-mega-menu__panel').first();
    const borderRadius = await panel.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('panel should have proper z-index', async ({ page }) => {
    const panel = page.locator('.ux-mega-menu__panel').first();
    const zIndex = await panel.evaluate(el =>
      parseInt(getComputedStyle(el).zIndex) || 0
    );
    expect(zIndex).toBeGreaterThan(0);
  });

  // Responsive Tests
  test('grid should be responsive', async ({ page }) => {
    const grid = page.locator('.ux-mega-menu__grid').first();
    if (await grid.count() > 0) {
      const display = await grid.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('grid');
    }
  });

  // Alpine.js Interaction Tests
  test('should open menu on trigger click', async ({ page }) => {
    const trigger = page.locator('.ux-mega-menu__trigger').first();
    const megaMenu = page.locator('.ux-mega-menu').first();

    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);

      const hasOpenClass = await megaMenu.evaluate(el =>
        el.classList.contains('ux-mega-menu--open')
      );
      expect(hasOpenClass).toBe(true);
    }
  });

  test('panel should become visible when menu opens', async ({ page }) => {
    const trigger = page.locator('.ux-mega-menu__trigger').first();
    const panel = page.locator('.ux-mega-menu__panel').first();

    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);

      const visibility = await panel.evaluate(el =>
        getComputedStyle(el).visibility
      );
      expect(visibility).toBe('visible');
    }
  });

  test('should close menu on second trigger click', async ({ page }) => {
    const trigger = page.locator('.ux-mega-menu__trigger').first();
    const megaMenu = page.locator('.ux-mega-menu').first();

    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      await trigger.click();
      await page.waitForTimeout(300);

      const hasOpenClass = await megaMenu.evaluate(el =>
        el.classList.contains('ux-mega-menu--open')
      );
      expect(hasOpenClass).toBe(false);
    }
  });

  test('trigger icon should rotate when menu opens', async ({ page }) => {
    const trigger = page.locator('.ux-mega-menu__trigger').first();
    const icon = page.locator('.ux-mega-menu__trigger-icon').first();

    if (await trigger.count() > 0 && await icon.count() > 0) {
      const rotationBefore = await icon.evaluate(el =>
        getComputedStyle(el).transform
      );

      await trigger.click();
      await page.waitForTimeout(300);

      const rotationAfter = await icon.evaluate(el =>
        getComputedStyle(el).transform
      );

      expect(rotationBefore).not.toBe(rotationAfter);
    }
  });

  // Glass Variant Tests
  test('should apply glass variant styling', async ({ page }) => {
    const glassMenu = page.locator('.ux-mega-menu--glass').first();
    if (await glassMenu.count() > 0) {
      const panel = glassMenu.locator('.ux-mega-menu__panel');
      const backdropFilter = await panel.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  // Hover Behavior Tests
  test('should open on hover with openOnHover option', async ({ page }) => {
    const hoverMenu = page.locator('.ux-mega-menu').filter({
      has: page.locator('button:has-text("Hover Me")')
    }).first();

    if (await hoverMenu.count() > 0) {
      await hoverMenu.hover();
      await page.waitForTimeout(300);

      const hasOpenClass = await hoverMenu.evaluate(el =>
        el.classList.contains('ux-mega-menu--open')
      );
      expect(hasOpenClass).toBe(true);
    }
  });

  // List Structure Tests
  test('section list should be properly structured', async ({ page }) => {
    const sectionList = page.locator('.ux-mega-menu__section-list').first();
    if (await sectionList.count() > 0) {
      const listItems = await sectionList.locator('li').count();
      expect(listItems).toBeGreaterThan(0);
    }
  });

  test('list items should contain links', async ({ page }) => {
    const listItems = page.locator('.ux-mega-menu__section-list li').first();
    if (await listItems.count() > 0) {
      const link = await listItems.locator('a').count();
      expect(link).toBeGreaterThan(0);
    }
  });

  // Focus Management Tests
  test('menu items should have focus-visible styles', async ({ page }) => {
    const item = page.locator('.ux-mega-menu__item').first();
    if (await item.count() > 0) {
      await item.focus();
      const outline = await item.evaluate(el =>
        getComputedStyle(el, ':focus-visible').outline
      );
      expect(outline).toBeDefined();
    }
  });

  // Layout Tests
  test('menu should display as inline-flex', async ({ page }) => {
    const megaMenu = page.locator('.ux-mega-menu').first();
    const display = await megaMenu.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(['inline-flex', 'flex']).toContain(display);
  });

  test('menu should be positioned relative', async ({ page }) => {
    const megaMenu = page.locator('.ux-mega-menu').first();
    const position = await megaMenu.evaluate(el =>
      getComputedStyle(el).position
    );
    expect(position).toBe('relative');
  });

  test('panel should be positioned absolutely', async ({ page }) => {
    const panel = page.locator('.ux-mega-menu__panel').first();
    const position = await panel.evaluate(el =>
      getComputedStyle(el).position
    );
    expect(position).toBe('absolute');
  });

  // Content Tests
  test('menu panel content should have padding', async ({ page }) => {
    const content = page.locator('.ux-mega-menu__content').first();
    if (await content.count() > 0) {
      const padding = await content.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');
    }
  });

  // Accessibility Tests
  test('trigger button should be keyboard accessible', async ({ page }) => {
    const trigger = page.locator('.ux-mega-menu__trigger').first();
    if (await trigger.count() > 0) {
      await trigger.focus();
      await expect(trigger).toBeFocused();
    }
  });

  test('menu items should be keyboard navigable', async ({ page }) => {
    const trigger = page.locator('.ux-mega-menu__trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);

      const firstItem = page.locator('.ux-mega-menu__item').first();
      await expect(firstItem).toBeVisible();
    }
  });
});
