import { test, expect } from '@playwright/test';

test.describe('Calculator Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/calculator.html');
  });

  test('should render calculator with display and keypad', async ({ page }) => {
    const calculator = page.locator('.ux-calculator').first();
    await expect(calculator).toBeVisible();

    // Check display
    const display = calculator.locator('.ux-calculator__display');
    await expect(display).toBeVisible();

    // Check keypad
    const keypad = calculator.locator('.ux-calculator__keypad');
    await expect(keypad).toBeVisible();
  });

  test('should display initial value as 0', async ({ page }) => {
    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('0');
  });

  test('should input single digit', async ({ page }) => {
    const button5 = page.locator('button:has-text("5")').first();
    await button5.click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('5');
  });

  test('should input multiple digits sequentially', async ({ page }) => {
    // Input 123
    await page.locator('button:has-text("1")').first().click();
    await page.locator('button:has-text("2")').first().click();
    await page.locator('button:has-text("3")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('123');
  });

  test('should prevent multiple leading zeros', async ({ page }) => {
    // Input 0, 0, 0
    await page.locator('button:has-text("0")').first().click();
    await page.locator('button:has-text("0")').first().click();
    await page.locator('button:has-text("0")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('0');
  });

  test('should replace leading zero with new digit', async ({ page }) => {
    // Start with 0, then input 5
    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('0');

    await page.locator('button:has-text("5")').first().click();
    await expect(result).toHaveText('5');
  });

  test('should input decimal point', async ({ page }) => {
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text(".")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText(/3\./);
  });

  test('should handle decimal after operator', async ({ page }) => {
    // 5 + .
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text(".")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText(/0\./);
  });

  test('should not allow multiple decimals in same number', async ({ page }) => {
    // 3.14.15 should result in 3.1415
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text(".")').first().click();
    await page.locator('button:has-text("1")').first().click();
    await page.locator('button:has-text("4")').first().click();
    await page.locator('button:has-text(".")').first().click();
    await page.locator('button:has-text("1")').first().click();
    await page.locator('button:has-text("5")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    const text = await result.textContent();
    // Should not have added second decimal
    expect((text?.match(/\./g) || []).length).toBeLessThanOrEqual(1);
  });

  test('should add two numbers', async ({ page }) => {
    // 5 + 3 =
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('8');
  });

  test('should subtract two numbers', async ({ page }) => {
    // 10 - 3 =
    await page.locator('button:has-text("1")').first().click();
    await page.locator('button:has-text("0")').first().click();
    await page.locator('button:has-text("−")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('7');
  });

  test('should multiply two numbers', async ({ page }) => {
    // 6 × 7 =
    await page.locator('button:has-text("6")').first().click();
    await page.locator('button:has-text("×")').first().click();
    await page.locator('button:has-text("7")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('42');
  });

  test('should divide two numbers', async ({ page }) => {
    // 15 ÷ 3 =
    await page.locator('button:has-text("1")').first().click();
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("÷")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('5');
  });

  test('should handle division by zero', async ({ page }) => {
    // 5 ÷ 0 =
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("÷")').first().click();
    await page.locator('button:has-text("0")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    const text = await result.textContent();
    // Should show error message
    expect(text).toMatch(/Error/i);
  });

  test('should handle chained operations', async ({ page }) => {
    // 2 + 3 + 4 =
    await page.locator('button:has-text("2")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("4")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('9');
  });

  test('should toggle sign (+/-)', async ({ page }) => {
    // 5, then +/-
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+/-")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('-5');
  });

  test('should toggle sign back to positive', async ({ page }) => {
    // 5, +/-, +/-
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+/-")').first().click();
    await page.locator('button:has-text("+/-")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('5');
  });

  test('should not toggle sign on empty/zero', async ({ page }) => {
    // +/- on 0
    await page.locator('button:has-text("+/-")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('0');
  });

  test('should calculate percentage', async ({ page }) => {
    // 50, then %
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("0")').first().click();
    await page.locator('button:has-text("%")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText(/0\.5/);
  });

  test('should clear with AC button', async ({ page }) => {
    // Input 123, then AC
    await page.locator('button:has-text("1")').first().click();
    await page.locator('button:has-text("2")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("AC")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('0');
  });

  test('should clear after equals and input new number', async ({ page }) => {
    // 5 + 3 =, then 7
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("=")').first().click();

    // Now input new number
    await page.locator('button:has-text("7")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('7');
  });

  test('should show expression line during calculation', async ({ page }) => {
    // 5 + 3 (without equals)
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("3")').first().click();

    const expression = page.locator('.ux-calculator__expression').first();
    const text = await expression.textContent();
    // Should show the expression
    expect(text).toContain('5');
  });

  test('should show complete expression after equals', async ({ page }) => {
    // 5 + 3 =
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const expression = page.locator('.ux-calculator__expression').first();
    const text = await expression.textContent();
    // Should show complete expression
    expect(text).toMatch(/5.*\+.*3.*=/);
  });

  test('should apply compact variant styling', async ({ page }) => {
    const compactCalc = page.locator('.ux-calculator--compact').first();
    if (await compactCalc.count() > 0) {
      await expect(compactCalc).toBeVisible();

      const display = compactCalc.locator('.ux-calculator__display');
      const height = await display.evaluate(el =>
        parseInt(getComputedStyle(el).minHeight)
      );
      // Compact should have smaller min-height
      expect(height).toBeLessThan(120);
    }
  });

  test('should apply glass variant styling', async ({ page }) => {
    const glassCalc = page.locator('.ux-calculator--glass').first();
    if (await glassCalc.count() > 0) {
      await expect(glassCalc).toBeVisible();

      const backdropFilter = await glassCalc.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should highlight active operator button', async ({ page }) => {
    // 5 +
    await page.locator('button:has-text("5")').first().click();
    const addBtn = page.locator('button:has-text("+")').first();
    await addBtn.click();

    // Check if operator button has is-active class
    const hasActiveClass = await addBtn.evaluate(el =>
      el.classList.contains('is-active')
    );
    expect(hasActiveClass).toBe(true);
  });

  test('should apply small font size for long numbers', async ({ page }) => {
    // Input a very long number
    const longInput = '123456789012';
    for (const digit of longInput) {
      await page.locator(`button:has-text("${digit}")`).first().click();
    }

    const result = page.locator('.ux-calculator__result').first();
    const hasSmallFont = await result.evaluate(el =>
      el.classList.contains('ux-calculator__result--small')
    );
    expect(hasSmallFont).toBe(true);
  });

  test('should handle decimal calculations', async ({ page }) => {
    // 2.5 + 1.5 =
    await page.locator('button:has-text("2")').first().click();
    await page.locator('button:has-text(".")').first().click();
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("1")').first().click();
    await page.locator('button:has-text(".")').first().click();
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("=")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('4');
  });

  test('should handle negative number input', async ({ page }) => {
    // 5 +/- = -5
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+/-")').first().click();

    const result = page.locator('.ux-calculator__result').first();
    const text = await result.textContent();
    expect(text).toContain('-');
    expect(text).toContain('5');
  });

  test('should prevent max digits overflow', async ({ page }) => {
    // Try to input more than 12 digits
    const digits = Array(15).fill(0).map((_, i) => String(i % 10));
    for (const digit of digits) {
      await page.locator(`button:has-text("${digit}")`).first().click();
    }

    const result = page.locator('.ux-calculator__result').first();
    const text = await result.textContent() || '';
    // Should not exceed max digits
    const digitsOnly = text.replace(/[^0-9]/g, '');
    expect(digitsOnly.length).toBeLessThanOrEqual(12);
  });

  test('should emit calculator-result event on equals', async ({ page }) => {
    let resultEvent = null;

    // Setup event listener
    await page.evaluate(() => {
      (window as any).__calculatorResult = null;
      const calc = document.querySelector('.ux-calculator');
      calc?.addEventListener('calculator-result', (e: any) => {
        (window as any).__calculatorResult = e.detail;
      });
    });

    // Perform calculation
    await page.locator('button:has-text("5")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("=")').first().click();

    // Check event was emitted
    const eventData = await page.evaluate(() => (window as any).__calculatorResult);
    expect(eventData).not.toBeNull();
    expect(eventData.result).toBe(8);
  });

  test('should handle all number buttons (0-9)', async ({ page }) => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (const digit of digits) {
      // Clear first
      const acBtn = page.locator('button:has-text("AC")').first();
      await acBtn.click();

      // Click digit button
      const btn = page.locator(`button:has-text("${digit}")`).first();
      await btn.click();

      // Verify result
      const result = page.locator('.ux-calculator__result').first();
      // For 0, it should show 0 initially and stay 0
      if (digit === '0') {
        await expect(result).toHaveText('0');
      } else {
        await expect(result).toHaveText(digit);
      }
    }
  });

  test('should have proper zero button spanning 2 columns', async ({ page }) => {
    const zeroBtn = page.locator('.ux-calculator__btn--wide').first();
    if (await zeroBtn.count() > 0) {
      const gridColumn = await zeroBtn.evaluate(el =>
        getComputedStyle(el).gridColumn
      );
      expect(gridColumn).toContain('span');
    }
  });

  test('should be keyboard accessible', async ({ page }) => {
    const calculator = page.locator('.ux-calculator').first();
    const button = calculator.locator('button').first();

    // Focus a button
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('should handle keyboard input (number keys)', async ({ page }) => {
    const calculator = page.locator('.ux-calculator').first();

    // Focus calculator
    await calculator.click();

    // Type 5 + 3
    await page.keyboard.press('5');
    await page.keyboard.press('Plus');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('8');
  });

  test('should handle keyboard escape to clear', async ({ page }) => {
    const calculator = page.locator('.ux-calculator').first();

    // Input something
    await calculator.click();
    await page.keyboard.press('5');

    // Press escape to clear
    await page.keyboard.press('Escape');

    const result = page.locator('.ux-calculator__result').first();
    await expect(result).toHaveText('0');
  });
});
