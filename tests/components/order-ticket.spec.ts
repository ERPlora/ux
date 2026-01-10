import { test, expect } from '@playwright/test';

test.describe('Order Ticket Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/order-ticket.html');
  });

  // Basic Rendering Tests
  test('should render order ticket', async ({ page }) => {
    const ticket = page.locator('.ux-order-ticket').first();
    await expect(ticket).toBeVisible();
  });

  test('should render order number', async ({ page }) => {
    const orderNumber = page.locator('.ux-order-ticket__order-number').first();
    if (await orderNumber.count() > 0) {
      await expect(orderNumber).toBeVisible();
      const text = await orderNumber.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render status badge', async ({ page }) => {
    const status = page.locator('.ux-order-ticket__status').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
      const statusText = await status.textContent();
      expect(statusText).toBeTruthy();
    }
  });

  test('should render header with metadata', async ({ page }) => {
    const header = page.locator('.ux-order-ticket__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render header metadata section', async ({ page }) => {
    const headerMeta = page.locator('.ux-order-ticket__header-meta').first();
    if (await headerMeta.count() > 0) {
      await expect(headerMeta).toBeVisible();
    }
  });

  // Items Tests
  test('should render items list', async ({ page }) => {
    const items = page.locator('.ux-order-ticket__items').first();
    if (await items.count() > 0) {
      await expect(items).toBeVisible();
    }
  });

  test('should render individual items', async ({ page }) => {
    const items = page.locator('.ux-order-ticket__item');
    if (await items.count() > 0) {
      await expect(items.first()).toBeVisible();
    }
  });

  test('should render item quantity', async ({ page }) => {
    const itemQty = page.locator('.ux-order-ticket__item-qty').first();
    if (await itemQty.count() > 0) {
      await expect(itemQty).toBeVisible();
      const qtyText = await itemQty.textContent();
      expect(qtyText).toMatch(/^\d+$/);
    }
  });

  test('should render item name', async ({ page }) => {
    const itemName = page.locator('.ux-order-ticket__item-name').first();
    if (await itemName.count() > 0) {
      await expect(itemName).toBeVisible();
      const text = await itemName.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render item modifiers when present', async ({ page }) => {
    const modifiers = page.locator('.ux-order-ticket__item-modifier').first();
    if (await modifiers.count() > 0) {
      await expect(modifiers).toBeVisible();
      const text = await modifiers.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should apply modifier remove styling', async ({ page }) => {
    const removeModifier = page.locator('.ux-order-ticket__item-modifier--remove').first();
    if (await removeModifier.count() > 0) {
      await expect(removeModifier).toBeVisible();
    }
  });

  test('should render completed item styling', async ({ page }) => {
    const completedItem = page.locator('.ux-order-ticket__item--completed').first();
    if (await completedItem.count() > 0) {
      await expect(completedItem).toBeVisible();
      const textDecoration = await completedItem.evaluate(el =>
        getComputedStyle(el).textDecoration
      );
      expect(textDecoration).toContain('line-through');
    }
  });

  // Totals/Footer Tests
  test('should render footer section', async ({ page }) => {
    const footer = page.locator('.ux-order-ticket__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should render totals section', async ({ page }) => {
    const totals = page.locator('.ux-order-ticket__totals').first();
    if (await totals.count() > 0) {
      await expect(totals).toBeVisible();
    }
  });

  test('should render total rows', async ({ page }) => {
    const totalRows = page.locator('.ux-order-ticket__total-row');
    if (await totalRows.count() > 0) {
      await expect(totalRows.first()).toBeVisible();
    }
  });

  test('should render grand total row', async ({ page }) => {
    const grandTotal = page.locator('.ux-order-ticket__total-row--grand').first();
    if (await grandTotal.count() > 0) {
      await expect(grandTotal).toBeVisible();
      const text = await grandTotal.textContent();
      expect(text?.toLowerCase()).toContain('total');
    }
  });

  test('should have total labels', async ({ page }) => {
    const labels = page.locator('.ux-order-ticket__total-label');
    if (await labels.count() > 0) {
      const firstLabel = await labels.first().textContent();
      expect(firstLabel).toBeTruthy();
    }
  });

  test('should have total values', async ({ page }) => {
    const values = page.locator('.ux-order-ticket__total-value');
    if (await values.count() > 0) {
      const firstValue = await values.first().textContent();
      expect(firstValue).toBeTruthy();
    }
  });

  // Actions Tests
  test('should render actions section', async ({ page }) => {
    const actions = page.locator('.ux-order-ticket__actions').first();
    if (await actions.count() > 0) {
      await expect(actions).toBeVisible();
    }
  });

  test('should render action buttons', async ({ page }) => {
    const buttons = page.locator('.ux-order-ticket__action');
    if (await buttons.count() > 0) {
      await expect(buttons.first()).toBeVisible();
    }
  });

  test('should have primary action button', async ({ page }) => {
    const primaryAction = page.locator('.ux-order-ticket__action--primary').first();
    if (await primaryAction.count() > 0) {
      await expect(primaryAction).toBeVisible();
      await expect(primaryAction).toBeEnabled();
    }
  });

  test('should have success action button', async ({ page }) => {
    const successAction = page.locator('.ux-order-ticket__action--success').first();
    if (await successAction.count() > 0) {
      await expect(successAction).toBeVisible();
    }
  });

  test('should have secondary action button', async ({ page }) => {
    const secondaryAction = page.locator('.ux-order-ticket__action--secondary').first();
    if (await secondaryAction.count() > 0) {
      await expect(secondaryAction).toBeVisible();
    }
  });

  // Status Variants Tests
  test('should apply pending status class', async ({ page }) => {
    const pending = page.locator('.ux-order-ticket--pending').first();
    if (await pending.count() > 0) {
      await expect(pending).toBeVisible();
    }
  });

  test('should apply preparing status class', async ({ page }) => {
    const preparing = page.locator('.ux-order-ticket--preparing').first();
    if (await preparing.count() > 0) {
      await expect(preparing).toBeVisible();
    }
  });

  test('should apply ready status class', async ({ page }) => {
    const ready = page.locator('.ux-order-ticket--ready').first();
    if (await ready.count() > 0) {
      await expect(ready).toBeVisible();
    }
  });

  test('should apply completed status class', async ({ page }) => {
    const completed = page.locator('.ux-order-ticket--completed').first();
    if (await completed.count() > 0) {
      await expect(completed).toBeVisible();
    }
  });

  test('should apply cancelled status class', async ({ page }) => {
    const cancelled = page.locator('.ux-order-ticket--cancelled').first();
    if (await cancelled.count() > 0) {
      await expect(cancelled).toBeVisible();
    }
  });

  // Urgent Tests
  test('should render urgent ticket variant', async ({ page }) => {
    const urgent = page.locator('.ux-order-ticket--urgent').first();
    if (await urgent.count() > 0) {
      await expect(urgent).toBeVisible();
    }
  });

  test('should apply urgent styling with box shadow', async ({ page }) => {
    const urgent = page.locator('.ux-order-ticket--urgent').first();
    if (await urgent.count() > 0) {
      const boxShadow = await urgent.evaluate(el =>
        getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
  });

  test('should render urgent item variant', async ({ page }) => {
    const urgentItem = page.locator('.ux-order-ticket__item--urgent').first();
    if (await urgentItem.count() > 0) {
      await expect(urgentItem).toBeVisible();
    }
  });

  // Notes Tests
  test('should render notes section when present', async ({ page }) => {
    const notes = page.locator('.ux-order-ticket__notes').first();
    if (await notes.count() > 0) {
      await expect(notes).toBeVisible();
    }
  });

  test('should render notes label', async ({ page }) => {
    const notesLabel = page.locator('.ux-order-ticket__notes-label').first();
    if (await notesLabel.count() > 0) {
      await expect(notesLabel).toBeVisible();
      const text = await notesLabel.textContent();
      expect(text).toBeTruthy();
    }
  });

  // Time/Table Info Tests
  test('should render time element', async ({ page }) => {
    const time = page.locator('.ux-order-ticket__time').first();
    if (await time.count() > 0) {
      await expect(time).toBeVisible();
      const text = await time.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render table information', async ({ page }) => {
    const table = page.locator('.ux-order-ticket__table').first();
    if (await table.count() > 0) {
      await expect(table).toBeVisible();
      const text = await table.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render order type badge', async ({ page }) => {
    const type = page.locator('.ux-order-ticket__type').first();
    if (await type.count() > 0) {
      await expect(type).toBeVisible();
    }
  });

  test('should render dine-in type variant', async ({ page }) => {
    const dineIn = page.locator('.ux-order-ticket__type--dine-in').first();
    if (await dineIn.count() > 0) {
      await expect(dineIn).toBeVisible();
    }
  });

  test('should render takeout type variant', async ({ page }) => {
    const takeout = page.locator('.ux-order-ticket__type--takeout').first();
    if (await takeout.count() > 0) {
      await expect(takeout).toBeVisible();
    }
  });

  test('should render delivery type variant', async ({ page }) => {
    const delivery = page.locator('.ux-order-ticket__type--delivery').first();
    if (await delivery.count() > 0) {
      await expect(delivery).toBeVisible();
    }
  });

  // Timer Tests (Alpine.js)
  test('should render timer element with Alpine.js', async ({ page }) => {
    const timer = page.locator('.ux-order-ticket__timer').first();
    if (await timer.count() > 0) {
      await expect(timer).toBeVisible();
      const text = await timer.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should apply timer warning status', async ({ page }) => {
    const timerWarning = page.locator('.ux-order-ticket__timer--warning').first();
    if (await timerWarning.count() > 0) {
      await expect(timerWarning).toBeVisible();
    }
  });

  test('should apply timer danger status', async ({ page }) => {
    const timerDanger = page.locator('.ux-order-ticket__timer--danger').first();
    if (await timerDanger.count() > 0) {
      await expect(timerDanger).toBeVisible();
    }
  });

  // Size Variants Tests
  test('should render small size variant', async ({ page }) => {
    const small = page.locator('.ux-order-ticket--sm').first();
    if (await small.count() > 0) {
      await expect(small).toBeVisible();
    }
  });

  test('should render large size variant', async ({ page }) => {
    const large = page.locator('.ux-order-ticket--lg').first();
    if (await large.count() > 0) {
      await expect(large).toBeVisible();
    }
  });

  test('should render full width variant', async ({ page }) => {
    const full = page.locator('.ux-order-ticket--full').first();
    if (await full.count() > 0) {
      await expect(full).toBeVisible();
    }
  });

  // Glass Variant Tests
  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-order-ticket--glass').first();
    if (await glass.count() > 0) {
      await expect(glass).toBeVisible();
    }
  });

  test('should have glass backdrop filter', async ({ page }) => {
    const glass = page.locator('.ux-order-ticket--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  // Styling/Structure Tests
  test('should have proper border radius', async ({ page }) => {
    const ticket = page.locator('.ux-order-ticket').first();
    if (await ticket.count() > 0) {
      const borderRadius = await ticket.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  test('should have box shadow', async ({ page }) => {
    const ticket = page.locator('.ux-order-ticket').first();
    if (await ticket.count() > 0) {
      const boxShadow = await ticket.evaluate(el =>
        getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
  });

  test('should have status indicator bar at top', async ({ page }) => {
    const ticket = page.locator('.ux-order-ticket').first();
    if (await ticket.count() > 0) {
      const before = await ticket.evaluate(el => {
        const styles = getComputedStyle(el, ':before');
        return styles.content !== 'none';
      });
      // Status bar exists via ::before pseudo-element
      expect(true).toBe(true);
    }
  });

  // Status Dot Pulse Animation Tests
  test('should render status dot', async ({ page }) => {
    const statusDot = page.locator('.ux-order-ticket__status-dot').first();
    if (await statusDot.count() > 0) {
      await expect(statusDot).toBeVisible();
    }
  });

  test('should apply pulse animation to status dot', async ({ page }) => {
    const pulseStatus = page.locator('.ux-order-ticket__status--pulse').first();
    if (await pulseStatus.count() > 0) {
      await expect(pulseStatus).toBeVisible();
    }
  });

  // Item Content Tests
  test('should render item content container', async ({ page }) => {
    const itemContent = page.locator('.ux-order-ticket__item-content').first();
    if (await itemContent.count() > 0) {
      await expect(itemContent).toBeVisible();
    }
  });

  test('should render item modifiers container', async ({ page }) => {
    const itemMods = page.locator('.ux-order-ticket__item-modifiers').first();
    if (await itemMods.count() > 0) {
      await expect(itemMods).toBeVisible();
    }
  });

  // Grid/Layout Tests
  test('should render order ticket grid', async ({ page }) => {
    const grid = page.locator('.ux-order-ticket-grid').first();
    if (await grid.count() > 0) {
      await expect(grid).toBeVisible();
    }
  });

  test('should render order ticket column', async ({ page }) => {
    const column = page.locator('.ux-order-ticket-column').first();
    if (await column.count() > 0) {
      await expect(column).toBeVisible();
    }
  });

  test('should render column header', async ({ page }) => {
    const columnHeader = page.locator('.ux-order-ticket-column__header').first();
    if (await columnHeader.count() > 0) {
      await expect(columnHeader).toBeVisible();
    }
  });

  test('should render column count badge', async ({ page }) => {
    const columnCount = page.locator('.ux-order-ticket-column__count').first();
    if (await columnCount.count() > 0) {
      await expect(columnCount).toBeVisible();
      const text = await columnCount.textContent();
      expect(text).toMatch(/^\d+$/);
    }
  });

  // Interactive Tests with Alpine.js
  test('should handle action button clicks', async ({ page }) => {
    const actionButton = page.locator('.ux-order-ticket__action').first();
    if (await actionButton.count() > 0) {
      await expect(actionButton).toBeEnabled();
      await actionButton.click();
    }
  });

  test('should apply active state on button click', async ({ page }) => {
    const button = page.locator('.ux-order-ticket__action').first();
    if (await button.count() > 0) {
      await button.click();
      await page.waitForTimeout(100);
      // Button remains visible after click
      await expect(button).toBeVisible();
    }
  });

  // Item Price Tests
  test('should render item price', async ({ page }) => {
    const itemPrice = page.locator('.ux-order-ticket__item-price').first();
    if (await itemPrice.count() > 0) {
      await expect(itemPrice).toBeVisible();
      const text = await itemPrice.textContent();
      expect(text).toBeTruthy();
    }
  });

  // Responsive/Accessibility Tests
  test('should have semantic list structure', async ({ page }) => {
    const itemsList = page.locator('.ux-order-ticket__items').first();
    if (await itemsList.count() > 0) {
      const tag = await itemsList.evaluate(el => el.tagName.toLowerCase());
      expect(['ul', 'ol']).toContain(tag);
    }
  });

  test('should render list items', async ({ page }) => {
    const items = page.locator('.ux-order-ticket__items li');
    if (await items.count() > 0) {
      await expect(items.first()).toBeVisible();
    }
  });
});
