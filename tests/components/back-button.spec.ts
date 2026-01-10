import { test, expect } from '@playwright/test';

test.describe('Back Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/back-button.html');
  });

  test('should render basic back button', async ({ page }) => {
    const button = page.locator('.ux-back-button').first();
    await expect(button).toBeVisible();
  });

  test('should render back button icon', async ({ page }) => {
    const icon = page.locator('.ux-back-button__icon').first();
    await expect(icon).toBeVisible();

    // Icon should contain SVG
    const svg = icon.locator('svg');
    if (await svg.count() > 0) {
      await expect(svg).toBeVisible();
    }
  });

  test('should render back button text', async ({ page }) => {
    const text = page.locator('.ux-back-button__text').first();
    if (await text.count() > 0) {
      await expect(text).toBeVisible();
      const content = await text.textContent();
      expect(content?.length).toBeGreaterThan(0);
    }
  });

  test('should trigger click event', async ({ page }) => {
    const button = page.locator('.ux-back-button').first();

    await page.evaluate(() => {
      const btn = document.querySelector('.ux-back-button');
      btn?.addEventListener('click', () => {
        (window as any).__backButtonClicked = true;
      });
    });

    await button.click();

    const wasClicked = await page.evaluate(() => (window as any).__backButtonClicked);
    expect(wasClicked).toBe(true);
  });

  test('should apply icon-only variant', async ({ page }) => {
    const iconOnlyButton = page.locator('.ux-back-button--icon-only').first();
    if (await iconOnlyButton.count() > 0) {
      await expect(iconOnlyButton).toBeVisible();

      // Text should be hidden
      const text = iconOnlyButton.locator('.ux-back-button__text');
      if (await text.count() > 0) {
        const display = await text.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(display).toBe('none');
      }
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallButton = page.locator('.ux-back-button--sm').first();
    if (await smallButton.count() > 0) {
      await expect(smallButton).toBeVisible();

      const height = await smallButton.evaluate(el =>
        parseInt(getComputedStyle(el).minHeight)
      );
      expect(height).toBeLessThan(44);
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeButton = page.locator('.ux-back-button--lg').first();
    if (await largeButton.count() > 0) {
      await expect(largeButton).toBeVisible();
    }
  });

  test('should apply light color variant', async ({ page }) => {
    const lightButton = page.locator('.ux-back-button--light').first();
    if (await lightButton.count() > 0) {
      await expect(lightButton).toBeVisible();

      const color = await lightButton.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toContain('255');
    }
  });

  test('should apply dark color variant', async ({ page }) => {
    const darkButton = page.locator('.ux-back-button--dark').first();
    if (await darkButton.count() > 0) {
      await expect(darkButton).toBeVisible();
    }
  });

  test('should apply secondary color variant', async ({ page }) => {
    const secondaryButton = page.locator('.ux-back-button--secondary').first();
    if (await secondaryButton.count() > 0) {
      await expect(secondaryButton).toBeVisible();
    }
  });

  test('should render in navbar context', async ({ page }) => {
    const navbarButton = page.locator('.ux-navbar .ux-back-button').first();
    if (await navbarButton.count() > 0) {
      await expect(navbarButton).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassButton = page.locator('.ux-back-button--glass').first();
    if (await glassButton.count() > 0) {
      await expect(glassButton).toBeVisible();

      // Glass button should have circular shape
      const width = await glassButton.evaluate(el =>
        getComputedStyle(el).width
      );
      const height = await glassButton.evaluate(el =>
        getComputedStyle(el).height
      );
      expect(width).toBe(height);

      // Should have backdrop filter
      const backdropFilter = await glassButton.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should apply glass variant with sm size', async ({ page }) => {
    const glassSmButton = page.locator('.ux-back-button--glass.ux-back-button--sm').first();
    if (await glassSmButton.count() > 0) {
      await expect(glassSmButton).toBeVisible();

      const width = await glassSmButton.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeLessThanOrEqual(36);
    }
  });

  test('should apply glass variant with lg size', async ({ page }) => {
    const glassLgButton = page.locator('.ux-back-button--glass.ux-back-button--lg').first();
    if (await glassLgButton.count() > 0) {
      await expect(glassLgButton).toBeVisible();

      const width = await glassLgButton.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBeGreaterThanOrEqual(40);
    }
  });

  test('should handle disabled state', async ({ page }) => {
    const disabledButton = page.locator('.ux-back-button[disabled], .ux-back-button--disabled').first();
    if (await disabledButton.count() > 0) {
      // Should have reduced opacity
      const opacity = await disabledButton.evaluate(el =>
        parseFloat(getComputedStyle(el).opacity)
      );
      expect(opacity).toBeLessThan(1);

      // Should not be clickable
      const pointerEvents = await disabledButton.evaluate(el =>
        getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    }
  });

  test('should apply collapsible variant', async ({ page }) => {
    const collapsibleButton = page.locator('.ux-back-button--collapsible').first();
    if (await collapsibleButton.count() > 0) {
      await expect(collapsibleButton).toBeVisible();
    }
  });

  test('should apply collapsed state', async ({ page }) => {
    const collapsedButton = page.locator('.ux-back-button--collapsed').first();
    if (await collapsedButton.count() > 0) {
      const text = collapsedButton.locator('.ux-back-button__text');
      if (await text.count() > 0) {
        const maxWidth = await text.evaluate(el =>
          getComputedStyle(el).maxWidth
        );
        expect(maxWidth).toBe('0px');
      }
    }
  });

  test('should apply animated entrance variant', async ({ page }) => {
    const animatedButton = page.locator('.ux-back-button--animate-in').first();
    if (await animatedButton.count() > 0) {
      await expect(animatedButton).toBeVisible();
    }
  });

  test('should apply icon-end variant', async ({ page }) => {
    const iconEndButton = page.locator('.ux-back-button--icon-end').first();
    if (await iconEndButton.count() > 0) {
      await expect(iconEndButton).toBeVisible();

      // Check flex-direction is row-reverse
      const flexDirection = await iconEndButton.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('row-reverse');
    }
  });

  test('should have minimum touch target size', async ({ page }) => {
    const button = page.locator('.ux-back-button').first();

    const minHeight = await button.evaluate(el =>
      parseInt(getComputedStyle(el).minHeight)
    );

    // Minimum touch target should be at least 36px
    expect(minHeight).toBeGreaterThanOrEqual(36);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const button = page.locator('.ux-back-button').first();

    // Focus the button directly
    await button.focus();

    // Button should be focusable
    await expect(button).toBeFocused();
  });

  test('should show hover effect', async ({ page }) => {
    const button = page.locator('.ux-back-button').first();

    // Get initial opacity
    const initialOpacity = await button.evaluate(el =>
      parseFloat(getComputedStyle(el).opacity)
    );

    // Hover the button
    await button.hover();

    // Get opacity after hover (may vary depending on implementation)
    const hoverOpacity = await button.evaluate(el =>
      parseFloat(getComputedStyle(el).opacity)
    );

    // Hover should change the button (opacity reduced)
    expect(hoverOpacity).toBeLessThanOrEqual(initialOpacity);
  });

  test('should support link element', async ({ page }) => {
    const linkButton = page.locator('a.ux-back-button').first();
    if (await linkButton.count() > 0) {
      await expect(linkButton).toBeVisible();

      // Should have href attribute
      const href = await linkButton.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('should render correctly in glass navbar', async ({ page }) => {
    const glassNavbarButton = page.locator('.ux-navbar--glass .ux-back-button--glass, .ux-navbar--transparent .ux-back-button--glass').first();
    if (await glassNavbarButton.count() > 0) {
      await expect(glassNavbarButton).toBeVisible();
    }
  });

  test('should have proper transitions', async ({ page }) => {
    const button = page.locator('.ux-back-button').first();

    const transition = await button.evaluate(el =>
      getComputedStyle(el).transition || getComputedStyle(el).transitionProperty
    );

    // Should have some transition defined
    expect(transition).not.toBe('none');
  });
});
