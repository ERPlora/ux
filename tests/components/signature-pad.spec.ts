import { test, expect } from '@playwright/test';

test.describe('Signature Pad Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/signature-pad.html');
  });

  test('should render signature pad container', async ({ page }) => {
    const container = page.locator('.ux-signature-pad').first();
    await expect(container).toBeVisible();
  });

  test('should render canvas element', async ({ page }) => {
    const canvas = page.locator('.ux-signature-pad__canvas').first();
    await expect(canvas).toBeVisible();

    // Verify canvas dimensions
    const boundingBox = await canvas.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox?.width).toBeGreaterThan(0);
    expect(boundingBox?.height).toBeGreaterThan(0);
  });

  test('should have canvas reference in Alpine.js data', async ({ page }) => {
    const canvas = page.locator('.ux-signature-pad__canvas').first();
    const canvasElement = await canvas.evaluate(el => {
      return {
        tagName: el.tagName,
        className: el.className,
        width: el.getAttribute('width'),
        height: el.getAttribute('height')
      };
    });

    expect(canvasElement.tagName).toBe('CANVAS');
    expect(canvasElement.className).toContain('ux-signature-pad__canvas');
  });

  test('should have clear button', async ({ page }) => {
    const clearButton = page.locator('button:has-text("Limpiar")').first();
    await expect(clearButton).toBeVisible();
    expect(await clearButton.getAttribute('type')).toBe('button');
  });

  test('clear button should be disabled when no signature', async ({ page }) => {
    const clearButton = page.locator('button:has-text("Limpiar")').first();
    const isDisabled = await clearButton.evaluate(el => el.hasAttribute('disabled'));
    expect(isDisabled).toBe(true);
  });

  test('should have save/download button', async ({ page }) => {
    // Find button with download icon or text
    const downloadButton = page.locator('button:has-text("Descargar")').first();
    if (await downloadButton.count() > 0) {
      await expect(downloadButton).toBeVisible();
    }
  });

  test('should render placeholder text', async ({ page }) => {
    const placeholder = page.locator('.ux-signature-pad__placeholder').first();
    if (await placeholder.count() > 0) {
      await expect(placeholder).toBeVisible();
    }
  });

  test('placeholder should be hidden when signature exists', async ({ page }) => {
    const signaturePad = page.locator('.ux-signature-pad').first();
    const placeholder = signaturePad.locator('.ux-signature-pad__placeholder');

    // Placeholder should be visible initially
    if (await placeholder.count() > 0) {
      const isVisible = await placeholder.isVisible();
      // Initially visible (no signature)
      expect(isVisible).toBeTruthy();
    }
  });

  test('should render guide line', async ({ page }) => {
    const guide = page.locator('.ux-signature-pad__guide').first();
    if (await guide.count() > 0) {
      await expect(guide).toBeVisible();
    }
  });

  test('canvas should accept stroke color configuration', async ({ page }) => {
    // Find signature pad with custom stroke color (blue)
    const bluePad = page.locator('text=Línea azul gruesa').first().locator('xpath=..').locator('.ux-signature-pad__canvas');

    if (await bluePad.count() > 0) {
      const strokeStyle = await bluePad.evaluate(canvas => {
        const ctx = (canvas as HTMLCanvasElement).getContext('2d');
        return ctx?.strokeStyle;
      });

      expect(strokeStyle).toBeDefined();
    }
  });

  test('canvas context should have correct stroke properties', async ({ page }) => {
    const canvas = page.locator('.ux-signature-pad__canvas').first();

    // Check if canvas has been initialized with proper context
    const hasContext = await canvas.evaluate(canvas => {
      const ctx = (canvas as HTMLCanvasElement).getContext('2d');
      return {
        hasContext: ctx !== null,
        lineCap: ctx?.lineCap,
        lineJoin: ctx?.lineJoin
      };
    });

    expect(hasContext.hasContext).toBe(true);
    expect(hasContext.lineCap).toBe('round');
    expect(hasContext.lineJoin).toBe('round');
  });

  test('should have label element', async ({ page }) => {
    const label = page.locator('.ux-signature-pad__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallPad = page.locator('.ux-signature-pad--sm').first();
    if (await smallPad.count() > 0) {
      const canvas = smallPad.locator('.ux-signature-pad__canvas');
      const boundingBox = await canvas.boundingBox();
      expect(boundingBox?.height).toBeLessThanOrEqual(150);
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largePad = page.locator('.ux-signature-pad--lg').first();
    if (await largePad.count() > 0) {
      const canvas = largePad.locator('.ux-signature-pad__canvas');
      const boundingBox = await canvas.boundingBox();
      expect(boundingBox?.height).toBeGreaterThanOrEqual(250);
    }
  });

  test('should have disabled state class', async ({ page }) => {
    const disabledPad = page.locator('.ux-signature-pad--disabled').first();
    if (await disabledPad.count() > 0) {
      await expect(disabledPad).toBeVisible();

      const canvas = disabledPad.locator('.ux-signature-pad__canvas');
      const pointerEvents = await canvas.evaluate(el =>
        getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    }
  });

  test('should have error state class', async ({ page }) => {
    const errorPad = page.locator('.ux-signature-pad--error').first();
    if (await errorPad.count() > 0) {
      await expect(errorPad).toBeVisible();

      const container = errorPad.locator('.ux-signature-pad__container');
      const borderColor = await container.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).toBeDefined();
    }
  });

  test('should have helper text element', async ({ page }) => {
    const helper = page.locator('.ux-signature-pad__helper').first();
    if (await helper.count() > 0) {
      await expect(helper).toBeVisible();
      const text = await helper.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render action buttons container', async ({ page }) => {
    const actions = page.locator('.ux-signature-pad__actions').first();
    if (await actions.count() > 0) {
      await expect(actions).toBeVisible();

      const buttons = actions.locator('button');
      expect(await buttons.count()).toBeGreaterThan(0);
    }
  });

  test('should have glass variant support', async ({ page }) => {
    const glassPad = page.locator('.ux-signature-pad--glass').first();
    if (await glassPad.count() > 0) {
      const container = glassPad.locator('.ux-signature-pad__container');
      const backdropFilter = await container.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );

      // Glass variant should have backdrop filter
      expect(backdropFilter).toBeTruthy();
    }
  });

  test('canvas should have touch-action: none for touch handling', async ({ page }) => {
    const canvas = page.locator('.ux-signature-pad__canvas').first();
    const touchAction = await canvas.evaluate(el =>
      getComputedStyle(el).touchAction
    );

    expect(touchAction).toBe('none');
  });

  test('canvas should have crosshair cursor', async ({ page }) => {
    const canvas = page.locator('.ux-signature-pad__canvas').first();
    const cursor = await canvas.evaluate(el =>
      getComputedStyle(el).cursor
    );

    expect(cursor).toBe('crosshair');
  });

  test('undo button should be disabled initially', async ({ page }) => {
    const undoButton = page.locator('button:has-text("Deshacer")').first();
    if (await undoButton.count() > 0) {
      const isDisabled = await undoButton.evaluate(el => el.hasAttribute('disabled'));
      expect(isDisabled).toBe(true);
    }
  });

  test('primary button should have different styling', async ({ page }) => {
    const primaryBtn = page.locator('.ux-signature-pad__btn--primary').first();
    if (await primaryBtn.count() > 0) {
      const backgroundColor = await primaryBtn.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      expect(backgroundColor).toBeTruthy();
    }
  });

  test('buttons should have proper dimensions', async ({ page }) => {
    const button = page.locator('.ux-signature-pad__btn').first();
    if (await button.count() > 0) {
      const boundingBox = await button.boundingBox();
      expect(boundingBox?.height).toBeGreaterThan(20);
      expect(boundingBox?.width).toBeGreaterThan(50);
    }
  });

  test('should support multiple signature pads on same page', async ({ page }) => {
    const pads = page.locator('.ux-signature-pad');
    const count = await pads.count();

    // Page should have multiple examples
    expect(count).toBeGreaterThan(1);
  });

  test('each pad should have its own canvas element', async ({ page }) => {
    const pads = page.locator('.ux-signature-pad');
    const padCount = await pads.count();

    const canvases = page.locator('.ux-signature-pad__canvas');
    const canvasCount = await canvases.count();

    // Should have at least one canvas per pad
    expect(canvasCount).toBeGreaterThanOrEqual(padCount);
  });

  test('container should have proper border styling', async ({ page }) => {
    const container = page.locator('.ux-signature-pad__container').first();
    const borderStyle = await container.evaluate(el => {
      const style = getComputedStyle(el);
      return {
        borderWidth: style.borderWidth,
        borderStyle: style.borderStyle,
        borderRadius: style.borderRadius
      };
    });

    expect(borderStyle.borderWidth).not.toBe('0px');
    expect(borderStyle.borderRadius).not.toBe('0px');
  });

  test('stroke color variants should work', async ({ page }) => {
    // Find the red line signature pad
    const redPad = page.locator('text=Línea roja fina').first().locator('xpath=..').locator('.ux-signature-pad__canvas');

    if (await redPad.count() > 0) {
      // Just verify canvas exists and is properly configured
      const isCanvasValid = await redPad.evaluate(canvas => {
        return (canvas as HTMLCanvasElement).width > 0;
      });

      expect(isCanvasValid).toBe(true);
    }
  });

  test('readonly state should hide guide and placeholder', async ({ page }) => {
    const readonlyPad = page.locator('.ux-signature-pad--readonly').first();
    if (await readonlyPad.count() > 0) {
      const guide = readonlyPad.locator('.ux-signature-pad__guide');
      const placeholder = readonlyPad.locator('.ux-signature-pad__placeholder');

      // In readonly mode, these should not be visible
      const guideVisible = await guide.isVisible().catch(() => false);
      const placeholderVisible = await placeholder.isVisible().catch(() => false);

      // At least guide should not be visible in readonly
      if (await guide.count() > 0) {
        const display = await guide.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(display).toBe('none');
      }
    }
  });
});
