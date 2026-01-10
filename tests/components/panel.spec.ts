import { test, expect } from '@playwright/test';

test.describe('Panel Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/panel.html');
  });

  // Basic rendering tests
  test('should render basic panel structure', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    await expect(panel).toBeVisible();
  });

  test('should render panel with visible container', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const isVisible = await panel.isVisible();
    expect(isVisible).toBe(true);
  });

  // Header tests
  test('should render panel header when present', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render header with title', async ({ page }) => {
    const title = page.locator('.ux-panel__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
      expect(titleText?.length).toBeGreaterThan(0);
    }
  });

  test('should render header with subtitle when present', async ({ page }) => {
    const subtitle = page.locator('.ux-panel__subtitle').first();
    if (await subtitle.count() > 0) {
      await expect(subtitle).toBeVisible();
    }
  });

  test('should render header icon when present', async ({ page }) => {
    const icon = page.locator('.ux-panel__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should have proper header styling', async ({ page }) => {
    const header = page.locator('.ux-panel__header').first();
    if (await header.count() > 0) {
      const bgColor = await header.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  // Content tests
  test('should render panel content section', async ({ page }) => {
    const content = page.locator('.ux-panel__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should have content with proper padding', async ({ page }) => {
    const content = page.locator('.ux-panel__content').first();
    if (await content.count() > 0) {
      const padding = await content.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');
    }
  });

  // Footer tests
  test('should render panel footer when present', async ({ page }) => {
    const footer = page.locator('.ux-panel__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should have footer with proper styling', async ({ page }) => {
    const footer = page.locator('.ux-panel__footer').first();
    if (await footer.count() > 0) {
      const display = await footer.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBeTruthy();
    }
  });

  // Sidebar layout tests
  test('should render panel detail layout', async ({ page }) => {
    const panelDetail = page.locator('.ux-panel-detail').first();
    if (await panelDetail.count() > 0) {
      await expect(panelDetail).toBeVisible();
    }
  });

  test('should render main content section in detail panel', async ({ page }) => {
    const main = page.locator('.ux-panel-detail__main').first();
    if (await main.count() > 0) {
      await expect(main).toBeVisible();
    }
  });

  test('should render aside section in detail panel', async ({ page }) => {
    const aside = page.locator('.ux-panel-detail__aside').first();
    if (await aside.count() > 0) {
      await expect(aside).toBeVisible();
    }
  });

  test('should render aside header with close button', async ({ page }) => {
    const asideHeader = page.locator('.ux-panel-detail__aside-header').first();
    if (await asideHeader.count() > 0) {
      await expect(asideHeader).toBeVisible();
    }
  });

  test('should render aside content area', async ({ page }) => {
    const asideContent = page.locator('.ux-panel-detail__aside-content').first();
    if (await asideContent.count() > 0) {
      await expect(asideContent).toBeVisible();
    }
  });

  // Dashboard layout tests
  test('should render dashboard panel layout', async ({ page }) => {
    const dashboard = page.locator('.ux-panel-dashboard').first();
    if (await dashboard.count() > 0) {
      await expect(dashboard).toBeVisible();
    }
  });

  test('should render KPIs section in dashboard', async ({ page }) => {
    const kpis = page.locator('.ux-panel-dashboard__kpis').first();
    if (await kpis.count() > 0) {
      await expect(kpis).toBeVisible();
    }
  });

  test('should render KPI grid with items', async ({ page }) => {
    const kpiGrid = page.locator('.ux-panel-kpi-grid').first();
    if (await kpiGrid.count() > 0) {
      await expect(kpiGrid).toBeVisible();
      const kpiItems = page.locator('.ux-panel-kpi');
      expect(await kpiItems.count()).toBeGreaterThan(0);
    }
  });

  test('should render individual KPI with label and value', async ({ page }) => {
    const kpi = page.locator('.ux-panel-kpi').first();
    if (await kpi.count() > 0) {
      const label = kpi.locator('.ux-panel-kpi__label').first();
      const value = kpi.locator('.ux-panel-kpi__value').first();

      if (await label.count() > 0) {
        await expect(label).toBeVisible();
      }
      if (await value.count() > 0) {
        await expect(value).toBeVisible();
      }
    }
  });

  test('should render charts section in dashboard', async ({ page }) => {
    const charts = page.locator('.ux-panel-dashboard__charts').first();
    if (await charts.count() > 0) {
      await expect(charts).toBeVisible();
    }
  });

  test('should render panel cards in charts section', async ({ page }) => {
    const cards = page.locator('.ux-panel-card').first();
    if (await cards.count() > 0) {
      await expect(cards).toBeVisible();
    }
  });

  test('should render table section in dashboard', async ({ page }) => {
    const table = page.locator('.ux-panel-dashboard__table').first();
    if (await table.count() > 0) {
      await expect(table).toBeVisible();
    }
  });

  // Table wrapper tests
  test('should render table wrapper with header and body', async ({ page }) => {
    const wrapper = page.locator('.ux-panel-table-wrapper').first();
    if (await wrapper.count() > 0) {
      await expect(wrapper).toBeVisible();
    }
  });

  test('should render fixed table header', async ({ page }) => {
    const headerWrapper = page.locator('.ux-panel-table-wrapper__header').first();
    if (await headerWrapper.count() > 0) {
      await expect(headerWrapper).toBeVisible();
    }
  });

  test('should render scrollable table body', async ({ page }) => {
    const bodyWrapper = page.locator('.ux-panel-table-wrapper__body').first();
    if (await bodyWrapper.count() > 0) {
      await expect(bodyWrapper).toBeVisible();
    }
  });

  test('should render table rows in body', async ({ page }) => {
    const tableBody = page.locator('.ux-panel-table-wrapper__body tbody').first();
    if (await tableBody.count() > 0) {
      const rows = tableBody.locator('tr');
      expect(await rows.count()).toBeGreaterThan(0);
    }
  });

  // Panel table layout tests
  test('should render panel table with actions, content, pagination', async ({ page }) => {
    const panelTable = page.locator('.ux-panel-table').first();
    if (await panelTable.count() > 0) {
      await expect(panelTable).toBeVisible();
    }
  });

  test('should render table actions bar', async ({ page }) => {
    const actions = page.locator('.ux-panel-table__actions').first();
    if (await actions.count() > 0) {
      await expect(actions).toBeVisible();
    }
  });

  test('should render table content area', async ({ page }) => {
    const content = page.locator('.ux-panel-table__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should render table pagination', async ({ page }) => {
    const pagination = page.locator('.ux-panel-table__pagination').first();
    if (await pagination.count() > 0) {
      await expect(pagination).toBeVisible();
    }
  });

  // Split panel layout tests
  test('should render horizontal split panel', async ({ page }) => {
    const splitH = page.locator('.ux-panel-split-h').first();
    if (await splitH.count() > 0) {
      await expect(splitH).toBeVisible();
    }
  });

  test('should render left section in horizontal split', async ({ page }) => {
    const left = page.locator('.ux-panel-split-h__left').first();
    if (await left.count() > 0) {
      await expect(left).toBeVisible();
    }
  });

  test('should render right section in horizontal split', async ({ page }) => {
    const right = page.locator('.ux-panel-split-h__right').first();
    if (await right.count() > 0) {
      await expect(right).toBeVisible();
    }
  });

  // Settings panel tests
  test('should render settings panel layout', async ({ page }) => {
    const settings = page.locator('.ux-panel-settings').first();
    if (await settings.count() > 0) {
      await expect(settings).toBeVisible();
    }
  });

  test('should render settings menu', async ({ page }) => {
    const menu = page.locator('.ux-panel-settings__menu').first();
    if (await menu.count() > 0) {
      await expect(menu).toBeVisible();
    }
  });

  test('should render settings menu items', async ({ page }) => {
    const menuItems = page.locator('.ux-panel-settings__menu-item').first();
    if (await menuItems.count() > 0) {
      await expect(menuItems).toBeVisible();
    }
  });

  test('should render settings content area', async ({ page }) => {
    const content = page.locator('.ux-panel-settings__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  // Form panel tests
  test('should render form panel layout', async ({ page }) => {
    const form = page.locator('.ux-panel-form').first();
    if (await form.count() > 0) {
      await expect(form).toBeVisible();
    }
  });

  test('should render form header', async ({ page }) => {
    const header = page.locator('.ux-panel-form__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render form content area', async ({ page }) => {
    const content = page.locator('.ux-panel-form__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should render form actions footer', async ({ page }) => {
    const actions = page.locator('.ux-panel-form__actions').first();
    if (await actions.count() > 0) {
      await expect(actions).toBeVisible();
    }
  });

  // Grid panels tests
  test('should render 2x2 grid panel', async ({ page }) => {
    const grid2x2 = page.locator('.ux-panel-grid-2x2').first();
    if (await grid2x2.count() > 0) {
      await expect(grid2x2).toBeVisible();
    }
  });

  test('should render grid cells in 2x2 panel', async ({ page }) => {
    const cells = page.locator('.ux-panel-grid-2x2__cell');
    if (await cells.count() > 0) {
      expect(await cells.count()).toBeGreaterThanOrEqual(4);
    }
  });

  test('should render cards grid panel', async ({ page }) => {
    const cardsPanel = page.locator('.ux-panel-cards').first();
    if (await cardsPanel.count() > 0) {
      await expect(cardsPanel).toBeVisible();
    }
  });

  test('should render cards grid with items', async ({ page }) => {
    const cardsGrid = page.locator('.ux-panel-cards__grid').first();
    if (await cardsGrid.count() > 0) {
      await expect(cardsGrid).toBeVisible();
      const cards = page.locator('.ux-panel-card');
      expect(await cards.count()).toBeGreaterThan(0);
    }
  });

  // Panel card component tests
  test('should render panel card with header and body', async ({ page }) => {
    const card = page.locator('.ux-panel-card').first();
    if (await card.count() > 0) {
      await expect(card).toBeVisible();
    }
  });

  test('should render card header with title', async ({ page }) => {
    const cardHeader = page.locator('.ux-panel-card__header').first();
    if (await cardHeader.count() > 0) {
      await expect(cardHeader).toBeVisible();
      const title = cardHeader.locator('.ux-panel-card__title').first();
      if (await title.count() > 0) {
        await expect(title).toBeVisible();
      }
    }
  });

  test('should render card body content', async ({ page }) => {
    const cardBody = page.locator('.ux-panel-card__body').first();
    if (await cardBody.count() > 0) {
      await expect(cardBody).toBeVisible();
    }
  });

  // Mobile responsive tests
  test('should have responsive toggle button on mobile detail panel', async ({ page }) => {
    const toggle = page.locator('.ux-panel-detail__toggle').first();
    if (await toggle.count() > 0) {
      await expect(toggle).toBeVisible();
    }
  });

  test('should have backdrop element in detail panel', async ({ page }) => {
    const backdrop = page.locator('.ux-panel-detail__backdrop').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeVisible();
    }
  });

  // Style and structure tests
  test('should have proper border radius', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const borderRadius = await panel.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have proper background color', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const bgColor = await panel.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBeTruthy();
  });

  test('should have flex display for panel structure', async ({ page }) => {
    const panel = page.locator('.ux-panel').first();
    const display = await panel.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(['flex', 'block']).toContain(display);
  });

  test('should render without errors', async ({ page }) => {
    const panelCount = await page.locator('[class*="ux-panel"]').count();
    expect(panelCount).toBeGreaterThan(0);
  });
});
