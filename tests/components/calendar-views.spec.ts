import { test, expect } from '@playwright/test';

test.describe('Calendar Views Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/calendar-views.html');
  });

  // ========================================
  // Basic Rendering Tests
  // ========================================

  test('should render calendar view container', async ({ page }) => {
    const calendar = page.locator('.ux-calendar-view').first();
    await expect(calendar).toBeVisible();
  });

  test('should render calendar header', async ({ page }) => {
    const header = page.locator('.ux-calendar-view__header').first();
    await expect(header).toBeVisible();
  });

  test('should render navigation buttons', async ({ page }) => {
    const prevBtn = page.locator('.ux-calendar-view__nav-btn').first();
    const nextBtn = page.locator('.ux-calendar-view__nav-btn').nth(1);

    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
  });

  test('should render title', async ({ page }) => {
    const title = page.locator('.ux-calendar-view__title').first();
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text).toBeTruthy();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should render today button', async ({ page }) => {
    const todayBtn = page.locator('.ux-calendar-view__today-btn').first();
    await expect(todayBtn).toBeVisible();
    await expect(todayBtn).toContainText('Hoy');
  });

  // ========================================
  // Week View Tests
  // ========================================

  test('should render week view by default', async ({ page }) => {
    const weekView = page.locator('.ux-calendar-view').first();

    // Check that week headers are present
    const dayHeaders = page.locator('.ux-calendar-view__day-header');
    const count = await dayHeaders.count();

    // Should have 7 day headers for week view
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('should render day headers in week view', async ({ page }) => {
    const dayHeaders = page.locator('.ux-calendar-view__day-header');
    expect(await dayHeaders.count()).toBeGreaterThanOrEqual(7);

    // First day header should be visible
    const firstHeader = dayHeaders.first();
    await expect(firstHeader).toBeVisible();
  });

  test('should render day names in headers', async ({ page }) => {
    const dayNames = page.locator('.ux-calendar-view__day-name');
    const count = await dayNames.count();

    expect(count).toBeGreaterThanOrEqual(7);

    // Check for day name text
    const firstDayName = await dayNames.first().textContent();
    expect(firstDayName).toBeTruthy();
  });

  test('should render day numbers in headers', async ({ page }) => {
    const dayNumbers = page.locator('.ux-calendar-view__day-number');
    const count = await dayNumbers.count();

    expect(count).toBeGreaterThanOrEqual(7);

    // First day should have a number
    const firstNumber = await dayNumbers.first().textContent();
    expect(parseInt(firstNumber || '0')).toBeGreaterThanOrEqual(1);
    expect(parseInt(firstNumber || '0')).toBeLessThanOrEqual(31);
  });

  test('should highlight today in day headers', async ({ page }) => {
    const todayHeader = page.locator('.ux-calendar-view__day-header--today').first();

    if (await todayHeader.count() > 0) {
      await expect(todayHeader).toBeVisible();

      // Check background color is applied
      const dayNumber = todayHeader.locator('.ux-calendar-view__day-number');
      const backgroundColor = await dayNumber.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  // ========================================
  // Time Grid Tests
  // ========================================

  test('should render time grid', async ({ page }) => {
    const grid = page.locator('.ux-calendar-view__grid').first();
    await expect(grid).toBeVisible();
  });

  test('should render hour slots', async ({ page }) => {
    const hourSlots = page.locator('.ux-calendar-view__hour-slot');
    const count = await hourSlots.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should render time labels', async ({ page }) => {
    const times = page.locator('.ux-calendar-view__time');
    const count = await times.count();

    expect(count).toBeGreaterThan(0);

    // First time label should show hour format
    const firstTime = await times.first().textContent();
    expect(firstTime).toMatch(/\d{2}:\d{2}/);
  });

  test('should render day columns', async ({ page }) => {
    const dayColumns = page.locator('.ux-calendar-view__day-column');
    const count = await dayColumns.count();

    // Should have 7 columns for week view
    expect(count).toBeGreaterThanOrEqual(7);
  });

  // ========================================
  // Events Display Tests
  // ========================================

  test('should render events in week view', async ({ page }) => {
    const events = page.locator('.ux-calendar-view__event');
    const count = await events.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should display event title', async ({ page }) => {
    const eventTitle = page.locator('.ux-calendar-view__event-title').first();

    if (await eventTitle.count() > 0) {
      await expect(eventTitle).toBeVisible();
      const text = await eventTitle.textContent();
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display event time', async ({ page }) => {
    const eventTime = page.locator('.ux-calendar-view__event-time').first();

    if (await eventTime.count() > 0) {
      await expect(eventTime).toBeVisible();
      const text = await eventTime.textContent();
      expect(text).toContain('-');
    }
  });

  test('should apply event color classes', async ({ page }) => {
    const events = page.locator('.ux-calendar-view__event');

    if (await events.count() > 0) {
      const firstEvent = events.first();
      const className = await firstEvent.getAttribute('class');

      expect(className).toMatch(/ux-calendar-view__event--(primary|success|danger|warning|secondary)/);
    }
  });

  test('should apply correct color for primary events', async ({ page }) => {
    const primaryEvent = page.locator('.ux-calendar-view__event--primary').first();

    if (await primaryEvent.count() > 0) {
      const backgroundColor = await primaryEvent.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      expect(backgroundColor).not.toBe('transparent');
    }
  });

  test('should apply correct color for success events', async ({ page }) => {
    const successEvent = page.locator('.ux-calendar-view__event--success').first();

    if (await successEvent.count() > 0) {
      const backgroundColor = await successEvent.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      expect(backgroundColor).not.toBe('transparent');
    }
  });

  test('should apply correct color for danger events', async ({ page }) => {
    const dangerEvent = page.locator('.ux-calendar-view__event--danger').first();

    if (await dangerEvent.count() > 0) {
      const backgroundColor = await dangerEvent.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      expect(backgroundColor).not.toBe('transparent');
    }
  });

  test('should apply correct color for warning events', async ({ page }) => {
    const warningEvent = page.locator('.ux-calendar-view__event--warning').first();

    if (await warningEvent.count() > 0) {
      const backgroundColor = await warningEvent.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      expect(backgroundColor).not.toBe('transparent');
    }
  });

  test('should position events based on time', async ({ page }) => {
    const events = page.locator('.ux-calendar-view__event');

    if (await events.count() > 0) {
      const firstEvent = events.first();
      const topStyle = await firstEvent.evaluate(el =>
        el.getAttribute('style')
      );

      expect(topStyle).toContain('top:');
    }
  });

  // ========================================
  // Day View Tests
  // ========================================

  test('should render day view when switched', async ({ page }) => {
    const dayViewBtn = page.locator('.ux-calendar-view__view-btn').nth(1);

    if (await dayViewBtn.count() > 0) {
      await dayViewBtn.click();
      await page.waitForTimeout(200);

      // Day view should have single column grid
      const grid = page.locator('.ux-calendar-view__grid--single');
      expect(await grid.count()).toBeGreaterThan(0);
    }
  });

  test('should show single day header in day view', async ({ page }) => {
    // Navigate to day-only view demo
    const dayViewDemo = page.locator('text=Vista Diaria').first();
    await dayViewDemo.scrollIntoViewIfNeeded();

    const calendar = page.locator('.ux-calendar-view').nth(1);
    if (await calendar.count() > 0) {
      const singleHeader = calendar.locator('.ux-calendar-view__day-headers--single');
      if (await singleHeader.count() > 0) {
        await expect(singleHeader).toBeVisible();
      }
    }
  });

  test('should display events for single day in day view', async ({ page }) => {
    // Navigate to the day-only view demo section
    const dayViewDemo = page.locator('text=Vista Diaria').first();
    await dayViewDemo.scrollIntoViewIfNeeded();

    const calendar = page.locator('.ux-calendar-view').nth(1);
    if (await calendar.count() > 0) {
      const events = calendar.locator('.ux-calendar-view__event');
      const count = await events.count();

      expect(count).toBeGreaterThan(0);
    }
  });

  // ========================================
  // Navigation Tests
  // ========================================

  test('should navigate to previous week', async ({ page }) => {
    const initialTitle = await page.locator('.ux-calendar-view__title').first().textContent();

    const prevBtn = page.locator('.ux-calendar-view__nav-btn').first();
    await prevBtn.click();
    await page.waitForTimeout(200);

    const newTitle = await page.locator('.ux-calendar-view__title').first().textContent();

    // Title should change after navigation
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should navigate to next week', async ({ page }) => {
    const initialTitle = await page.locator('.ux-calendar-view__title').first().textContent();

    const nextBtn = page.locator('.ux-calendar-view__nav-btn').nth(1);
    await nextBtn.click();
    await page.waitForTimeout(200);

    const newTitle = await page.locator('.ux-calendar-view__title').first().textContent();

    // Title should change after navigation
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should navigate to today when today button clicked', async ({ page }) => {
    // First navigate away from today
    const prevBtn = page.locator('.ux-calendar-view__nav-btn').first();
    await prevBtn.click();
    await page.waitForTimeout(200);

    // Then click today button
    const todayBtn = page.locator('.ux-calendar-view__today-btn').first();
    await todayBtn.click();
    await page.waitForTimeout(200);

    // Check that today is highlighted
    const todayHeader = page.locator('.ux-calendar-view__day-header--today').first();
    if (await todayHeader.count() > 0) {
      await expect(todayHeader).toBeVisible();
    }
  });

  // ========================================
  // Styling and Accessibility Tests
  // ========================================

  test('should have proper container styling', async ({ page }) => {
    const calendar = page.locator('.ux-calendar-view').first();

    // Check that element exists and has proper styling properties
    await expect(calendar).toBeVisible();

    const computed = await calendar.evaluate(el => {
      const style = getComputedStyle(el);
      return {
        position: style.position,
        overflow: style.overflow
      };
    });

    // Calendar should have positioning context
    expect(computed.position).not.toBeNull();
    expect(computed.overflow).toBeTruthy();
  });

  test('should have visible borders', async ({ page }) => {
    const calendar = page.locator('.ux-calendar-view').first();

    const borderWidth = await calendar.evaluate(el =>
      getComputedStyle(el).borderWidth
    );

    expect(borderWidth).not.toBe('0px');
  });

  test('events should be clickable', async ({ page }) => {
    const events = page.locator('.ux-calendar-view__event');

    if (await events.count() > 0) {
      const firstEvent = events.first();
      const cursor = await firstEvent.evaluate(el =>
        getComputedStyle(el).cursor
      );

      expect(cursor).toBe('pointer');
    }
  });

  test('navigation buttons should be keyboard accessible', async ({ page }) => {
    const prevBtn = page.locator('.ux-calendar-view__nav-btn').first();

    await prevBtn.focus();
    await expect(prevBtn).toBeFocused();
  });

  test('today button should have touch target size', async ({ page }) => {
    const todayBtn = page.locator('.ux-calendar-view__today-btn').first();

    const height = await todayBtn.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );

    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('nav buttons should have touch target size', async ({ page }) => {
    const navBtn = page.locator('.ux-calendar-view__nav-btn').first();

    const width = await navBtn.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    const height = await navBtn.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );

    expect(width).toBeGreaterThanOrEqual(36);
    expect(height).toBeGreaterThanOrEqual(36);
  });

  test('should render multiple calendar views on page', async ({ page }) => {
    const calendars = page.locator('.ux-calendar-view');
    const count = await calendars.count();

    // Documentation page has multiple calendar demos
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('hour height should be consistent', async ({ page }) => {
    const hourSlots = page.locator('.ux-calendar-view__hour-slot');

    if (await hourSlots.count() > 1) {
      const firstHeight = await hourSlots.first().evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );

      const secondHeight = await hourSlots.nth(1).evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );

      expect(firstHeight).toBe(secondHeight);
    }
  });

  test('should have proper z-index layering', async ({ page }) => {
    const event = page.locator('.ux-calendar-view__event').first();

    if (await event.count() > 0) {
      const zIndex = await event.evaluate(el =>
        getComputedStyle(el).zIndex
      );

      expect(zIndex).not.toBe('auto');
      expect(parseInt(zIndex || '0')).toBeGreaterThan(0);
    }
  });

  test('events should have visible text on colored background', async ({ page }) => {
    const event = page.locator('.ux-calendar-view__event').first();

    if (await event.count() > 0) {
      const color = await event.evaluate(el =>
        getComputedStyle(el).color
      );

      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  // ========================================
  // Responsive Tests
  // ========================================

  test('should render at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const calendar = page.locator('.ux-calendar-view').first();
    await expect(calendar).toBeVisible();

    // Grid should still be visible but adjusted
    const grid = page.locator('.ux-calendar-view__grid').first();
    await expect(grid).toBeVisible();
  });

  test('should render at tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const calendar = page.locator('.ux-calendar-view').first();
    await expect(calendar).toBeVisible();
  });

  test('should render at desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    const calendar = page.locator('.ux-calendar-view').first();
    await expect(calendar).toBeVisible();
  });
});
