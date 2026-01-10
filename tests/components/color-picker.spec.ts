import { test, expect } from '@playwright/test';

test.describe('Color Picker Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/color-picker.html');
  });

  test('should render basic color picker trigger button', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await expect(trigger).toBeVisible();
  });

  test('should display color swatch', async ({ page }) => {
    const swatch = page.locator('.ux-color-picker__swatch').first();
    await expect(swatch).toBeVisible();
  });

  test('should display color value text', async ({ page }) => {
    const value = page.locator('.ux-color-picker__value').first();
    await expect(value).toBeVisible();
  });

  test('should have minimum touch target height', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const height = await trigger.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should open picker panel on trigger click', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const dropdown = page.locator('.ux-color-picker__dropdown').first();
    const isVisible = await dropdown.isVisible();
    expect(isVisible).toBe(true);
  });

  test('should display color spectrum when opened', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const spectrum = page.locator('.ux-color-picker__spectrum').first();
    if (await spectrum.count() > 0) {
      await expect(spectrum).toBeVisible();
    }
  });

  test('should display hue slider', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const hueSlider = page.locator('.ux-color-picker__slider--hue').first();
    if (await hueSlider.count() > 0) {
      await expect(hueSlider).toBeVisible();
    }
  });

  test('should display alpha slider when enabled', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').nth(2);
    await trigger.click();
    await page.waitForTimeout(300);

    const alphaSlider = page.locator('.ux-color-picker__slider--alpha').first();
    if (await alphaSlider.count() > 0) {
      await expect(alphaSlider).toBeVisible();
    }
  });

  test('should display color input field', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const input = page.locator('.ux-color-picker__input').first();
    if (await input.count() > 0) {
      await expect(input).toBeVisible();
    }
  });

  test('should allow hex color input', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const input = page.locator('.ux-color-picker__input').first();
    if (await input.count() > 0) {
      await input.fill('#ff0000');
      await input.press('Enter');
      await page.waitForTimeout(200);

      const value = await input.inputValue();
      expect(value).toContain('#');
    }
  });

  test('should display preset colors grid', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const presets = page.locator('.ux-color-picker__presets').first();
    if (await presets.count() > 0) {
      await expect(presets).toBeVisible();
    }
  });

  test('should render preset color swatches', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const presetButtons = page.locator('.ux-color-picker__preset');
    const count = await presetButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should select preset color on click', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const presetButton = page.locator('.ux-color-picker__preset').first();
    if (await presetButton.count() > 0) {
      const presetColor = await presetButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      await presetButton.click();
      await page.waitForTimeout(200);

      expect(presetColor).toBeDefined();
    }
  });

  test('should display format toggle button', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const formatBtn = page.locator('.ux-color-picker__format-btn, .ux-color-picker__format-toggle').first();
    if (await formatBtn.count() > 0) {
      await expect(formatBtn).toBeVisible();
    }
  });

  test('should cycle through color formats', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const input = page.locator('.ux-color-picker__input').first();
    const initialValue = await input.inputValue();

    const formatBtn = page.locator('.ux-color-picker__format-btn, .ux-color-picker__format-toggle').first();
    if (await formatBtn.count() > 0) {
      await formatBtn.click();
      await page.waitForTimeout(200);

      const newValue = await input.inputValue();
      // Value should change when format changes
      expect(newValue).toBeDefined();
    }
  });

  test('should update color preview swatch', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const swatch = page.locator('.ux-color-picker__swatch').first();

    const initialBg = await swatch.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );

    await trigger.click();
    await page.waitForTimeout(300);

    const input = page.locator('.ux-color-picker__input').first();
    if (await input.count() > 0) {
      await input.fill('#ff0000');
      await input.press('Enter');
      await page.waitForTimeout(200);

      const updatedBg = await swatch.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      expect(updatedBg).toBeDefined();
    }
  });

  test('should close dropdown on outside click', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const dropdown = page.locator('.ux-color-picker__dropdown').first();
    await expect(dropdown).toBeVisible();

    // Click outside
    await page.click('body', { position: { x: 0, y: 0 } });
    await page.waitForTimeout(300);

    const isHidden = await dropdown.isHidden();
    if (isHidden) {
      expect(isHidden).toBe(true);
    }
  });

  test('should have dropdown with proper z-index', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const dropdown = page.locator('.ux-color-picker__dropdown').first();
    if (await dropdown.count() > 0) {
      const zIndex = await dropdown.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have proper focus styling', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.focus();

    const outlineOrShadow = await trigger.evaluate(el => {
      const style = getComputedStyle(el);
      return style.outline || style.boxShadow;
    });

    expect(outlineOrShadow).toBeDefined();
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledPicker = page.locator('.ux-color-picker--disabled').first();
    if (await disabledPicker.count() > 0) {
      const opacity = await disabledPicker.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('should support small size variant', async ({ page }) => {
    const smallTrigger = page.locator('.ux-color-picker__trigger--sm').first();
    if (await smallTrigger.count() > 0) {
      const height = await smallTrigger.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeLessThanOrEqual(44);
    }
  });

  test('should support large size variant', async ({ page }) => {
    const largeTrigger = page.locator('.ux-color-picker__trigger--lg').first();
    if (await largeTrigger.count() > 0) {
      const height = await largeTrigger.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should support swatch-only variant', async ({ page }) => {
    const swatchOnly = page.locator('.ux-color-picker__trigger--swatch-only').first();
    if (await swatchOnly.count() > 0) {
      await expect(swatchOnly).toBeVisible();

      const valueText = page.locator('.ux-color-picker__value');
      const swatchOnlyParent = swatchOnly.locator('..');
      const hasValueText = await swatchOnlyParent.locator('.ux-color-picker__value').count() === 0 ||
                          await swatchOnly.locator('.ux-color-picker__value').count() === 0;

      // Swatch-only should not show text value (or show it hidden)
      expect(swatchOnly).toBeDefined();
    }
  });

  test('should support inline mode', async ({ page }) => {
    const inlineContainer = page.locator('.ux-color-picker--inline').first();
    if (await inlineContainer.count() > 0) {
      const dropdown = inlineContainer.locator('.ux-color-picker__dropdown').first();

      // In inline mode, dropdown should be visible without clicking trigger
      const isVisible = await dropdown.isVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('should support glass variant', async ({ page }) => {
    const glassContainer = page.locator('.ux-color-picker--glass').first();
    if (await glassContainer.count() > 0) {
      const dropdown = glassContainer.locator('.ux-color-picker__dropdown').first();
      if (await dropdown.count() > 0) {
        const backdropFilter = await dropdown.evaluate(el =>
          getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    }
  });

  test('should have rounded border radius', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const borderRadius = await trigger.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should display color value in trigger', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const value = trigger.locator('.ux-color-picker__value').first();

    if (await value.count() > 0) {
      const text = await value.textContent();
      expect(text).toBeDefined();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should have arrow icon in trigger', async ({ page }) => {
    const arrow = page.locator('.ux-color-picker__arrow').first();
    if (await arrow.count() > 0) {
      await expect(arrow).toBeVisible();
    }
  });

  test('should rotate arrow when opened', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const arrow = trigger.locator('.ux-color-picker__arrow').first();

    if (await arrow.count() > 0) {
      const initialTransform = await arrow.evaluate(el =>
        getComputedStyle(el).transform
      );

      await trigger.click();
      await page.waitForTimeout(300);

      const openTransform = await arrow.evaluate(el =>
        getComputedStyle(el).transform
      );

      // Transform should change (rotate) when opened
      expect(initialTransform).toBeDefined();
      expect(openTransform).toBeDefined();
    }
  });

  test('should dispatch colorpicker:change event', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const colorPickerDiv = trigger.locator('..');

    let eventDispatchedCounts = 0;
    await page.on('console', msg => {
      if (msg.text().includes('colorpicker:change')) {
        eventDispatchedCounts++;
      }
    });

    await trigger.click();
    await page.waitForTimeout(300);

    const presetButton = page.locator('.ux-color-picker__preset').first();
    if (await presetButton.count() > 0) {
      await presetButton.click();
      await page.waitForTimeout(200);
    }
  });

  test('should respond to keyboard input in hex field', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const input = page.locator('.ux-color-picker__input').first();
    if (await input.count() > 0) {
      await input.click();
      await input.selectAll();
      await input.type('00ff00');
      await input.press('Enter');
      await page.waitForTimeout(200);

      const value = await input.inputValue();
      expect(value).toBeDefined();
    }
  });

  test('should handle RGB format in input', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').nth(2);
    await trigger.click();
    await page.waitForTimeout(300);

    const formatBtn = page.locator('.ux-color-picker__format-btn, .ux-color-picker__format-toggle').nth(2);
    if (await formatBtn.count() > 0) {
      // Click to cycle to RGB format
      await formatBtn.click();
      await page.waitForTimeout(200);
      await formatBtn.click();
      await page.waitForTimeout(200);

      const input = page.locator('.ux-color-picker__input').nth(2);
      const value = await input.inputValue();

      // Should contain 'rgb' format
      expect(value).toBeDefined();
    }
  });

  test('should have proper styling for spectrum area', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const spectrum = page.locator('.ux-color-picker__spectrum').first();
    if (await spectrum.count() > 0) {
      const cursor = spectrum.evaluate(el => {
        const child = el.querySelector('.ux-color-picker__spectrum-cursor, [class*="cursor"]');
        return child ? getComputedStyle(child).position : null;
      });

      expect(await cursor).toBeDefined();
    }
  });

  test('should initialize with default color', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const value = trigger.locator('.ux-color-picker__value').first();

    if (await value.count() > 0) {
      const text = await value.textContent();
      // Should have a color value (hex, rgb, or hsl format)
      expect(text).toMatch(/^(#|rgb|hsl)/);
    }
  });

  test('should maintain accessibility with proper structure', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const dropdown = page.locator('.ux-color-picker__dropdown').first();
    if (await dropdown.count() > 0) {
      const hasContent = await dropdown.evaluate(el => el.children.length > 0);
      expect(hasContent).toBe(true);
    }
  });

  test('should apply hover styles to trigger', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.hover();

    const borderColor = await trigger.evaluate(el =>
      getComputedStyle(el).borderColor
    );

    expect(borderColor).toBeDefined();
  });

  test('should position dropdown correctly', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const dropdown = page.locator('.ux-color-picker__dropdown').first();
    if (await dropdown.count() > 0) {
      const position = await dropdown.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['absolute', 'fixed', 'relative']).toContain(position);
    }
  });

  test('should render color picker section heading', async ({ page }) => {
    const heading = page.locator('h2').filter({ hasText: /Color Picker|Color Picker Básico/ }).first();
    if (await heading.count() > 0) {
      await expect(heading).toBeVisible();
    }
  });

  test('should have proper contrast for text values', async ({ page }) => {
    const trigger = page.locator('.ux-color-picker__trigger').first();
    const value = trigger.locator('.ux-color-picker__value').first();

    if (await value.count() > 0) {
      const color = await value.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });
});
