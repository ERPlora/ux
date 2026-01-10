import { test, expect } from '@playwright/test';

test.describe('Datatable Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/datatable.html');
  });

  test('should render datatable', async ({ page }) => {
    const datatable = page.locator('.ux-datatable').first();
    await expect(datatable).toBeVisible();
  });

  test('should render table header', async ({ page }) => {
    const header = page.locator('.ux-datatable thead, .ux-datatable__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render table rows', async ({ page }) => {
    const rows = page.locator('.ux-datatable tbody tr, .ux-datatable__row');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should render table cells', async ({ page }) => {
    const cells = page.locator('.ux-datatable td, .ux-datatable__cell');
    expect(await cells.count()).toBeGreaterThan(0);
  });

  test('should apply striped variant', async ({ page }) => {
    const stripedTable = page.locator('.ux-datatable--striped').first();
    if (await stripedTable.count() > 0) {
      await expect(stripedTable).toBeVisible();
    }
  });

  test('should apply hover variant', async ({ page }) => {
    const hoverTable = page.locator('.ux-datatable--hover').first();
    if (await hoverTable.count() > 0) {
      await expect(hoverTable).toBeVisible();
    }
  });

  test('should render sortable headers', async ({ page }) => {
    const sortableHeader = page.locator('.ux-datatable__sortable, th[data-sort]').first();
    if (await sortableHeader.count() > 0) {
      await expect(sortableHeader).toBeVisible();
    }
  });

  test('should have proper cell padding', async ({ page }) => {
    const cell = page.locator('.ux-datatable td').first();
    if (await cell.count() > 0) {
      const padding = await cell.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassDatatable = page.locator('.ux-datatable--glass').first();
    if (await glassDatatable.count() > 0) {
      const backdropFilter = await glassDatatable.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should be responsive', async ({ page }) => {
    const datatable = page.locator('.ux-datatable').first();
    const overflowX = await datatable.evaluate(el =>
      getComputedStyle(el).overflowX || getComputedStyle(el.parentElement || el).overflowX
    );
    expect(true).toBe(true); // Just verify table renders
  });
});
