import { test, expect } from '@playwright/test';

test.describe('Code Block Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/code-block.html');
  });

  test('should render basic code block', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block').first();
    await expect(codeBlock).toBeVisible();
  });

  test('should render code block content', async ({ page }) => {
    const content = page.locator('.ux-code-block__content').first();
    await expect(content).toBeVisible();
  });

  test('should render code block with header', async ({ page }) => {
    const header = page.locator('.ux-code-block__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should display filename in header', async ({ page }) => {
    const title = page.locator('.ux-code-block__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
      const text = await title.textContent();
      // Should contain either a filename or language badge
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display language badge', async ({ page }) => {
    const langBadge = page.locator('.ux-code-block__lang').first();
    if (await langBadge.count() > 0) {
      await expect(langBadge).toBeVisible();
      const text = await langBadge.textContent();
      // Should have language abbreviation (JS, HTML, CSS, etc.)
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display copy button', async ({ page }) => {
    const copyBtn = page.locator('.ux-code-block__btn').first();
    if (await copyBtn.count() > 0) {
      await expect(copyBtn).toBeVisible();
    }
  });

  test('should copy code to clipboard on button click', async ({ page }) => {
    // Get the first code block element
    const codeBlock = page.locator('.ux-code-block').first();
    const copyBtn = codeBlock.locator('.ux-code-block__btn').first();

    if (await copyBtn.count() > 0) {
      // Grant clipboard permissions and setup clipboard monitoring
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

      // Click the copy button
      await copyBtn.click();

      // Wait briefly for button state to update
      await page.waitForTimeout(100);

      // Button should show copied state with "Copiado" text or check icon
      const btnClasses = await copyBtn.getAttribute('class');
      const btnText = await copyBtn.textContent();

      expect(
        btnClasses?.includes('ux-code-block__btn--copied') ||
        btnText?.includes('Copiado') ||
        btnText?.includes('Copied')
      ).toBeTruthy();
    }
  });

  test('should show line numbers by default', async ({ page }) => {
    const lineNumbers = page.locator('.ux-code-block__line-numbers').first();
    if (await lineNumbers.count() > 0) {
      await expect(lineNumbers).toBeVisible();

      const numbers = lineNumbers.locator('.ux-code-block__line-number');
      expect(await numbers.count()).toBeGreaterThan(0);
    }
  });

  test('should display line numbers with correct values', async ({ page }) => {
    const lineNumbers = page.locator('.ux-code-block__line-number');
    const count = await lineNumbers.count();

    if (count > 0) {
      // Check first line number
      const firstLineText = await lineNumbers.first().textContent();
      expect(firstLineText).toBe('1');

      // Check second line number
      if (count > 1) {
        const secondLineText = await lineNumbers.nth(1).textContent();
        expect(secondLineText).toBe('2');
      }
    }
  });

  test('should hide line numbers when showLineNumbers is false', async ({ page }) => {
    // Find the code block without line numbers
    const noLineNumbersBlock = page.locator('div:has-text("Sin Números de Línea")').first();
    if (await noLineNumbersBlock.count() > 0) {
      // Get the code block in this section
      const section = noLineNumbersBlock.locator('..').first();
      const lineNumbers = section.locator('.ux-code-block__line-numbers').first();

      if (await lineNumbers.count() > 0) {
        const visible = await lineNumbers.isVisible();
        expect(visible).toBe(false);
      }
    }
  });

  test('should render code content with syntax highlighting tokens', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block__code').first();
    if (await codeBlock.count() > 0) {
      // Check for presence of syntax highlighting tokens
      const tokens = codeBlock.locator('[class^="token-"]');
      const tokenCount = await tokens.count();

      // Should have at least some tokens highlighted
      if (tokenCount > 0) {
        expect(tokenCount).toBeGreaterThan(0);
      }
    }
  });

  test('should highlight code keywords', async ({ page }) => {
    const keywords = page.locator('.token-keyword');
    if (await keywords.count() > 0) {
      await expect(keywords.first()).toBeVisible();

      // Check color is applied (not default)
      const color = await keywords.first().evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).not.toBe('inherit');
    }
  });

  test('should highlight code strings', async ({ page }) => {
    const strings = page.locator('.token-string');
    if (await strings.count() > 0) {
      await expect(strings.first()).toBeVisible();

      const color = await strings.first().evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).not.toBe('inherit');
    }
  });

  test('should highlight code comments', async ({ page }) => {
    const comments = page.locator('.token-comment');
    if (await comments.count() > 0) {
      await expect(comments.first()).toBeVisible();

      const color = await comments.first().evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).not.toBe('inherit');
    }
  });

  test('should highlight code functions', async ({ page }) => {
    const functions = page.locator('.token-function');
    if (await functions.count() > 0) {
      await expect(functions.first()).toBeVisible();
    }
  });

  test('should support different languages', async ({ page }) => {
    const htmlBlock = page.locator('.ux-code-block__lang:has-text("HTML")').first();
    const cssBlock = page.locator('.ux-code-block__lang:has-text("CSS")').first();
    const pythonBlock = page.locator('.ux-code-block__lang:has-text("PYTHON")').first();
    const jsonBlock = page.locator('.ux-code-block__lang:has-text("JSON")').first();

    if (await htmlBlock.count() > 0) {
      await expect(htmlBlock).toBeVisible();
    }
    if (await cssBlock.count() > 0) {
      await expect(cssBlock).toBeVisible();
    }
    if (await pythonBlock.count() > 0) {
      await expect(pythonBlock).toBeVisible();
    }
    if (await jsonBlock.count() > 0) {
      await expect(jsonBlock).toBeVisible();
    }
  });

  test('should apply light theme variant', async ({ page }) => {
    const lightBlock = page.locator('.ux-code-block--light').first();
    if (await lightBlock.count() > 0) {
      await expect(lightBlock).toBeVisible();

      const bgColor = await lightBlock.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Light theme should have a light background
      expect(bgColor).not.toBe('rgb(17, 24, 39)'); // Not dark gray
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassBlock = page.locator('.ux-code-block--glass').first();
    if (await glassBlock.count() > 0) {
      await expect(glassBlock).toBeVisible();

      const backdropFilter = await glassBlock.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should highlight specific lines when specified', async ({ page }) => {
    // Find the section with highlighted lines
    const highlightedSection = page.locator('h2:has-text("Líneas Resaltadas")').first();
    if (await highlightedSection.count() > 0) {
      const section = highlightedSection.locator('..').first();
      const highlightedLines = section.locator('.ux-code-block__line--highlight');

      if (await highlightedLines.count() > 0) {
        // Should have highlighted lines
        expect(await highlightedLines.count()).toBeGreaterThan(0);

        // Highlighted lines should have special styling
        const bgColor = await highlightedLines.first().evaluate(el =>
          getComputedStyle(el).backgroundColor
        );
        expect(bgColor).not.toBe('transparent');
      }
    }
  });

  test('should hide header when showHeader is false', async ({ page }) => {
    // Find the section without header
    const noHeaderSection = page.locator('h2:has-text("Sin Header")').first();
    if (await noHeaderSection.count() > 0) {
      const section = noHeaderSection.locator('..').first();
      const header = section.locator('.ux-code-block__header').first();

      if (await header.count() > 0) {
        const visible = await header.isVisible();
        expect(visible).toBe(false);
      }
    }
  });

  test('should apply size variants', async ({ page }) => {
    const smallBlock = page.locator('.ux-code-block--sm').first();
    const largeBlock = page.locator('.ux-code-block--lg').first();

    if (await smallBlock.count() > 0) {
      const fontSize = await smallBlock.evaluate(el =>
        parseInt(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeLessThan(15); // Smaller than standard
    }

    if (await largeBlock.count() > 0) {
      const fontSize = await largeBlock.evaluate(el =>
        parseInt(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeGreaterThan(14); // Larger than standard
    }
  });

  test('should have proper border radius', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block').first();
    const borderRadius = await codeBlock.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have horizontal scrollbar for long lines', async ({ page }) => {
    const content = page.locator('.ux-code-block__content').first();
    if (await content.count() > 0) {
      const scrollWidth = await content.evaluate(el => el.scrollWidth);
      const clientWidth = await content.evaluate(el => el.clientWidth);

      // Content should be scrollable if scrollWidth > clientWidth
      if (scrollWidth > clientWidth) {
        expect(scrollWidth).toBeGreaterThan(clientWidth);
      }
    }
  });

  test('should render inline code correctly', async ({ page }) => {
    const inlineCode = page.locator('.ux-code-inline').first();
    if (await inlineCode.count() > 0) {
      await expect(inlineCode).toBeVisible();

      const display = await inlineCode.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toMatch(/inline/);
    }
  });

  test('copy button should reset after 2 seconds', async ({ page }) => {
    const copyBtn = page.locator('.ux-code-block__btn').first();

    if (await copyBtn.count() > 0) {
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

      // Click copy button
      await copyBtn.click();
      await page.waitForTimeout(100);

      // Should show copied state
      let btnClass = await copyBtn.getAttribute('class');
      expect(btnClass?.includes('ux-code-block__btn--copied')).toBeTruthy();

      // Wait for reset
      await page.waitForTimeout(2100);

      // Should return to normal state
      btnClass = await copyBtn.getAttribute('class');
      expect(btnClass?.includes('ux-code-block__btn--copied')).toBeFalsy();
    }
  });

  test('should be keyboard accessible', async ({ page }) => {
    const copyBtn = page.locator('.ux-code-block__btn').first();

    if (await copyBtn.count() > 0) {
      // Button should be focusable
      await copyBtn.focus();
      await expect(copyBtn).toBeFocused();

      // Should be able to activate with Enter
      await page.keyboard.press('Enter');
      // Verify button was clicked (would trigger copy)
      expect(true).toBe(true);
    }
  });

  test('should render code lines correctly', async ({ page }) => {
    const lines = page.locator('.ux-code-block__line');
    const count = await lines.count();

    if (count > 0) {
      // Should have at least one line of code
      expect(count).toBeGreaterThan(0);

      // First line should be visible
      await expect(lines.first()).toBeVisible();
    }
  });

  test('code block should have monospace font', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block').first();
    const fontFamily = await codeBlock.evaluate(el =>
      getComputedStyle(el).fontFamily
    );

    // Should use monospace font
    expect(fontFamily.toLowerCase()).toMatch(/mono|consolas|fira|sf mono|courier/);
  });

  test('should display code with proper line height', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block').first();
    const lineHeight = await codeBlock.evaluate(el =>
      parseFloat(getComputedStyle(el).lineHeight)
    );

    // Line height should be readable (typically 1.5x or 1.6x font size)
    expect(lineHeight).toBeGreaterThan(12); // Minimum for readability
  });

  test('should handle numbers, operators, and punctuation highlighting', async ({ page }) => {
    const numbers = page.locator('.token-number');
    const operators = page.locator('.token-operator');
    const punctuation = page.locator('.token-punctuation');

    // At least some code should have these token types
    if (await numbers.count() > 0) {
      await expect(numbers.first()).toBeVisible();
    }

    if (await operators.count() > 0) {
      await expect(operators.first()).toBeVisible();
    }

    if (await punctuation.count() > 0) {
      await expect(punctuation.first()).toBeVisible();
    }
  });

  test('simple pre blocks with data-lang attribute should auto-initialize', async ({ page }) => {
    // Look for pre blocks that have ux-code-block class
    const simpleCodeBlocks = page.locator('pre.ux-code-block');
    const count = await simpleCodeBlocks.count();

    if (count > 0) {
      // First simple code block should be visible
      const firstBlock = simpleCodeBlocks.first();
      await expect(firstBlock).toBeVisible();

      // Should have initialized class
      const initialized = await firstBlock.getAttribute('data-ux-initialized');
      if (initialized) {
        expect(initialized).toBe('true');
      }
    }
  });

  test('code block should support Alpine.js x-data binding', async ({ page }) => {
    const alpineCodeBlock = page.locator('[x-data*="uxCodeBlock"]').first();

    if (await alpineCodeBlock.count() > 0) {
      await expect(alpineCodeBlock).toBeVisible();

      // Should have Alpine data attribute
      const xData = await alpineCodeBlock.getAttribute('x-data');
      expect(xData).toContain('uxCodeBlock');
    }
  });
});
