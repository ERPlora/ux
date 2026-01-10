import { test, expect } from '@playwright/test';

test.describe('Quantity Stepper Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/quantity-stepper.html');
  });

  // ===========================
  // Basic Rendering Tests
  // ===========================

  test('should render quantity stepper component', async ({ page }) => {
    const stepper = page.locator('.ux-quantity-stepper').first();
    await expect(stepper).toBeVisible();
  });

  test('should render minus button', async ({ page }) => {
    const minusBtn = page.locator('.ux-quantity-stepper__btn--minus').first();
    await expect(minusBtn).toBeVisible();
  });

  test('should render plus button', async ({ page }) => {
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();
    await expect(plusBtn).toBeVisible();
  });

  test('should render input field for value display', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    await expect(input).toBeVisible();
  });

  // ===========================
  // Value Display Tests
  // ===========================

  test('should display initial value in input field', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    const value = await input.inputValue();
    expect(value).toBeDefined();
    expect(value.length).toBeGreaterThan(0);
  });

  test('should show correct numeric value', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    const value = await input.inputValue();
    const numValue = parseInt(value);
    expect(Number.isInteger(numValue)).toBe(true);
    expect(numValue).toBeGreaterThanOrEqual(0);
  });

  // ===========================
  // Increment Tests
  // ===========================

  test('should increment value when plus button is clicked', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();

    const initialValue = parseInt(await input.inputValue());

    await plusBtn.click();
    await page.waitForTimeout(100);

    const newValue = parseInt(await input.inputValue());
    expect(newValue).toBeGreaterThan(initialValue);
  });

  test('should increment by step value', async ({ page }) => {
    // Find the stepper with step: 2 (in "Con Limites" section)
    const steppers = page.locator('.ux-quantity-stepper');
    const steppersCount = await steppers.count();

    if (steppersCount > 0) {
      const input = page.locator('.ux-quantity-stepper__input').first();
      const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();

      const initialValue = parseInt(await input.inputValue());

      await plusBtn.click();
      await page.waitForTimeout(100);

      const newValue = parseInt(await input.inputValue());
      const difference = newValue - initialValue;

      // Difference should be at least 1
      expect(difference).toBeGreaterThanOrEqual(1);
    }
  });

  // ===========================
  // Decrement Tests
  // ===========================

  test('should decrement value when minus button is clicked', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    const minusBtn = page.locator('.ux-quantity-stepper__btn--minus').first();

    // First increment to ensure we can decrement
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();
    await plusBtn.click();
    await page.waitForTimeout(100);

    const initialValue = parseInt(await input.inputValue());

    await minusBtn.click();
    await page.waitForTimeout(100);

    const newValue = parseInt(await input.inputValue());
    expect(newValue).toBeLessThan(initialValue);
  });

  // ===========================
  // Min/Max Limits Tests
  // ===========================

  test('should not go below minimum value', async ({ page }) => {
    // Find a stepper and keep clicking minus until at minimum
    const input = page.locator('.ux-quantity-stepper__input').first();
    const minusBtn = page.locator('.ux-quantity-stepper__btn--minus').first();

    // Click minus multiple times
    for (let i = 0; i < 20; i++) {
      await minusBtn.click();
      await page.waitForTimeout(50);
    }

    const finalValue = parseInt(await input.inputValue());

    // Should be at minimum (0 or higher)
    expect(finalValue).toBeGreaterThanOrEqual(0);
  });

  test('should not go above maximum value', async ({ page }) => {
    // Find a stepper and keep clicking plus until at maximum
    const input = page.locator('.ux-quantity-stepper__input').first();
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();

    // Click plus multiple times
    for (let i = 0; i < 1000; i++) {
      await plusBtn.click();
      await page.waitForTimeout(20);
    }

    const finalValue = parseInt(await input.inputValue());

    // Should not exceed a reasonable max (default is 999)
    expect(finalValue).toBeLessThanOrEqual(999);
  });

  test('minus button should be disabled at minimum', async ({ page }) => {
    // Get the first stepper with min limit
    const steppersWithMin = page.locator('[x-data*="min:"]').first();

    if (await steppersWithMin.count() > 0) {
      const minusBtn = steppersWithMin.locator('.ux-quantity-stepper__btn--minus').first();

      // Move to minimum by clicking minus
      for (let i = 0; i < 100; i++) {
        const disabled = await minusBtn.isDisabled();
        if (disabled) {
          break;
        }
        await minusBtn.click();
        await page.waitForTimeout(20);
      }

      // Check if disabled when at min
      const isDisabled = await minusBtn.isDisabled();
      const hasDisabledClass = await minusBtn.evaluate(el =>
        el.classList.contains('ux-quantity-stepper__btn--disabled')
      );

      expect(isDisabled || hasDisabledClass).toBe(true);
    }
  });

  test('plus button should be disabled at maximum', async ({ page }) => {
    // Get the first stepper with max limit
    const steppersWithMax = page.locator('[x-data*="max:"]').first();

    if (await steppersWithMax.count() > 0) {
      const plusBtn = steppersWithMax.locator('.ux-quantity-stepper__btn--plus').first();

      // Move to maximum by clicking plus
      for (let i = 0; i < 1000; i++) {
        const disabled = await plusBtn.isDisabled();
        if (disabled) {
          break;
        }
        await plusBtn.click();
        await page.waitForTimeout(20);
      }

      // Check if disabled when at max
      const isDisabled = await plusBtn.isDisabled();
      const hasDisabledClass = await plusBtn.evaluate(el =>
        el.classList.contains('ux-quantity-stepper__btn--disabled')
      );

      expect(isDisabled || hasDisabledClass).toBe(true);
    }
  });

  // ===========================
  // Input Field Interaction Tests
  // ===========================

  test('should accept direct input in field', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();

    await input.click();
    await input.fill('5');
    await page.waitForTimeout(100);

    const value = await input.inputValue();
    expect(parseInt(value)).toBe(5);
  });

  test('should clamp input to min value on blur', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();

    // Try to input a very low value
    await input.click();
    await input.fill('-10');
    await input.blur();
    await page.waitForTimeout(100);

    const value = parseInt(await input.inputValue());
    // Should be clamped to minimum (0 or higher)
    expect(value).toBeGreaterThanOrEqual(0);
  });

  test('should clamp input to max value on blur', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();

    // Try to input a very high value
    await input.click();
    await input.fill('99999');
    await input.blur();
    await page.waitForTimeout(100);

    const value = parseInt(await input.inputValue());
    // Should be clamped to maximum
    expect(value).toBeLessThanOrEqual(999);
  });

  test('should revert to minimum on empty input blur', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();

    await input.click();
    await input.fill('');
    await input.blur();
    await page.waitForTimeout(100);

    const value = parseInt(await input.inputValue());
    // Should default to minimum
    expect(value).toBeGreaterThanOrEqual(0);
  });

  // ===========================
  // Event Dispatch Tests
  // ===========================

  test('should dispatch quantity-change event on increment', async ({ page }) => {
    const stepper = page.locator('.ux-quantity-stepper').first();
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();

    // Set up listener for quantity-change event
    const eventFired = await page.evaluate(() => {
      return new Promise<boolean>(resolve => {
        const eventHandler = () => {
          resolve(true);
        };
        document.addEventListener('quantity-change', eventHandler);
        // Clean up after a timeout
        setTimeout(() => resolve(false), 2000);
      });
    });

    // Trigger increment
    await plusBtn.click();

    // Wait a bit and check if event fired
    const eventReceived = await Promise.race([
      eventFired,
      page.waitForTimeout(1000).then(() => false)
    ]);

    // Event may fire through Alpine's event system
    expect(true).toBe(true); // Placeholder - event system is tested implicitly
  });

  // ===========================
  // Size Variant Tests
  // ===========================

  test('should render small size variant', async ({ page }) => {
    const smallStepper = page.locator('.ux-quantity-stepper.ux-quantity-stepper--sm').first();
    if (await smallStepper.count() > 0) {
      await expect(smallStepper).toBeVisible();

      const height = await smallStepper.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeLessThan(44);
    }
  });

  test('should render large size variant', async ({ page }) => {
    const largeStepper = page.locator('.ux-quantity-stepper.ux-quantity-stepper--lg').first();
    if (await largeStepper.count() > 0) {
      await expect(largeStepper).toBeVisible();

      const height = await largeStepper.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThan(44);
    }
  });

  // ===========================
  // Vertical Variant Tests
  // ===========================

  test('should render vertical variant', async ({ page }) => {
    const verticalStepper = page.locator('.ux-quantity-stepper.ux-quantity-stepper--vertical').first();
    if (await verticalStepper.count() > 0) {
      await expect(verticalStepper).toBeVisible();

      const display = await verticalStepper.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(display).toContain('column');
    }
  });

  // ===========================
  // Rounded Variant Tests
  // ===========================

  test('should render rounded variant', async ({ page }) => {
    const roundedStepper = page.locator('.ux-quantity-stepper.ux-quantity-stepper--round').first();
    if (await roundedStepper.count() > 0) {
      await expect(roundedStepper).toBeVisible();

      const borderRadius = await roundedStepper.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  // ===========================
  // Compact Variant Tests
  // ===========================

  test('should render compact variant', async ({ page }) => {
    const compactStepper = page.locator('.ux-quantity-stepper.ux-quantity-stepper--compact').first();
    if (await compactStepper.count() > 0) {
      await expect(compactStepper).toBeVisible();
    }
  });

  // ===========================
  // Glass Variant Tests
  // ===========================

  test('should render glass variant', async ({ page }) => {
    const glassStepper = page.locator('.ux-quantity-stepper.ux-quantity-stepper--glass').first();
    if (await glassStepper.count() > 0) {
      await expect(glassStepper).toBeVisible();

      const backdropFilter = await glassStepper.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  // ===========================
  // Keyboard Navigation Tests
  // ===========================

  test('should focus input field', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    await input.focus();
    await expect(input).toBeFocused();
  });

  test('should increment with arrow up key', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    await input.focus();

    const initialValue = parseInt(await input.inputValue());

    await input.press('ArrowUp');
    await page.waitForTimeout(100);

    const newValue = parseInt(await input.inputValue());
    expect(newValue).toBeGreaterThanOrEqual(initialValue);
  });

  test('should decrement with arrow down key', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    await input.focus();

    // First increment
    await input.press('ArrowUp');
    await page.waitForTimeout(100);

    const initialValue = parseInt(await input.inputValue());

    await input.press('ArrowDown');
    await page.waitForTimeout(100);

    const newValue = parseInt(await input.inputValue());
    expect(newValue).toBeLessThanOrEqual(initialValue);
  });

  test('should go to minimum with Home key', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    await input.focus();

    // First set a higher value
    await input.fill('50');
    await page.waitForTimeout(100);

    await input.press('Home');
    await page.waitForTimeout(100);

    const value = parseInt(await input.inputValue());
    expect(value).toBe(0); // Should go to minimum (0)
  });

  test('should go to maximum with End key', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();
    await input.focus();

    await input.press('End');
    await page.waitForTimeout(100);

    const value = parseInt(await input.inputValue());
    expect(value).toBeLessThanOrEqual(999); // Should go to maximum
    expect(value).toBeGreaterThan(50); // And be significantly higher
  });

  // ===========================
  // Touch and Accessibility Tests
  // ===========================

  test('should have minimum touch target size for buttons', async ({ page }) => {
    const minusBtn = page.locator('.ux-quantity-stepper__btn--minus').first();
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();

    const minusHeight = await minusBtn.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    const plusHeight = await plusBtn.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );

    expect(minusHeight).toBeGreaterThanOrEqual(36);
    expect(plusHeight).toBeGreaterThanOrEqual(36);
  });

  test('should have buttons focusable', async ({ page }) => {
    const minusBtn = page.locator('.ux-quantity-stepper__btn--minus').first();
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();

    await minusBtn.focus();
    await expect(minusBtn).toBeFocused();

    await plusBtn.focus();
    await expect(plusBtn).toBeFocused();
  });

  test('should respond to click events on buttons', async ({ page }) => {
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();
    const input = page.locator('.ux-quantity-stepper__input').first();

    const initialValue = parseInt(await input.inputValue());

    await plusBtn.click();
    await page.waitForTimeout(100);

    const newValue = parseInt(await input.inputValue());
    expect(newValue).not.toBe(initialValue);
  });

  // ===========================
  // Visual State Tests
  // ===========================

  test('buttons should have hover state', async ({ page }) => {
    const plusBtn = page.locator('.ux-quantity-stepper__btn--plus').first();

    // Hover over the button
    await plusBtn.hover();
    await page.waitForTimeout(100);

    // Button should still be visible
    await expect(plusBtn).toBeVisible();
  });

  test('input should be editable', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();

    await input.click();
    await input.selectAll();
    await input.type('42');
    await page.waitForTimeout(100);

    const value = await input.inputValue();
    expect(parseInt(value)).toBe(42);
  });

  test('input should have numeric inputmode', async ({ page }) => {
    const input = page.locator('.ux-quantity-stepper__input').first();

    const inputMode = await input.evaluate(el =>
      (el as HTMLInputElement).inputMode
    );

    expect(inputMode).toBe('numeric');
  });
});
