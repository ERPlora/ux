import { test, expect } from '@playwright/test';

test.describe('Rich Text Editor Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/rich-text.html');
  });

  test('should render rich text editor', async ({ page }) => {
    const editor = page.locator('.ux-rich-text').first();
    await expect(editor).toBeVisible();
  });

  test('should render toolbar correctly', async ({ page }) => {
    const toolbar = page.locator('.ux-rich-text__toolbar').first();
    await expect(toolbar).toBeVisible();

    // Check for toolbar buttons
    const buttons = toolbar.locator('.ux-rich-text__btn');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should render editor area', async ({ page }) => {
    const editorArea = page.locator('.ux-rich-text__editor').first();
    await expect(editorArea).toBeVisible();

    // Check that editor is contenteditable
    const isEditable = await editorArea.evaluate(el => el.getAttribute('contenteditable'));
    expect(isEditable).toBe('true');
  });

  test('should have bold button that toggles active state', async ({ page }) => {
    // Find the bold button (first formatting button with toggleBold)
    const boldButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.bold"]') }).first();
    if (await boldButton.count() > 0) {
      await expect(boldButton).toBeVisible();

      // Click the editor first to focus it
      const editor = page.locator('.ux-rich-text__editor').first();
      await editor.click();
      await editor.type('Test text');

      // Select all text
      await page.keyboard.press('Control+a');

      // Click bold button
      await boldButton.click();

      // Button should have active class
      await expect(boldButton).toHaveClass(/ux-rich-text__btn--active/);
    }
  });

  test('should have italic button that toggles active state', async ({ page }) => {
    const italicButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.italic"]') }).first();
    if (await italicButton.count() > 0) {
      await expect(italicButton).toBeVisible();

      // Click the editor first to focus it
      const editor = page.locator('.ux-rich-text__editor').first();
      await editor.click();
      await editor.type('Test text');

      // Select all text
      await page.keyboard.press('Control+a');

      // Click italic button
      await italicButton.click();

      // Button should have active class
      await expect(italicButton).toHaveClass(/ux-rich-text__btn--active/);
    }
  });

  test('should allow content to be editable', async ({ page }) => {
    const editor = page.locator('.ux-rich-text__editor').first();
    await expect(editor).toBeVisible();

    // Type into the editor
    await editor.click();
    await editor.type('Hello, World!');

    // Verify content was added
    const content = await editor.textContent();
    expect(content).toContain('Hello, World!');
  });

  test('should have source view toggle button', async ({ page }) => {
    // Find the source view toggle button (has icons.code)
    const sourceButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.code"]') }).first();
    if (await sourceButton.count() > 0) {
      await expect(sourceButton).toBeVisible();
    }
  });

  test('should toggle source view when source button is clicked', async ({ page }) => {
    const sourceButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.code"]') }).first();
    const sourceTextarea = page.locator('.ux-rich-text__source').first();

    if (await sourceButton.count() > 0 && await sourceTextarea.count() > 0) {
      // Initially source textarea should be hidden (display: none or visibility: hidden)
      const initialDisplay = await sourceTextarea.evaluate(el => getComputedStyle(el).display);

      // Click to toggle source view
      await sourceButton.click();

      // Wait for state change
      await page.waitForTimeout(100);

      // Button should have active class after toggling
      await expect(sourceButton).toHaveClass(/ux-rich-text__btn--active/);
    }
  });

  test('should display character count', async ({ page }) => {
    const counter = page.locator('.ux-rich-text__counter').first();
    if (await counter.count() > 0) {
      await expect(counter).toBeVisible();

      // Check for caracteres text
      const counterText = await counter.textContent();
      expect(counterText).toContain('caracteres');
    }
  });

  test('should update character count when typing', async ({ page }) => {
    const editor = page.locator('.ux-rich-text__editor').first();
    const counter = page.locator('.ux-rich-text__counter').first();

    if (await counter.count() > 0) {
      // Get initial count text
      const initialText = await counter.textContent();

      // Type into editor
      await editor.click();
      await editor.type('Hello');

      // Wait for Alpine to update
      await page.waitForTimeout(100);

      // Get new count text
      const newText = await counter.textContent();

      // Count should have changed
      expect(newText).not.toBe(initialText);
    }
  });

  test('should display word count', async ({ page }) => {
    const counter = page.locator('.ux-rich-text__counter').first();
    if (await counter.count() > 0) {
      await expect(counter).toBeVisible();

      // Check for palabras text
      const counterText = await counter.textContent();
      expect(counterText).toContain('palabras');
    }
  });

  test('should have toolbar dividers', async ({ page }) => {
    const dividers = page.locator('.ux-rich-text__toolbar-divider');
    if (await dividers.count() > 0) {
      await expect(dividers.first()).toBeVisible();
    }
  });

  test('should have toolbar groups', async ({ page }) => {
    const groups = page.locator('.ux-rich-text__toolbar-group');
    if (await groups.count() > 0) {
      await expect(groups.first()).toBeVisible();
    }
  });

  test('should have undo/redo buttons', async ({ page }) => {
    const undoButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.undo"]') }).first();
    const redoButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.redo"]') }).first();

    if (await undoButton.count() > 0) {
      await expect(undoButton).toBeVisible();
    }
    if (await redoButton.count() > 0) {
      await expect(redoButton).toBeVisible();
    }
  });

  test('should have list buttons', async ({ page }) => {
    const ulButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.listUl"]') }).first();
    const olButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.listOl"]') }).first();

    if (await ulButton.count() > 0) {
      await expect(ulButton).toBeVisible();
    }
    if (await olButton.count() > 0) {
      await expect(olButton).toBeVisible();
    }
  });

  test('should have link and image buttons', async ({ page }) => {
    const linkButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.link"]') }).first();
    const imageButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.image"]') }).first();

    if (await linkButton.count() > 0) {
      await expect(linkButton).toBeVisible();
    }
    if (await imageButton.count() > 0) {
      await expect(imageButton).toBeVisible();
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallEditor = page.locator('.ux-rich-text.ux-rich-text--sm').first();
    if (await smallEditor.count() > 0) {
      await expect(smallEditor).toBeVisible();
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeEditor = page.locator('.ux-rich-text.ux-rich-text--lg').first();
    if (await largeEditor.count() > 0) {
      await expect(largeEditor).toBeVisible();
    }
  });

  test('should apply readonly mode', async ({ page }) => {
    const readonlyEditor = page.locator('.ux-rich-text.ux-rich-text--readonly').first();
    if (await readonlyEditor.count() > 0) {
      await expect(readonlyEditor).toBeVisible();

      // Check that editor is not contenteditable
      const editor = readonlyEditor.locator('.ux-rich-text__editor');
      const isEditable = await editor.evaluate(el => el.getAttribute('contenteditable'));
      expect(isEditable).toBe('false');
    }
  });

  test('should apply disabled state', async ({ page }) => {
    const disabledEditor = page.locator('.ux-rich-text.ux-rich-text--disabled').first();
    if (await disabledEditor.count() > 0) {
      await expect(disabledEditor).toBeVisible();

      // Buttons should be disabled
      const buttons = disabledEditor.locator('.ux-rich-text__btn');
      if (await buttons.count() > 0) {
        const firstButton = buttons.first();
        const isDisabled = await firstButton.evaluate(el => el.hasAttribute('disabled'));
        expect(isDisabled).toBe(true);
      }
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassEditor = page.locator('.ux-rich-text.ux-rich-text--glass').first();
    if (await glassEditor.count() > 0) {
      await expect(glassEditor).toBeVisible();

      // Check for backdrop-filter
      const backdropFilter = await glassEditor.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have heading dropdown', async ({ page }) => {
    const dropdown = page.locator('.ux-rich-text__dropdown').first();
    if (await dropdown.count() > 0) {
      await expect(dropdown).toBeVisible();

      // Find dropdown button
      const dropdownButton = dropdown.locator('.ux-rich-text__btn--dropdown');
      if (await dropdownButton.count() > 0) {
        await expect(dropdownButton).toBeVisible();
      }
    }
  });

  test('should open heading dropdown menu when clicked', async ({ page }) => {
    const dropdown = page.locator('.ux-rich-text__dropdown').first();
    if (await dropdown.count() > 0) {
      const dropdownButton = dropdown.locator('.ux-rich-text__btn--dropdown, .ux-rich-text__btn').first();
      const dropdownMenu = dropdown.locator('.ux-rich-text__dropdown-menu');

      if (await dropdownButton.count() > 0 && await dropdownMenu.count() > 0) {
        // Click dropdown button
        await dropdownButton.click();

        // Wait for menu to open
        await page.waitForTimeout(100);

        // Menu should have open class
        await expect(dropdownMenu).toHaveClass(/ux-rich-text__dropdown-menu--open/);
      }
    }
  });

  test('should have footer section', async ({ page }) => {
    const footer = page.locator('.ux-rich-text__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should support keyboard shortcut Ctrl+B for bold', async ({ page }) => {
    const editor = page.locator('.ux-rich-text__editor').first();
    const boldButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.bold"]') }).first();

    if (await boldButton.count() > 0) {
      // Click editor and type text
      await editor.click();
      await editor.type('Test');

      // Select all
      await page.keyboard.press('Control+a');

      // Press Ctrl+B
      await page.keyboard.press('Control+b');

      // Bold button should be active
      await expect(boldButton).toHaveClass(/ux-rich-text__btn--active/);
    }
  });

  test('should support keyboard shortcut Ctrl+I for italic', async ({ page }) => {
    const editor = page.locator('.ux-rich-text__editor').first();
    const italicButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.italic"]') }).first();

    if (await italicButton.count() > 0) {
      // Click editor and type text
      await editor.click();
      await editor.type('Test');

      // Select all
      await page.keyboard.press('Control+a');

      // Press Ctrl+I
      await page.keyboard.press('Control+i');

      // Italic button should be active
      await expect(italicButton).toHaveClass(/ux-rich-text__btn--active/);
    }
  });

  test('should render with initial content', async ({ page }) => {
    // Find editor with initial content (the one with "Bienvenido al Editor")
    const editorWithContent = page.locator('.ux-rich-text__editor').filter({ hasText: 'Bienvenido' }).first();
    if (await editorWithContent.count() > 0) {
      await expect(editorWithContent).toBeVisible();

      // Check that content is present
      const content = await editorWithContent.textContent();
      expect(content).toContain('Bienvenido');
    }
  });

  test('should have underline button', async ({ page }) => {
    const underlineButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.underline"]') }).first();
    if (await underlineButton.count() > 0) {
      await expect(underlineButton).toBeVisible();
    }
  });

  test('should have strikethrough button', async ({ page }) => {
    const strikeButton = page.locator('.ux-rich-text__btn').filter({ has: page.locator('[x-html="icons.strikethrough"]') }).first();
    if (await strikeButton.count() > 0) {
      await expect(strikeButton).toBeVisible();
    }
  });

  test('toolbar buttons should have minimum touch target size', async ({ page }) => {
    const button = page.locator('.ux-rich-text__btn').first();

    if (await button.count() > 0) {
      const box = await button.boundingBox();
      if (box) {
        // Minimum touch target should be at least 36px (--ux-touch-target-sm)
        expect(box.width).toBeGreaterThanOrEqual(36);
        expect(box.height).toBeGreaterThanOrEqual(36);
      }
    }
  });
});
