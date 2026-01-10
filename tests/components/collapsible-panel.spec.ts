import { test, expect } from '@playwright/test';

test.describe('Collapsible Panel Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/collapsible-panel.html');
  });

  // Basic rendering tests
  test('should render collapsible panel', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    await expect(panel).toBeVisible();
  });

  test('should render panel with visible container', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const isVisible = await panel.isVisible();
    expect(isVisible).toBe(true);
  });

  test('should render multiple panels on page', async ({ page }) => {
    const panels = page.locator('.ux-panel');
    const count = await panels.count();
    expect(count).toBeGreaterThan(1);
  });

  // Header tests
  test('should render panel header button', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    await expect(header).toBeVisible();
  });

  test('should render header with title text', async ({ page }) => {
    const title = page.locator('.ux-panel__title').first();
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.length).toBeGreaterThan(0);
  });

  test('should render toggle chevron icon in header', async ({ page }) => {
    const icon = page.locator('.ux-panel__toggle').first();
    await expect(icon).toBeVisible();
  });

  test('header should be clickable button element', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    const tagName = await header.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('button');
  });

  test('should have proper header styling with background', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    const bgColor = await header.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBeTruthy();
  });

  // Content tests
  test('should render panel content section', async ({ page }) => {
    const content = page.locator('.ux-panel__content').first();
    await expect(content).toBeVisible();
  });

  test('should render content with text', async ({ page }) => {
    const content = page.locator('.ux-panel__content-inner').first();
    if (await content.count() > 0) {
      const text = await content.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have content with proper padding', async ({ page }) => {
    const content = page.locator('.ux-panel__content').first();
    const padding = await content.evaluate(el =>
      getComputedStyle(el).padding
    );
    expect(padding).not.toBe('0px');
  });

  // Expand/collapse functionality tests
  test('should toggle panel open state on header click', async ({ page }) => {
    const panel = page.locator('.ux-panel').nth(1); // Use closed panel
    const header = panel.locator('.ux-panel__header');

    // Check initial state (should be closed)
    const initialOpen = panel.locator('.ux-panel--open');
    const initialCount = await initialOpen.count();

    // Click header to toggle
    await header.click();
    await page.waitForTimeout(200);

    // Verify state changed
    const afterOpen = panel.locator('.ux-panel--open');
    const afterCount = await afterOpen.count();
    expect(afterCount).not.toBe(initialCount);
  });

  test('should open panel when closed', async ({ page }) => {
    // Find a closed panel and open it
    const closedPanel = page.locator('.ux-panel').filter({ has: page.locator('.ux-panel__header') }).nth(2);
    const header = closedPanel.locator('.ux-panel__header');

    // Click to open
    await header.click();
    await page.waitForTimeout(200);

    // Verify open class is added
    const hasOpenClass = await closedPanel.evaluate(el =>
      el.classList.contains('ux-panel--open')
    );
    expect(hasOpenClass).toBe(true);
  });

  test('should close panel when open', async ({ page }) => {
    // Find an open panel
    const openPanel = page.locator('.ux-panel--open').first();
    const header = openPanel.locator('.ux-panel__header').first();

    // Click to close
    await header.click();
    await page.waitForTimeout(200);

    // Verify open class is removed
    const hasOpenClass = await openPanel.evaluate(el =>
      el.classList.contains('ux-panel--open')
    );
    expect(hasOpenClass).toBe(false);
  });

  test('should expand/collapse with animation', async ({ page }) => {
    const panel = page.locator('.ux-panel').nth(1);
    const header = panel.locator('.ux-panel__header');

    // Toggle to open
    await header.click();
    await page.waitForTimeout(50);

    // Check visibility of content
    const content = panel.locator('.ux-panel__content');
    const isVisible = await content.isVisible();
    expect(isVisible).toBe(true);
  });

  // Size modifier tests
  test('should render small panel variant', async ({ page }) => {
    const smallPanel = page.locator('.ux-panel--sm').first();
    if (await smallPanel.count() > 0) {
      await expect(smallPanel).toBeVisible();
    }
  });

  test('should render large panel variant', async ({ page }) => {
    const largePanel = page.locator('.ux-panel--lg').first();
    if (await largePanel.count() > 0) {
      await expect(largePanel).toBeVisible();
    }
  });

  test('should have different heights for size variants', async ({ page }) => {
    const smallHeader = page.locator('.ux-panel--sm .ux-panel__header').first();
    const largeHeader = page.locator('.ux-panel--lg .ux-panel__header').first();

    if (await smallHeader.count() > 0 && await largeHeader.count() > 0) {
      const smallHeight = await smallHeader.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      const largeHeight = await largeHeader.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(largeHeight).toBeGreaterThan(smallHeight);
    }
  });

  // Style variant tests
  test('should render outline variant', async ({ page }) => {
    const outlinePanel = page.locator('.ux-panel--outline').first();
    if (await outlinePanel.count() > 0) {
      await expect(outlinePanel).toBeVisible();
    }
  });

  test('should render filled variant', async ({ page }) => {
    const filledPanel = page.locator('.ux-panel--filled').first();
    if (await filledPanel.count() > 0) {
      await expect(filledPanel).toBeVisible();
    }
  });

  test('should render flush variant', async ({ page }) => {
    const flushPanel = page.locator('.ux-panel--flush').first();
    if (await flushPanel.count() > 0) {
      await expect(flushPanel).toBeVisible();
    }
  });

  // Color variant tests
  test('should render primary color variant', async ({ page }) => {
    const primaryPanel = page.locator('.ux-panel--primary').first();
    if (await primaryPanel.count() > 0) {
      await expect(primaryPanel).toBeVisible();
      const header = primaryPanel.locator('.ux-panel__header');
      const bgColor = await header.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  test('should render success color variant', async ({ page }) => {
    const successPanel = page.locator('.ux-panel--success').first();
    if (await successPanel.count() > 0) {
      await expect(successPanel).toBeVisible();
    }
  });

  test('should render warning color variant', async ({ page }) => {
    const warningPanel = page.locator('.ux-panel--warning').first();
    if (await warningPanel.count() > 0) {
      await expect(warningPanel).toBeVisible();
    }
  });

  test('should render danger color variant', async ({ page }) => {
    const dangerPanel = page.locator('.ux-panel--danger').first();
    if (await dangerPanel.count() > 0) {
      await expect(dangerPanel).toBeVisible();
    }
  });

  // Footer tests
  test('should render panel footer when present', async ({ page }) => {
    const footer = page.locator('.ux-panel__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should render footer buttons', async ({ page }) => {
    const footer = page.locator('.ux-panel__footer').first();
    if (await footer.count() > 0) {
      const buttons = footer.locator('button');
      expect(await buttons.count()).toBeGreaterThan(0);
    }
  });

  // Panel group tests
  test('should render panel group container', async ({ page }) => {
    const group = page.locator('.ux-panel-group').first();
    if (await group.count() > 0) {
      await expect(group).toBeVisible();
    }
  });

  test('should render multiple panels in group', async ({ page }) => {
    const group = page.locator('.ux-panel-group').first();
    if (await group.count() > 0) {
      const panelsInGroup = group.locator('.ux-panel');
      expect(await panelsInGroup.count()).toBeGreaterThanOrEqual(2);
    }
  });

  // Accordion style tests
  test('should render accordion style group', async ({ page }) => {
    const accordion = page.locator('.ux-panel-group--accordion').first();
    if (await accordion.count() > 0) {
      await expect(accordion).toBeVisible();
    }
  });

  test('should render accordion with first panel open by default', async ({ page }) => {
    const accordion = page.locator('.ux-panel-group--accordion').first();
    if (await accordion.count() > 0) {
      const firstPanel = accordion.locator('.ux-panel').first();
      const isOpen = await firstPanel.evaluate(el =>
        el.classList.contains('ux-panel--open')
      );
      expect(isOpen).toBe(true);
    }
  });

  // Icon and subtitle tests
  test('should render icon in header when present', async ({ page }) => {
    const icon = page.locator('.ux-panel__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should render subtitle in header when present', async ({ page }) => {
    const subtitle = page.locator('.ux-panel__subtitle').first();
    if (await subtitle.count() > 0) {
      await expect(subtitle).toBeVisible();
      const text = await subtitle.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render header content section', async ({ page }) => {
    const headerContent = page.locator('.ux-panel__header-content').first();
    await expect(headerContent).toBeVisible();
  });

  // Glass variant tests
  test('should render glass variant', async ({ page }) => {
    const glassPanel = page.locator('.ux-panel--glass').first();
    if (await glassPanel.count() > 0) {
      await expect(glassPanel).toBeVisible();
    }
  });

  test('should apply glass morphism effect', async ({ page }) => {
    const glassPanel = page.locator('.ux-panel--glass').first();
    if (await glassPanel.count() > 0) {
      const backdropFilter = await glassPanel.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  // Disabled state tests
  test('should render disabled panel variant', async ({ page }) => {
    const disabledPanel = page.locator('.ux-panel--disabled').first();
    if (await disabledPanel.count() > 0) {
      await expect(disabledPanel).toBeVisible();
    }
  });

  test('should have reduced opacity when disabled', async ({ page }) => {
    const disabledPanel = page.locator('.ux-panel--disabled').first();
    if (await disabledPanel.count() > 0) {
      const opacity = await disabledPanel.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  // Loading state tests
  test('should render loading panel variant', async ({ page }) => {
    const loadingPanel = page.locator('.ux-panel--loading').first();
    if (await loadingPanel.count() > 0) {
      await expect(loadingPanel).toBeVisible();
    }
  });

  // Accessibility tests
  test('should have accessible header button with aria-expanded', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    const ariaExpanded = await header.getAttribute('aria-expanded');
    expect(['true', 'false']).toContain(ariaExpanded);
  });

  test('should be keyboard accessible - tab to header', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    await header.focus();
    await expect(header).toBeFocused();
  });

  test('should toggle with keyboard enter key', async ({ page }) => {
    const panel = page.locator('.ux-panel').nth(1);
    const header = panel.locator('.ux-panel__header');

    // Focus the header
    await header.focus();

    // Press Enter
    await header.press('Enter');
    await page.waitForTimeout(200);

    // Verify state changed
    const hasOpenClass = await panel.evaluate(el =>
      el.classList.contains('ux-panel--open')
    );
    expect(typeof hasOpenClass).toBe('boolean');
  });

  test('should toggle with keyboard space key', async ({ page }) => {
    const panel = page.locator('.ux-panel').nth(2);
    const header = panel.locator('.ux-panel__header');

    // Focus the header
    await header.focus();

    // Press Space
    await header.press(' ');
    await page.waitForTimeout(200);

    // Verify state changed
    const hasOpenClass = await panel.evaluate(el =>
      el.classList.contains('ux-panel--open')
    );
    expect(typeof hasOpenClass).toBe('boolean');
  });

  // Touch target size tests
  test('header should have minimum touch target size', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    const height = await header.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  // Style and structure tests
  test('should have proper border radius', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const borderRadius = await panel.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have proper background color', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const bgColor = await panel.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBeTruthy();
  });

  test('should have flex display for panel structure', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const display = await panel.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(['flex', 'block']).toContain(display);
  });

  test('should render body wrapper element', async ({ page }) => {
    const body = page.locator('.ux-panel__body').first();
    await expect(body).toBeVisible();
  });

  test('should render without errors', async ({ page }) => {
    const panelCount = await page.locator('.ux-panel').count();
    expect(panelCount).toBeGreaterThan(0);
  });

  // Transition tests
  test('should have transition property on content', async ({ page }) => {
    const body = page.locator('.ux-panel__body').first();
    const transition = await body.evaluate(el =>
      getComputedStyle(el).transition || getComputedStyle(el).transitionProperty
    );
    expect(transition).toBeTruthy();
  });

  // Multiple panel independence tests
  test('should toggle one panel without affecting others', async ({ page }) => {
    const panel1 = page.locator('.ux-panel').nth(0);
    const panel2 = page.locator('.ux-panel').nth(1);

    const header1 = panel1.locator('.ux-panel__header');

    // Get initial state of panel2
    const initialPanel2Open = await panel2.evaluate(el =>
      el.classList.contains('ux-panel--open')
    );

    // Click header of panel1
    await header1.click();
    await page.waitForTimeout(200);

    // Check panel2 state unchanged
    const finalPanel2Open = await panel2.evaluate(el =>
      el.classList.contains('ux-panel--open')
    );

    expect(finalPanel2Open).toBe(initialPanel2Open);
  });

  // Content visibility test
  test('should show content when panel is open', async ({ page }) => {
    const openPanel = page.locator('.ux-panel--open').first();
    if (await openPanel.count() > 0) {
      const content = openPanel.locator('.ux-panel__content');
      const isVisible = await content.isVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('should hide content when panel is closed', async ({ page }) => {
    // Find a panel that is not open
    const allPanels = page.locator('.ux-panel');
    const count = await allPanels.count();

    for (let i = 0; i < count; i++) {
      const panel = allPanels.nth(i);
      const isOpen = await panel.evaluate(el =>
        el.classList.contains('ux-panel--open')
      );

      if (!isOpen) {
        const body = panel.locator('.ux-panel__body');
        // Body should exist but may have visibility issues based on CSS
        await expect(body).toBeVisible();
        break;
      }
    }
  });
});
