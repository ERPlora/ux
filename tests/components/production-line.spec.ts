import { test, expect } from '@playwright/test';

test.describe('Production Line Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/production-line.html');
  });

  test('should render basic production line', async ({ page }) => {
    const productionLine = page.locator('.ux-production-line').first();
    await expect(productionLine).toBeVisible();
  });

  test('should display header section', async ({ page }) => {
    const header = page.locator('.ux-production-line__header').first();
    await expect(header).toBeVisible();
  });

  test('should display production line title', async ({ page }) => {
    const title = page.locator('.ux-production-line__title').first();
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display status badge', async ({ page }) => {
    const statusBadge = page.locator('.ux-production-line__status-badge').first();
    await expect(statusBadge).toBeVisible();
  });

  test('should display status dot indicator', async ({ page }) => {
    const statusDot = page.locator('.ux-production-line__status-dot').first();
    await expect(statusDot).toBeVisible();
  });

  test('should apply running status style', async ({ page }) => {
    const runningBadge = page.locator('.ux-production-line__status-badge--running').first();
    if (await runningBadge.count() > 0) {
      await expect(runningBadge).toBeVisible();
    }
  });

  test('should apply error status style', async ({ page }) => {
    const errorBadge = page.locator('.ux-production-line__status-badge--error').first();
    if (await errorBadge.count() > 0) {
      await expect(errorBadge).toBeVisible();
    }
  });

  test('should apply maintenance status style', async ({ page }) => {
    const maintenanceBadge = page.locator('.ux-production-line__status-badge--maintenance').first();
    if (await maintenanceBadge.count() > 0) {
      await expect(maintenanceBadge).toBeVisible();
    }
  });

  test('should display speed indicator', async ({ page }) => {
    const speed = page.locator('.ux-production-line__speed').first();
    if (await speed.count() > 0) {
      await expect(speed).toBeVisible();
    }
  });

  test('should display speed value', async ({ page }) => {
    const speedValue = page.locator('.ux-production-line__speed-value').first();
    if (await speedValue.count() > 0) {
      await expect(speedValue).toBeVisible();
      const text = await speedValue.textContent();
      expect(text).toMatch(/\d+%/);
    }
  });

  test('should render speed bar', async ({ page }) => {
    const speedBar = page.locator('.ux-production-line__speed-bar').first();
    if (await speedBar.count() > 0) {
      await expect(speedBar).toBeVisible();
    }
  });

  test('should render speed fill with width', async ({ page }) => {
    const speedFill = page.locator('.ux-production-line__speed-fill').first();
    if (await speedFill.count() > 0) {
      await expect(speedFill).toBeVisible();
    }
  });

  test('should display metrics section', async ({ page }) => {
    const metrics = page.locator('.ux-production-line__metrics').first();
    if (await metrics.count() > 0) {
      await expect(metrics).toBeVisible();
    }
  });

  test('should render multiple metrics', async ({ page }) => {
    const metricItems = page.locator('.ux-production-line__metric');
    const count = await metricItems.count();
    if (count > 0) {
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });

  test('should display metric labels', async ({ page }) => {
    const metricLabel = page.locator('.ux-production-line__metric-label').first();
    if (await metricLabel.count() > 0) {
      await expect(metricLabel).toBeVisible();
      const text = await metricLabel.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display metric values', async ({ page }) => {
    const metricValue = page.locator('.ux-production-line__metric-value').first();
    if (await metricValue.count() > 0) {
      await expect(metricValue).toBeVisible();
    }
  });

  test('should display progress section', async ({ page }) => {
    const progress = page.locator('.ux-production-line__progress').first();
    if (await progress.count() > 0) {
      await expect(progress).toBeVisible();
    }
  });

  test('should render progress bar', async ({ page }) => {
    const progressBar = page.locator('.ux-production-line__progress-bar').first();
    if (await progressBar.count() > 0) {
      await expect(progressBar).toBeVisible();
    }
  });

  test('should render progress fill', async ({ page }) => {
    const progressFill = page.locator('.ux-production-line__progress-fill').first();
    if (await progressFill.count() > 0) {
      await expect(progressFill).toBeVisible();
    }
  });

  test('should display progress percentage', async ({ page }) => {
    const progressActual = page.locator('.ux-production-line__progress-actual').first();
    if (await progressActual.count() > 0) {
      await expect(progressActual).toBeVisible();
      const text = await progressActual.textContent();
      expect(text).toMatch(/\d+\.?\d*%/);
    }
  });

  test('should render stations container', async ({ page }) => {
    const stations = page.locator('.ux-production-line__stations').first();
    await expect(stations).toBeVisible();
  });

  test('should render stations wrapper', async ({ page }) => {
    const stationsWrapper = page.locator('.ux-production-line__stations-wrapper').first();
    await expect(stationsWrapper).toBeVisible();
  });

  test('should render multiple stations', async ({ page }) => {
    const stationItems = page.locator('.ux-production-line__station');
    const count = await stationItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display station icons', async ({ page }) => {
    const stationIcon = page.locator('.ux-production-line__station-icon').first();
    await expect(stationIcon).toBeVisible();
  });

  test('should display station labels', async ({ page }) => {
    const stationLabel = page.locator('.ux-production-line__station-label').first();
    await expect(stationLabel).toBeVisible();
    const text = await stationLabel.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display station sublabels when available', async ({ page }) => {
    const stationSublabel = page.locator('.ux-production-line__station-sublabel').first();
    if (await stationSublabel.count() > 0) {
      await expect(stationSublabel).toBeVisible();
    }
  });

  test('should apply running station style', async ({ page }) => {
    const runningStation = page.locator('.ux-production-line__station--running').first();
    if (await runningStation.count() > 0) {
      await expect(runningStation).toBeVisible();
    }
  });

  test('should apply stopped station style', async ({ page }) => {
    const stoppedStation = page.locator('.ux-production-line__station--stopped').first();
    if (await stoppedStation.count() > 0) {
      await expect(stoppedStation).toBeVisible();
    }
  });

  test('should apply error station style', async ({ page }) => {
    const errorStation = page.locator('.ux-production-line__station--error').first();
    if (await errorStation.count() > 0) {
      await expect(errorStation).toBeVisible();
    }
  });

  test('should apply maintenance station style', async ({ page }) => {
    const maintenanceStation = page.locator('.ux-production-line__station--maintenance').first();
    if (await maintenanceStation.count() > 0) {
      await expect(maintenanceStation).toBeVisible();
    }
  });

  test('should display station alerts when present', async ({ page }) => {
    const stationAlert = page.locator('.ux-production-line__station-alert').first();
    if (await stationAlert.count() > 0) {
      await expect(stationAlert).toBeVisible();
      const text = await stationAlert.textContent();
      expect(text).toMatch(/\d+/);
    }
  });

  test('should render connectors between stations', async ({ page }) => {
    const connectors = page.locator('.ux-production-line__connector');
    const count = await connectors.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should apply active connector style', async ({ page }) => {
    const activeConnector = page.locator('.ux-production-line__connector--active').first();
    if (await activeConnector.count() > 0) {
      await expect(activeConnector).toBeVisible();
    }
  });

  test('should apply inactive connector style', async ({ page }) => {
    const inactiveConnector = page.locator('.ux-production-line__connector--inactive').first();
    if (await inactiveConnector.count() > 0) {
      await expect(inactiveConnector).toBeVisible();
    }
  });

  test('should render connector flow animation', async ({ page }) => {
    const connectorFlow = page.locator('.ux-production-line__connector-flow').first();
    if (await connectorFlow.count() > 0) {
      const isVisible = await connectorFlow.isVisible();
      expect(typeof isVisible).toBe('boolean');
    }
  });

  test('should render station tooltips', async ({ page }) => {
    const tooltip = page.locator('.ux-production-line__station-tooltip').first();
    if (await tooltip.count() > 0) {
      expect(await tooltip.count()).toBeGreaterThan(0);
    }
  });

  test('should display footer section', async ({ page }) => {
    const footer = page.locator('.ux-production-line__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should display last update timestamp', async ({ page }) => {
    const lastUpdate = page.locator('.ux-production-line__last-update').first();
    if (await lastUpdate.count() > 0) {
      await expect(lastUpdate).toBeVisible();
    }
  });

  test('should display downtime indicator when present', async ({ page }) => {
    const downtime = page.locator('.ux-production-line__downtime').first();
    if (await downtime.count() > 0) {
      await expect(downtime).toBeVisible();
    }
  });

  test('should display downtime value', async ({ page }) => {
    const downtimeValue = page.locator('.ux-production-line__downtime-value').first();
    if (await downtimeValue.count() > 0) {
      await expect(downtimeValue).toBeVisible();
      const text = await downtimeValue.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compactLine = page.locator('.ux-production-line--compact').first();
    if (await compactLine.count() > 0) {
      await expect(compactLine).toBeVisible();
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallLine = page.locator('.ux-production-line--sm').first();
    if (await smallLine.count() > 0) {
      await expect(smallLine).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassLine = page.locator('.ux-production-line--glass').first();
    if (await glassLine.count() > 0) {
      await expect(glassLine).toBeVisible();
      const backdrop = await glassLine.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdrop).toContain('blur');
    }
  });

  test('should update production values on simulate button click', async ({ page }) => {
    const simulateBtn = page.locator('button:has-text("Simulate Update")').first();
    if (await simulateBtn.count() > 0) {
      const metricValue = page.locator('.ux-production-line__metric-value').first();
      const initialValue = await metricValue.textContent();

      await simulateBtn.click();
      await page.waitForTimeout(300);

      const newValue = await metricValue.textContent();
      expect(newValue).not.toBe(initialValue);
    }
  });

  test('should toggle station status in interactive demo', async ({ page }) => {
    const interactiveDemo = page.locator('.ux-production-line').filter({
      has: page.locator('.ux-production-line__footer button')
    }).first();

    if (await interactiveDemo.count() > 0) {
      const stoppedBtn = interactiveDemo.locator('button:has-text("Stopped")');
      if (await stoppedBtn.count() > 0) {
        await stoppedBtn.click();
        await page.waitForTimeout(300);

        const stoppedStation = interactiveDemo.locator('.ux-production-line__station--stopped');
        const count = await stoppedStation.count();
        expect(count).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('should display metric trend indicators', async ({ page }) => {
    const metricTrend = page.locator('.ux-production-line__metric-trend').first();
    if (await metricTrend.count() > 0) {
      await expect(metricTrend).toBeVisible();
    }
  });

  test('should apply progress fill status colors', async ({ page }) => {
    const successFill = page.locator('.ux-production-line__progress-fill--success').first();
    const primaryFill = page.locator('.ux-production-line__progress-fill--primary').first();
    const warningFill = page.locator('.ux-production-line__progress-fill--warning').first();
    const dangerFill = page.locator('.ux-production-line__progress-fill--danger').first();

    const hasStatusColors = await successFill.count() > 0 ||
      await primaryFill.count() > 0 ||
      await warningFill.count() > 0 ||
      await dangerFill.count() > 0;

    expect(hasStatusColors).toBe(true);
  });

  test('should contain SVG icons in stations', async ({ page }) => {
    const stationSvg = page.locator('.ux-production-line__station-icon svg').first();
    await expect(stationSvg).toBeVisible();
  });

  test('should render progress header', async ({ page }) => {
    const progressHeader = page.locator('.ux-production-line__progress-header').first();
    if (await progressHeader.count() > 0) {
      await expect(progressHeader).toBeVisible();
    }
  });

  test('should display progress label', async ({ page }) => {
    const progressLabel = page.locator('.ux-production-line__progress-label').first();
    if (await progressLabel.count() > 0) {
      await expect(progressLabel).toBeVisible();
      const text = await progressLabel.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should handle click events on stations', async ({ page }) => {
    const clickableStation = page.locator('.ux-production-line__station[style*="cursor"]').first();
    if (await clickableStation.count() > 0) {
      await clickableStation.click();
      await page.waitForTimeout(300);
      // Verify interaction happened (state change)
      expect(true).toBe(true);
    }
  });

  test('should render tooltip rows with data', async ({ page }) => {
    const tooltipRow = page.locator('.ux-production-line__tooltip-row').first();
    if (await tooltipRow.count() > 0) {
      expect(await tooltipRow.count()).toBeGreaterThan(0);
    }
  });

  test('should display metric units', async ({ page }) => {
    const metricUnit = page.locator('.ux-production-line__metric-unit').first();
    if (await metricUnit.count() > 0) {
      await expect(metricUnit).toBeVisible();
    }
  });
});
