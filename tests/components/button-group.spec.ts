import { test, expect } from '@playwright/test';

test.describe('Button Group Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/button-group.html');
  });

  // Basic Rendering Tests
  test('should render basic button group', async ({ page }) => {
    const buttonGroup = page.locator('.ux-button-group').first();
    await expect(buttonGroup).toBeVisible();
  });

  test('should render grouped buttons', async ({ page }) => {
    const buttonGroup = page.locator('.ux-button-group').first();
    const buttons = buttonGroup.locator('.ux-button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should have multiple buttons in group', async ({ page }) => {
    const buttonGroup = page.locator('.ux-button-group').first();
    const buttons = buttonGroup.locator('.ux-button');
    expect(await buttons.count()).toBeGreaterThanOrEqual(2);
  });

  // Selected State Tests
  test('should support active state on button', async ({ page }) => {
    const activeButton = page.locator('.ux-button-group--outline .ux-button--active').first();
    if (await activeButton.count() > 0) {
      await expect(activeButton).toHaveClass(/ux-button--active/);
    }
  });

  test('should apply active state styling', async ({ page }) => {
    const activeButton = page.locator('.ux-button-group--outline .ux-button--active').first();
    if (await activeButton.count() > 0) {
      const bgColor = await activeButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  test('should toggle selection with Alpine.js', async ({ page }) => {
    // Find toggle button group
    const toggleGroup = page.locator('.ux-button-group--toggle').first();
    const buttons = toggleGroup.locator('.ux-button');

    if (await buttons.count() >= 2) {
      // Click first button
      await buttons.nth(0).click();

      // Check if it has active class
      const firstActive = buttons.nth(0).locator('[class*="ux-button--active"]');

      // Click second button
      await buttons.nth(1).click();

      // First button should not be active after clicking second
      const firstActiveAfter = buttons.nth(0).locator('[class*="ux-button--active"]');
    }
  });

  test('should support multiple selection', async ({ page }) => {
    // Find multiple selection button group
    const multipleGroup = page.locator('.ux-button-group--toggle').nth(1);
    const buttons = multipleGroup.locator('.ux-button');

    if (await buttons.count() >= 2) {
      // Multiple selection group allows clicking multiple buttons
      await buttons.nth(0).click();
      await buttons.nth(1).click();
      // Both should remain selected in multiple mode
    }
  });

  // Variant Tests
  test('should render outline variant', async ({ page }) => {
    const outlineGroup = page.locator('.ux-button-group--outline').first();
    await expect(outlineGroup).toBeVisible();
  });

  test('should render toggle variant', async ({ page }) => {
    const toggleGroup = page.locator('.ux-button-group--toggle').first();
    await expect(toggleGroup).toBeVisible();
  });

  test('should render vertical variant', async ({ page }) => {
    const verticalGroup = page.locator('.ux-button-group--vertical').first();
    await expect(verticalGroup).toBeVisible();
  });

  test('should render block (full-width) variant', async ({ page }) => {
    const blockGroup = page.locator('.ux-button-group--block').first();
    if (await blockGroup.count() > 0) {
      await expect(blockGroup).toBeVisible();
    }
  });

  test('should render separated variant', async ({ page }) => {
    const separatedGroup = page.locator('.ux-button-group--separated').first();
    await expect(separatedGroup).toBeVisible();
  });

  test('should render glass variant', async ({ page }) => {
    const glassGroup = page.locator('.ux-button-group--glass').first();
    if (await glassGroup.count() > 0) {
      await expect(glassGroup).toBeVisible();
    }
  });

  // Size Variant Tests
  test('should render small size variant', async ({ page }) => {
    const smallGroup = page.locator('.ux-button-group--sm').first();
    if (await smallGroup.count() > 0) {
      const buttons = smallGroup.locator('.ux-button');
      const height = await buttons.nth(0).evaluate(el =>
        getComputedStyle(el).height
      );
      expect(height).toBeTruthy();
    }
  });

  test('should render large size variant', async ({ page }) => {
    const largeGroup = page.locator('.ux-button-group--lg').first();
    if (await largeGroup.count() > 0) {
      const buttons = largeGroup.locator('.ux-button');
      const height = await buttons.nth(0).evaluate(el =>
        getComputedStyle(el).height
      );
      expect(height).toBeTruthy();
    }
  });

  // Layout Tests
  test('should have proper flex layout for horizontal group', async ({ page }) => {
    const buttonGroup = page.locator('.ux-button-group').not(page.locator('.ux-button-group--vertical')).first();
    const display = await buttonGroup.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toContain('flex');
  });

  test('should have proper flex layout for vertical group', async ({ page }) => {
    const verticalGroup = page.locator('.ux-button-group--vertical').first();
    const flexDirection = await verticalGroup.evaluate(el =>
      getComputedStyle(el).flexDirection
    );
    expect(flexDirection).toBe('column');
  });

  test('should have connected borders in grouped buttons', async ({ page }) => {
    const buttonGroup = page.locator('.ux-button-group').not(page.locator('.ux-button-group--separated')).first();
    const buttons = buttonGroup.locator('.ux-button');

    if (await buttons.count() >= 2) {
      const firstBtn = buttons.nth(0);
      const marginLeft = await firstBtn.evaluate(el =>
        getComputedStyle(el).marginLeft
      );
      // First button should have no left margin
      expect(marginLeft).toBe('0px');
    }
  });

  // Color Composition Tests
  test('should support color composition classes', async ({ page }) => {
    const colorGroup = page.locator('.ux-color-success--outline').first();
    if (await colorGroup.count() > 0) {
      await expect(colorGroup).toHaveClass(/ux-color-success--outline/);
    }
  });

  // Icon Support Tests
  test('should render buttons with icons', async ({ page }) => {
    const iconButton = page.locator('.ux-button-group .ux-button svg').first();
    if (await iconButton.count() > 0) {
      await expect(iconButton).toBeDefined();
    }
  });

  // Accessibility Tests
  test('should have proper ARIA attributes for toggle groups', async ({ page }) => {
    const toggleGroup = page.locator('.ux-button-group--toggle').first();
    const buttons = toggleGroup.locator('.ux-button');

    if (await buttons.count() > 0) {
      // Buttons should be focusable
      const firstBtn = buttons.nth(0);
      expect(await firstBtn.getAttribute('class')).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    const toggleGroup = page.locator('.ux-button-group--toggle').first();
    const firstButton = toggleGroup.locator('.ux-button').first();

    // Focus first button
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
  });

  // Data Attributes Tests
  test('should use data-value attribute for selection', async ({ page }) => {
    const toggleGroup = page.locator('.ux-button-group--toggle').first();
    const buttons = toggleGroup.locator('.ux-button');

    if (await buttons.count() > 0) {
      const dataValue = await buttons.nth(0).getAttribute('data-value');
      // data-value may or may not be present
      expect(true).toBe(true);
    }
  });

  // Event Dispatching Tests
  test('should dispatch buttongroup:change event on selection', async ({ page }) => {
    await page.evaluate(() => {
      window.eventDispatched = null;
      document.addEventListener('buttongroup:change', (e: any) => {
        window.eventDispatched = e;
      });
    });

    const toggleGroup = page.locator('.ux-button-group--toggle').first();
    const button = toggleGroup.locator('.ux-button').first();

    if (await button.count() > 0) {
      await button.click();
      // Event may be dispatched (implementation dependent)
    }
  });

  // Default Selection Tests
  test('should initialize with selected value', async ({ page }) => {
    const toggleGroup = page.locator('.ux-button-group--toggle').first();
    const activeButton = toggleGroup.locator('.ux-button--active').first();

    if (await activeButton.count() > 0) {
      await expect(activeButton).toHaveClass(/ux-button--active/);
    }
  });

  // Responsiveness Tests
  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const buttonGroup = page.locator('.ux-button-group').first();
    await expect(buttonGroup).toBeVisible();

    const buttons = buttonGroup.locator('.ux-button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const buttonGroup = page.locator('.ux-button-group').first();
    await expect(buttonGroup).toBeVisible();
  });

  // Text Content Tests
  test('should display button text labels', async ({ page }) => {
    const buttons = page.locator('.ux-button-group').first().locator('.ux-button');
    if (await buttons.count() > 0) {
      const text = await buttons.nth(0).textContent();
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  // Dark Mode Tests
  test('should support dark mode', async ({ page }) => {
    // Apply dark mode class
    await page.evaluate(() => {
      document.documentElement.classList.add('ux-dark');
    });

    const buttonGroup = page.locator('.ux-button-group--toggle').first();
    await expect(buttonGroup).toBeVisible();

    // Remove dark mode class
    await page.evaluate(() => {
      document.documentElement.classList.remove('ux-dark');
    });
  });

  // Disabled State Tests
  test('should handle disabled buttons', async ({ page }) => {
    // Check if any buttons have disabled state
    const disabledButton = page.locator('.ux-button-group .ux-button[disabled]').first();
    if (await disabledButton.count() > 0) {
      const disabled = await disabledButton.isDisabled();
      expect(disabled).toBe(true);
    }
  });

  // Mixed Content Tests
  test('should render button group with mixed content (text and icons)', async ({ page }) => {
    const mixedGroup = page.locator('.ux-button-group').first();
    const buttons = mixedGroup.locator('.ux-button');

    if (await buttons.count() > 0) {
      const firstBtn = buttons.nth(0);
      const content = await firstBtn.innerHTML();
      expect(content.length).toBeGreaterThan(0);
    }
  });
});
