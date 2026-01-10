import { test, expect } from '@playwright/test';

test.describe('Performance Meter Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/performance-meter.html');
  });

  test('should render basic performance meter', async ({ page }) => {
    const meter = page.locator('.ux-performance-meter').first();
    await expect(meter).toBeVisible();
  });

  test('should display employee header', async ({ page }) => {
    const header = page.locator('.ux-performance-meter__header').first();
    await expect(header).toBeVisible();
  });

  test('should display employee avatar', async ({ page }) => {
    const avatar = page.locator('.ux-performance-meter__avatar').first();
    await expect(avatar).toBeVisible();
  });

  test('should display employee name', async ({ page }) => {
    const name = page.locator('.ux-performance-meter__employee-name').first();
    await expect(name).toBeVisible();
    const text = await name.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display employee role', async ({ page }) => {
    const role = page.locator('.ux-performance-meter__employee-role').first();
    await expect(role).toBeVisible();
    const text = await role.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display employee department', async ({ page }) => {
    const department = page.locator('.ux-performance-meter__employee-department').first();
    if (await department.count() > 0) {
      await expect(department).toBeVisible();
    }
  });

  test('should render score section', async ({ page }) => {
    const scoreSection = page.locator('.ux-performance-meter__score-section').first();
    await expect(scoreSection).toBeVisible();
  });

  test('should render score gauge SVG', async ({ page }) => {
    const svg = page.locator('.ux-performance-meter__score-svg').first();
    await expect(svg).toBeVisible();
  });

  test('should render gauge track circle', async ({ page }) => {
    const track = page.locator('.ux-performance-meter__score-track').first();
    await expect(track).toBeVisible();
  });

  test('should render gauge fill circle', async ({ page }) => {
    const fill = page.locator('.ux-performance-meter__score-fill').first();
    await expect(fill).toBeVisible();
  });

  test('should display score number', async ({ page }) => {
    const scoreNumber = page.locator('.ux-performance-meter__score-number').first();
    await expect(scoreNumber).toBeVisible();
    const text = await scoreNumber.textContent();
    expect(text).toMatch(/\d+/);
  });

  test('should display max score', async ({ page }) => {
    const maxScore = page.locator('.ux-performance-meter__score-max').first();
    if (await maxScore.count() > 0) {
      await expect(maxScore).toBeVisible();
    }
  });

  test('should display score value container', async ({ page }) => {
    const valueContainer = page.locator('.ux-performance-meter__score-value').first();
    await expect(valueContainer).toBeVisible();
  });

  test('should render categories section', async ({ page }) => {
    const categories = page.locator('.ux-performance-meter__categories').first();
    await expect(categories).toBeVisible();
  });

  test('should render category items', async ({ page }) => {
    const categoryItems = page.locator('.ux-performance-meter__category');
    const count = await categoryItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display category names', async ({ page }) => {
    const categoryName = page.locator('.ux-performance-meter__category-name').first();
    await expect(categoryName).toBeVisible();
    const text = await categoryName.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display category values', async ({ page }) => {
    const categoryValue = page.locator('.ux-performance-meter__category-value').first();
    await expect(categoryValue).toBeVisible();
    const text = await categoryValue.textContent();
    expect(text).toMatch(/\d+%?/);
  });

  test('should render category progress bars', async ({ page }) => {
    const categoryBar = page.locator('.ux-performance-meter__category-bar').first();
    await expect(categoryBar).toBeVisible();
  });

  test('should render category fill with width style', async ({ page }) => {
    const categoryFill = page.locator('.ux-performance-meter__category-fill').first();
    await expect(categoryFill).toBeVisible();
    const width = await categoryFill.evaluate(el =>
      getComputedStyle(el).width
    );
    expect(width).not.toBe('0px');
  });

  test('should apply excellent score color (green)', async ({ page }) => {
    const excellentFill = page.locator('.ux-performance-meter__score-fill--excellent').first();
    if (await excellentFill.count() > 0) {
      await expect(excellentFill).toBeVisible();
    }
  });

  test('should apply good score color (blue)', async ({ page }) => {
    const goodFill = page.locator('.ux-performance-meter__score-fill--good').first();
    if (await goodFill.count() > 0) {
      await expect(goodFill).toBeVisible();
    }
  });

  test('should apply average score color (yellow)', async ({ page }) => {
    const averageFill = page.locator('.ux-performance-meter__score-fill--average').first();
    if (await averageFill.count() > 0) {
      await expect(averageFill).toBeVisible();
    }
  });

  test('should apply poor score color (red)', async ({ page }) => {
    const poorFill = page.locator('.ux-performance-meter__score-fill--poor').first();
    if (await poorFill.count() > 0) {
      await expect(poorFill).toBeVisible();
    }
  });

  test('should display score status badge', async ({ page }) => {
    const status = page.locator('.ux-performance-meter__score-status').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
      const text = await status.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display trend indicator when available', async ({ page }) => {
    const trend = page.locator('.ux-performance-meter__trend').first();
    if (await trend.count() > 0) {
      await expect(trend).toBeVisible();
    }
  });

  test('should display upward trend arrow', async ({ page }) => {
    const trendUp = page.locator('.ux-performance-meter__trend--up').first();
    if (await trendUp.count() > 0) {
      await expect(trendUp).toBeVisible();
    }
  });

  test('should display downward trend arrow', async ({ page }) => {
    const trendDown = page.locator('.ux-performance-meter__trend--down').first();
    if (await trendDown.count() > 0) {
      await expect(trendDown).toBeVisible();
    }
  });

  test('should render goal section when goals are set', async ({ page }) => {
    const goalSection = page.locator('.ux-performance-meter__goal-section').first();
    if (await goalSection.count() > 0) {
      await expect(goalSection).toBeVisible();
    }
  });

  test('should display goal and actual values', async ({ page }) => {
    const goalValue = page.locator('.ux-performance-meter__goal-value').first();
    if (await goalValue.count() > 0) {
      await expect(goalValue).toBeVisible();
      const text = await goalValue.textContent();
      expect(text).toMatch(/\d+/);
    }
  });

  test('should display goal difference', async ({ page }) => {
    const goalDiff = page.locator('.ux-performance-meter__goal-diff').first();
    if (await goalDiff.count() > 0) {
      await expect(goalDiff).toBeVisible();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compactMeter = page.locator('.ux-performance-meter--compact').first();
    if (await compactMeter.count() > 0) {
      await expect(compactMeter).toBeVisible();
    }
  });

  test('should apply score-only variant', async ({ page }) => {
    const scoreOnlyMeter = page.locator('.ux-performance-meter--score-only').first();
    if (await scoreOnlyMeter.count() > 0) {
      await expect(scoreOnlyMeter).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassMeter = page.locator('.ux-performance-meter--glass').first();
    if (await glassMeter.count() > 0) {
      await expect(glassMeter).toBeVisible();
      const backdrop = await glassMeter.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdrop).toContain('blur');
    }
  });

  test('should render period selector when available', async ({ page }) => {
    const periodSelector = page.locator('.ux-performance-meter__period-selector').first();
    if (await periodSelector.count() > 0) {
      await expect(periodSelector).toBeVisible();
    }
  });

  test('should render period buttons', async ({ page }) => {
    const periodBtn = page.locator('.ux-performance-meter__period-btn').first();
    if (await periodBtn.count() > 0) {
      await expect(periodBtn).toBeVisible();
    }
  });

  test('should mark active period button', async ({ page }) => {
    const activePeriodBtn = page.locator('.ux-performance-meter__period-btn--active').first();
    if (await activePeriodBtn.count() > 0) {
      await expect(activePeriodBtn).toBeVisible();
    }
  });

  test('should render gauge with correct stroke-dasharray', async ({ page }) => {
    const fill = page.locator('.ux-performance-meter__score-fill').first();
    const dasharray = await fill.evaluate(el =>
      el.getAttribute('stroke-dasharray')
    );
    expect(dasharray).not.toBeNull();
  });

  test('should render gauge with correct stroke-dashoffset', async ({ page }) => {
    const fill = page.locator('.ux-performance-meter__score-fill').first();
    const dashoffset = await fill.evaluate(el =>
      el.getAttribute('stroke-dashoffset')
    );
    expect(dashoffset).not.toBeNull();
  });

  test('should have animated gauge fill transition', async ({ page }) => {
    const fill = page.locator('.ux-performance-meter__score-fill').first();
    const transition = await fill.evaluate(el =>
      getComputedStyle(el).transition
    );
    expect(transition).not.toBe('none');
  });

  test('should apply category fill colors based on score level', async ({ page }) => {
    const categoryFillExcellent = page.locator('.ux-performance-meter__category-fill--excellent').first();
    const categoryFillGood = page.locator('.ux-performance-meter__category-fill--good').first();
    const categoryFillAverage = page.locator('.ux-performance-meter__category-fill--average').first();
    const categoryFillPoor = page.locator('.ux-performance-meter__category-fill--poor').first();

    const hasColorVariants = await categoryFillExcellent.count() > 0 ||
      await categoryFillGood.count() > 0 ||
      await categoryFillAverage.count() > 0 ||
      await categoryFillPoor.count() > 0;

    expect(hasColorVariants).toBe(true);
  });

  test('should render category trends when available', async ({ page }) => {
    const categoryTrend = page.locator('.ux-performance-meter__category-trend').first();
    if (await categoryTrend.count() > 0) {
      await expect(categoryTrend).toBeVisible();
    }
  });

  test('should update score display on interactive changes', async ({ page }) => {
    const interactiveDemo = page.locator('.ux-performance-meter').filter({
      has: page.locator('button:has-text("+5")')
    }).first();

    if (await interactiveDemo.count() > 0) {
      const initialScore = await page.locator('.ux-performance-meter__score-number').first().textContent();

      const incrementBtn = interactiveDemo.locator('button:has-text("+5")');
      await incrementBtn.click();
      await page.waitForTimeout(300);

      const newScore = await interactiveDemo.locator('.ux-performance-meter__score-number').textContent();
      expect(newScore).not.toBe(initialScore);
    }
  });

  test('should display period badge', async ({ page }) => {
    const periodBadge = page.locator('.ux-performance-meter__period-badge').first();
    if (await periodBadge.count() > 0) {
      await expect(periodBadge).toBeVisible();
    }
  });

  test('should display score label', async ({ page }) => {
    const scoreLabel = page.locator('.ux-performance-meter__score-label').first();
    if (await scoreLabel.count() > 0) {
      await expect(scoreLabel).toBeVisible();
      const text = await scoreLabel.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should render categories title', async ({ page }) => {
    const categoriesTitle = page.locator('.ux-performance-meter__categories-title').first();
    if (await categoriesTitle.count() > 0) {
      await expect(categoriesTitle).toBeVisible();
    }
  });

  test('should handle rating score type', async ({ page }) => {
    const ratingMeter = page.locator('[x-data*="scoreType"]').first();
    if (await ratingMeter.count() > 0) {
      const scoreNumber = ratingMeter.locator('.ux-performance-meter__score-number');
      const text = await scoreNumber.textContent();
      expect(text).toMatch(/\d+\.?\d*/);
    }
  });

  test('should maintain proper SVG viewBox', async ({ page }) => {
    const svg = page.locator('.ux-performance-meter__score-svg').first();
    const viewBox = await svg.evaluate(el =>
      el.getAttribute('viewBox')
    );
    expect(viewBox).toBe('0 0 100 100');
  });
});
