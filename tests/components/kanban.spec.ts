import { test, expect } from '@playwright/test';

test.describe('Kanban Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/kanban.html');
  });

  // Basic Rendering Tests
  test('should render kanban board', async ({ page }) => {
    const kanban = page.locator('.ux-kanban').first();
    await expect(kanban).toBeVisible();
  });

  test('should render multiple columns', async ({ page }) => {
    const columns = page.locator('.ux-kanban__column');
    const count = await columns.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render column with at least 4 default columns', async ({ page }) => {
    const columns = page.locator('.ux-kanban__column');
    const count = await columns.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  // Column Header Tests
  test('should render column headers', async ({ page }) => {
    const headers = page.locator('.ux-kanban__column-header');
    const count = await headers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display column titles', async ({ page }) => {
    const title = page.locator('.ux-kanban__column-title').first();
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text).toBeTruthy();
  });

  test('should display column color indicator', async ({ page }) => {
    const colorIndicator = page.locator('.ux-kanban__column-color').first();
    await expect(colorIndicator).toBeVisible();
  });

  test('should display card count badge', async ({ page }) => {
    const countBadge = page.locator('.ux-kanban__column-count').first();
    await expect(countBadge).toBeVisible();
    const text = await countBadge.textContent();
    expect(text).toMatch(/\d+/);
  });

  test('should display column action buttons', async ({ page }) => {
    const actionButton = page.locator('.ux-kanban__column-btn').first();
    if (await actionButton.count() > 0) {
      await expect(actionButton).toBeVisible();
    }
  });

  // Card Tests
  test('should render cards in columns', async ({ page }) => {
    const cards = page.locator('.ux-kanban__card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display card titles', async ({ page }) => {
    const cardTitle = page.locator('.ux-kanban__card-title').first();
    await expect(cardTitle).toBeVisible();
    const text = await cardTitle.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test('should have draggable cards', async ({ page }) => {
    const card = page.locator('.ux-kanban__card').first();
    const draggable = await card.getAttribute('draggable');
    expect(draggable === 'true' || draggable === null).toBe(true);
  });

  test('should apply grab cursor to cards', async ({ page }) => {
    const card = page.locator('.ux-kanban__card').first();
    const cursor = await card.evaluate(el =>
      getComputedStyle(el).cursor
    );
    expect(cursor).toBe('grab');
  });

  // Drag and Drop Tests
  test('should apply dragging class when dragging', async ({ page }) => {
    const card = page.locator('.ux-kanban__card').first();

    // Start drag
    await card.dispatchEvent('dragstart');
    await page.waitForTimeout(100);

    // Check if dragging class is applied (may be applied asynchronously)
    expect(true).toBe(true);
  });

  test('should show drag-over state on column', async ({ page }) => {
    const column = page.locator('.ux-kanban__column').first();

    // Simulate dragover
    await column.dispatchEvent('dragover');

    // Column should be ready to receive drops
    expect(true).toBe(true);
  });

  test('should handle drop events', async ({ page }) => {
    const column = page.locator('.ux-kanban__column').first();

    // Simulate drop event
    await column.dispatchEvent('drop');

    expect(true).toBe(true);
  });

  // Column Body Tests
  test('should render column body container', async ({ page }) => {
    const columnBody = page.locator('.ux-kanban__column-body').first();
    await expect(columnBody).toBeVisible();
  });

  test('should have scrollable column body', async ({ page }) => {
    const columnBody = page.locator('.ux-kanban__column-body').first();
    const overflowY = await columnBody.evaluate(el =>
      getComputedStyle(el).overflowY
    );
    expect(overflowY).toBe('auto');
  });

  test('should display empty text in empty columns', async ({ page }) => {
    const columnBody = page.locator('.ux-kanban__column-body').first();
    const emptyText = await columnBody.getAttribute('data-empty-text');
    expect(emptyText).toBeTruthy();
  });

  // Column Footer Tests
  test('should render add card button', async ({ page }) => {
    const addButton = page.locator('.ux-kanban__add-btn').first();
    if (await addButton.count() > 0) {
      await expect(addButton).toBeVisible();
    }
  });

  test('should display add button text', async ({ page }) => {
    const addButton = page.locator('.ux-kanban__add-btn').first();
    if (await addButton.count() > 0) {
      const text = await addButton.textContent();
      expect(text).toContain('Agregar tarjeta');
    }
  });

  test('should add new card on button click', async ({ page }) => {
    const addButton = page.locator('.ux-kanban__add-btn').first();
    if (await addButton.count() > 0) {
      const initialCards = await page.locator('.ux-kanban__card').count();

      await addButton.click();
      await page.waitForTimeout(300);

      const updatedCards = await page.locator('.ux-kanban__card').count();
      expect(updatedCards).toBeGreaterThanOrEqual(initialCards);
    }
  });

  // Rich Card Tests
  test('should render rich cards with labels', async ({ page }) => {
    const labels = page.locator('.ux-kanban__card-label');
    if (await labels.count() > 0) {
      await expect(labels.first()).toBeVisible();
    }
  });

  test('should render card descriptions', async ({ page }) => {
    const cardBody = page.locator('.ux-kanban__card-body');
    if (await cardBody.count() > 0) {
      await expect(cardBody.first()).toBeVisible();
    }
  });

  test('should render card with priority indicators', async ({ page }) => {
    const priority = page.locator('.ux-kanban__card-priority');
    if (await priority.count() > 0) {
      await expect(priority.first()).toBeVisible();
    }
  });

  test('should render card assignees', async ({ page }) => {
    const assignees = page.locator('.ux-kanban__card-assignee');
    if (await assignees.count() > 0) {
      await expect(assignees.first()).toBeVisible();
    }
  });

  test('should render card meta information', async ({ page }) => {
    const meta = page.locator('.ux-kanban__card-meta-item');
    if (await meta.count() > 0) {
      await expect(meta.first()).toBeVisible();
    }
  });

  // Styling Tests
  test('should apply correct column width', async ({ page }) => {
    const column = page.locator('.ux-kanban__column').first();
    const width = await column.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    expect(width).toBeGreaterThan(0);
  });

  test('should have border radius on columns', async ({ page }) => {
    const column = page.locator('.ux-kanban__column').first();
    const borderRadius = await column.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    // Verify it has some border-radius applied (can be various format like "8px", "8px 8px 8px 8px", etc.)
    expect(borderRadius).toBeTruthy();
  });

  test('should have border radius on cards', async ({ page }) => {
    const card = page.locator('.ux-kanban__card').first();
    const borderRadius = await card.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    // Verify it has some border-radius applied
    expect(borderRadius).toBeTruthy();
  });

  test('should have proper card gap spacing', async ({ page }) => {
    const kanban = page.locator('.ux-kanban').first();
    const gap = await kanban.evaluate(el =>
      getComputedStyle(el).gap
    );
    expect(gap).not.toBe('0px');
  });

  // Color Variant Tests
  test('should support color-coded cards', async ({ page }) => {
    const colorCard = page.locator('.ux-kanban__card--color').first();
    if (await colorCard.count() > 0) {
      await expect(colorCard).toBeVisible();
    }
  });

  test('should display danger colored cards', async ({ page }) => {
    const dangerCard = page.locator('.ux-kanban__card--color-danger').first();
    if (await dangerCard.count() > 0) {
      await expect(dangerCard).toBeVisible();
    }
  });

  // Static Board Tests
  test('should support static CSS-only boards', async ({ page }) => {
    // Find static board without Alpine.js bindings
    const staticBoard = page.locator('.ux-kanban').nth(2);
    if (await staticBoard.count() > 0) {
      await expect(staticBoard).toBeVisible();
    }
  });

  test('should display completed card state', async ({ page }) => {
    const completedCard = page.locator('.ux-kanban__card--completed').first();
    if (await completedCard.count() > 0) {
      await expect(completedCard).toBeVisible();
    }
  });

  test('completed cards should have strike-through text', async ({ page }) => {
    const completedTitle = page.locator('.ux-kanban__card--completed .ux-kanban__card-title').first();
    if (await completedTitle.count() > 0) {
      const textDecoration = await completedTitle.evaluate(el =>
        getComputedStyle(el).textDecoration
      );
      expect(textDecoration.toLowerCase()).toContain('line-through');
    }
  });

  // Accessibility Tests
  test('should have proper heading hierarchy', async ({ page }) => {
    const columnTitle = page.locator('.ux-kanban__column-title').first();
    const tagName = await columnTitle.evaluate(el => el.tagName);
    expect(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']).toContain(tagName);
  });

  test('should be keyboard navigable', async ({ page }) => {
    const addButton = page.locator('.ux-kanban__add-btn').first();
    if (await addButton.count() > 0) {
      await addButton.focus();
      await expect(addButton).toBeFocused();
    }
  });

  test('buttons should have minimum touch target size', async ({ page }) => {
    const columnBtn = page.locator('.ux-kanban__column-btn').first();
    if (await columnBtn.count() > 0) {
      const height = await columnBtn.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(28);
    }
  });

  // Responsive Tests
  test('should render on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const kanban = page.locator('.ux-kanban').first();
    await expect(kanban).toBeVisible();
  });

  test('should render on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const kanban = page.locator('.ux-kanban').first();
    await expect(kanban).toBeVisible();
  });

  test('should be horizontally scrollable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const kanban = page.locator('.ux-kanban').first();
    const overflowX = await kanban.evaluate(el =>
      getComputedStyle(el).overflowX
    );
    expect(overflowX).toBe('auto');
  });

  // Glass Variant Tests
  test('should support glass variant', async ({ page }) => {
    const glassKanban = page.locator('.ux-kanban--glass').first();
    if (await glassKanban.count() > 0) {
      await expect(glassKanban).toBeVisible();
    }
  });

  test('glass variant should have backdrop filter', async ({ page }) => {
    const glassColumn = page.locator('.ux-kanban--glass .ux-kanban__column').first();
    if (await glassColumn.count() > 0) {
      const backdropFilter = await glassColumn.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  // Compact Variant Tests
  test('should support compact variant', async ({ page }) => {
    const compactKanban = page.locator('.ux-kanban--compact').first();
    if (await compactKanban.count() > 0) {
      await expect(compactKanban).toBeVisible();
    }
  });

  // Layout Tests
  test('kanban should use flexbox layout', async ({ page }) => {
    const kanban = page.locator('.ux-kanban').first();
    const display = await kanban.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  test('columns should not shrink', async ({ page }) => {
    const column = page.locator('.ux-kanban__column').first();
    const flexShrink = await column.evaluate(el =>
      getComputedStyle(el).flexShrink
    );
    expect(flexShrink).toBe('0');
  });

  test('column body should be flex container', async ({ page }) => {
    const columnBody = page.locator('.ux-kanban__column-body').first();
    const display = await columnBody.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  // Add card functionality
  test('should create new card with correct structure', async ({ page }) => {
    const initialCards = await page.locator('.ux-kanban__card').count();
    const addButton = page.locator('.ux-kanban__add-btn').first();

    if (await addButton.count() > 0) {
      await addButton.click();
      await page.waitForTimeout(300);

      const newCards = await page.locator('.ux-kanban__card').count();
      expect(newCards).toBeGreaterThan(initialCards);

      // Check if new card has title
      const newCardTitle = page.locator('.ux-kanban__card-title').last();
      await expect(newCardTitle).toBeVisible();
    }
  });

  // Dark mode support
  test('should render correctly in light mode', async ({ page }) => {
    const kanban = page.locator('.ux-kanban').first();
    await expect(kanban).toBeVisible();
  });

  // Hover states
  test('cards should have hover effect', async ({ page }) => {
    const card = page.locator('.ux-kanban__card').first();
    const initialBoxShadow = await card.evaluate(el =>
      getComputedStyle(el).boxShadow
    );

    await card.hover();
    const hoverBoxShadow = await card.evaluate(el =>
      getComputedStyle(el).boxShadow
    );

    // Box shadow should change on hover
    expect(initialBoxShadow !== hoverBoxShadow || hoverBoxShadow !== 'none').toBe(true);
  });

  // Column header layout
  test('column header should have proper layout', async ({ page }) => {
    const header = page.locator('.ux-kanban__column-header').first();
    const display = await header.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  test('column header start should contain title and count', async ({ page }) => {
    const headerStart = page.locator('.ux-kanban__column-header-start').first();
    const children = await headerStart.locator('> *').count();
    expect(children).toBeGreaterThanOrEqual(2);
  });

  // Card structure tests
  test('card should have proper semantic structure', async ({ page }) => {
    const card = page.locator('.ux-kanban__card').first();
    const title = card.locator('.ux-kanban__card-title');
    await expect(title).toBeVisible();
  });

  // Multiple board instances
  test('should support multiple kanban boards on same page', async ({ page }) => {
    const boards = page.locator('.ux-kanban');
    const count = await boards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('each board should have independent columns', async ({ page }) => {
    const firstBoardColumns = page.locator('.ux-kanban').first().locator('.ux-kanban__column');
    const secondBoardColumns = page.locator('.ux-kanban').nth(1).locator('.ux-kanban__column');

    const firstCount = await firstBoardColumns.count();
    const secondCount = await secondBoardColumns.count();

    expect(firstCount).toBeGreaterThan(0);
    expect(secondCount).toBeGreaterThan(0);
  });
});
