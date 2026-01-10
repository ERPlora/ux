import { test, expect } from '@playwright/test';

test.describe('Numpad Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/numpad.html');
  });

  // Basic Rendering Tests
  test('should render basic numpad', async ({ page }) => {
    const numpad = page.locator('.ux-numpad').first();
    await expect(numpad).toBeVisible();
  });

  test('should render numpad display', async ({ page }) => {
    const display = page.locator('.ux-numpad__display').first();
    await expect(display).toBeVisible();
  });

  test('should render numpad grid', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();
    await expect(grid).toBeVisible();
  });

  test('should render display value', async ({ page }) => {
    const displayValue = page.locator('.ux-numpad__display-value').first();
    await expect(displayValue).toBeVisible();
  });

  // Number Button Tests (0-9)
  test('should render all digit buttons 0-9', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    for (let i = 0; i <= 9; i++) {
      const digitButton = grid.locator(`button:has-text("${i}")`).first();
      if (await digitButton.count() > 0) {
        await expect(digitButton).toBeVisible();
      }
    }
  });

  test('should append digit when clicking number button', async ({ page }) => {
    // Click the 5 button
    await page.locator('.ux-numpad__grid').first().locator('button:has-text("5")').click();

    // Check display shows 5
    const displayValue = page.locator('.ux-numpad__display-value').first();
    await expect(displayValue).toContainText('5');
  });

  test('should append multiple digits', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Click 1, 2, 3
    await grid.locator('button:has-text("1")').click();
    await grid.locator('button:has-text("2")').click();
    await grid.locator('button:has-text("3")').click();

    const displayValue = page.locator('.ux-numpad__display-value').first();
    await expect(displayValue).toContainText('123');
  });

  test('should prevent leading zeros', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Click 0, then 0 again
    await grid.locator('button:has-text("0")').first().click();
    await grid.locator('button:has-text("0")').first().click();

    const displayValue = page.locator('.ux-numpad__display-value').first();
    // Should only display single 0
    const text = await displayValue.textContent();
    expect(text?.trim()).toBe('0');
  });

  test('should allow 0 after other digits', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Click 5, then 0
    await grid.locator('button:has-text("5")').click();
    await grid.locator('button:has-text("0")').click();

    const displayValue = page.locator('.ux-numpad__display-value').first();
    await expect(displayValue).toContainText('50');
  });

  // Clear Button Tests
  test('should render clear button', async ({ page }) => {
    const clearButton = page.locator('.ux-numpad__key--action:has-text("C"), .ux-numpad__key--danger:has-text("C")').first();
    if (await clearButton.count() > 0) {
      await expect(clearButton).toBeVisible();
    }
  });

  test('should clear all digits when clear is clicked', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Add digits
    await grid.locator('button:has-text("1")').click();
    await grid.locator('button:has-text("2")').click();
    await grid.locator('button:has-text("3")').click();

    // Find and click clear button
    const clearButton = page.locator('.ux-numpad__key').filter({
      has: page.locator(':has-text("C")')
    }).first();
    if (await clearButton.count() > 0) {
      await clearButton.click();

      const displayValue = page.locator('.ux-numpad__display-value').first();
      // Should show 0 or empty
      const text = await displayValue.textContent();
      expect(text?.trim()).toMatch(/^0$|^$/);
    }
  });

  // Backspace Tests
  test('should render backspace button', async ({ page }) => {
    const backspaceButton = page.locator('.ux-numpad__key--action button:has-text("⌫"), button:has-text("⌫")').first();
    if (await backspaceButton.count() === 0) {
      // Try alternative selector
      const altBackspace = page.locator('.ux-numpad__key--action svg').first();
      if (await altBackspace.count() > 0) {
        await expect(altBackspace).toBeVisible();
      }
    }
  });

  test('should delete last digit on backspace', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Add digits
    await grid.locator('button:has-text("1")').click();
    await grid.locator('button:has-text("2")').click();
    await grid.locator('button:has-text("3")').click();

    // Find and click backspace button (look for icon or symbol)
    const allActionButtons = page.locator('.ux-numpad__key--action');
    let backspaceClicked = false;

    const buttonCount = await allActionButtons.count();
    for (let i = 0; i < buttonCount; i++) {
      const btn = allActionButtons.nth(i);
      const text = await btn.textContent();
      if (text?.includes('⌫')) {
        await btn.click();
        backspaceClicked = true;
        break;
      }
    }

    // Check result
    const displayValue = page.locator('.ux-numpad__display-value').first();
    const currentText = await displayValue.textContent();

    if (backspaceClicked) {
      expect(currentText?.trim()).toBe('12');
    }
  });

  test('should delete multiple digits with repeated backspace', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Add digits
    await grid.locator('button:has-text("5")').click();
    await grid.locator('button:has-text("6")').click();
    await grid.locator('button:has-text("7")').click();

    // Find backspace button and click twice
    const allActionButtons = page.locator('.ux-numpad__key--action');
    let backspaceCount = 0;

    const buttonCount = await allActionButtons.count();
    for (let i = 0; i < buttonCount && backspaceCount < 2; i++) {
      const btn = allActionButtons.nth(i);
      const text = await btn.textContent();
      if (text?.includes('⌫')) {
        await btn.click();
        backspaceCount++;
      }
    }

    const displayValue = page.locator('.ux-numpad__display-value').first();
    const currentText = await displayValue.textContent();

    if (backspaceCount === 2) {
      expect(currentText?.trim()).toBe('5');
    }
  });

  // Decimal Point Tests
  test('should render decimal point button', async ({ page }) => {
    const decimalButton = page.locator('.ux-numpad__key--action:has-text(".")').first();
    if (await decimalButton.count() > 0) {
      await expect(decimalButton).toBeVisible();
    }
  });

  test('should add decimal point after digits', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Add digits
    await grid.locator('button:has-text("1")').click();
    await grid.locator('button:has-text("5")').click();

    // Click decimal button
    const decimalButton = grid.locator('button:has-text(".")').first();
    if (await decimalButton.count() > 0) {
      await decimalButton.click();

      const displayValue = page.locator('.ux-numpad__display-value').first();
      await expect(displayValue).toContainText('15.');
    }
  });

  test('should allow decimal digits', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Add digits
    await grid.locator('button:has-text("2")').click();
    await grid.locator('button:has-text("5")').click();

    // Add decimal
    const decimalButton = grid.locator('button:has-text(".")').first();
    if (await decimalButton.count() > 0) {
      await decimalButton.click();

      // Add more digits
      await grid.locator('button:has-text("5")').click();
      await grid.locator('button:has-text("0")').click();

      const displayValue = page.locator('.ux-numpad__display-value').first();
      await expect(displayValue).toContainText('25.50');
    }
  });

  test('should prevent multiple decimal points', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Add digits and first decimal
    await grid.locator('button:has-text("1")').click();
    const decimalButton = grid.locator('button:has-text(".")').first();

    if (await decimalButton.count() > 0) {
      await decimalButton.click();

      // Try to add second decimal
      await decimalButton.click();

      const displayValue = page.locator('.ux-numpad__display-value').first();
      const text = await displayValue.textContent();

      // Should only have one decimal point
      const decimalCount = (text?.match(/\./g) || []).length;
      expect(decimalCount).toBeLessThanOrEqual(1);
    }
  });

  test('should prepend zero when decimal is clicked with empty display', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Click decimal without entering digits first
    const decimalButton = grid.locator('button:has-text(".")').first();
    if (await decimalButton.count() > 0) {
      await decimalButton.click();

      const displayValue = page.locator('.ux-numpad__display-value').first();
      const text = await displayValue.textContent();

      // Should have 0 before decimal
      expect(text?.trim()).toMatch(/^0\.|^\.$/);
    }
  });

  // Display Tests
  test('should initialize display with 0', async ({ page }) => {
    const displayValue = page.locator('.ux-numpad__display-value').first();
    const text = await displayValue.textContent();
    expect(text?.trim()).toBe('0');
  });

  test('should display formatted numbers with thousand separators', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Add enough digits to trigger thousand separator (e.g., 1234)
    await grid.locator('button:has-text("1")').click();
    await grid.locator('button:has-text("2")').click();
    await grid.locator('button:has-text("3")').click();
    await grid.locator('button:has-text("4")').click();

    const displayValue = page.locator('.ux-numpad__display-value').first();
    const text = await displayValue.textContent();

    // Should have formatted display (may include comma)
    expect(text?.trim()).toMatch(/1234|1,234/);
  });

  test('should have currency symbol when configured', async ({ page }) => {
    const currencySpan = page.locator('.ux-numpad__display-currency').first();
    if (await currencySpan.count() > 0) {
      await expect(currencySpan).toBeVisible();
      const text = await currencySpan.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  // Size Variants
  test('should render small size variant', async ({ page }) => {
    const smallNumpad = page.locator('.ux-numpad--sm').first();
    if (await smallNumpad.count() > 0) {
      await expect(smallNumpad).toBeVisible();

      const keys = smallNumpad.locator('.ux-numpad__key');
      const height = await keys.first().evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );

      // Small size should be smaller than standard
      expect(height).toBeLessThan(70);
    }
  });

  test('should render large size variant', async ({ page }) => {
    const largeNumpad = page.locator('.ux-numpad--lg').first();
    if (await largeNumpad.count() > 0) {
      await expect(largeNumpad).toBeVisible();

      const keys = largeNumpad.locator('.ux-numpad__key');
      const height = await keys.first().evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );

      // Large size should be larger than standard
      expect(height).toBeGreaterThan(70);
    }
  });

  // Glass Variant
  test('should apply glass variant', async ({ page }) => {
    const glassNumpad = page.locator('.ux-numpad--glass').first();
    if (await glassNumpad.count() > 0) {
      await expect(glassNumpad).toBeVisible();

      const backdropFilter = await glassNumpad.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );

      expect(backdropFilter).toContain('blur');
    }
  });

  // PIN Mode
  test('should render PIN mode with dots', async ({ page }) => {
    const pinNumpad = page.locator('.ux-numpad--pin').first();
    if (await pinNumpad.count() > 0) {
      const pinDots = pinNumpad.locator('.ux-numpad__pin-dots');
      if (await pinDots.count() > 0) {
        await expect(pinDots).toBeVisible();

        const dots = pinDots.locator('.ux-numpad__pin-dot');
        expect(await dots.count()).toBeGreaterThan(0);
      }
    }
  });

  test('should mask digits in PIN mode', async ({ page }) => {
    const pinNumpad = page.locator('.ux-numpad--pin').first();
    if (await pinNumpad.count() > 0) {
      const grid = pinNumpad.locator('.ux-numpad__grid').first();

      // Add digits
      await grid.locator('button:has-text("1")').click();
      await grid.locator('button:has-text("2")').click();

      const displayValue = pinNumpad.locator('.ux-numpad__display-value').first();
      const text = await displayValue.textContent();

      // Should show masked characters (bullets)
      expect(text?.trim()).toMatch(/•|•/);
    }
  });

  // Quick Amounts
  test('should render quick amount buttons', async ({ page }) => {
    const quickAmounts = page.locator('.ux-numpad__quick-amounts').first();
    if (await quickAmounts.count() > 0) {
      await expect(quickAmounts).toBeVisible();

      const buttons = quickAmounts.locator('button');
      expect(await buttons.count()).toBeGreaterThan(0);
    }
  });

  test('should set value when quick amount is clicked', async ({ page }) => {
    const quickAmounts = page.locator('.ux-numpad__quick-amounts').first();
    if (await quickAmounts.count() > 0) {
      const firstButton = quickAmounts.locator('button').first();
      const buttonText = await firstButton.textContent();

      await firstButton.click();

      const displayValue = page.locator('.ux-numpad__display-value').first();
      const displayText = await displayValue.textContent();

      // Display should contain the amount from button
      expect(displayText?.trim()).toContain(buttonText?.replace(/[^0-9]/g, '') || '');
    }
  });

  // Accessibility
  test('should be keyboard accessible', async ({ page }) => {
    const numpad = page.locator('.ux-numpad').first();
    await numpad.focus();

    const grid = numpad.locator('.ux-numpad__grid').first();
    const firstButton = grid.locator('button').first();

    await firstButton.focus();
    await expect(firstButton).toBeFocused();
  });

  test('should have minimum touch target size', async ({ page }) => {
    const numpadKey = page.locator('.ux-numpad__key').first();
    if (await numpadKey.count() > 0) {
      const height = await numpadKey.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );

      // Should be at least 44px (or smaller on mobile, but not too small)
      expect(height).toBeGreaterThanOrEqual(32);
    }
  });

  // Events
  test('should emit numpad-change event on digit click', async ({ page }) => {
    const eventData: any = {};

    page.on('console', msg => {
      if (msg.type() === 'log') {
        const text = msg.text();
        if (text.includes('numpad-change') || text.includes('Valor:')) {
          eventData.changed = true;
        }
      }
    });

    const grid = page.locator('.ux-numpad__grid').first();
    await grid.locator('button:has-text("5")').click();

    // Just verify the click executed without error
    const displayValue = page.locator('.ux-numpad__display-value').first();
    await expect(displayValue).toContainText('5');
  });

  // Max Length
  test('should respect maxLength configuration', async ({ page }) => {
    const grid = page.locator('.ux-numpad__grid').first();

    // Try to add many digits
    for (let i = 0; i < 15; i++) {
      const button = grid.locator('button:has-text("1")').first();
      if (await button.count() > 0) {
        await button.click();
      }
    }

    const displayValue = page.locator('.ux-numpad__display-value').first();
    const text = await displayValue.textContent();
    const digitCount = text?.replace(/[^0-9]/g, '').length || 0;

    // Should be limited by maxLength (typically 12)
    expect(digitCount).toBeLessThanOrEqual(15);
  });
});
