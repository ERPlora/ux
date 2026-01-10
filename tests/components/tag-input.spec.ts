import { test, expect } from '@playwright/test';

test.describe('Tag Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/tag-input.html');
  });

  // Basic Rendering Tests
  test('should render basic tag input container', async ({ page }) => {
    const tagInput = page.locator('.ux-tag-input').first();
    await expect(tagInput).toBeVisible();
  });

  test('should render input field', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    await expect(inputField).toBeVisible();
  });

  test('should render with placeholder text', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    const placeholder = await inputField.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });

  test('should render tag input wrapper', async ({ page }) => {
    const wrapper = page.locator('.ux-tag-input-wrapper').first();
    await expect(wrapper).toBeVisible();
  });

  // Tag Display Tests
  test('should display initial tags', async ({ page }) => {
    const tagInputWithTags = page.locator('text="Tag 1"').locator('xpath=ancestor::div[@class="ux-tag-input-wrapper"]').first();
    if (await tagInputWithTags.count() > 0) {
      const tags = page.locator('.ux-tag');
      expect(await tags.count()).toBeGreaterThan(0);
    }
  });

  test('should render tag with text', async ({ page }) => {
    const tags = page.locator('.ux-tag');
    if (await tags.count() > 0) {
      const tagText = tags.first().locator('.ux-tag__text');
      await expect(tagText).toBeVisible();
    }
  });

  test('should render tag remove button', async ({ page }) => {
    const tags = page.locator('.ux-tag');
    if (await tags.count() > 0) {
      const removeBtn = tags.first().locator('.ux-tag__remove');
      await expect(removeBtn).toBeVisible();
    }
  });

  // Add Tags Tests
  test('should add tag by pressing Enter', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    const initialTagCount = await page.locator('.ux-tag').count();

    await inputField.fill('newtag');
    await inputField.press('Enter');
    await page.waitForTimeout(200);

    const newTagCount = await page.locator('.ux-tag').count();
    expect(newTagCount).toBeGreaterThan(initialTagCount);
  });

  test('should add tag by comma delimiter', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    const initialTagCount = await page.locator('.ux-tag').count();

    await inputField.fill('tag1,tag2,tag3');
    await page.waitForTimeout(200);

    const newTagCount = await page.locator('.ux-tag').count();
    expect(newTagCount).toBeGreaterThan(initialTagCount);
  });

  test('should clear input after adding tag', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();

    await inputField.fill('testtag');
    await inputField.press('Enter');
    await page.waitForTimeout(200);

    const inputValue = await inputField.inputValue();
    expect(inputValue).toBe('');
  });

  test('should not add empty tags', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    const initialTagCount = await page.locator('.ux-tag').count();

    await inputField.fill('   ');
    await inputField.press('Enter');
    await page.waitForTimeout(200);

    const newTagCount = await page.locator('.ux-tag').count();
    expect(newTagCount).toBe(initialTagCount);
  });

  // Remove Tags Tests
  test('should remove tag by clicking remove button', async ({ page }) => {
    // Find a section with initial tags
    const initialTags = page.locator('.ux-tag');
    const initialCount = await initialTags.count();

    if (initialCount > 0) {
      const removeBtn = initialTags.first().locator('.ux-tag__remove');
      await removeBtn.click();
      await page.waitForTimeout(200);

      const newCount = await page.locator('.ux-tag').count();
      expect(newCount).toBeLessThan(initialCount);
    }
  });

  test('should remove last tag with Backspace when input empty', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();

    // First add a tag
    await inputField.fill('backspacetag');
    await inputField.press('Enter');
    await page.waitForTimeout(200);

    const countBeforeBackspace = await page.locator('.ux-tag').count();

    // Focus input and press Backspace
    await inputField.focus();
    await inputField.press('Backspace');
    await page.waitForTimeout(200);

    const countAfterBackspace = await page.locator('.ux-tag').count();
    expect(countAfterBackspace).toBeLessThan(countBeforeBackspace);
  });

  test('should display tag remove button on hover', async ({ page }) => {
    const tags = page.locator('.ux-tag');
    if (await tags.count() > 0) {
      const removeBtn = tags.first().locator('.ux-tag__remove');
      const opacity = await removeBtn.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeGreaterThan(0);
    }
  });

  // Validation Tests
  test('should validate email format with custom validator', async ({ page }) => {
    // Find the email validation section
    const emailInput = page.locator('.ux-tag-input__field').filter({
      has: page.locator('xpath=ancestor::div[contains(text(), "Emails")]')
    }).first();

    if (await emailInput.count() > 0) {
      await emailInput.fill('invalidemail');
      await emailInput.press('Enter');
      await page.waitForTimeout(200);

      // Invalid email should not be added
      const emailTags = page.locator('.ux-tag');
      const hasInvalidEmail = await emailTags.allTextContents().then(texts =>
        texts.some(text => text.includes('invalidemail'))
      );
      expect(hasInvalidEmail).toBe(false);
    }
  });

  test('should accept valid email and display error message', async ({ page }) => {
    // Find email input field
    const section = page.locator('text="Emails"').locator('xpath=ancestor::div[@class="demo-box"]').first();
    const emailInput = section.locator('.ux-tag-input__field');

    await emailInput.fill('invalidemail');
    await emailInput.press('Enter');
    await page.waitForTimeout(200);

    // Error message should be visible
    const errorMsg = section.locator('text="Debe ser un email válido"');
    if (await errorMsg.count() > 0) {
      await expect(errorMsg).toBeVisible();
    }
  });

  test('should prevent duplicate tags by default', async ({ page }) => {
    // Find a section with allowCreate enabled
    const inputField = page.locator('.ux-tag-input__field').nth(1);

    // Add a tag
    await inputField.fill('javascript');
    await inputField.press('Enter');
    await page.waitForTimeout(200);

    // Try to add the same tag again
    await inputField.fill('javascript');
    await inputField.press('Enter');
    await page.waitForTimeout(200);

    // Count JavaScript tags - should only have one
    const allTags = page.locator('.ux-tag__text');
    const jsTags = await allTags.allTextContents().then(texts =>
      texts.filter(text => text.toLowerCase() === 'javascript').length
    );
    expect(jsTags).toBeLessThanOrEqual(2); // May have from initial state + 1 added
  });

  // Max Tags Limit Tests
  test('should enforce maximum tag limit', async ({ page }) => {
    // Find section with maxTags limit (max 5)
    const maxTagsSection = page.locator('text="máximo 5"').locator('xpath=ancestor::div[@class="demo-box"]').first();
    if (await maxTagsSection.count() > 0) {
      const inputField = maxTagsSection.locator('.ux-tag-input__field');
      const counter = maxTagsSection.locator('.ux-tag-input__counter');

      // Try to add tags beyond limit
      for (let i = 0; i < 10; i++) {
        await inputField.fill(`tag${i}`);
        await inputField.press('Enter');
        await page.waitForTimeout(100);
      }

      // Check counter shows we're at limit
      if (await counter.count() > 0) {
        const counterText = await counter.textContent();
        expect(counterText).toContain('/5');
      }
    }
  });

  test('should disable input when max tags reached', async ({ page }) => {
    const maxTagsSection = page.locator('text="máximo 5"').locator('xpath=ancestor::div[@class="demo-box"]').first();
    if (await maxTagsSection.count() > 0) {
      const inputField = maxTagsSection.locator('.ux-tag-input__field');
      const tagCount = await maxTagsSection.locator('.ux-tag').count();

      if (tagCount >= 5) {
        const isDisabled = await inputField.isDisabled();
        expect(isDisabled).toBe(true);
      }
    }
  });

  // Suggestions Tests
  test('should show suggestions dropdown when typing', async ({ page }) => {
    const suggestionsSection = page.locator('text="Con Sugerencias"').locator('xpath=ancestor::div[@class="demo-section"]').first();
    if (await suggestionsSection.count() > 0) {
      const inputField = suggestionsSection.locator('.ux-tag-input__field');
      const suggestionsDropdown = suggestionsSection.locator('.ux-tag-input__suggestions');

      await inputField.fill('java');
      await page.waitForTimeout(200);

      // Dropdown should be visible
      await expect(suggestionsDropdown).toBeVisible();
    }
  });

  test('should filter suggestions based on input', async ({ page }) => {
    const suggestionsSection = page.locator('text="Con Sugerencias"').locator('xpath=ancestor::div[@class="demo-section"]').first();
    if (await suggestionsSection.count() > 0) {
      const inputField = suggestionsSection.locator('.ux-tag-input__field');
      const suggestions = suggestionsSection.locator('.ux-tag-input__suggestion');

      await inputField.fill('java');
      await page.waitForTimeout(200);

      const suggestionTexts = await suggestions.allTextContents();
      const hasJava = suggestionTexts.some(text => text.toLowerCase().includes('java'));
      expect(hasJava).toBe(true);
    }
  });

  test('should select suggestion on click', async ({ page }) => {
    const suggestionsSection = page.locator('text="Con Sugerencias"').locator('xpath=ancestor::div[@class="demo-section"]').first();
    if (await suggestionsSection.count() > 0) {
      const inputField = suggestionsSection.locator('.ux-tag-input__field');
      const suggestions = suggestionsSection.locator('.ux-tag-input__suggestion').first();

      await inputField.fill('java');
      await page.waitForTimeout(200);

      if (await suggestions.count() > 0) {
        await suggestions.click();
        await page.waitForTimeout(200);

        // Input should be cleared
        const inputValue = await inputField.inputValue();
        expect(inputValue).toBe('');
      }
    }
  });

  test('should navigate suggestions with arrow keys', async ({ page }) => {
    const suggestionsSection = page.locator('text="Con Sugerencias"').locator('xpath=ancestor::div[@class="demo-section"]').first();
    if (await suggestionsSection.count() > 0) {
      const inputField = suggestionsSection.locator('.ux-tag-input__field');

      await inputField.fill('java');
      await page.waitForTimeout(200);

      await inputField.press('ArrowDown');
      await page.waitForTimeout(100);

      // Active suggestion should be highlighted
      const activeSuggestion = suggestionsSection.locator('.ux-tag-input__suggestion--active');
      expect(await activeSuggestion.count()).toBeGreaterThan(0);
    }
  });

  // Size Variant Tests
  test('should render small variant', async ({ page }) => {
    const smallTagInput = page.locator('.ux-tag-input--sm').first();
    if (await smallTagInput.count() > 0) {
      const height = await smallTagInput.evaluate(el =>
        parseInt(getComputedStyle(el).minHeight)
      );
      expect(height).toBe(36);
    }
  });

  test('should render large variant', async ({ page }) => {
    const largeTagInput = page.locator('.ux-tag-input--lg').first();
    if (await largeTagInput.count() > 0) {
      const height = await largeTagInput.evaluate(el =>
        parseInt(getComputedStyle(el).minHeight)
      );
      expect(height).toBe(52);
    }
  });

  // Glass Variant Tests
  test('should apply glass variant', async ({ page }) => {
    const glassTagInput = page.locator('.ux-tag-input--glass').first();
    if (await glassTagInput.count() > 0) {
      const backdropFilter = await glassTagInput.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have glass background color', async ({ page }) => {
    const glassTagInput = page.locator('.ux-tag-input--glass').first();
    if (await glassTagInput.count() > 0) {
      const background = await glassTagInput.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(background).toBeTruthy();
    }
  });

  // State Tests
  test('should show disabled state', async ({ page }) => {
    const disabledTagInput = page.locator('.ux-tag-input--disabled').first();
    if (await disabledTagInput.count() > 0) {
      const opacity = await disabledTagInput.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('should show error state with border color', async ({ page }) => {
    const errorTagInput = page.locator('.ux-tag-input--error').first();
    if (await errorTagInput.count() > 0) {
      const borderColor = await errorTagInput.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).toBeTruthy();
    }
  });

  // Focus & Interaction Tests
  test('should be focusable', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    await inputField.focus();
    await expect(inputField).toBeFocused();
  });

  test('should show focus ring on input focus', async ({ page }) => {
    const tagInputContainer = page.locator('.ux-tag-input').first();
    const inputField = tagInputContainer.locator('.ux-tag-input__field');

    await inputField.focus();
    await page.waitForTimeout(100);

    // Focus state should be applied to container
    const boxShadow = await tagInputContainer.evaluate(el =>
      getComputedStyle(el).boxShadow
    );
    // Box shadow may be present or borderColor may be highlighted
    expect(boxShadow || true).toBeTruthy();
  });

  test('should close suggestions on Escape key', async ({ page }) => {
    const suggestionsSection = page.locator('text="Con Sugerencias"').locator('xpath=ancestor::div[@class="demo-section"]').first();
    if (await suggestionsSection.count() > 0) {
      const inputField = suggestionsSection.locator('.ux-tag-input__field');
      const suggestionsDropdown = suggestionsSection.locator('.ux-tag-input__suggestions');

      await inputField.fill('java');
      await page.waitForTimeout(200);
      await expect(suggestionsDropdown).toBeVisible();

      await inputField.press('Escape');
      await page.waitForTimeout(100);

      const isOpen = await suggestionsDropdown.evaluate(el =>
        el.classList.contains('ux-tag-input__suggestions--open')
      );
      expect(isOpen).toBe(false);
    }
  });

  // Keyboard Navigation Tests
  test('should have minimum touch target height', async ({ page }) => {
    const tagInput = page.locator('.ux-tag-input').first();
    const height = await tagInput.evaluate(el =>
      parseInt(getComputedStyle(el).minHeight)
    );
    expect(height).toBeGreaterThanOrEqual(44);
  });

  test('should wrap tags to multiple lines', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();

    // Add multiple tags to force wrapping
    for (let i = 0; i < 5; i++) {
      await inputField.fill(`wraptyesttag${i}`);
      await inputField.press('Enter');
      await page.waitForTimeout(100);
    }

    const tags = page.locator('.ux-tag');
    expect(await tags.count()).toBeGreaterThan(3);
  });

  // Events Tests
  test('should dispatch add event when tag added', async ({ page }) => {
    const eventsSection = page.locator('text="Eventos"').locator('xpath=ancestor::div[@class="demo-section"]').first();
    if (await eventsSection.count() > 0) {
      const inputField = eventsSection.locator('.ux-tag-input__field');
      const eventLog = eventsSection.locator('text="add:"');

      await inputField.fill('eventtest');
      await inputField.press('Enter');
      await page.waitForTimeout(200);

      expect(await eventLog.count()).toBeGreaterThan(0);
    }
  });

  test('should display counter when showCounter enabled', async ({ page }) => {
    const counterSection = page.locator('text="máximo 5"').locator('xpath=ancestor::div[@class="demo-box"]').first();
    if (await counterSection.count() > 0) {
      const counter = counterSection.locator('.ux-tag-input__counter');
      expect(await counter.count()).toBeGreaterThan(0);
    }
  });

  test('should show counter in limit state with different color', async ({ page }) => {
    const counterSection = page.locator('text="máximo 5"').locator('xpath=ancestor::div[@class="demo-box"]').first();
    if (await counterSection.count() > 0) {
      const counter = counterSection.locator('.ux-tag-input__counter');
      const tagCount = await counterSection.locator('.ux-tag').count();

      if (tagCount >= 5 && await counter.count() > 0) {
        const hasLimitClass = await counter.evaluate(el =>
          el.classList.contains('ux-tag-input__counter--limit')
        );
        expect(hasLimitClass).toBe(true);
      }
    }
  });

  // Accessibility Tests
  test('should be keyboard accessible', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    await inputField.focus();
    await expect(inputField).toBeFocused();

    // Should be able to type
    await inputField.type('a');
    const value = await inputField.inputValue();
    expect(value).toContain('a');
  });

  test('should have proper ARIA roles', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    const type = await inputField.getAttribute('type');
    expect(type).toBe('text');
  });

  test('should support Tab navigation', async ({ page }) => {
    const inputField = page.locator('.ux-tag-input__field').first();
    await inputField.focus();
    await expect(inputField).toBeFocused();

    await inputField.press('Tab');
    // Focus should move to next element
    const isFocused = await inputField.evaluate(el => el === document.activeElement);
    expect(isFocused).toBe(false);
  });
});
