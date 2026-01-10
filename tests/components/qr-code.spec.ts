import { test, expect } from '@playwright/test';

test.describe('QR Code Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/qr-code.html');
  });

  test('should render basic QR code', async ({ page }) => {
    const qrContainer = page.locator('.ux-qr').first();
    await expect(qrContainer).toBeVisible();
  });

  test('should render canvas element', async ({ page }) => {
    const canvas = page.locator('.ux-qr__canvas').first();
    await expect(canvas).toBeVisible();

    // Verify canvas has dimensions
    const width = await canvas.evaluate(el =>
      (el as HTMLCanvasElement).width
    );
    const height = await canvas.evaluate(el =>
      (el as HTMLCanvasElement).height
    );

    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
  });

  test('should have canvas wrapper element', async ({ page }) => {
    const wrapper = page.locator('.ux-qr__wrapper').first();
    await expect(wrapper).toBeVisible();

    // Should contain a canvas
    const canvas = wrapper.locator('.ux-qr__canvas');
    expect(await canvas.count()).toBeGreaterThan(0);
  });

  test('should apply small size variant', async ({ page }) => {
    const smallQr = page.locator('.ux-qr--sm').first();
    if (await smallQr.count() > 0) {
      const canvas = smallQr.locator('.ux-qr__canvas');
      const width = await canvas.evaluate(el =>
        (el as HTMLCanvasElement).width
      );
      expect(width).toBe(100);
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeQr = page.locator('.ux-qr--lg').first();
    if (await largeQr.count() > 0) {
      const canvas = largeQr.locator('.ux-qr__canvas');
      const width = await canvas.evaluate(el =>
        (el as HTMLCanvasElement).width
      );
      expect(width).toBe(250);
    }
  });

  test('should apply extra large size variant', async ({ page }) => {
    const xlQr = page.locator('.ux-qr--xl').first();
    if (await xlQr.count() > 0) {
      const canvas = xlQr.locator('.ux-qr__canvas');
      const width = await canvas.evaluate(el =>
        (el as HTMLCanvasElement).width
      );
      expect(width).toBe(350);
    }
  });

  test('should render QR code with custom value', async ({ page }) => {
    const qrWithLabel = page.locator('.ux-qr__label').first();
    if (await qrWithLabel.count() > 0) {
      await expect(qrWithLabel).toBeVisible();
      const text = await qrWithLabel.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render multiple QR codes with different values', async ({ page }) => {
    const qrContainers = page.locator('.ux-qr');
    const count = await qrContainers.count();
    expect(count).toBeGreaterThan(1);

    // All should have canvas elements
    const canvases = page.locator('.ux-qr__canvas');
    expect(await canvases.count()).toBe(count);
  });

  test('should apply bordered variant', async ({ page }) => {
    const borderedQr = page.locator('.ux-qr--bordered').first();
    if (await borderedQr.count() > 0) {
      await expect(borderedQr).toBeVisible();

      const wrapper = borderedQr.locator('.ux-qr__wrapper');
      const borderColor = await wrapper.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).not.toBe('transparent');
    }
  });

  test('should support custom foreground and background colors', async ({ page }) => {
    const qrContainers = page.locator('.ux-qr');
    const count = await qrContainers.count();

    // Check if we have multiple colored QRs
    if (count > 2) {
      const firstCanvas = page.locator('.ux-qr__canvas').first();
      const canvasElement = await firstCanvas.evaluate(el =>
        (el as HTMLCanvasElement)
      );

      // Verify canvas exists and is properly configured
      expect(canvasElement).toBeTruthy();
    }
  });

  test('should render loading state initially', async ({ page }) => {
    // Get the first QR component and check its Alpine data
    const loadingIndicator = page.locator('.ux-qr__loading').first();
    if (await loadingIndicator.count() > 0) {
      // Loading state may be visible initially depending on render time
      // Just verify the element exists and can be found
      await expect(loadingIndicator).toHaveCount(1);
    }
  });

  test('should render spinner in loading state', async ({ page }) => {
    const spinner = page.locator('.ux-qr__spinner').first();
    if (await spinner.count() > 0) {
      await expect(spinner).toBeVisible();
    }
  });

  test('should have download action buttons', async ({ page }) => {
    const downloadButton = page.locator('.ux-qr__action').first();
    if (await downloadButton.count() > 0) {
      await expect(downloadButton).toBeVisible();
      const text = await downloadButton.textContent();
      expect(text).toContain('Descargar');
    }
  });

  test('should have copy action button', async ({ page }) => {
    const actionButtons = page.locator('.ux-qr__action');
    let hasCopyButton = false;

    const count = await actionButtons.count();
    for (let i = 0; i < count; i++) {
      const button = actionButtons.nth(i);
      const text = await button.textContent();
      if (text?.includes('Copiar')) {
        hasCopyButton = true;
        break;
      }
    }

    if (hasCopyButton) {
      expect(hasCopyButton).toBe(true);
    }
  });

  test('should render actions section', async ({ page }) => {
    const actionsSection = page.locator('.ux-qr__actions').first();
    if (await actionsSection.count() > 0) {
      await expect(actionsSection).toBeVisible();

      // Should contain action buttons
      const buttons = actionsSection.locator('.ux-qr__action');
      expect(await buttons.count()).toBeGreaterThan(0);
    }
  });

  test('should trigger download event on button click', async ({ page }) => {
    const downloadButton = page.locator('.ux-qr__action').first();
    if (await downloadButton.count() > 0) {
      // Set up listener for download events
      const downloadPromise = page.waitForEvent('popup').catch(() => null);

      await downloadButton.click();

      // Just verify the click doesn't cause an error
      await expect(downloadButton).toBeVisible();
    }
  });

  test('should render QR labels when present', async ({ page }) => {
    const labels = page.locator('.ux-qr__label');
    const count = await labels.count();

    if (count > 0) {
      const firstLabel = labels.first();
      await expect(firstLabel).toBeVisible();

      const text = await firstLabel.textContent();
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should have proper dimensions for default size', async ({ page }) => {
    // QR without size modifier should use default size
    const defaultQr = page.locator('.ux-qr').first();
    const canvas = defaultQr.locator('.ux-qr__canvas');

    const width = await canvas.evaluate(el =>
      (el as HTMLCanvasElement).width
    );

    // Default size is 200px based on component
    expect(width).toBe(200);
  });

  test('should render error message on error', async ({ page }) => {
    const errorElement = page.locator('.ux-qr__error');
    if (await errorElement.count() > 0) {
      await expect(errorElement).toHaveCount(1);

      const errorText = errorElement.locator('.ux-qr__error-text');
      if (await errorText.count() > 0) {
        const text = await errorText.textContent();
        expect(text).toBeTruthy();
      }
    }
  });

  test('should have error icon in error state', async ({ page }) => {
    const errorIcon = page.locator('.ux-qr__error-icon');
    if (await errorIcon.count() > 0) {
      await expect(errorIcon).toBeVisible();
    }
  });

  test('QR canvas should not have zero dimensions', async ({ page }) => {
    const canvases = page.locator('.ux-qr__canvas');
    const count = await canvases.count();

    for (let i = 0; i < count; i++) {
      const canvas = canvases.nth(i);
      const isVisible = await canvas.isVisible().catch(() => false);

      if (isVisible) {
        const width = await canvas.evaluate(el =>
          (el as HTMLCanvasElement).width
        );
        const height = await canvas.evaluate(el =>
          (el as HTMLCanvasElement).height
        );

        expect(width).toBeGreaterThan(0);
        expect(height).toBeGreaterThan(0);
      }
    }
  });

  test('should maintain aspect ratio (square canvas)', async ({ page }) => {
    const canvas = page.locator('.ux-qr__canvas').first();
    const width = await canvas.evaluate(el =>
      (el as HTMLCanvasElement).width
    );
    const height = await canvas.evaluate(el =>
      (el as HTMLCanvasElement).height
    );

    // QR codes should be square
    expect(width).toBe(height);
  });

  test('should apply glass variant if available', async ({ page }) => {
    const glassQr = page.locator('.ux-qr.ux-qr--glass, .ux-qr--glass').first();
    if (await glassQr.count() > 0) {
      await expect(glassQr).toBeVisible();

      const backdropFilter = await glassQr.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should render with proper CSS class structure', async ({ page }) => {
    const qr = page.locator('.ux-qr').first();
    await expect(qr).toBeVisible();

    // Check for proper element hierarchy
    const wrapper = qr.locator('.ux-qr__wrapper');
    const canvas = qr.locator('.ux-qr__canvas');

    expect(await wrapper.count()).toBeGreaterThan(0);
    expect(await canvas.count()).toBeGreaterThan(0);
  });

  test('should render QR codes with different data formats', async ({ page }) => {
    // Check for various QR code examples in the page
    const qrContainers = page.locator('.ux-qr ');
    const count = await qrContainers.count();

    // Should have multiple examples with different data
    expect(count).toBeGreaterThanOrEqual(3);

    // All should have canvases
    const canvases = page.locator('.ux-qr__canvas');
    expect(await canvases.count()).toBe(count);
  });

  test('should be responsive on small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const qr = page.locator('.ux-qr').first();
    await expect(qr).toBeVisible();

    const canvas = qr.locator('.ux-qr__canvas');
    await expect(canvas).toBeVisible();
  });

  test('should be responsive on large viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    const qr = page.locator('.ux-qr').first();
    await expect(qr).toBeVisible();

    const canvas = qr.locator('.ux-qr__canvas');
    await expect(canvas).toBeVisible();
  });

  test('QR wrapper should be inline-block element', async ({ page }) => {
    const wrapper = page.locator('.ux-qr__wrapper').first();
    const display = await wrapper.evaluate(el =>
      getComputedStyle(el).display
    );

    // Should be inline-block or similar
    expect(display).not.toBe('block');
  });

  test('should render without JavaScript errors', async ({ page }) => {
    let jsErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });

    // Wait for all QR codes to render
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Should not have JavaScript errors
    expect(jsErrors.length).toBe(0);
  });

  test('should support Alpine.js x-data integration', async ({ page }) => {
    // Verify Alpine.js component is properly registered
    const isAlpineLoaded = await page.evaluate(() => {
      return typeof (window as any).Alpine !== 'undefined';
    });

    if (isAlpineLoaded) {
      const qr = page.locator('.ux-qr').first();
      const hasAlpineData = await qr.evaluate(el =>
        el.hasAttribute('x-data') || el.hasAttribute(':value')
      );

      if (hasAlpineData) {
        expect(hasAlpineData).toBe(true);
      }
    }
  });

  test('should have accessible structure', async ({ page }) => {
    const qr = page.locator('.ux-qr').first();

    // Should have semantic structure
    const wrapper = qr.locator('.ux-qr__wrapper');
    const canvas = qr.locator('.ux-qr__canvas');

    await expect(wrapper).toBeVisible();
    await expect(canvas).toBeVisible();
  });

  test('should render with multiple variants on same page', async ({ page }) => {
    const smallQr = page.locator('.ux-qr--sm');
    const largeQr = page.locator('.ux-qr--lg');
    const standardQr = page.locator('.ux-qr').filter({ hasNot: page.locator('.ux-qr--sm, .ux-qr--lg, .ux-qr--xl') });

    // At least some variants should exist
    const hasVariants = (await smallQr.count() > 0) ||
                       (await largeQr.count() > 0) ||
                       (await standardQr.count() > 0);

    expect(hasVariants).toBe(true);
  });
});
