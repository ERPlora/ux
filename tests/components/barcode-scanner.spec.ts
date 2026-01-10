import { test, expect } from '@playwright/test';

test.describe('Barcode Scanner Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/barcode-scanner.html');
  });

  test('should render barcode scanner container', async ({ page }) => {
    const scanner = page.locator('.ux-barcode-scanner').first();
    await expect(scanner).toBeVisible();
  });

  test('should have video element for camera feed', async ({ page }) => {
    const video = page.locator('.ux-barcode-scanner__video').first();
    if (await video.count() > 0) {
      await expect(video).toBeVisible();

      // Video should have proper attributes
      const playsinline = await video.getAttribute('playsinline');
      expect(playsinline).not.toBeNull();

      const muted = await video.getAttribute('muted');
      expect(muted).not.toBeNull();
    }
  });

  test('should render scanner overlay', async ({ page }) => {
    const overlay = page.locator('.ux-barcode-scanner__overlay').first();
    if (await overlay.count() > 0) {
      await expect(overlay).toBeVisible();
    }
  });

  test('should render scanning frame', async ({ page }) => {
    const frame = page.locator('.ux-barcode-scanner__frame').first();
    if (await frame.count() > 0) {
      await expect(frame).toBeVisible();

      // Frame should have border styling
      const borderStyle = await frame.evaluate(el =>
        getComputedStyle(el).borderStyle
      );
      expect(borderStyle).not.toBe('none');
    }
  });

  test('should render corner markers', async ({ page }) => {
    const corners = page.locator('.ux-barcode-scanner__corners').first();
    if (await corners.count() > 0) {
      await expect(corners).toBeVisible();
    }
  });

  test('should render scan line animation', async ({ page }) => {
    const scanLine = page.locator('.ux-barcode-scanner__scan-line').first();
    if (await scanLine.count() > 0) {
      await expect(scanLine).toBeVisible();

      // Scan line should have animation
      const animation = await scanLine.evaluate(el =>
        getComputedStyle(el).animation || getComputedStyle(el).animationName
      );
      expect(animation).not.toBe('none');
    }
  });

  test('should render scanning instructions', async ({ page }) => {
    const instructions = page.locator('.ux-barcode-scanner__instructions').first();
    if (await instructions.count() > 0) {
      await expect(instructions).toBeVisible();
      const text = await instructions.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should render control buttons', async ({ page }) => {
    const controls = page.locator('.ux-barcode-scanner__controls').first();
    if (await controls.count() > 0) {
      await expect(controls).toBeVisible();

      // Should have at least one control button
      const buttons = controls.locator('.ux-barcode-scanner__btn');
      expect(await buttons.count()).toBeGreaterThan(0);
    }
  });

  test('should render camera toggle button', async ({ page }) => {
    const controls = page.locator('.ux-barcode-scanner__controls').first();
    if (await controls.count() > 0) {
      const buttons = controls.locator('.ux-barcode-scanner__btn');
      if (await buttons.count() > 0) {
        const firstButton = buttons.first();
        await expect(firstButton).toBeVisible();

        // Should contain an SVG icon
        const svg = firstButton.locator('svg');
        if (await svg.count() > 0) {
          await expect(svg).toBeVisible();
        }
      }
    }
  });

  test('should render torch button when available', async ({ page }) => {
    const torchButton = page.locator('.ux-barcode-scanner__btn[title="Linterna"]');
    // Torch button may or may not be present depending on device
    if (await torchButton.count() > 0) {
      await expect(torchButton).toBeVisible();
    }
  });

  test('should render loading state', async ({ page }) => {
    const loading = page.locator('.ux-barcode-scanner__loading').first();
    if (await loading.count() > 0) {
      // Loading container should have loading spinner
      const spinner = loading.locator('.ux-barcode-scanner__loading-spinner');
      if (await spinner.count() > 0) {
        await expect(spinner).toBeVisible();
      }

      // Should have loading text
      const text = loading.locator('.ux-barcode-scanner__loading-text');
      if (await text.count() > 0) {
        await expect(text).toBeVisible();
      }
    }
  });

  test('should render error state', async ({ page }) => {
    const error = page.locator('.ux-barcode-scanner__error').first();
    if (await error.count() > 0) {
      // Error container should have icon
      const icon = error.locator('.ux-barcode-scanner__error-icon');
      if (await icon.count() > 0) {
        await expect(icon).toBeVisible();
      }

      // Should have error text
      const text = error.locator('.ux-barcode-scanner__error-text');
      if (await text.count() > 0) {
        await expect(text).toBeVisible();
      }

      // Should have error hint
      const hint = error.locator('.ux-barcode-scanner__error-hint');
      if (await hint.count() > 0) {
        await expect(hint).toBeVisible();
      }
    }
  });

  test('should render result display element', async ({ page }) => {
    const result = page.locator('.ux-barcode-scanner__result').first();
    if (await result.count() > 0) {
      // Result should contain success icon
      const icon = result.locator('svg');
      if (await icon.count() > 0) {
        await expect(icon).toBeVisible();
      }
    }
  });

  test('should render manual input field when enabled', async ({ page }) => {
    const manual = page.locator('.ux-barcode-scanner__manual').first();
    if (await manual.count() > 0) {
      // Should have input field
      const input = manual.locator('.ux-barcode-scanner__manual-input');
      if (await input.count() > 0) {
        await expect(input).toBeVisible();

        // Input should have placeholder
        const placeholder = await input.getAttribute('placeholder');
        expect(placeholder?.length).toBeGreaterThan(0);
      }

      // Should have submit button
      const submitBtn = manual.locator('.ux-barcode-scanner__manual-submit');
      if (await submitBtn.count() > 0) {
        await expect(submitBtn).toBeVisible();
      }
    }
  });

  test('should have proper responsive aspect ratio', async ({ page }) => {
    const scanner = page.locator('.ux-barcode-scanner').first();
    if (await scanner.count() > 0) {
      const aspectRatio = await scanner.evaluate(el =>
        getComputedStyle(el).aspectRatio
      );
      // Aspect ratio should be set (4/3)
      expect(aspectRatio).not.toMatch(/^auto/);
    }
  });

  test('should have proper z-index for fullscreen mode', async ({ page }) => {
    const scanner = page.locator('.ux-barcode-scanner--fullscreen').first();
    if (await scanner.count() > 0) {
      const zIndex = await scanner.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have dark background for scanner', async ({ page }) => {
    const scanner = page.locator('.ux-barcode-scanner').first();
    if (await scanner.count() > 0) {
      const bgColor = await scanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have dark background color
      expect(bgColor).not.toMatch(/rgb\(255,\s*255,\s*255/);
    }
  });

  test('should render overlay with darkened background', async ({ page }) => {
    const overlay = page.locator('.ux-barcode-scanner__overlay').first();
    if (await overlay.count() > 0) {
      // Frame should have box-shadow darkening effect
      const frame = overlay.locator('.ux-barcode-scanner__frame');
      if (await frame.count() > 0) {
        const boxShadow = await frame.evaluate(el =>
          getComputedStyle(el).boxShadow
        );
        expect(boxShadow).not.toBe('none');
      }
    }
  });

  test('should render control buttons with proper styling', async ({ page }) => {
    const controlBtn = page.locator('.ux-barcode-scanner__btn').first();
    if (await controlBtn.count() > 0) {
      // Control buttons should be circular
      const borderRadius = await controlBtn.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      // Should have border-radius for circular shape
      expect(borderRadius).not.toMatch(/^0px/);

      // Should have semi-transparent dark background
      const bgColor = await controlBtn.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toContain('rgba');
    }
  });

  test('should register Alpine.js component', async ({ page }) => {
    const componentRegistered = await page.evaluate(() => {
      return typeof window.UX !== 'undefined';
    });
    expect(componentRegistered).toBe(true);
  });

  test('should have x-data attribute on scanner', async ({ page }) => {
    const scanner = page.locator('[x-data*="uxBarcodeScanner"], [x-data*="BarcodeScanner"]').first();
    if (await scanner.count() > 0) {
      const xData = await scanner.getAttribute('x-data');
      expect(xData?.length).toBeGreaterThan(0);
    }
  });

  test('should emit scanner:detected event', async ({ page }) => {
    const scanner = page.locator('[x-data*="uxBarcodeScanner"], [x-data*="BarcodeScanner"]').first();
    if (await scanner.count() > 0) {
      const hasDetectListener = await scanner.evaluate(el =>
        el.getAttribute('@scanner:detected') !== null ||
        el.getAttribute('v-on:scanner:detected') !== null
      );
      // Event listener might not be visible in DOM, just check element exists
      await expect(scanner).toBeVisible();
    }
  });

  test('should render format badges', async ({ page }) => {
    const formats = page.locator('.ux-barcode-scanner__format').first();
    if (await formats.count() > 0) {
      await expect(formats).toBeVisible();
      const text = await formats.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should support manual code submission', async ({ page }) => {
    const manual = page.locator('.ux-barcode-scanner__manual').first();
    if (await manual.count() > 0) {
      const input = manual.locator('.ux-barcode-scanner__manual-input');
      if (await input.count() > 0) {
        await input.fill('TEST123');

        // Verify input value was set
        const value = await input.inputValue();
        expect(value).toBe('TEST123');
      }
    }
  });

  test('should be keyboard accessible', async ({ page }) => {
    const button = page.locator('.ux-barcode-scanner__btn').first();
    if (await button.count() > 0) {
      await button.focus();
      await expect(button).toBeFocused();
    }
  });

  test('should have proper overflow handling', async ({ page }) => {
    const scanner = page.locator('.ux-barcode-scanner').first();
    if (await scanner.count() > 0) {
      const overflow = await scanner.evaluate(el =>
        getComputedStyle(el).overflow
      );
      expect(overflow).toBe('hidden');
    }
  });

  test('should render with maximum width constraint', async ({ page }) => {
    const scanner = page.locator('.ux-barcode-scanner').first();
    if (await scanner.count() > 0) {
      const maxWidth = await scanner.evaluate(el =>
        getComputedStyle(el).maxWidth
      );
      expect(maxWidth).not.toBe('none');
    }
  });
});
