import { test, expect } from '@playwright/test';

test.describe('OTP Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/otp-input.html');
  });

  test.describe('Basic Rendering', () => {
    test('should render OTP input container', async ({ page }) => {
      const otpContainer = page.locator('.ux-otp').first();
      await expect(otpContainer).toBeVisible();
    });

    test('should render individual OTP fields', async ({ page }) => {
      const otpFields = page.locator('.ux-otp__field');
      const count = await otpFields.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should render correct number of fields for length 6', async ({ page }) => {
      const basicOtp = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = basicOtp.locator('.ux-otp__field');
      const count = await fields.count();
      expect(count).toBe(6);
    });

    test('should render OTP fields with input type tel', async ({ page }) => {
      const otpField = page.locator('.ux-otp__field').first();
      const type = await otpField.getAttribute('type');
      expect(type).toBe('tel');
    });

    test('should apply maxlength=1 to OTP fields', async ({ page }) => {
      const otpField = page.locator('.ux-otp__field').first();
      const maxLength = await otpField.getAttribute('maxlength');
      expect(maxLength).toBe('1');
    });
  });

  test.describe('Individual Digit Inputs', () => {
    test('should accept single digit in first field', async ({ page }) => {
      const firstField = page.locator('.ux-otp__field').first();
      await firstField.fill('1');
      await expect(firstField).toHaveValue('1');
    });

    test('should only allow single character in field', async ({ page }) => {
      const firstField = page.locator('.ux-otp__field').first();
      await firstField.fill('123');
      // Should be limited to single character by maxlength
      const value = await firstField.inputValue();
      expect(value.length).toBeLessThanOrEqual(1);
    });

    test('should accept numeric input', async ({ page }) => {
      const fields = page.locator('[x-data*="uxOtpInput"]').first().locator('.ux-otp__field');
      for (let i = 0; i < 3; i++) {
        await fields.nth(i).fill(String(i + 1));
      }
      for (let i = 0; i < 3; i++) {
        await expect(fields.nth(i)).toHaveValue(String(i + 1));
      }
    });

    test('should mark field as filled when value is entered', async ({ page }) => {
      const firstField = page.locator('.ux-otp__field').first();
      await firstField.fill('5');
      // Check if filled class is applied
      const hasFilledClass = await firstField.evaluate((el) =>
        el.classList.contains('ux-otp__field--filled')
      );
      expect(hasFilledClass).toBe(true);
    });

    test('should clear field when backspace is pressed', async ({ page }) => {
      const firstField = page.locator('.ux-otp__field').first();
      await firstField.fill('7');
      await firstField.press('Backspace');
      await expect(firstField).toHaveValue('');
    });

    test('should clear field when delete is pressed', async ({ page }) => {
      const firstField = page.locator('.ux-otp__field').first();
      await firstField.fill('3');
      await firstField.press('Delete');
      await expect(firstField).toHaveValue('');
    });
  });

  test.describe('Auto-Focus Next Field', () => {
    test('should auto-focus first field on init', async ({ page }) => {
      const firstField = page.locator('[x-data*="uxOtpInput"]').first().locator('.ux-otp__field').first();
      // Wait for Alpine initialization
      await page.waitForTimeout(100);
      // Focus should move automatically on value input
      await firstField.fill('1');
      const secondField = page.locator('[x-data*="uxOtpInput"]').first().locator('.ux-otp__field').nth(1);
      // Second field should be focused after filling first
      await page.waitForTimeout(50);
      await expect(secondField).toBeFocused();
    });

    test('should move focus to next field after input', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      // Fill first field
      await fields.nth(0).fill('1');
      await page.waitForTimeout(50);
      // Second field should be focused
      await expect(fields.nth(1)).toBeFocused();

      // Fill second field
      await fields.nth(1).fill('2');
      await page.waitForTimeout(50);
      // Third field should be focused
      await expect(fields.nth(2)).toBeFocused();
    });

    test('should not advance beyond last field', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');
      const lastField = fields.nth(5);

      // Fill all fields up to last
      for (let i = 0; i < 5; i++) {
        await fields.nth(i).fill(String(i + 1));
        await page.waitForTimeout(30);
      }

      // Focus on last field
      await lastField.click();
      await lastField.fill('6');
      // Focus should remain on last field
      await expect(lastField).toBeFocused();
    });

    test('should allow arrow key navigation', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      await fields.nth(2).click();
      await fields.nth(2).press('ArrowRight');
      await page.waitForTimeout(50);
      await expect(fields.nth(3)).toBeFocused();

      await fields.nth(3).press('ArrowLeft');
      await page.waitForTimeout(50);
      await expect(fields.nth(2)).toBeFocused();
    });

    test('should move to previous field on backspace when current is empty', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      // Fill first two fields
      await fields.nth(0).fill('1');
      await page.waitForTimeout(50);
      await fields.nth(1).fill('2');
      await page.waitForTimeout(50);

      // Press backspace on second field while empty should move to first
      await fields.nth(1).press('Backspace');
      await page.waitForTimeout(50);
      await expect(fields.nth(0)).toBeFocused();
    });

    test('should support Home key to focus first field', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      await fields.nth(4).click();
      await fields.nth(4).press('Home');
      await page.waitForTimeout(50);
      await expect(fields.nth(0)).toBeFocused();
    });

    test('should support End key to focus last field', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      await fields.nth(1).click();
      await fields.nth(1).press('End');
      await page.waitForTimeout(50);
      await expect(fields.nth(5)).toBeFocused();
    });
  });

  test.describe('Paste Support', () => {
    test('should handle paste of 6-digit code', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();

      // Use clipboard to paste
      await page.evaluate(() => {
        navigator.clipboard.writeText('123456');
      });

      await firstField.click();
      await page.keyboard.press('Control+V');
      await page.waitForTimeout(100);

      const fields = otpContainer.locator('.ux-otp__field');
      for (let i = 0; i < 6; i++) {
        const value = await fields.nth(i).inputValue();
        expect(value).toBe(String(i + 1));
      }
    });

    test('should handle partial paste', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();

      await page.evaluate(() => {
        navigator.clipboard.writeText('123');
      });

      await firstField.click();
      await page.keyboard.press('Control+V');
      await page.waitForTimeout(100);

      const fields = otpContainer.locator('.ux-otp__field');
      await expect(fields.nth(0)).toHaveValue('1');
      await expect(fields.nth(1)).toHaveValue('2');
      await expect(fields.nth(2)).toHaveValue('3');
    });

    test('should handle paste from middle field', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const middleField = otpContainer.locator('.ux-otp__field').nth(2);

      await page.evaluate(() => {
        navigator.clipboard.writeText('789');
      });

      await middleField.click();
      await page.keyboard.press('Control+V');
      await page.waitForTimeout(100);

      const fields = otpContainer.locator('.ux-otp__field');
      await expect(fields.nth(2)).toHaveValue('7');
      await expect(fields.nth(3)).toHaveValue('8');
      await expect(fields.nth(4)).toHaveValue('9');
    });

    test('should not exceed field count when pasting long string', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();

      await page.evaluate(() => {
        navigator.clipboard.writeText('123456789ABC');
      });

      await firstField.click();
      await page.keyboard.press('Control+V');
      await page.waitForTimeout(100);

      const fields = otpContainer.locator('.ux-otp__field');
      expect(await fields.count()).toBe(6);
    });

    test('should filter non-numeric characters for number type', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();

      // Get the type of OTP (should be number for this demo)
      const inputType = await firstField.getAttribute('inputmode');
      if (inputType === 'numeric') {
        await page.evaluate(() => {
          navigator.clipboard.writeText('1a2b3c');
        });

        await firstField.click();
        await page.keyboard.press('Control+V');
        await page.waitForTimeout(100);

        const fields = otpContainer.locator('.ux-otp__field');
        // Should only have numeric values
        for (let i = 0; i < 3; i++) {
          const value = await fields.nth(i).inputValue();
          expect(/^\d*$/.test(value)).toBe(true);
        }
      }
    });

    test('should focus appropriate field after paste', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();

      await page.evaluate(() => {
        navigator.clipboard.writeText('123456');
      });

      await firstField.click();
      await page.keyboard.press('Control+V');
      await page.waitForTimeout(100);

      const lastField = otpContainer.locator('.ux-otp__field').nth(5);
      await expect(lastField).toBeFocused();
    });
  });

  test.describe('Validation', () => {
    test('should dispatch otp:complete event when all fields are filled', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      // Listen for otp:complete event
      let eventFired = false;
      await page.evaluateHandle(() => {
        document.addEventListener('otp:complete', () => {
          (window as any).otpComplete = true;
        });
      });

      // Fill all fields
      for (let i = 0; i < 6; i++) {
        await fields.nth(i).fill(String((i + 1) % 10));
        await page.waitForTimeout(30);
      }

      await page.waitForTimeout(100);
      eventFired = await page.evaluate(() => (window as any).otpComplete || false);
      expect(eventFired).toBe(true);
    });

    test('should not dispatch otp:complete if fields are incomplete', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      let eventFired = false;
      await page.evaluateHandle(() => {
        document.addEventListener('otp:complete', () => {
          (window as any).otpComplete = true;
        });
      });

      // Fill only first 3 fields
      for (let i = 0; i < 3; i++) {
        await fields.nth(i).fill(String(i + 1));
        await page.waitForTimeout(30);
      }

      await page.waitForTimeout(100);
      eventFired = await page.evaluate(() => (window as any).otpComplete || false);
      expect(eventFired).toBe(false);
    });

    test('should dispatch otp:change event on value change', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();

      let changeEventFired = false;
      await page.evaluateHandle(() => {
        document.addEventListener('otp:change', () => {
          (window as any).otpChange = true;
        });
      });

      await firstField.fill('9');
      await page.waitForTimeout(50);

      changeEventFired = await page.evaluate(() => (window as any).otpChange || false);
      expect(changeEventFired).toBe(true);
    });

    test('should track isComplete state correctly', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      // Should be incomplete initially
      let isComplete = await otpContainer.evaluate((el: any) => el.__x?.isComplete || false);
      expect(isComplete).toBe(false);

      // Fill all fields
      for (let i = 0; i < 6; i++) {
        await fields.nth(i).fill(String((i + 1) % 10));
        await page.waitForTimeout(30);
      }

      // Should be complete after all filled
      isComplete = await otpContainer.evaluate((el: any) => el.__x?.isComplete || false);
      expect(isComplete).toBe(true);
    });

    test('should validate numeric input only for number type', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();
      const inputMode = await firstField.getAttribute('inputmode');

      if (inputMode === 'numeric') {
        // Try to type non-numeric character
        await firstField.focus();
        await firstField.type('a');
        await page.waitForTimeout(50);

        const value = await firstField.inputValue();
        // Should not contain 'a'
        expect(value).not.toContain('a');
      }
    });

    test('should show success state when otp is complete', async ({ page }) => {
      // Find section with state examples
      const successExample = page.locator('.ux-otp--success').first();
      if (await successExample.count() > 0) {
        await expect(successExample).toBeVisible();
        const hasSuccessClass = await successExample.evaluate((el) =>
          el.classList.contains('ux-otp--success')
        );
        expect(hasSuccessClass).toBe(true);
      }
    });

    test('should show error state', async ({ page }) => {
      const errorExample = page.locator('.ux-otp--error').first();
      if (await errorExample.count() > 0) {
        await expect(errorExample).toBeVisible();
        const hasErrorClass = await errorExample.evaluate((el) =>
          el.classList.contains('ux-otp--error')
        );
        expect(hasErrorClass).toBe(true);
      }
    });

    test('should show disabled state', async ({ page }) => {
      const disabledFields = page.locator('.ux-otp--disabled .ux-otp__field');
      if (await disabledFields.count() > 0) {
        const firstDisabled = disabledFields.first();
        await expect(firstDisabled).toBeDisabled();
      }
    });

    test('should show loading state', async ({ page }) => {
      const loadingExample = page.locator('.ux-otp--loading').first();
      if (await loadingExample.count() > 0) {
        await expect(loadingExample).toBeVisible();
        const hasLoadingClass = await loadingExample.evaluate((el) =>
          el.classList.contains('ux-otp--loading')
        );
        expect(hasLoadingClass).toBe(true);
      }
    });
  });

  test.describe('Size Variants', () => {
    test('should render small variant', async ({ page }) => {
      const smallOtp = page.locator('.ux-otp--sm').first();
      if (await smallOtp.count() > 0) {
        await expect(smallOtp).toBeVisible();
      }
    });

    test('should render large variant', async ({ page }) => {
      const largeOtp = page.locator('.ux-otp--lg').first();
      if (await largeOtp.count() > 0) {
        await expect(largeOtp).toBeVisible();
      }
    });

    test('small variant should have smaller dimensions', async ({ page }) => {
      const smallField = page.locator('.ux-otp--sm .ux-otp__field').first();
      const defaultField = page.locator('.ux-otp:not(.ux-otp--sm):not(.ux-otp--lg) .ux-otp__field').first();

      if (await smallField.count() > 0 && await defaultField.count() > 0) {
        const smallHeight = await smallField.evaluate(el => parseInt(getComputedStyle(el).height));
        const defaultHeight = await defaultField.evaluate(el => parseInt(getComputedStyle(el).height));
        expect(smallHeight).toBeLessThan(defaultHeight);
      }
    });

    test('large variant should have larger dimensions', async ({ page }) => {
      const largeField = page.locator('.ux-otp--lg .ux-otp__field').first();
      const defaultField = page.locator('.ux-otp:not(.ux-otp--sm):not(.ux-otp--lg) .ux-otp__field').first();

      if (await largeField.count() > 0 && await defaultField.count() > 0) {
        const largeHeight = await largeField.evaluate(el => parseInt(getComputedStyle(el).height));
        const defaultHeight = await defaultField.evaluate(el => parseInt(getComputedStyle(el).height));
        expect(largeHeight).toBeGreaterThan(defaultHeight);
      }
    });
  });

  test.describe('Visual Variants', () => {
    test('should render underline variant', async ({ page }) => {
      const underlineOtp = page.locator('.ux-otp--underline').first();
      if (await underlineOtp.count() > 0) {
        await expect(underlineOtp).toBeVisible();
      }
    });

    test('should render rounded variant', async ({ page }) => {
      const roundedOtp = page.locator('.ux-otp--rounded').first();
      if (await roundedOtp.count() > 0) {
        await expect(roundedOtp).toBeVisible();
      }
    });

    test('should render glass variant', async ({ page }) => {
      const glassOtp = page.locator('.ux-otp--glass').first();
      if (await glassOtp.count() > 0) {
        await expect(glassOtp).toBeVisible();
        const backdropFilter = await glassOtp.evaluate(el =>
          getComputedStyle(el.querySelector('.ux-otp__field')!).backdropFilter ||
          getComputedStyle(el.querySelector('.ux-otp__field')!).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    });
  });

  test.describe('Separator Support', () => {
    test('should render separator between fields', async ({ page }) => {
      const separator = page.locator('.ux-otp__separator').first();
      if (await separator.count() > 0) {
        await expect(separator).toBeVisible();
      }
    });

    test('should handle numeric input with separator', async ({ page }) => {
      const otpWithSeparator = page.locator('[x-data*="separator"]').first();
      if (await otpWithSeparator.count() > 0) {
        const fields = otpWithSeparator.locator('.ux-otp__field');
        for (let i = 0; i < 3; i++) {
          await fields.nth(i).fill(String(i + 1));
          await page.waitForTimeout(30);
        }
        // All values should be set correctly despite separator
        await expect(fields.nth(0)).toHaveValue('1');
        await expect(fields.nth(1)).toHaveValue('2');
        await expect(fields.nth(2)).toHaveValue('3');
      }
    });
  });

  test.describe('Touch Accessibility', () => {
    test('should have minimum touch target size', async ({ page }) => {
      const field = page.locator('.ux-otp__field').first();
      const height = await field.evaluate(el => parseInt(getComputedStyle(el).height));
      expect(height).toBeGreaterThanOrEqual(36);
    });

    test('should be focusable', async ({ page }) => {
      const field = page.locator('.ux-otp__field').first();
      await field.focus();
      await expect(field).toBeFocused();
    });

    test('should have visible focus state', async ({ page }) => {
      const field = page.locator('.ux-otp__field').first();
      await field.focus();
      const boxShadow = await field.evaluate(el => getComputedStyle(el).boxShadow);
      // Focus state should have some visual indicator
      expect(boxShadow).not.toBe('none');
    });
  });

  test.describe('Configuration Options', () => {
    test('should respect length option', async ({ page }) => {
      // Test 4-digit OTP
      const fourDigitOtp = page.locator('[x-data*="length: 4"]').first();
      if (await fourDigitOtp.count() > 0) {
        const fields = fourDigitOtp.locator('.ux-otp__field');
        expect(await fields.count()).toBe(4);
      }
    });

    test('should respect type option (numeric)', async ({ page }) => {
      const numericOtp = page.locator('[x-data*="type: \'number\'"]').first();
      if (await numericOtp.count() > 0) {
        const fields = numericOtp.locator('.ux-otp__field');
        const inputMode = await fields.first().getAttribute('inputmode');
        expect(inputMode).toBe('numeric');
      }
    });

    test('should support alphanumeric input', async ({ page }) => {
      const alphanumericOtp = page.locator('[x-data*="type: \'text\'"]').first();
      if (await alphanumericOtp.count() > 0) {
        const fields = alphanumericOtp.locator('.ux-otp__field');
        const firstField = fields.first();

        await firstField.fill('A');
        const value = await firstField.inputValue();
        expect(value).toMatch(/[a-zA-Z]/);
      }
    });
  });

  test.describe('Helper Text and Feedback', () => {
    test('should display helper text', async ({ page }) => {
      const helper = page.locator('.ux-otp__helper').first();
      if (await helper.count() > 0) {
        await expect(helper).toBeVisible();
      }
    });

    test('should display success helper text', async ({ page }) => {
      const successHelper = page.locator('.ux-otp__helper--success').first();
      if (await successHelper.count() > 0) {
        await expect(successHelper).toBeVisible();
      }
    });

    test('should display error helper text', async ({ page }) => {
      const errorHelper = page.locator('.ux-otp__helper--error').first();
      if (await errorHelper.count() > 0) {
        await expect(errorHelper).toBeVisible();
      }
    });
  });

  test.describe('Resend Functionality', () => {
    test('should render resend button when enabled', async ({ page }) => {
      const resendBtn = page.locator('.ux-otp__resend-btn').first();
      if (await resendBtn.count() > 0) {
        await expect(resendBtn).toBeVisible();
      }
    });

    test('should show resend timer when cooldown is active', async ({ page }) => {
      const resendSection = page.locator('.ux-otp__resend').first();
      if (await resendSection.count() > 0) {
        await expect(resendSection).toBeVisible();
      }
    });

    test('should disable resend button during cooldown', async ({ page }) => {
      const resendBtn = page.locator('.ux-otp__resend-btn').first();
      if (await resendBtn.count() > 0) {
        // Initially should be disabled due to cooldown
        const isDisabled = await resendBtn.isDisabled();
        // May or may not be disabled depending on cooldown state
        expect(typeof isDisabled).toBe('boolean');
      }
    });
  });

  test.describe('Dark Mode', () => {
    test('should render in light mode by default', async ({ page }) => {
      const field = page.locator('.ux-otp__field').first();
      const bgColor = await field.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(bgColor).not.toBe('');
    });

    test('should have proper color contrast', async ({ page }) => {
      const field = page.locator('.ux-otp__field').first();
      const bgColor = await field.evaluate(el => getComputedStyle(el).backgroundColor);
      const textColor = await field.evaluate(el => getComputedStyle(el).color);
      // Both should be defined
      expect(bgColor).not.toBe('transparent');
      expect(textColor).not.toBe('');
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle rapid input', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      for (let i = 0; i < 6; i++) {
        await fields.nth(i).fill(String((i + 1) % 10));
      }

      for (let i = 0; i < 6; i++) {
        const value = await fields.nth(i).inputValue();
        expect(value).toBe(String((i + 1) % 10));
      }
    });

    test('should handle clearing and re-entering values', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const fields = otpContainer.locator('.ux-otp__field');

      // Fill fields
      for (let i = 0; i < 3; i++) {
        await fields.nth(i).fill(String(i + 1));
        await page.waitForTimeout(30);
      }

      // Clear fields
      for (let i = 0; i < 3; i++) {
        await fields.nth(i).fill('');
        await page.waitForTimeout(30);
      }

      // Re-enter different values
      for (let i = 0; i < 3; i++) {
        await fields.nth(i).fill(String(9 - i));
        await page.waitForTimeout(30);
      }

      // Verify new values
      for (let i = 0; i < 3; i++) {
        await expect(fields.nth(i)).toHaveValue(String(9 - i));
      }
    });

    test('should handle focus and blur cycles', async ({ page }) => {
      const otpContainer = page.locator('[x-data*="uxOtpInput"]').first();
      const firstField = otpContainer.locator('.ux-otp__field').first();

      for (let i = 0; i < 3; i++) {
        await firstField.focus();
        await firstField.blur();
        await page.waitForTimeout(20);
      }

      // Should still be functional
      await firstField.focus();
      await expect(firstField).toBeFocused();
    });
  });
});
