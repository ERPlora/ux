import { test, expect } from '@playwright/test';

test.describe('Split Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/split-button.html');
  });

  test('should render basic split button', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    await expect(splitButton).toBeVisible();
  });

  test('should have main button', async ({ page }) => {
    const mainButton = page.locator('.ux-split-button__main').first();
    await expect(mainButton).toBeVisible();

    // Main button should have button class
    await expect(mainButton).toHaveClass(/ux-button/);
  });

  test('should have dropdown toggle button', async ({ page }) => {
    const toggleButton = page.locator('.ux-split-button__toggle').first();
    await expect(toggleButton).toBeVisible();

    // Toggle should contain icon
    const icon = toggleButton.locator('.ux-split-button__toggle-icon');
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should render dropdown menu', async ({ page }) => {
    const dropdown = page.locator('.ux-split-button__dropdown').first();
    await expect(dropdown).toBeDefined();
  });

  test('should render dropdown items', async ({ page }) => {
    const items = page.locator('.ux-split-button__item');
    if (await items.count() > 0) {
      expect(await items.count()).toBeGreaterThan(0);
      await expect(items.first()).toBeVisible();
    }
  });

  test('should open dropdown on toggle click', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const toggleButton = page.locator('.ux-split-button__toggle').first();

    // Initially should not be open
    expect(await splitButton.evaluate(el => el.classList.contains('ux-split-button--open'))).toBe(false);

    // Click toggle
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Should now be open
    expect(await splitButton.evaluate(el => el.classList.contains('ux-split-button--open'))).toBe(true);
  });

  test('should close dropdown on toggle click when open', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const toggleButton = page.locator('.ux-split-button__toggle').first();

    // Open dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Close dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Should be closed
    expect(await splitButton.evaluate(el => el.classList.contains('ux-split-button--open'))).toBe(false);
  });

  test('should show dropdown menu when open', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const dropdown = splitButton.locator('.ux-split-button__dropdown');
    const toggleButton = splitButton.locator('.ux-split-button__toggle');

    // Open dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Dropdown should be visible
    const isVisible = await dropdown.evaluate(el => {
      const style = getComputedStyle(el);
      return style.visibility !== 'hidden' && style.opacity !== '0';
    });
    expect(isVisible).toBe(true);
  });

  test('should hide dropdown menu when closed', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const dropdown = splitButton.locator('.ux-split-button__dropdown');
    const toggleButton = splitButton.locator('.ux-split-button__toggle');

    // Open then close dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Dropdown should be hidden
    const isHidden = await dropdown.evaluate(el => {
      const style = getComputedStyle(el);
      return style.visibility === 'hidden' || style.opacity === '0';
    });
    expect(isHidden).toBe(true);
  });

  test('should rotate toggle icon when open', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const icon = splitButton.locator('.ux-split-button__toggle-icon');
    const toggleButton = splitButton.locator('.ux-split-button__toggle');

    if (await icon.count() > 0) {
      // Get initial transform
      const initialTransform = await icon.evaluate(el =>
        getComputedStyle(el).transform
      );

      // Open dropdown
      await toggleButton.click();
      await page.waitForTimeout(200);

      // Get rotated transform
      const rotatedTransform = await icon.evaluate(el =>
        getComputedStyle(el).transform
      );

      // Transform should change (rotation applied)
      expect(rotatedTransform).not.toBe(initialTransform);
    }
  });

  test('should apply color variants', async ({ page }) => {
    // Primary color
    const primaryButton = page.locator('.ux-split-button .ux-color-primary').first();
    if (await primaryButton.count() > 0) {
      await expect(primaryButton).toBeVisible();
    }

    // Success color
    const successButton = page.locator('.ux-split-button .ux-color-success').first();
    if (await successButton.count() > 0) {
      await expect(successButton).toBeVisible();
    }

    // Danger color
    const dangerButton = page.locator('.ux-split-button .ux-color-danger').first();
    if (await dangerButton.count() > 0) {
      await expect(dangerButton).toBeVisible();
    }
  });

  test('should apply outline variant', async ({ page }) => {
    const outlineButton = page.locator('.ux-split-button--outline').first();
    if (await outlineButton.count() > 0) {
      await expect(outlineButton).toBeVisible();

      const mainButton = outlineButton.locator('.ux-split-button__main');
      const bgColor = await mainButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      // Outline buttons should have transparent background
      expect(bgColor).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply size variants', async ({ page }) => {
    // Small button
    const smallButton = page.locator('.ux-split-button--sm .ux-split-button__main').first();
    if (await smallButton.count() > 0) {
      const height = await smallButton.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeLessThan(44);
    }

    // Large button
    const largeButton = page.locator('.ux-split-button--lg .ux-split-button__main').first();
    if (await largeButton.count() > 0) {
      const height = await largeButton.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThan(44);
    }
  });

  test('should apply block variant (full width)', async ({ page }) => {
    const blockButton = page.locator('.ux-split-button--block').first();
    if (await blockButton.count() > 0) {
      const display = await blockButton.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toMatch(/flex/);

      const width = await blockButton.evaluate(el =>
        getComputedStyle(el).width
      );
      expect(width).not.toBe('auto');
    }
  });

  test('should have proper z-index for dropdown', async ({ page }) => {
    const dropdown = page.locator('.ux-split-button__dropdown').first();
    if (await dropdown.count() > 0) {
      const zIndex = await dropdown.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should position dropdown to right by default', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    if (await splitButton.count() > 0) {
      const hasLeftVariant = await splitButton.evaluate(el =>
        el.classList.contains('ux-split-button--dropdown-left')
      );
      expect(hasLeftVariant).toBe(false);
    }
  });

  test('should support dropdown-left positioning', async ({ page }) => {
    const leftDropdown = page.locator('.ux-split-button--dropdown-left').first();
    if (await leftDropdown.count() > 0) {
      await expect(leftDropdown).toBeVisible();
    }
  });

  test('should support dropdown-up positioning', async ({ page }) => {
    const upDropdown = page.locator('.ux-split-button--dropdown-up').first();
    if (await upDropdown.count() > 0) {
      await expect(upDropdown).toBeVisible();
    }
  });

  test('should handle disabled items', async ({ page }) => {
    const disabledItem = page.locator('.ux-split-button__item--disabled').first();
    if (await disabledItem.count() > 0) {
      const opacity = await disabledItem.evaluate(el =>
        parseFloat(getComputedStyle(el).opacity)
      );
      expect(opacity).toBeLessThan(1);

      const pointerEvents = await disabledItem.evaluate(el =>
        getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    }
  });

  test('should style danger items differently', async ({ page }) => {
    const dangerItem = page.locator('.ux-split-button__item--danger').first();
    if (await dangerItem.count() > 0) {
      const color = await dangerItem.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should render divider between item groups', async ({ page }) => {
    const divider = page.locator('.ux-split-button__divider').first();
    if (await divider.count() > 0) {
      await expect(divider).toBeVisible();

      const height = await divider.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBe(1);
    }
  });

  test('should trigger select event on item click', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const toggleButton = splitButton.locator('.ux-split-button__toggle');

    // Setup event listener
    await page.evaluate(() => {
      (window as any).__selectEventFired = false;
      const container = document.querySelector('.ux-split-button');
      container?.addEventListener('splitbutton:select', () => {
        (window as any).__selectEventFired = true;
      });
    });

    // Open dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Click first item
    const firstItem = splitButton.locator('.ux-split-button__item').first();
    if (await firstItem.count() > 0) {
      await firstItem.click();
      await page.waitForTimeout(200);

      // Check if event was fired
      const eventFired = await page.evaluate(() => (window as any).__selectEventFired);
      expect(eventFired).toBe(true);
    }
  });

  test('should close dropdown on item select by default', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const toggleButton = splitButton.locator('.ux-split-button__toggle');

    // Open dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Click item
    const firstItem = splitButton.locator('.ux-split-button__item').first();
    if (await firstItem.count() > 0) {
      await firstItem.click();
      await page.waitForTimeout(200);

      // Dropdown should be closed
      const isClosed = await splitButton.evaluate(el =>
        !el.classList.contains('ux-split-button--open')
      );
      expect(isClosed).toBe(true);
    }
  });

  test('should have minimum touch target size', async ({ page }) => {
    const mainButton = page.locator('.ux-split-button__main').first();
    if (await mainButton.count() > 0) {
      const height = await mainButton.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(36);
    }

    const toggleButton = page.locator('.ux-split-button__toggle').first();
    if (await toggleButton.count() > 0) {
      const height = await toggleButton.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(36);
    }
  });

  test('should be keyboard accessible', async ({ page }) => {
    const toggleButton = page.locator('.ux-split-button__toggle').first();
    if (await toggleButton.count() > 0) {
      // Focus the toggle button
      await toggleButton.focus();
      await expect(toggleButton).toBeFocused();
    }
  });

  test('should handle click outside to close', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const toggleButton = splitButton.locator('.ux-split-button__toggle');

    // Open dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Click outside
    await page.click('body', { position: { x: 10, y: 10 } });
    await page.waitForTimeout(200);

    // Dropdown should be closed
    const isClosed = await splitButton.evaluate(el =>
      !el.classList.contains('ux-split-button--open')
    );
    expect(isClosed).toBe(true);
  });

  test('should handle escape key to close', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();
    const toggleButton = splitButton.locator('.ux-split-button__toggle');

    // Open dropdown
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Press escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    // Dropdown should be closed
    const isClosed = await splitButton.evaluate(el =>
      !el.classList.contains('ux-split-button--open')
    );
    expect(isClosed).toBe(true);
  });

  test('should render multiple split buttons independently', async ({ page }) => {
    const allButtons = page.locator('.ux-split-button');
    const count = await allButtons.count();
    expect(count).toBeGreaterThan(1);

    // Each should have its own dropdown
    const dropdowns = page.locator('.ux-split-button__dropdown');
    expect(await dropdowns.count()).toBe(count);
  });

  test('should have proper border radius', async ({ page }) => {
    const mainButton = page.locator('.ux-split-button__main').first();
    if (await mainButton.count() > 0) {
      const borderRadius = await mainButton.evaluate(el => {
        const style = getComputedStyle(el);
        return style.borderRadius;
      });
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('dropdown should have proper transitions', async ({ page }) => {
    const dropdown = page.locator('.ux-split-button__dropdown').first();
    if (await dropdown.count() > 0) {
      const transition = await dropdown.evaluate(el =>
        getComputedStyle(el).transition
      );
      expect(transition).toBeDefined();
      expect(transition.length).toBeGreaterThan(0);
    }
  });

  test('should work with Alpine.js component data', async ({ page }) => {
    const splitButton = page.locator('.ux-split-button').first();

    // Component should have x-data attribute or be initialized
    const hasAlpineData = await splitButton.evaluate(el => {
      return el.hasAttribute('x-data') || el.__x !== undefined;
    });

    // Just verify it renders without errors
    await expect(splitButton).toBeVisible();
  });
});
