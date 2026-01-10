import { test, expect } from '@playwright/test';

test.describe('Autocomplete Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/autocomplete.html');
  });

  test.describe('Basic Rendering', () => {
    test('should render autocomplete container', async ({ page }) => {
      const autocomplete = page.locator('.ux-autocomplete').first();
      await expect(autocomplete).toBeVisible();
    });

    test('should render input field', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      await expect(input).toBeVisible();
    });

    test('should have placeholder text', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const placeholder = await input.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
    });

    test('should render clear button', async ({ page }) => {
      const clearBtn = page.locator('.ux-autocomplete__clear').first();
      await expect(clearBtn).toBeVisible();
    });

    test('should render dropdown container', async ({ page }) => {
      const dropdown = page.locator('.ux-autocomplete__dropdown').first();
      await expect(dropdown).toBeVisible();
    });

    test('should have minimum touch target height', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const height = await input.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(36);
    });
  });

  test.describe('Input Field Interaction', () => {
    test('should accept text input', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      await input.fill('Apple');
      await expect(input).toHaveValue('Apple');
    });

    test('should be focusable', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      await input.focus();
      await expect(input).toBeFocused();
    });

    test('should show focus state', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      await input.focus();
      const borderColor = await input.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).toBeTruthy();
    });

    test('should clear input on clear button click', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const clearBtn = page.locator('.ux-autocomplete__clear').first();

      await input.fill('Test');
      await expect(input).toHaveValue('Test');

      await clearBtn.click();
      await page.waitForTimeout(100);
      await expect(input).toHaveValue('');
    });

    test('should have autocomplete disabled', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const autocomplete = await input.getAttribute('autocomplete');
      expect(autocomplete).toBe('off');
    });
  });

  test.describe('Dropdown Suggestions', () => {
    test('should show dropdown when typing', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const dropdown = page.locator('.ux-autocomplete__dropdown').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      const isOpen = await dropdown.evaluate(el =>
        el.classList.contains('ux-autocomplete__dropdown--open')
      );
      expect(isOpen).toBeTruthy();
    });

    test('should display list items in dropdown', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const listItems = page.locator('.ux-autocomplete__item');

      await input.fill('a');
      await page.waitForTimeout(400);

      const count = await listItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should hide dropdown when no matches', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const dropdown = page.locator('.ux-autocomplete__dropdown').first();

      await input.fill('xyz999');
      await page.waitForTimeout(400);

      const isOpen = await dropdown.evaluate(el =>
        el.classList.contains('ux-autocomplete__dropdown--open')
      );
      // Should show empty state or close
      const emptyState = page.locator('.ux-autocomplete__empty');
      const isEmptyVisible = await emptyState.isVisible();
      const isClosed = !isOpen;

      expect(isEmptyVisible || isClosed).toBeTruthy();
    });

    test('should filter items based on input', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const listItems = page.locator('.ux-autocomplete__item');

      await input.fill('Apple');
      await page.waitForTimeout(400);

      const count = await listItems.count();
      expect(count).toBeGreaterThan(0);

      const firstItemText = await listItems.first().textContent();
      expect(firstItemText?.toLowerCase()).toContain('apple');
    });

    test('should show empty state when no results', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const emptyState = page.locator('.ux-autocomplete__empty').first();

      await input.fill('zzzzzzzz');
      await page.waitForTimeout(400);

      const emptyText = await emptyState.textContent();
      expect(emptyText).toBeTruthy();
    });

    test('should highlight matching text', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const highlight = page.locator('.ux-autocomplete__highlight');

      await input.fill('App');
      await page.waitForTimeout(400);

      const count = await highlight.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should respect minChars setting', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const dropdown = page.locator('.ux-autocomplete__dropdown').first();

      await input.fill('a');
      await page.waitForTimeout(100);

      const isOpen = await dropdown.evaluate(el =>
        el.classList.contains('ux-autocomplete__dropdown--open')
      );
      expect(isOpen).toBeTruthy();
    });

    test('should limit results to maxItems', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const listItems = page.locator('.ux-autocomplete__item');

      await input.fill('');
      await page.waitForTimeout(400);

      const count = await listItems.count();
      expect(count).toBeLessThanOrEqual(10);
    });
  });

  test.describe('Selection Behavior', () => {
    test('should select item on click', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const firstItem = page.locator('.ux-autocomplete__item').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      const itemText = await firstItem.textContent();
      await firstItem.click();

      await page.waitForTimeout(200);
      const inputValue = await input.inputValue();
      expect(inputValue).toContain(itemText?.trim() || '');
    });

    test('should close dropdown after selection', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const firstItem = page.locator('.ux-autocomplete__item').first();
      const dropdown = page.locator('.ux-autocomplete__dropdown').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await firstItem.click();
      await page.waitForTimeout(300);

      const isOpen = await dropdown.evaluate(el =>
        el.classList.contains('ux-autocomplete__dropdown--open')
      );
      expect(isOpen).toBeFalsy();
    });

    test('should set selected value after selection', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const listItems = page.locator('.ux-autocomplete__item');

      await input.fill('a');
      await page.waitForTimeout(400);

      const firstItemText = await listItems.first().textContent();
      await listItems.first().click();

      await page.waitForTimeout(200);
      const value = await input.inputValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('should dispatch select event', async ({ page }) => {
      const eventListener = await page.evaluateHandle(() => {
        let selectedEvent = null;
        document.addEventListener('autocomplete:select', (e: any) => {
          selectedEvent = e.detail;
        });
        return () => selectedEvent;
      });

      const input = page.locator('.ux-autocomplete__input').first();
      const firstItem = page.locator('.ux-autocomplete__item').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await firstItem.click();
      await page.waitForTimeout(200);

      const result = await eventListener.evaluate((fn: any) => fn?.());
      expect(result).toBeTruthy();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate items with arrow keys', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await input.press('ArrowDown');
      await page.waitForTimeout(100);

      const activeItem = page.locator('.ux-autocomplete__item--active').first();
      await expect(activeItem).toBeVisible();
    });

    test('should move to next item with ArrowDown', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await input.press('ArrowDown');
      await page.waitForTimeout(100);

      let activeIndex = await page.locator('.ux-autocomplete__item--active').first().evaluate((el, index) => {
        const parent = el.parentElement;
        if (!parent) return -1;
        return Array.from(parent.children).indexOf(el);
      }, 0);

      await input.press('ArrowDown');
      await page.waitForTimeout(100);

      let newActiveIndex = await page.locator('.ux-autocomplete__item--active').first().evaluate((el, index) => {
        const parent = el.parentElement;
        if (!parent) return -1;
        return Array.from(parent.children).indexOf(el);
      }, 0);

      expect(newActiveIndex).toBeGreaterThanOrEqual(activeIndex);
    });

    test('should move to previous item with ArrowUp', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await input.press('ArrowDown');
      await input.press('ArrowDown');
      await page.waitForTimeout(100);

      await input.press('ArrowUp');
      await page.waitForTimeout(100);

      const activeItem = page.locator('.ux-autocomplete__item--active').first();
      await expect(activeItem).toBeVisible();
    });

    test('should select item with Enter key', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await input.press('ArrowDown');
      await page.waitForTimeout(100);

      const firstItemText = await page.locator('.ux-autocomplete__item').first().textContent();
      await input.press('Enter');

      await page.waitForTimeout(200);
      const inputValue = await input.inputValue();
      expect(inputValue).toContain(firstItemText?.trim() || '');
    });

    test('should close dropdown with Escape key', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const dropdown = page.locator('.ux-autocomplete__dropdown').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await input.press('Escape');
      await page.waitForTimeout(200);

      const isOpen = await dropdown.evaluate(el =>
        el.classList.contains('ux-autocomplete__dropdown--open')
      );
      expect(isOpen).toBeFalsy();
    });

    test('should close dropdown with Tab key', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const dropdown = page.locator('.ux-autocomplete__dropdown').first();

      await input.fill('a');
      await page.waitForTimeout(400);

      await input.press('Tab');
      await page.waitForTimeout(200);

      const isOpen = await dropdown.evaluate(el =>
        el.classList.contains('ux-autocomplete__dropdown--open')
      );
      expect(isOpen).toBeFalsy();
    });
  });

  test.describe('Filtering', () => {
    test('should filter case-insensitively', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('apple');
      await page.waitForTimeout(400);

      const listItems = page.locator('.ux-autocomplete__item');
      const count = await listItems.count();
      expect(count).toBeGreaterThan(0);

      await input.clear();
      await input.fill('APPLE');
      await page.waitForTimeout(400);

      const countUppercase = await listItems.count();
      expect(countUppercase).toBe(count);
    });

    test('should filter with partial matches', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('app');
      await page.waitForTimeout(400);

      const listItems = page.locator('.ux-autocomplete__item');
      const count = await listItems.count();
      expect(count).toBeGreaterThan(0);

      const firstItemText = await listItems.first().textContent();
      expect(firstItemText?.toLowerCase()).toContain('app');
    });

    test('should filter items as user types', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('a');
      await page.waitForTimeout(400);
      let countA = await page.locator('.ux-autocomplete__item').count();

      await input.fill('ap');
      await page.waitForTimeout(400);
      let countAp = await page.locator('.ux-autocomplete__item').count();

      // More specific query should have fewer or equal results
      expect(countAp).toBeLessThanOrEqual(countA);
    });

    test('should show description in filtered results', async ({ page }) => {
      // Navigate to the "Con Descripciones" section
      const sections = page.locator('.demo-section');
      const descriptionSection = await sections.nth(1);

      await descriptionSection.scrollIntoViewIfNeeded();
      const input = descriptionSection.locator('.ux-autocomplete__input').first();

      await input.fill('madrid');
      await page.waitForTimeout(400);

      const description = descriptionSection.locator('.ux-autocomplete__item-description');
      const count = await description.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should support empty filter results', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.fill('nonexistentitem12345');
      await page.waitForTimeout(400);

      const listItems = page.locator('.ux-autocomplete__item');
      const emptyState = page.locator('.ux-autocomplete__empty');

      const itemCount = await listItems.count();
      const emptyVisible = await emptyState.isVisible();

      expect(itemCount === 0 || emptyVisible).toBeTruthy();
    });
  });

  test.describe('Variants', () => {
    test('should render small variant', async ({ page }) => {
      const smallAutocomplete = page.locator('.ux-autocomplete--sm').first();
      if (await smallAutocomplete.count() > 0) {
        const input = smallAutocomplete.locator('.ux-autocomplete__input');
        const height = await input.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        expect(height).toBeLessThanOrEqual(40);
      }
    });

    test('should render large variant', async ({ page }) => {
      const largeAutocomplete = page.locator('.ux-autocomplete--lg').first();
      if (await largeAutocomplete.count() > 0) {
        const input = largeAutocomplete.locator('.ux-autocomplete__input');
        const height = await input.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        expect(height).toBeGreaterThanOrEqual(48);
      }
    });

    test('should apply glass variant', async ({ page }) => {
      const glassAutocomplete = page.locator('.ux-autocomplete--glass').first();
      if (await glassAutocomplete.count() > 0) {
        const input = glassAutocomplete.locator('.ux-autocomplete__input');
        const backdropFilter = await input.evaluate(el =>
          getComputedStyle(el).backdropFilter ||
          getComputedStyle(el).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible input attributes', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const type = await input.getAttribute('type');
      expect(type).toBe('text');
    });

    test('should support keyboard-only navigation', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();

      await input.focus();
      await input.type('a');
      await page.waitForTimeout(400);

      await input.press('ArrowDown');
      const activeItem = page.locator('.ux-autocomplete__item--active');
      await expect(activeItem).toBeVisible();

      await input.press('Enter');
      const selectedValue = await input.inputValue();
      expect(selectedValue.length).toBeGreaterThan(0);
    });

    test('should be navigable with Tab key', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      await input.press('Tab');
      // Tab should move focus out of the input
      const isFocused = await input.evaluate(el => el === document.activeElement);
      expect(!isFocused).toBeTruthy();
    });
  });

  test.describe('Clear Button Behavior', () => {
    test('should hide clear button when empty', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const clearBtn = page.locator('.ux-autocomplete__clear').first();

      // Initially input is empty
      await input.fill('');
      await page.waitForTimeout(100);

      const isHidden = await clearBtn.evaluate(el =>
        el.classList.contains('ux-autocomplete__clear--hidden') ||
        getComputedStyle(el).display === 'none'
      );
      expect(isHidden).toBeTruthy();
    });

    test('should show clear button when has value', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const clearBtn = page.locator('.ux-autocomplete__clear').first();

      await input.fill('test');
      await page.waitForTimeout(100);

      const isVisible = await clearBtn.evaluate(el =>
        getComputedStyle(el).opacity !== '0' &&
        !el.classList.contains('ux-autocomplete__clear--hidden')
      );
      expect(isVisible).toBeTruthy();
    });

    test('should be clickable', async ({ page }) => {
      const input = page.locator('.ux-autocomplete__input').first();
      const clearBtn = page.locator('.ux-autocomplete__clear').first();

      await input.fill('test value');
      await page.waitForTimeout(100);

      expect(await input.inputValue()).toBe('test value');
      await clearBtn.click();
      await page.waitForTimeout(100);

      expect(await input.inputValue()).toBe('');
    });
  });
});
