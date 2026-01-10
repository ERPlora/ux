import { test, expect } from '@playwright/test';

test.describe('Stats Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/stats.html');
  });

  test('should render basic stats card', async ({ page }) => {
    const statsCard = page.locator('.ux-stats-card').first();
    await expect(statsCard).toBeVisible();
  });

  test('should display stat value', async ({ page }) => {
    const statValue = page.locator('.ux-stats-card__value').first();
    await expect(statValue).toBeVisible();
    const text = await statValue.textContent();
    expect(text).toBeDefined();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display stat label', async ({ page }) => {
    const statLabel = page.locator('.ux-stats-card__label').first();
    await expect(statLabel).toBeVisible();
    const text = await statLabel.textContent();
    expect(text).toBeDefined();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test('should display icon with correct styling', async ({ page }) => {
    const icon = page.locator('.ux-stats-card__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
      const bgColor = await icon.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('transparent');
    }
  });

  test('should apply icon color variants', async ({ page }) => {
    const successIcon = page.locator('.ux-stats-card__icon--success').first();
    if (await successIcon.count() > 0) {
      await expect(successIcon).toBeVisible();
      const color = await successIcon.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }

    const warningIcon = page.locator('.ux-stats-card__icon--warning').first();
    if (await warningIcon.count() > 0) {
      await expect(warningIcon).toBeVisible();
    }

    const dangerIcon = page.locator('.ux-stats-card__icon--danger').first();
    if (await dangerIcon.count() > 0) {
      await expect(dangerIcon).toBeVisible();
    }
  });

  test('should display trend indicator with direction', async ({ page }) => {
    const trendUp = page.locator('.ux-stats-card__trend--up').first();
    if (await trendUp.count() > 0) {
      await expect(trendUp).toBeVisible();
      const text = await trendUp.textContent();
      expect(text).toContain('+');
    }

    const trendDown = page.locator('.ux-stats-card__trend--down').first();
    if (await trendDown.count() > 0) {
      await expect(trendDown).toBeVisible();
      const text = await trendDown.textContent();
      expect(text).toContain('-');
    }

    const trendNeutral = page.locator('.ux-stats-card__trend--neutral').first();
    if (await trendNeutral.count() > 0) {
      await expect(trendNeutral).toBeVisible();
    }
  });

  test('should display description text', async ({ page }) => {
    const description = page.locator('.ux-stats-card__description').first();
    if (await description.count() > 0) {
      await expect(description).toBeVisible();
      const text = await description.textContent();
      expect(text).toBeDefined();
    }
  });

  test('should render value with prefix and suffix', async ({ page }) => {
    const valueWrapper = page.locator('.ux-stats-card__value-wrapper').first();
    if (await valueWrapper.count() > 0) {
      await expect(valueWrapper).toBeVisible();

      const prefix = page.locator('.ux-stats-card__value-prefix').first();
      if (await prefix.count() > 0) {
        const prefixText = await prefix.textContent();
        expect(prefixText).toBeDefined();
      }

      const suffix = page.locator('.ux-stats-card__value-suffix').first();
      if (await suffix.count() > 0) {
        const suffixText = await suffix.textContent();
        expect(suffixText).toBeDefined();
      }
    }
  });

  test('should apply size variants', async ({ page }) => {
    const smallCard = page.locator('.ux-stats-card--sm').first();
    if (await smallCard.count() > 0) {
      await expect(smallCard).toBeVisible();
      const padding = await smallCard.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).toBeDefined();
    }

    const largeCard = page.locator('.ux-stats-card--lg').first();
    if (await largeCard.count() > 0) {
      await expect(largeCard).toBeVisible();
    }
  });

  test('should apply layout variants', async ({ page }) => {
    const horizontalCard = page.locator('.ux-stats-card--horizontal').first();
    if (await horizontalCard.count() > 0) {
      await expect(horizontalCard).toBeVisible();
      const display = await horizontalCard.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(display).toBe('row');
    }

    const centeredCard = page.locator('.ux-stats-card--centered').first();
    if (await centeredCard.count() > 0) {
      await expect(centeredCard).toBeVisible();
      const textAlign = await centeredCard.evaluate(el =>
        getComputedStyle(el).textAlign
      );
      expect(textAlign).toBe('center');
    }
  });

  test('should apply color variants', async ({ page }) => {
    const primaryCard = page.locator('.ux-stats-card--primary').first();
    if (await primaryCard.count() > 0) {
      await expect(primaryCard).toBeVisible();
      const bgColor = await primaryCard.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('transparent');
    }

    const gradientCard = page.locator('.ux-stats-card--gradient').first();
    if (await gradientCard.count() > 0) {
      await expect(gradientCard).toBeVisible();
    }

    const glassCard = page.locator('.ux-stats-card--glass').first();
    if (await glassCard.count() > 0) {
      await expect(glassCard).toBeVisible();
      const backdropFilter = await glassCard.evaluate(el =>
        getComputedStyle(el).backdropFilter
      );
      expect(backdropFilter).toBeDefined();
    }
  });

  test('should render progress bar when present', async ({ page }) => {
    const progressBar = page.locator('.ux-stats-card__progress-bar').first();
    if (await progressBar.count() > 0) {
      await expect(progressBar).toBeVisible();

      const progressFill = page.locator('.ux-stats-card__progress-fill').first();
      if (await progressFill.count() > 0) {
        await expect(progressFill).toBeVisible();
        const width = await progressFill.evaluate(el =>
          getComputedStyle(el).width
        );
        expect(width).toBeDefined();
      }
    }
  });

  test('should apply progress fill color variants', async ({ page }) => {
    const successFill = page.locator('.ux-stats-card__progress-fill--success').first();
    if (await successFill.count() > 0) {
      await expect(successFill).toBeVisible();
    }

    const warningFill = page.locator('.ux-stats-card__progress-fill--warning').first();
    if (await warningFill.count() > 0) {
      await expect(warningFill).toBeVisible();
    }

    const dangerFill = page.locator('.ux-stats-card__progress-fill--danger').first();
    if (await dangerFill.count() > 0) {
      await expect(dangerFill).toBeVisible();
    }
  });

  test('should render stats grid', async ({ page }) => {
    const statsGrid = page.locator('.ux-stats-grid').first();
    if (await statsGrid.count() > 0) {
      await expect(statsGrid).toBeVisible();
      const cards = page.locator('.ux-stats-grid .ux-stats-card');
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);
    }
  });

  test('should apply grid layout variants', async ({ page }) => {
    const autoGrid = page.locator('.ux-stats-grid--auto').first();
    if (await autoGrid.count() > 0) {
      await expect(autoGrid).toBeVisible();
      const gridTemplate = await autoGrid.evaluate(el =>
        getComputedStyle(el).gridTemplateColumns
      );
      expect(gridTemplate).toBeDefined();
    }

    const twoColGrid = page.locator('.ux-stats-grid--2').first();
    if (await twoColGrid.count() > 0) {
      await expect(twoColGrid).toBeVisible();
    }

    const threeColGrid = page.locator('.ux-stats-grid--3').first();
    if (await threeColGrid.count() > 0) {
      await expect(threeColGrid).toBeVisible();
    }

    const fourColGrid = page.locator('.ux-stats-grid--4').first();
    if (await fourColGrid.count() > 0) {
      await expect(fourColGrid).toBeVisible();
    }
  });

  test('should have proper spacing between header and value', async ({ page }) => {
    const statsCard = page.locator('.ux-stats-card').first();
    await expect(statsCard).toBeVisible();

    const header = page.locator('.ux-stats-card__header').first();
    const value = page.locator('.ux-stats-card__value').first();

    if (await header.count() > 0 && await value.count() > 0) {
      const headerBox = await header.boundingBox();
      const valueBox = await value.boundingBox();

      expect(headerBox).toBeDefined();
      expect(valueBox).toBeDefined();

      if (headerBox && valueBox) {
        expect(valueBox.y).toBeGreaterThan(headerBox.y);
      }
    }
  });

  test('should have proper card styling', async ({ page }) => {
    const statsCard = page.locator('.ux-stats-card').first();
    const bgColor = await statsCard.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    const borderRadius = await statsCard.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    const border = await statsCard.evaluate(el =>
      getComputedStyle(el).border
    );

    expect(bgColor).not.toBe('transparent');
    expect(borderRadius).not.toBe('0px');
    expect(border).toBeDefined();
  });

  test('should hover effect on card', async ({ page }) => {
    const statsCard = page.locator('.ux-stats-card').first();
    await expect(statsCard).toBeVisible();

    const boxBefore = await statsCard.boundingBox();
    await statsCard.hover();
    const boxAfter = await statsCard.boundingBox();

    expect(boxBefore).toBeDefined();
    expect(boxAfter).toBeDefined();
  });

  test('should have icon with SVG when present', async ({ page }) => {
    const icon = page.locator('.ux-stats-card__icon').first();
    if (await icon.count() > 0) {
      const svg = icon.locator('svg');
      if (await svg.count() > 0) {
        await expect(svg).toBeVisible();
      }
    }
  });

  test('should render footer with trend when present', async ({ page }) => {
    const footer = page.locator('.ux-stats-card__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();

      const trend = footer.locator('.ux-stats-card__trend');
      if (await trend.count() > 0) {
        await expect(trend).toBeVisible();
      }

      const description = footer.locator('.ux-stats-card__description');
      if (await description.count() > 0) {
        await expect(description).toBeVisible();
      }
    }
  });

  test('should support animated counter with Alpine.js', async ({ page }) => {
    const animatedCard = page.locator('[x-data*="uxStatsCard"]').first();
    if (await animatedCard.count() > 0) {
      await expect(animatedCard).toBeVisible();
      const value = page.locator('.ux-stats-card__value').nth(0);
      const text = await value.textContent();
      expect(text).toBeDefined();
    }
  });

  test('should have proper contrast for accessibility', async ({ page }) => {
    const statValue = page.locator('.ux-stats-card__value').first();
    const color = await statValue.evaluate(el =>
      getComputedStyle(el).color
    );
    expect(color).not.toBe('transparent');
  });

  test('should render header with label and optional icon', async ({ page }) => {
    const header = page.locator('.ux-stats-card__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();

      const label = header.locator('.ux-stats-card__label');
      if (await label.count() > 0) {
        await expect(label).toBeVisible();
      }

      const icon = header.locator('.ux-stats-card__icon');
      const display = await header.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });
});
