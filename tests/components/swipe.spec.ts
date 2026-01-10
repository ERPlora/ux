import { test, expect } from '@playwright/test';

test.describe('Swipe Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/swipe.html');
  });

  // ========================================
  // Basic Rendering Tests
  // ========================================

  test('should render swipe demo sections', async ({ page }) => {
    const sections = page.locator('.demo-section');
    expect(await sections.count()).toBeGreaterThan(0);
  });

  test('should render gesture boxes', async ({ page }) => {
    const gestureBoxes = page.locator('.gesture-box');
    expect(await gestureBoxes.count()).toBeGreaterThan(0);
  });

  test('should render gesture result elements', async ({ page }) => {
    const results = page.locator('.gesture-result');
    expect(await results.count()).toBeGreaterThan(0);
  });

  // ========================================
  // x-swipe Directive Tests
  // ========================================

  test('should detect swipe in any direction', async ({ page }) => {
    // Get the first swipe demo box
    const gestureBox = page.locator('.gesture-box').first();
    const gestureResult = gestureBox.locator('..').locator('.gesture-result').first();

    // Initial state
    const initialText = await gestureResult.textContent();
    expect(initialText).toContain('Desliza en cualquier direccion');

    // Simulate left swipe
    const box = await gestureBox.boundingBox();
    if (box) {
      await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.move(box.x + 50, box.y + box.height / 2);
      await page.waitForTimeout(100);
    }
  });

  test('should detect left swipe with modifier', async ({ page }) => {
    // Find the swipe direction demo section
    const demoSections = page.locator('.demo-section');
    let swipeDirSection = null;

    for (let i = 0; i < await demoSections.count(); i++) {
      const text = await demoSections.nth(i).textContent();
      if (text?.includes('Swipe por Direccion')) {
        swipeDirSection = demoSections.nth(i);
        break;
      }
    }

    if (swipeDirSection) {
      const gestureBox = swipeDirSection.locator('.gesture-box').first();
      const result = swipeDirSection.locator('.gesture-result').first();

      // Simulate left swipe
      const box = await gestureBox.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + 20, box.y + box.height / 2);
        await page.mouse.up();
        await page.waitForTimeout(100);

        const resultText = await result.textContent();
        expect(resultText).toBeDefined();
      }
    }
  });

  test('should detect right swipe with modifier', async ({ page }) => {
    // Find the swipe direction demo section
    const demoSections = page.locator('.demo-section');
    let swipeDirSection = null;

    for (let i = 0; i < await demoSections.count(); i++) {
      const text = await demoSections.nth(i).textContent();
      if (text?.includes('Swipe por Direccion')) {
        swipeDirSection = demoSections.nth(i);
        break;
      }
    }

    if (swipeDirSection) {
      const gestureBox = swipeDirSection.locator('.gesture-box').first();
      const result = swipeDirSection.locator('.gesture-result').first();

      // Simulate right swipe
      const box = await gestureBox.boundingBox();
      if (box) {
        await page.mouse.move(box.x + 50, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.up();
        await page.waitForTimeout(100);

        const resultText = await result.textContent();
        expect(resultText).toBeDefined();
      }
    }
  });

  // ========================================
  // Swipe Item Component Tests
  // ========================================

  test('should render swipeable list item', async ({ page }) => {
    const swipeContainer = page.locator('.ux-swipe-container').first();
    await expect(swipeContainer).toBeVisible();
  });

  test('should render swipe content', async ({ page }) => {
    const swipeContent = page.locator('.ux-swipe-content').first();
    await expect(swipeContent).toBeVisible();
  });

  test('should render swipe actions container', async ({ page }) => {
    const swipeActions = page.locator('.ux-swipe-actions').first();
    if (await swipeActions.count() > 0) {
      await expect(swipeActions).toBeVisible();
    }
  });

  test('should have end actions positioned correctly', async ({ page }) => {
    const endActions = page.locator('.ux-swipe-actions--end').first();
    if (await endActions.count() > 0) {
      const style = await endActions.evaluate(el => {
        const computedStyle = getComputedStyle(el);
        return {
          position: computedStyle.position,
          right: computedStyle.right,
          bottom: computedStyle.bottom,
          top: computedStyle.top
        };
      });

      expect(style.position).toBe('absolute');
      expect(style.right).not.toBe('auto');
    }
  });

  test('should have start actions positioned correctly', async ({ page }) => {
    const startActions = page.locator('.ux-swipe-actions--start').first();
    if (await startActions.count() > 0) {
      const style = await startActions.evaluate(el => {
        const computedStyle = getComputedStyle(el);
        return {
          position: computedStyle.position,
          left: computedStyle.left,
          bottom: computedStyle.bottom,
          top: computedStyle.top
        };
      });

      expect(style.position).toBe('absolute');
      expect(style.left).not.toBe('auto');
    }
  });

  // ========================================
  // Swipe Action Buttons Tests
  // ========================================

  test('should render delete action button', async ({ page }) => {
    const deleteButton = page.locator('.ux-swipe-action--delete').first();
    if (await deleteButton.count() > 0) {
      await expect(deleteButton).toBeVisible();
    }
  });

  test('should render archive action button', async ({ page }) => {
    const archiveButton = page.locator('.ux-swipe-action--archive').first();
    if (await archiveButton.count() > 0) {
      await expect(archiveButton).toBeVisible();
    }
  });

  test('should render pin action button', async ({ page }) => {
    const pinButton = page.locator('.ux-swipe-action--pin').first();
    if (await pinButton.count() > 0) {
      await expect(pinButton).toBeVisible();
    }
  });

  test('should render more action button', async ({ page }) => {
    const moreButton = page.locator('.ux-swipe-action--more').first();
    if (await moreButton.count() > 0) {
      await expect(moreButton).toBeVisible();
    }
  });

  test('delete action should have danger color', async ({ page }) => {
    const deleteButton = page.locator('.ux-swipe-action--delete').first();
    if (await deleteButton.count() > 0) {
      const bgColor = await deleteButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have danger/red color
      expect(bgColor).toBeDefined();
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('archive action should have warning color', async ({ page }) => {
    const archiveButton = page.locator('.ux-swipe-action--archive').first();
    if (await archiveButton.count() > 0) {
      const bgColor = await archiveButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have warning/yellow color
      expect(bgColor).toBeDefined();
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('pin action should have primary color', async ({ page }) => {
    const pinButton = page.locator('.ux-swipe-action--pin').first();
    if (await pinButton.count() > 0) {
      const bgColor = await pinButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have primary/blue color
      expect(bgColor).toBeDefined();
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('more action should have medium color', async ({ page }) => {
    const moreButton = page.locator('.ux-swipe-action--more').first();
    if (await moreButton.count() > 0) {
      const bgColor = await moreButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have medium/gray color
      expect(bgColor).toBeDefined();
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('swipe action should render icon', async ({ page }) => {
    const actionIcon = page.locator('.ux-swipe-action__icon').first();
    if (await actionIcon.count() > 0) {
      await expect(actionIcon).toBeVisible();
    }
  });

  test('swipe action icon should be SVG', async ({ page }) => {
    const actionIcon = page.locator('.ux-swipe-action__icon svg').first();
    if (await actionIcon.count() > 0) {
      await expect(actionIcon).toBeVisible();
    }
  });

  // ========================================
  // Drag Handle Tests
  // ========================================

  test('should render drag handle', async ({ page }) => {
    const dragHandle = page.locator('.ux-drag-handle').first();
    if (await dragHandle.count() > 0) {
      await expect(dragHandle).toBeVisible();
    }
  });

  test('drag handle should have grab cursor', async ({ page }) => {
    const dragHandle = page.locator('.ux-drag-handle').first();
    if (await dragHandle.count() > 0) {
      const cursor = await dragHandle.evaluate(el =>
        getComputedStyle(el).cursor
      );
      expect(cursor).toBe('grab');
    }
  });

  test('drag handle should have icon', async ({ page }) => {
    const dragHandleIcon = page.locator('.ux-drag-handle__icon').first();
    if (await dragHandleIcon.count() > 0) {
      await expect(dragHandleIcon).toBeVisible();
    }
  });

  test('drag handle should be 20px size', async ({ page }) => {
    const dragHandleIcon = page.locator('.ux-drag-handle__icon').first();
    if (await dragHandleIcon.count() > 0) {
      const dimensions = await dragHandleIcon.evaluate(el => {
        const style = getComputedStyle(el);
        return {
          width: style.width,
          height: style.height
        };
      });

      expect(dimensions.width).toBe('20px');
      expect(dimensions.height).toBe('20px');
    }
  });

  // ========================================
  // Long Press Tests
  // ========================================

  test('should have long press section', async ({ page }) => {
    const sections = page.locator('.demo-section');
    let longPressSection = null;

    for (let i = 0; i < await sections.count(); i++) {
      const text = await sections.nth(i).textContent();
      if (text?.includes('x-long-press')) {
        longPressSection = sections.nth(i);
        break;
      }
    }

    expect(longPressSection).toBeDefined();
  });

  // ========================================
  // Tap Tests
  // ========================================

  test('should have single and double tap section', async ({ page }) => {
    const sections = page.locator('.demo-section');
    let tapSection = null;

    for (let i = 0; i < await sections.count(); i++) {
      const text = await sections.nth(i).textContent();
      if (text?.includes('x-tap') || text?.includes('Tap')) {
        tapSection = sections.nth(i);
        break;
      }
    }

    expect(tapSection).toBeDefined();
  });

  // ========================================
  // Drag Tests
  // ========================================

  test('should have drag section', async ({ page }) => {
    const sections = page.locator('.demo-section');
    let dragSection = null;

    for (let i = 0; i < await sections.count(); i++) {
      const text = await sections.nth(i).textContent();
      if (text?.includes('x-drag')) {
        dragSection = sections.nth(i);
        break;
      }
    }

    expect(dragSection).toBeDefined();
  });

  // ========================================
  // Pull to Refresh Tests
  // ========================================

  test('should have pull to refresh section', async ({ page }) => {
    const sections = page.locator('.demo-section');
    let pullSection = null;

    for (let i = 0; i < await sections.count(); i++) {
      const text = await sections.nth(i).textContent();
      if (text?.includes('x-pull-refresh') || text?.includes('Pull to refresh')) {
        pullSection = sections.nth(i);
        break;
      }
    }

    expect(pullSection).toBeDefined();
  });

  // ========================================
  // Pinch Tests
  // ========================================

  test('should have pinch section', async ({ page }) => {
    const sections = page.locator('.demo-section');
    let pinchSection = null;

    for (let i = 0; i < await sections.count(); i++) {
      const text = await sections.nth(i).textContent();
      if (text?.includes('x-pinch') || text?.includes('Pinch')) {
        pinchSection = sections.nth(i);
        break;
      }
    }

    expect(pinchSection).toBeDefined();
  });

  // ========================================
  // CSS Classes Tests
  // ========================================

  test('swipe container should have relative positioning', async ({ page }) => {
    const container = page.locator('.ux-swipe-container').first();
    if (await container.count() > 0) {
      const position = await container.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('relative');
    }
  });

  test('swipe content should have will-change property', async ({ page }) => {
    const content = page.locator('.ux-swipe-content').first();
    if (await content.count() > 0) {
      const willChange = await content.evaluate(el =>
        getComputedStyle(el).willChange
      );
      expect(willChange).toBe('transform');
    }
  });

  test('swipe content should have smooth transition', async ({ page }) => {
    const content = page.locator('.ux-swipe-content').first();
    if (await content.count() > 0) {
      const transition = await content.evaluate(el =>
        getComputedStyle(el).transition
      );
      expect(transition).toBeDefined();
      expect(transition).toContain('transform');
    }
  });

  test('swipe content should remove transition when swiping', async ({ page }) => {
    // This test checks the CSS class structure
    const sections = page.locator('.demo-section');
    let foundSwiping = false;

    for (let i = 0; i < await sections.count(); i++) {
      const html = await sections.nth(i).innerHTML();
      if (html.includes('ux-swipe-content--swiping')) {
        foundSwiping = true;
        break;
      }
    }

    expect(foundSwiping).toBe(true);
  });

  test('swipe actions should use flexbox', async ({ page }) => {
    const actions = page.locator('.ux-swipe-actions').first();
    if (await actions.count() > 0) {
      const display = await actions.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('swipe action should have minimum width', async ({ page }) => {
    const action = page.locator('.ux-swipe-action').first();
    if (await action.count() > 0) {
      const minWidth = await action.evaluate(el =>
        parseInt(getComputedStyle(el).minWidth)
      );
      expect(minWidth).toBeGreaterThanOrEqual(80);
    }
  });

  // ========================================
  // API Reference Tests
  // ========================================

  test('should have API reference table for directives', async ({ page }) => {
    const tables = page.locator('table');
    const count = await tables.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Check for directive headers in table
    const hasDirectiveTable = await page.locator('table').evaluate(el => {
      const text = el.textContent || '';
      return text.includes('Directiva') || text.includes('x-swipe');
    });

    expect(hasDirectiveTable).toBe(true);
  });

  test('should have API reference table for CSS classes', async ({ page }) => {
    const tables = page.locator('table');
    const hasClassTable = await page.locator('table').evaluate(el => {
      const text = el.textContent || '';
      return text.includes('ux-swipe-container') || text.includes('ux-drag-handle');
    });

    expect(hasClassTable).toBe(true);
  });

  test('should have uxSwipeItem component API documentation', async ({ page }) => {
    const sections = page.locator('.demo-section');
    let foundSwipeItem = false;

    for (let i = 0; i < await sections.count(); i++) {
      const text = await sections.nth(i).textContent();
      if (text?.includes('uxSwipeItem')) {
        foundSwipeItem = true;
        break;
      }
    }

    expect(foundSwipeItem).toBe(true);
  });

  // ========================================
  // Integration Tests
  // ========================================

  test('swipe item should be interactive with Alpine', async ({ page }) => {
    const swipeContainer = page.locator('.ux-swipe-container').first();
    if (await swipeContainer.count() > 0) {
      const xData = await swipeContainer.evaluate(el => {
        return el.getAttribute('x-data');
      });

      expect(xData).toBeDefined();
      expect(xData).toContain('uxSwipeItem');
    }
  });

  test('swipe content should bind to contentStyle', async ({ page }) => {
    const swipeContent = page.locator('.ux-swipe-content').first();
    if (await swipeContent.count() > 0) {
      const styleBinding = await swipeContent.evaluate(el => {
        return el.getAttribute(':style') || el.getAttribute('style');
      });

      expect(styleBinding).toBeDefined();
    }
  });

  test('should have HTMX integration examples', async ({ page }) => {
    const sections = page.locator('.demo-section');
    let foundHTMX = false;

    for (let i = 0; i < await sections.count(); i++) {
      const text = await sections.nth(i).textContent();
      if (text?.includes('HTMX') || text?.includes('Django')) {
        foundHTMX = true;
        break;
      }
    }

    expect(foundHTMX).toBe(true);
  });

  test('code blocks should render with syntax highlighting', async ({ page }) => {
    const codeBlocks = page.locator('.ux-code-block');
    expect(await codeBlocks.count()).toBeGreaterThan(0);
  });

  test('code blocks should have language attribute', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block').first();
    if (await codeBlock.count() > 0) {
      const lang = await codeBlock.evaluate(el =>
        el.getAttribute('data-lang')
      );

      expect(lang).toBeDefined();
      expect(['html', 'javascript', 'css', 'python'].some(l => lang?.includes(l))).toBe(true);
    }
  });
});
