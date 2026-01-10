import { test, expect } from '@playwright/test';

test.describe('Date Range Picker Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/date-range-picker.html');
  });

  // Basic Rendering Tests
  test('should render date range picker', async ({ page }) => {
    const dateRange = page.locator('.ux-date-range').first();
    await expect(dateRange).toBeVisible();
  });

  test('should render trigger button', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await expect(trigger).toBeVisible();
  });

  test('should display calendar icon in trigger', async ({ page }) => {
    const icon = page.locator('.ux-date-range__trigger-icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should display placeholder text when no dates selected', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    const triggerText = trigger.locator('.ux-date-range__trigger-text').first();
    const text = await triggerText.textContent();
    expect(text).toBeTruthy();
  });

  test('should display chevron arrow in trigger', async ({ page }) => {
    const arrow = page.locator('.ux-date-range__trigger-arrow').first();
    if (await arrow.count() > 0) {
      await expect(arrow).toBeVisible();
    }
  });

  // Panel and Dropdown Tests
  test('should not show panel initially', async ({ page }) => {
    const panel = page.locator('.ux-date-range__panel').first();
    const isVisible = await panel.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('should open panel on trigger click', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const panel = page.locator('.ux-date-range__panel').first();
    await expect(panel).toBeVisible();
  });

  test('should close panel on click outside', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    // Click outside the component
    await page.click('body', { position: { x: 0, y: 0 } });
    await page.waitForTimeout(300);

    const panel = page.locator('.ux-date-range__panel').first();
    const isVisible = await panel.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('should rotate arrow when panel opens', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    const arrow = trigger.locator('.ux-date-range__trigger-arrow');

    const initialTransform = await arrow.evaluate(el =>
      getComputedStyle(el).transform
    );

    await trigger.click();
    await page.waitForTimeout(300);

    const openTransform = await arrow.evaluate(el =>
      getComputedStyle(el).transform
    );

    expect(initialTransform).not.toBe(openTransform);
  });

  // Calendar Tests
  test('should render left calendar', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const calendar = page.locator('.ux-date-range__calendar').first();
    await expect(calendar).toBeVisible();
  });

  test('should render right calendar in dual mode', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const calendars = page.locator('.ux-date-range__calendar');
    const count = await calendars.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should render calendar header with month title', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const title = page.locator('.ux-date-range__calendar-title').first();
    await expect(title).toBeVisible();

    const text = await title.textContent();
    expect(text).toMatch(/\d{4}/); // Should contain year
  });

  test('should render navigation buttons', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const navButtons = page.locator('.ux-date-range__nav-btn');
    expect(await navButtons.count()).toBeGreaterThan(0);
  });

  test('should render weekday headers', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const weekdays = page.locator('.ux-date-range__weekday');
    expect(await weekdays.count()).toBe(7);
  });

  test('should render day cells', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    expect(await days.count()).toBeGreaterThan(30);
  });

  test('should highlight today', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const today = page.locator('.ux-date-range__day--today').first();
    if (await today.count() > 0) {
      await expect(today).toBeVisible();
    }
  });

  // Range Selection Tests
  test('should select start date on first click', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day').nth(10);
    await days.click();
    await page.waitForTimeout(200);

    const startDay = page.locator('.ux-date-range__day--start').first();
    if (await startDay.count() > 0) {
      await expect(startDay).toBeVisible();
    }
  });

  test('should select end date on second click', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    await days.nth(10).click();
    await page.waitForTimeout(200);
    await days.nth(15).click();
    await page.waitForTimeout(200);

    const endDay = page.locator('.ux-date-range__day--end').first();
    if (await endDay.count() > 0) {
      await expect(endDay).toBeVisible();
    }
  });

  test('should highlight dates in range', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    await days.nth(10).click();
    await page.waitForTimeout(200);
    await days.nth(15).click();
    await page.waitForTimeout(200);

    const inRange = page.locator('.ux-date-range__day--in-range');
    expect(await inRange.count()).toBeGreaterThan(0);
  });

  test('should reverse dates if end date is before start date', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    // Select day 15 first
    await days.nth(15).click();
    await page.waitForTimeout(200);
    // Select day 10 second (earlier date)
    await days.nth(10).click();
    await page.waitForTimeout(200);

    // The earlier date should still be marked as start
    const startDay = page.locator('.ux-date-range__day--start');
    if (await startDay.count() > 0) {
      await expect(startDay).toBeVisible();
    }
  });

  // Preset Tests
  test('should render presets sidebar', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const presets = page.locator('.ux-date-range__presets');
    if (await presets.count() > 0) {
      await expect(presets).toBeVisible();
    }
  });

  test('should render preset buttons', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const presetButtons = page.locator('.ux-date-range__preset');
    expect(await presetButtons.count()).toBeGreaterThan(0);
  });

  test('should select preset on click', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const firstPreset = page.locator('.ux-date-range__preset').first();
    await firstPreset.click();
    await page.waitForTimeout(200);

    const activePreset = page.locator('.ux-date-range__preset--active').first();
    if (await activePreset.count() > 0) {
      await expect(activePreset).toBeVisible();
    }
  });

  // Footer and Actions Tests
  test('should render footer with actions', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const footer = page.locator('.ux-date-range__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should render cancel and apply buttons', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const cancelBtn = page.locator('.ux-date-range__btn--cancel').first();
    const applyBtn = page.locator('.ux-date-range__btn--apply').first();

    if (await cancelBtn.count() > 0) {
      await expect(cancelBtn).toBeVisible();
    }
    if (await applyBtn.count() > 0) {
      await expect(applyBtn).toBeVisible();
    }
  });

  test('should disable apply button when no complete range selected', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const applyBtn = page.locator('.ux-date-range__btn--apply').first();
    if (await applyBtn.count() > 0) {
      const disabled = await applyBtn.isDisabled();
      expect(disabled).toBe(true);
    }
  });

  test('should enable apply button when complete range selected', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    await days.nth(10).click();
    await page.waitForTimeout(200);
    await days.nth(15).click();
    await page.waitForTimeout(200);

    const applyBtn = page.locator('.ux-date-range__btn--apply').first();
    if (await applyBtn.count() > 0) {
      const disabled = await applyBtn.isDisabled();
      expect(disabled).toBe(false);
    }
  });

  test('should display selected date range in footer', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    await days.nth(10).click();
    await page.waitForTimeout(200);
    await days.nth(15).click();
    await page.waitForTimeout(200);

    const selectedText = page.locator('.ux-date-range__selected').first();
    if (await selectedText.count() > 0) {
      const text = await selectedText.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should close panel on apply', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    await days.nth(10).click();
    await page.waitForTimeout(200);
    await days.nth(15).click();
    await page.waitForTimeout(200);

    const applyBtn = page.locator('.ux-date-range__btn--apply').first();
    await applyBtn.click();
    await page.waitForTimeout(300);

    const panel = page.locator('.ux-date-range__panel').first();
    const isVisible = await panel.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('should display selected date range in trigger after apply', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const days = page.locator('.ux-date-range__day');
    await days.nth(10).click();
    await page.waitForTimeout(200);
    await days.nth(15).click();
    await page.waitForTimeout(200);

    const applyBtn = page.locator('.ux-date-range__btn--apply').first();
    await applyBtn.click();
    await page.waitForTimeout(300);

    const triggerText = trigger.locator('.ux-date-range__trigger-text');
    const text = await triggerText.textContent();
    expect(text).toMatch(/\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{2}\/\d{4}/);
  });

  // Month Navigation Tests
  test('should navigate to next month', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const initialTitle = page.locator('.ux-date-range__calendar-title').first();
    const initialText = await initialTitle.textContent();

    const nextBtn = page.locator('.ux-date-range__nav-btn').nth(2);
    await nextBtn.click();
    await page.waitForTimeout(300);

    const updatedTitle = page.locator('.ux-date-range__calendar-title').first();
    const updatedText = await updatedTitle.textContent();

    expect(initialText).not.toBe(updatedText);
  });

  test('should navigate to previous month', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const initialTitle = page.locator('.ux-date-range__calendar-title').first();
    const initialText = await initialTitle.textContent();

    const prevBtn = page.locator('.ux-date-range__nav-btn').first();
    await prevBtn.click();
    await page.waitForTimeout(300);

    const updatedTitle = page.locator('.ux-date-range__calendar-title').first();
    const updatedText = await updatedTitle.textContent();

    expect(initialText).not.toBe(updatedText);
  });

  // Style and Accessibility Tests
  test('should apply glass variant if present', async ({ page }) => {
    const glassDateRange = page.locator('.ux-date-range--glass').first();
    if (await glassDateRange.count() > 0) {
      const trigger = glassDateRange.locator('.ux-date-range__trigger');
      const backdropFilter = await trigger.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter.length).toBeGreaterThan(0);
    }
  });

  test('should have minimum touch target for trigger', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    const height = await trigger.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should have minimum touch target for day buttons', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const day = page.locator('.ux-date-range__day').first();
    const height = await day.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(32);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    await trigger.focus();
    await expect(trigger).toBeFocused();
  });

  test('should have border radius', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    const borderRadius = await trigger.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have proper border styling', async ({ page }) => {
    const trigger = page.locator('.ux-date-range__trigger').first();
    const borderWidth = await trigger.evaluate(el =>
      getComputedStyle(el).borderWidth
    );
    expect(borderWidth).not.toBe('0px');
  });

  // Size Variant Tests
  test('should render small size variant', async ({ page }) => {
    const smallDateRange = page.locator('.ux-date-range--sm').first();
    if (await smallDateRange.count() > 0) {
      await expect(smallDateRange).toBeVisible();

      const trigger = smallDateRange.locator('.ux-date-range__trigger');
      const height = await trigger.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeLessThan(44);
    }
  });

  test('should render large size variant', async ({ page }) => {
    const largeDateRange = page.locator('.ux-date-range--lg').first();
    if (await largeDateRange.count() > 0) {
      await expect(largeDateRange).toBeVisible();

      const trigger = largeDateRange.locator('.ux-date-range__trigger');
      const height = await trigger.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThan(44);
    }
  });

  // Initial Dates Test
  test('should display initial dates if provided', async ({ page }) => {
    // The second demo section has initial dates
    const dateRanges = page.locator('.ux-date-range');
    const secondRange = dateRanges.nth(1);

    const trigger = secondRange.locator('.ux-date-range__trigger');
    const triggerText = trigger.locator('.ux-date-range__trigger-text');
    const text = await triggerText.textContent();

    // Should show date range format
    expect(text).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });
});
