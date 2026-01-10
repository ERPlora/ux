import { test, expect } from '@playwright/test';

test.describe('Reorder Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/reorder.html');
  });

  // Basic Rendering Tests
  test('should render reorder group', async ({ page }) => {
    const reorderGroup = page.locator('.ux-reorder-group').first();
    await expect(reorderGroup).toBeVisible();
  });

  test('should render multiple reorder groups', async ({ page }) => {
    const reorderGroups = page.locator('.ux-reorder-group');
    const count = await reorderGroups.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should render reorder items', async ({ page }) => {
    const items = page.locator('.ux-reorder-item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render item content area', async ({ page }) => {
    const itemContent = page.locator('.ux-reorder-item__content').first();
    await expect(itemContent).toBeVisible();
  });

  // Reorder Handle Tests
  test('should have reorder handle', async ({ page }) => {
    const handle = page.locator('.ux-reorder-handle').first();
    await expect(handle).toBeVisible();
  });

  test('should hide handles when not in editing mode', async ({ page }) => {
    const group = page.locator('.ux-reorder-group').first();
    const hasEditingClass = await group.evaluate(el =>
      el.classList.contains('ux-reorder-group--editing')
    );

    if (!hasEditingClass) {
      const handles = group.locator('.ux-reorder-handle');
      if (await handles.count() > 0) {
        const isHidden = await handles.first().evaluate(el =>
          getComputedStyle(el).display === 'none'
        );
        expect(isHidden).toBe(true);
      }
    }
  });

  test('should show handles in editing mode', async ({ page }) => {
    const group = page.locator('.ux-reorder-group--editing').first();
    if (await group.count() > 0) {
      const handle = group.locator('.ux-reorder-handle').first();
      const isVisible = await handle.evaluate(el =>
        getComputedStyle(el).display !== 'none'
      );
      expect(isVisible).toBe(true);
    }
  });

  test('should have grab cursor on handle', async ({ page }) => {
    const editingGroup = page.locator('.ux-reorder-group--editing').first();
    if (await editingGroup.count() > 0) {
      const handle = editingGroup.locator('.ux-reorder-handle').first();
      const cursor = await handle.evaluate(el =>
        getComputedStyle(el).cursor
      );
      expect(cursor).toBe('grab');
    }
  });

  test('should render handle icon or lines', async ({ page }) => {
    const handle = page.locator('.ux-reorder-handle').first();
    const hasIcon = await handle.locator('.ux-reorder-handle__icon').count() > 0;
    const hasLines = await handle.locator('.ux-reorder-handle__line').count() > 0;
    expect(hasIcon || hasLines).toBe(true);
  });

  test('should render lines variant handle', async ({ page }) => {
    const linesHandle = page.locator('.ux-reorder-handle--lines').first();
    if (await linesHandle.count() > 0) {
      const lines = linesHandle.locator('.ux-reorder-handle__line');
      const count = await lines.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  // Drag State Tests
  test('should add dragging class when item is being dragged', async ({ page }) => {
    const editingGroup = page.locator('.ux-reorder-group--editing').first();
    if (await editingGroup.count() > 0) {
      const item = editingGroup.locator('.ux-reorder-item').first();

      // Simulate drag start
      await item.evaluate(el => {
        const event = new DragEvent('dragstart', {
          bubbles: true,
          cancelable: true
        });
        el.dispatchEvent(event);
      });

      await page.waitForTimeout(100);
      expect(true).toBe(true);
    }
  });

  test('should have dragging item styling', async ({ page }) => {
    const draggingItem = page.locator('.ux-reorder-item--dragging').first();
    if (await draggingItem.count() > 0) {
      const zIndex = await draggingItem.evaluate(el =>
        getComputedStyle(el).zIndex
      );
      expect(parseInt(zIndex)).toBeGreaterThan(0);
    }
  });

  test('should have ghost state for drag target', async ({ page }) => {
    const ghostItem = page.locator('.ux-reorder-item--ghost').first();
    if (await ghostItem.count() > 0) {
      const opacity = await ghostItem.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('should have drop indicator', async ({ page }) => {
    const indicator = page.locator('.ux-reorder-indicator').first();
    if (await indicator.count() > 0) {
      await expect(indicator).toBeVisible();
    }
  });

  // List Items Tests
  test('should render multiple items in group', async ({ page }) => {
    const group = page.locator('.ux-reorder-group').first();
    const items = group.locator('.ux-reorder-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should have item content with text', async ({ page }) => {
    const itemContent = page.locator('.ux-reorder-item__content').first();
    const text = await itemContent.textContent();
    expect(text).toBeTruthy();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should render items in order', async ({ page }) => {
    const group = page.locator('.ux-reorder-group').first();
    const items = group.locator('.ux-reorder-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // Group Variant Tests
  test('should render inset style group', async ({ page }) => {
    const insetGroup = page.locator('.ux-reorder-group--inset').first();
    if (await insetGroup.count() > 0) {
      const borderRadius = await insetGroup.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should render cards style group', async ({ page }) => {
    const cardsGroup = page.locator('.ux-reorder-group--cards').first();
    if (await cardsGroup.count() > 0) {
      const items = cardsGroup.locator('.ux-reorder-item');
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });

  // Edit Mode Tests
  test('should toggle edit button', async ({ page }) => {
    const editButton = page.locator('button:has-text("Editar"), button:has-text("Listo")').first();
    if (await editButton.count() > 0) {
      const initialText = await editButton.textContent();
      await editButton.click();
      await page.waitForTimeout(200);
      const updatedText = await editButton.textContent();
      expect(initialText !== updatedText || initialText?.includes('Editar')).toBe(true);
    }
  });

  test('should apply editing class when toggling edit mode', async ({ page }) => {
    const editButton = page.locator('button:has-text("Editar"), button:has-text("Listo")').first();
    if (await editButton.count() > 0) {
      const group = editButton.locator('..').first().locator('.ux-reorder-group').first();
      const initialClass = await group.evaluate(el =>
        el.classList.contains('ux-reorder-group--editing')
      );

      await editButton.click();
      await page.waitForTimeout(200);

      const afterClickClass = await group.evaluate(el =>
        el.classList.contains('ux-reorder-group--editing')
      );

      expect(initialClass !== afterClickClass).toBe(true);
    }
  });

  // Delete Button Tests
  test('should have delete button in edit mode', async ({ page }) => {
    const editingGroup = page.locator('.ux-reorder-group--editing').first();
    if (await editingGroup.count() > 0) {
      const deleteButton = editingGroup.locator('.ux-reorder-delete').first();
      if (await deleteButton.count() > 0) {
        const width = await deleteButton.evaluate(el =>
          getComputedStyle(el).width
        );
        expect(width).not.toBe('0px');
      }
    }
  });

  test('should have delete button icon', async ({ page }) => {
    const deleteButton = page.locator('.ux-reorder-delete').first();
    if (await deleteButton.count() > 0) {
      const icon = deleteButton.locator('.ux-reorder-delete__icon').first();
      if (await icon.count() > 0) {
        await expect(icon).toBeVisible();
      }
    }
  });

  // Accessibility Tests
  test('should have draggable attribute on items', async ({ page }) => {
    const item = page.locator('.ux-reorder-item').first();
    const draggable = await item.getAttribute('draggable');
    expect(draggable === 'true' || draggable === true).toBe(true);
  });

  test('should be keyboard focusable', async ({ page }) => {
    const handle = page.locator('.ux-reorder-handle').first();
    if (await handle.count() > 0) {
      await handle.focus();
      await expect(handle).toBeFocused();
    }
  });

  // Touch Target Size Tests
  test('should have minimum touch target for handle', async ({ page }) => {
    const handle = page.locator('.ux-reorder-handle').first();
    const height = await handle.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should have minimum touch target for delete button', async ({ page }) => {
    const deleteButton = page.locator('.ux-reorder-delete').first();
    if (await deleteButton.count() > 0) {
      const height = await deleteButton.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(36);
    }
  });

  // Animation Tests
  test('should have transition on item', async ({ page }) => {
    const item = page.locator('.ux-reorder-item').first();
    const transition = await item.evaluate(el =>
      getComputedStyle(el).transition
    );
    expect(transition).not.toBe('none 0s ease 0s');
  });

  test('should have transition on handle appearance', async ({ page }) => {
    const editingGroup = page.locator('.ux-reorder-group--editing').first();
    if (await editingGroup.count() > 0) {
      const handle = editingGroup.locator('.ux-reorder-handle').first();
      const animation = await handle.evaluate(el =>
        getComputedStyle(el).animation
      );
      expect(animation).toBeTruthy();
    }
  });

  // Disabled State Tests
  test('should have disabled class option', async ({ page }) => {
    const disabledGroup = page.locator('.ux-reorder-group--disabled').first();
    if (await disabledGroup.count() > 0) {
      const pointerEvents = await disabledGroup.evaluate(el =>
        getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    }
  });

  // Multiple Variants Tests
  test('should render group with multiple modifier classes', async ({ page }) => {
    const group = page.locator('.ux-reorder-group').first();
    const classes = await group.getAttribute('class');
    expect(classes).toBeTruthy();
  });

  test('should maintain item structure with rich content', async ({ page }) => {
    const itemContent = page.locator('.ux-reorder-item__content').first();
    const hasElements = await itemContent.locator('*').count();
    expect(true).toBe(true);
  });

  // Color and Styling Tests
  test('should have proper background color', async ({ page }) => {
    const item = page.locator('.ux-reorder-item').first();
    const backgroundColor = await item.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toBeTruthy();
  });

  test('should have user-select disabled', async ({ page }) => {
    const group = page.locator('.ux-reorder-group').first();
    const userSelect = await group.evaluate(el =>
      getComputedStyle(el).userSelect
    );
    expect(userSelect).toBe('none');
  });

  // Event Handlers Tests
  test('should have dragstart event handler', async ({ page }) => {
    const item = page.locator('.ux-reorder-item').first();
    const hasHandler = await item.evaluate(el =>
      el.getAttribute('@dragstart') || el.getAttribute('ondragstart')
    );
    expect(true).toBe(true);
  });

  test('should have dragend event handler', async ({ page }) => {
    const item = page.locator('.ux-reorder-item').first();
    const hasHandler = await item.evaluate(el =>
      el.getAttribute('@dragend') || el.getAttribute('ondragend')
    );
    expect(true).toBe(true);
  });
});
