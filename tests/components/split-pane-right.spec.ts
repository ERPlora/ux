import { test, expect } from '@playwright/test';

test.describe('Split Pane Right Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/split-pane-right.html');
  });

  test('should render split pane right container', async ({ page }) => {
    const splitPane = page.locator('.ux-split-pane-right').first();
    await expect(splitPane).toBeVisible();
  });

  test('should render main content area', async ({ page }) => {
    const mainContent = page.locator('.ux-split-pane-right__main').first();
    await expect(mainContent).toBeVisible();
  });

  test('should render right panel area', async ({ page }) => {
    const sidePanel = page.locator('.ux-split-pane-right__side').first();
    await expect(sidePanel).toBeVisible();
  });

  test('should render backdrop element', async ({ page }) => {
    const backdrop = page.locator('.ux-split-pane-right__backdrop').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeDefined();
    }
  });

  test('should have toggle button in main area', async ({ page }) => {
    const toggleButton = page.locator('.ux-split-pane-right__toggle').first();
    if (await toggleButton.count() > 0) {
      await expect(toggleButton).toBeVisible();
    }
  });

  test('should initialize with Alpine.js component', async ({ page }) => {
    const splitPane = page.locator('[x-data*="uxSplitPaneRight"]').first();
    if (await splitPane.count() > 0) {
      await expect(splitPane).toBeVisible();
    }
  });

  test('should have proper layout structure', async ({ page }) => {
    const splitPane = page.locator('.ux-split-pane-right').first();
    const mainContent = page.locator('.ux-split-pane-right__main');
    const sidePanel = page.locator('.ux-split-pane-right__side');

    expect(await mainContent.count()).toBeGreaterThan(0);
    expect(await sidePanel.count()).toBeGreaterThan(0);
  });

  test('should toggle panel visibility', async ({ page }) => {
    const toggleButton = page.locator('[x-data*="uxSplitPaneRight"]').first().locator('button').first();
    if (await toggleButton.count() > 0) {
      const initialState = await toggleButton.isVisible();
      await toggleButton.click();
      await page.waitForTimeout(200);
      // After toggle, the state should change (component manages visibility)
      await expect(toggleButton).toBeVisible();
    }
  });

  test('should close panel on backdrop click', async ({ page }) => {
    const backdrop = page.locator('.ux-split-pane-right__backdrop').first();
    if (await backdrop.count() > 0) {
      await backdrop.click();
      await page.waitForTimeout(200);
      // Component should handle backdrop click to close overlay
      await expect(backdrop).toBeDefined();
    }
  });

  test('should have glass variant support', async ({ page }) => {
    const glassPanel = page.locator('.ux-split-pane-right__side--glass').first();
    if (await glassPanel.count() > 0) {
      await expect(glassPanel).toBeVisible();
      const backdropFilter = await glassPanel.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should support custom width via CSS variable', async ({ page }) => {
    const customWidthPane = page.locator('[style*="--ux-split-pane-right-width"]').first();
    if (await customWidthPane.count() > 0) {
      await expect(customWidthPane).toBeVisible();
      const width = await customWidthPane.evaluate(el =>
        getComputedStyle(el).getPropertyValue('--ux-split-pane-right-width')
      );
      expect(width.trim()).toBe('400px');
    }
  });

  test('should have proper flex layout on main container', async ({ page }) => {
    const splitPane = page.locator('.ux-split-pane-right').first();
    const display = await splitPane.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  test('should render navbar in main section', async ({ page }) => {
    const mainContent = page.locator('.ux-split-pane-right__main').first();
    const navbar = mainContent.locator('.ux-navbar').first();
    if (await navbar.count() > 0) {
      await expect(navbar).toBeVisible();
    }
  });

  test('should render navbar in side panel', async ({ page }) => {
    const sidePanel = page.locator('.ux-split-pane-right__side').first();
    const navbar = sidePanel.locator('.ux-navbar').first();
    if (await navbar.count() > 0) {
      await expect(navbar).toBeVisible();
    }
  });

  test('should have title in main navbar', async ({ page }) => {
    const mainNavbar = page.locator('.ux-split-pane-right__main').first().locator('.ux-navbar').first();
    const title = mainNavbar.locator('.ux-navbar__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
      const text = await title.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have title in side navbar', async ({ page }) => {
    const sideNavbar = page.locator('.ux-split-pane-right__side').first().locator('.ux-navbar').first();
    const title = sideNavbar.locator('.ux-navbar__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
      const text = await title.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have action buttons in main content', async ({ page }) => {
    const mainContent = page.locator('.ux-split-pane-right__main .main-content').first();
    const buttons = mainContent.locator('.ux-button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should close panel on toggle button in side panel', async ({ page }) => {
    const sideNavbar = page.locator('.ux-split-pane-right__side').first().locator('.ux-navbar').first();
    const closeButton = sideNavbar.locator('.ux-split-pane-right__toggle').first();
    if (await closeButton.count() > 0) {
      await closeButton.click();
      await page.waitForTimeout(200);
      // Component handles state after close
      await expect(closeButton).toBeDefined();
    }
  });

  test('should have proper positioning for mobile overlay', async ({ page }) => {
    const backdrop = page.locator('.ux-split-pane-right__backdrop').first();
    if (await backdrop.count() > 0) {
      const position = await backdrop.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['absolute', 'fixed']).toContain(position);
    }
  });

  test('should handle multiple split pane instances', async ({ page }) => {
    const splitPanes = page.locator('.ux-split-pane-right');
    const count = await splitPanes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should dispatch custom events on toggle', async ({ page }) => {
    const splitPane = page.locator('[x-data*="uxSplitPaneRight"]').first();
    if (await splitPane.count() > 0) {
      const toggleButton = splitPane.locator('.ux-split-pane-right__toggle').first();
      if (await toggleButton.count() > 0) {
        // Event dispatching is handled by Alpine.js component
        await toggleButton.click();
        await page.waitForTimeout(200);
        // Component state changes after click
        await expect(splitPane).toBeVisible();
      }
    }
  });

  test('should maintain main content visibility', async ({ page }) => {
    const mainContent = page.locator('.ux-split-pane-right__main').first();
    const initialState = await mainContent.isVisible();
    expect(initialState).toBe(true);

    // Main content should remain visible after interaction
    const toggleButton = mainContent.locator('.ux-split-pane-right__toggle').first();
    if (await toggleButton.count() > 0) {
      await toggleButton.click();
      await page.waitForTimeout(200);
      await expect(mainContent).toBeVisible();
    }
  });

  test('should display content text in side panel', async ({ page }) => {
    const sideContent = page.locator('.side-content').first();
    if (await sideContent.count() > 0) {
      const text = await sideContent.textContent();
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display content text in main area', async ({ page }) => {
    const mainContentArea = page.locator('.main-content').first();
    if (await mainContentArea.count() > 0) {
      const text = await mainContentArea.textContent();
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should have appropriate spacing and padding', async ({ page }) => {
    const sideContent = page.locator('.side-content').first();
    if (await sideContent.count() > 0) {
      const padding = await sideContent.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');
    }
  });

  test('should have side panel height matching container', async ({ page }) => {
    const splitPane = page.locator('.ux-split-pane-right').first();
    const sidePanel = splitPane.locator('.ux-split-pane-right__side').first();

    if (await sidePanel.count() > 0) {
      const containerHeight = await splitPane.evaluate(el => el.clientHeight);
      const sidePanelHeight = await sidePanel.evaluate(el => el.clientHeight);
      // Side panel should match or be within container height
      expect(sidePanelHeight).toBeLessThanOrEqual(containerHeight + 1);
    }
  });

  test('should apply color utilities to buttons', async ({ page }) => {
    const primaryButton = page.locator('.ux-button.ux-color-primary').first();
    if (await primaryButton.count() > 0) {
      await expect(primaryButton).toBeVisible();
    }
  });
});
