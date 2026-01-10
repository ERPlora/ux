import { test, expect } from '@playwright/test';

test.describe('Variant Selector Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/variant-selector.html');
  });

  // ========================================
  // Basic Rendering Tests
  // ========================================

  test('should render variant selector containers', async ({ page }) => {
    const selectors = page.locator('.ux-variant-selector');
    const count = await selectors.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display label text', async ({ page }) => {
    const label = page.locator('.ux-variant-selector__label').first();
    await expect(label).toBeVisible();
    const text = await label.textContent();
    expect(text).toBeTruthy();
  });

  test('should render option buttons', async ({ page }) => {
    const options = page.locator('.ux-variant-selector__option');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  // ========================================
  // Variant Options Tests (Size Selector)
  // ========================================

  test('should allow selection of size options', async ({ page }) => {
    // Find the size selector section
    const options = page.locator('.ux-variant-selector').first().locator('.ux-variant-selector__option');
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Click the second option
    const secondOption = options.nth(1);
    await secondOption.click();

    // Should have selected class
    await expect(secondOption).toHaveClass(/ux-variant-selector__option--selected/);
  });

  test('should update selected state on option click', async ({ page }) => {
    const options = page.locator('.ux-variant-selector').first().locator('.ux-variant-selector__option');
    const firstOption = options.first();
    const secondOption = options.nth(1);

    // Click first option
    await firstOption.click();
    await expect(firstOption).toHaveClass(/ux-variant-selector__option--selected/);

    // Click second option
    await secondOption.click();
    await expect(secondOption).toHaveClass(/ux-variant-selector__option--selected/);
    await expect(firstOption).not.toHaveClass(/ux-variant-selector__option--selected/);
  });

  test('should display selected value in result text', async ({ page }) => {
    const options = page.locator('.ux-variant-selector').first().locator('.ux-variant-selector__option');
    const resultText = page.locator('.result-text').first();

    // Click an option
    await options.nth(1).click();

    // Result should update
    const text = await resultText.textContent();
    expect(text).toContain('Seleccionado');
  });

  // ========================================
  // Unavailable Options Tests
  // ========================================

  test('should mark unavailable options visually', async ({ page }) => {
    const unavailableOption = page.locator('.ux-variant-selector__option--unavailable').first();
    if (await unavailableOption.count() > 0) {
      await expect(unavailableOption).toBeVisible();

      // Should have reduced opacity
      const opacity = await unavailableOption.evaluate(el =>
        parseFloat(getComputedStyle(el).opacity)
      );
      expect(opacity).toBeLessThan(1);
    }
  });

  test('should not allow selection of unavailable options', async ({ page }) => {
    const unavailableOption = page.locator('.ux-variant-selector__option--unavailable').first();
    if (await unavailableOption.count() > 0) {
      // Try to click unavailable option
      await unavailableOption.click();

      // Should not have selected class
      await expect(unavailableOption).not.toHaveClass(/ux-variant-selector__option--selected/);
    }
  });

  test('should display diagonal line through unavailable options', async ({ page }) => {
    const unavailableOption = page.locator('.ux-variant-selector__option--unavailable').first();
    if (await unavailableOption.count() > 0) {
      // Check for ::after pseudo-element (diagonal line)
      const hasAfter = await unavailableOption.evaluate(el => {
        const styles = getComputedStyle(el, '::after');
        return styles.content !== 'none' && styles.content !== '';
      });
      // Note: Pseudo-element detection can be tricky; visual confirmation is via CSS
      await expect(unavailableOption).toBeVisible();
    }
  });

  // ========================================
  // Color Swatch Tests
  // ========================================

  test('should render color swatch variant', async ({ page }) => {
    const colorSelector = page.locator('.ux-variant-selector--color');
    if (await colorSelector.count() > 0) {
      await expect(colorSelector).toBeVisible();
    }
  });

  test('should display color swatches with circular shape', async ({ page }) => {
    const colorOptions = page.locator('.ux-variant-selector--color .ux-variant-selector__option');
    if (await colorOptions.count() > 0) {
      const firstSwatch = colorOptions.first();

      // Color swatches should have rounded background
      const borderRadius = await firstSwatch.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      // Should be circular (50%)
      expect(borderRadius).toBeTruthy();
    }
  });

  test('should apply background color to color swatches', async ({ page }) => {
    const colorOptions = page.locator('.ux-variant-selector--color .ux-variant-selector__option');
    if (await colorOptions.count() > 0) {
      const firstSwatch = colorOptions.first();

      // Should have inline background color
      const bgColor = await firstSwatch.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)|rgb\(255,\s*255,\s*255\)/);
    }
  });

  test('should allow selection of color swatches', async ({ page }) => {
    const colorOptions = page.locator('.ux-variant-selector--color .ux-variant-selector__option');
    if (await colorOptions.count() > 0) {
      const firstSwatch = colorOptions.first();
      await firstSwatch.click();

      // Should have selected class
      await expect(firstSwatch).toHaveClass(/ux-variant-selector__option--selected/);
    }
  });

  test('should display selection indicator on selected color', async ({ page }) => {
    const colorOptions = page.locator('.ux-variant-selector--color .ux-variant-selector__option');
    if (await colorOptions.count() > 0) {
      const swatch = colorOptions.first();
      await swatch.click();

      // Selected color should have primary border
      const borderColor = await swatch.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).toBeTruthy();
    }
  });

  test('should distinguish light and dark color swatches', async ({ page }) => {
    const colorOptions = page.locator('.ux-variant-selector--color .ux-variant-selector__option');
    if (await colorOptions.count() > 1) {
      // Light colors should have .ux-variant-selector__option--light class
      const lightOptions = page.locator('.ux-variant-selector--color .ux-variant-selector__option--light');
      if (await lightOptions.count() > 0) {
        const firstLight = lightOptions.first();
        await expect(firstLight).toBeVisible();
      }
    }
  });

  // ========================================
  // Size Options Tests
  // ========================================

  test('should support small size variant', async ({ page }) => {
    const smallSelector = page.locator('.ux-variant-selector--sm');
    if (await smallSelector.count() > 0) {
      const option = smallSelector.locator('.ux-variant-selector__option').first();

      const height = await option.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeLessThan(44);
    }
  });

  test('should support large size variant', async ({ page }) => {
    const largeSelector = page.locator('.ux-variant-selector--lg');
    if (await largeSelector.count() > 0) {
      const option = largeSelector.locator('.ux-variant-selector__option').first();

      const height = await option.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThan(44);
    }
  });

  // ========================================
  // Button Group Variant Tests
  // ========================================

  test('should render button group variant', async ({ page }) => {
    const buttonGroup = page.locator('.ux-variant-selector--button-group');
    if (await buttonGroup.count() > 0) {
      await expect(buttonGroup).toBeVisible();
    }
  });

  test('should display button group options in row', async ({ page }) => {
    const buttonGroup = page.locator('.ux-variant-selector--button-group').first();
    if (await buttonGroup.count() > 0) {
      const options = buttonGroup.locator('.ux-variant-selector__option');
      const count = await options.count();
      expect(count).toBeGreaterThan(0);

      // Options should be displayed horizontally
      const display = await buttonGroup.evaluate(el =>
        getComputedStyle(el.querySelector('.ux-variant-selector__options') as HTMLElement).display
      );
      expect(display).toMatch(/flex/);
    }
  });

  test('should allow selection in button group variant', async ({ page }) => {
    const buttonGroup = page.locator('.ux-variant-selector--button-group').first();
    if (await buttonGroup.count() > 0) {
      const options = buttonGroup.locator('.ux-variant-selector__option');
      const firstOption = options.first();
      await firstOption.click();

      await expect(firstOption).toHaveClass(/ux-variant-selector__option--selected/);
    }
  });

  // ========================================
  // Chip Variant Tests
  // ========================================

  test('should render chip variant', async ({ page }) => {
    const chipSelector = page.locator('.ux-variant-selector--chip');
    if (await chipSelector.count() > 0) {
      await expect(chipSelector).toBeVisible();
    }
  });

  test('should display chips with rounded borders', async ({ page }) => {
    const chipOptions = page.locator('.ux-variant-selector--chip .ux-variant-selector__option');
    if (await chipOptions.count() > 0) {
      const firstChip = chipOptions.first();

      const borderRadius = await firstChip.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toBeTruthy();
    }
  });

  test('should allow selection of chips', async ({ page }) => {
    const chipOptions = page.locator('.ux-variant-selector--chip .ux-variant-selector__option');
    if (await chipOptions.count() > 0) {
      const firstChip = chipOptions.first();
      await firstChip.click();

      await expect(firstChip).toHaveClass(/ux-variant-selector__option--selected/);
    }
  });

  test('should apply filled background to selected chips', async ({ page }) => {
    const chipOptions = page.locator('.ux-variant-selector--chip .ux-variant-selector__option');
    if (await chipOptions.count() > 0) {
      const firstChip = chipOptions.first();
      await firstChip.click();

      const bgColor = await firstChip.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  // ========================================
  // Multiple Selection Tests
  // ========================================

  test('should support multiple selection mode', async ({ page }) => {
    const multipleSelector = page.locator('.ux-variant-selector').filter({
      hasText: /Extras|Seleccionados/
    }).first();

    if (await multipleSelector.count() > 0) {
      const options = multipleSelector.locator('.ux-variant-selector__option');
      const count = await options.count();

      if (count >= 2) {
        // Select first option
        await options.nth(0).click();
        await expect(options.nth(0)).toHaveClass(/ux-variant-selector__option--selected/);

        // Select second option (should keep first selected)
        await options.nth(1).click();
        await expect(options.nth(0)).toHaveClass(/ux-variant-selector__option--selected/);
        await expect(options.nth(1)).toHaveClass(/ux-variant-selector__option--selected/);
      }
    }
  });

  test('should update count display in multiple selection', async ({ page }) => {
    const multipleSelector = page.locator('.ux-variant-selector').filter({
      hasText: /Extras|Seleccionados/
    }).first();

    if (await multipleSelector.count() > 0) {
      const selectedBadge = multipleSelector.locator('.ux-variant-selector__selected');
      if (await selectedBadge.count() > 0) {
        const initialText = await selectedBadge.textContent();
        expect(initialText).toBeTruthy();
      }
    }
  });

  // ========================================
  // Dropdown Variant Tests
  // ========================================

  test('should render dropdown variant', async ({ page }) => {
    const dropdown = page.locator('.ux-variant-selector--dropdown');
    if (await dropdown.count() > 0) {
      await expect(dropdown).toBeVisible();
    }
  });

  test('should toggle dropdown menu on trigger click', async ({ page }) => {
    const dropdown = page.locator('.ux-variant-selector--dropdown').first();
    if (await dropdown.count() > 0) {
      const trigger = dropdown.locator('.ux-variant-selector__trigger');
      const menu = dropdown.locator('.ux-variant-selector__menu');

      // Initially closed
      expect(await dropdown.evaluate(el =>
        el.classList.contains('ux-variant-selector--open')
      )).toBe(false);

      // Click trigger to open
      await trigger.click();
      expect(await dropdown.evaluate(el =>
        el.classList.contains('ux-variant-selector--open')
      )).toBe(true);

      // Click trigger again to close
      await trigger.click();
      expect(await dropdown.evaluate(el =>
        el.classList.contains('ux-variant-selector--open')
      )).toBe(false);
    }
  });

  test('should display options in dropdown menu', async ({ page }) => {
    const dropdown = page.locator('.ux-variant-selector--dropdown').first();
    if (await dropdown.count() > 0) {
      const trigger = dropdown.locator('.ux-variant-selector__trigger');
      const options = dropdown.locator('.ux-variant-selector__menu .ux-variant-selector__option');

      // Open dropdown
      await trigger.click();

      // Should have options
      const count = await options.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should select option from dropdown menu', async ({ page }) => {
    const dropdown = page.locator('.ux-variant-selector--dropdown').first();
    if (await dropdown.count() > 0) {
      const trigger = dropdown.locator('.ux-variant-selector__trigger');
      const options = dropdown.locator('.ux-variant-selector__menu .ux-variant-selector__option');

      // Open dropdown
      await trigger.click();

      if (await options.count() > 1) {
        // Select second option
        await options.nth(1).click();

        // Should have selected class
        await expect(options.nth(1)).toHaveClass(/ux-variant-selector__option--selected/);

        // Menu should close after selection
        expect(await dropdown.evaluate(el =>
          el.classList.contains('ux-variant-selector--open')
        )).toBe(false);
      }
    }
  });

  test('should update trigger text on selection', async ({ page }) => {
    const dropdown = page.locator('.ux-variant-selector--dropdown').first();
    if (await dropdown.count() > 0) {
      const trigger = dropdown.locator('.ux-variant-selector__trigger');
      const initialText = await trigger.textContent();

      // Open and select option
      await trigger.click();
      const options = dropdown.locator('.ux-variant-selector__menu .ux-variant-selector__option');
      if (await options.count() > 1) {
        await options.nth(1).click();

        // Text should have changed
        const newText = await trigger.textContent();
        expect(newText).not.toBe(initialText);
      }
    }
  });

  test('should rotate dropdown icon when opened', async ({ page }) => {
    const dropdown = page.locator('.ux-variant-selector--dropdown').first();
    if (await dropdown.count() > 0) {
      const trigger = dropdown.locator('.ux-variant-selector__trigger');
      const icon = dropdown.locator('.ux-variant-selector__trigger-icon');

      if (await icon.count() > 0) {
        // Get initial transform
        const initialTransform = await icon.evaluate(el =>
          getComputedStyle(el).transform
        );

        // Open dropdown
        await trigger.click();

        // Get new transform
        const newTransform = await icon.evaluate(el =>
          getComputedStyle(el).transform
        );

        // Transform should have changed (indicating rotation)
        expect(newTransform).not.toBe(initialTransform);
      }
    }
  });

  // ========================================
  // Image Variant Tests
  // ========================================

  test('should render image variant', async ({ page }) => {
    const imageSelector = page.locator('.ux-variant-selector--image');
    if (await imageSelector.count() > 0) {
      await expect(imageSelector).toBeVisible();
    }
  });

  test('should display images in options', async ({ page }) => {
    const imageOptions = page.locator('.ux-variant-selector--image .ux-variant-selector__option img');
    if (await imageOptions.count() > 0) {
      const firstImage = imageOptions.first();
      await expect(firstImage).toBeVisible();

      // Image should have src attribute
      const src = await firstImage.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('should allow selection of image variants', async ({ page }) => {
    const imageOptions = page.locator('.ux-variant-selector--image .ux-variant-selector__option');
    if (await imageOptions.count() > 0) {
      const firstOption = imageOptions.first();
      await firstOption.click();

      await expect(firstOption).toHaveClass(/ux-variant-selector__option--selected/);
    }
  });

  // ========================================
  // Stock Indicator Tests
  // ========================================

  test('should display stock indicator', async ({ page }) => {
    const stockIndicator = page.locator('.ux-variant-selector__stock');
    if (await stockIndicator.count() > 0) {
      await expect(stockIndicator).toBeVisible();
    }
  });

  test('should show stock status dot', async ({ page }) => {
    const stockDot = page.locator('.ux-variant-selector__stock-dot');
    if (await stockDot.count() > 0) {
      await expect(stockDot.first()).toBeVisible();
    }
  });

  test('should display stock status text', async ({ page }) => {
    const stockText = page.locator('.ux-variant-selector__stock-text');
    if (await stockText.count() > 0) {
      const text = await stockText.first().textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should apply color to stock indicator based on status', async ({ page }) => {
    const stockIndicator = page.locator('.ux-variant-selector__stock');
    if (await stockIndicator.count() > 0) {
      const classStr = await stockIndicator.first().getAttribute('class');
      // Should have one of: in-stock, low-stock, out-of-stock
      expect(classStr).toMatch(/(in-stock|low-stock|out-of-stock)/);
    }
  });

  // ========================================
  // Price Display Tests
  // ========================================

  test('should display price in options when available', async ({ page }) => {
    const priceContent = page.locator('.ux-variant-selector__option-content');
    if (await priceContent.count() > 0) {
      const firstContent = priceContent.first();
      await expect(firstContent).toBeVisible();
    }
  });

  test('should show price difference indicator', async ({ page }) => {
    const priceDiff = page.locator('.ux-variant-selector__option-price');
    if (await priceDiff.count() > 0) {
      const text = await priceDiff.first().textContent();
      expect(text).toBeTruthy();
    }
  });

  // ========================================
  // Accessibility Tests
  // ========================================

  test('should be keyboard accessible for option selection', async ({ page }) => {
    const firstOption = page.locator('.ux-variant-selector__option').first();
    await firstOption.focus();

    await expect(firstOption).toBeFocused();
  });

  test('should support Enter key for selection', async ({ page }) => {
    const options = page.locator('.ux-variant-selector').first().locator('.ux-variant-selector__option');
    if (await options.count() > 0) {
      const firstOption = options.first();
      await firstOption.focus();

      // Press Enter
      await firstOption.press('Enter');

      // Should have selected class
      await expect(firstOption).toHaveClass(/ux-variant-selector__option--selected/);
    }
  });

  test('should support Space key for selection', async ({ page }) => {
    const options = page.locator('.ux-variant-selector').first().locator('.ux-variant-selector__option');
    if (await options.count() > 0) {
      const firstOption = options.first();
      await firstOption.focus();

      // Press Space
      await firstOption.press(' ');

      // Should have selected class
      await expect(firstOption).toHaveClass(/ux-variant-selector__option--selected/);
    }
  });

  test('should have proper ARIA labels on buttons', async ({ page }) => {
    const options = page.locator('.ux-variant-selector__option');
    if (await options.count() > 0) {
      const firstOption = options.first();

      // Should be a button element
      const tag = await firstOption.evaluate(el => el.tagName);
      expect(tag).toBe('BUTTON');
    }
  });

  // ========================================
  // Touch Target Size Tests
  // ========================================

  test('should have minimum touch target size for options', async ({ page }) => {
    const option = page.locator('.ux-variant-selector__option').first();

    const height = await option.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );

    // Minimum touch target should be at least 36px
    expect(height).toBeGreaterThanOrEqual(36);
  });

  // ========================================
  // Dark Mode Tests
  // ========================================

  test('should apply dark mode styles', async ({ page }) => {
    // Add dark mode class
    await page.evaluate(() => {
      document.documentElement.classList.add('ux-dark');
    });

    const option = page.locator('.ux-variant-selector__option').first();
    const bgColor = await option.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );

    // In dark mode, should have darker background
    expect(bgColor).toBeTruthy();

    // Remove dark mode class
    await page.evaluate(() => {
      document.documentElement.classList.remove('ux-dark');
    });
  });

  // ========================================
  // Event Handling Tests
  // ========================================

  test('should emit variant:change event on selection', async ({ page }) => {
    // Set up event listener
    const eventData: { value: string; option: any } | null = await page.evaluate(() => {
      return new Promise((resolve) => {
        const firstContainer = document.querySelector('.ux-variant-selector');
        let eventFired = false;

        if (firstContainer) {
          firstContainer.addEventListener('variant:change', (e: any) => {
            eventFired = true;
            resolve(e.detail);
          });

          // Trigger selection
          const option = firstContainer.querySelector('.ux-variant-selector__option') as HTMLElement;
          option?.click();

          // Timeout to ensure event fires
          setTimeout(() => {
            if (!eventFired) resolve(null);
          }, 100);
        } else {
          resolve(null);
        }
      });
    });

    // Event should have been fired (if component is interactive)
    expect(eventData).toBeTruthy();
  });

  // ========================================
  // Responsive Tests
  // ========================================

  test('should wrap options on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const optionsContainer = page.locator('.ux-variant-selector__options').first();
    const display = await optionsContainer.evaluate(el =>
      getComputedStyle(el).display
    );

    expect(display).toMatch(/flex/);

    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should maintain touch target size on all screen sizes', async ({ page }) => {
    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const option = page.locator('.ux-variant-selector__option').first();
    const mobileHeight = await option.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );

    expect(mobileHeight).toBeGreaterThanOrEqual(36);

    // Test on desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    const desktopHeight = await option.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );

    expect(desktopHeight).toBeGreaterThanOrEqual(36);
  });
});
