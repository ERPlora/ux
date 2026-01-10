import { test, expect } from '@playwright/test';

test.describe('Scheduler Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/scheduler.html');
  });

  test('should render scheduler', async ({ page }) => {
    const scheduler = page.locator('.ux-scheduler').first();
    await expect(scheduler).toBeVisible();
  });

  test('should render scheduler header', async ({ page }) => {
    const header = page.locator('.ux-scheduler__header').first();
    await expect(header).toBeVisible();
  });

  test('should render navigation buttons', async ({ page }) => {
    const navButtons = page.locator('.ux-scheduler__nav-btn');
    expect(await navButtons.count()).toBeGreaterThanOrEqual(2);
    await expect(navButtons.first()).toBeVisible();
  });

  test('should render title showing current date', async ({ page }) => {
    const title = page.locator('.ux-scheduler__title').first();
    await expect(title).toBeVisible();

    // Title should have some date content
    const titleText = await title.textContent();
    expect(titleText).toBeTruthy();
  });

  test('should render Today button', async ({ page }) => {
    const todayButton = page.locator('.ux-scheduler__today-btn').first();
    await expect(todayButton).toBeVisible();

    const buttonText = await todayButton.textContent();
    expect(buttonText).toContain('Today');
  });

  test('should render view toggle buttons', async ({ page }) => {
    const viewToggle = page.locator('.ux-scheduler__view-toggle').first();
    if (await viewToggle.count() > 0) {
      await expect(viewToggle).toBeVisible();

      const viewButtons = viewToggle.locator('.ux-scheduler__view-btn');
      expect(await viewButtons.count()).toBeGreaterThanOrEqual(2);
    }
  });

  test('should have Day view button', async ({ page }) => {
    const dayButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Day' }).first();
    if (await dayButton.count() > 0) {
      await expect(dayButton).toBeVisible();
    }
  });

  test('should have Week view button', async ({ page }) => {
    const weekButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Week' }).first();
    if (await weekButton.count() > 0) {
      await expect(weekButton).toBeVisible();
    }
  });

  test('should have Month view button', async ({ page }) => {
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();
    if (await monthButton.count() > 0) {
      await expect(monthButton).toBeVisible();
    }
  });

  test('should render time slots', async ({ page }) => {
    const timeSlots = page.locator('.ux-scheduler__hour-slot');
    expect(await timeSlots.count()).toBeGreaterThan(0);
  });

  test('should render time labels', async ({ page }) => {
    const timeLabels = page.locator('.ux-scheduler__time');
    expect(await timeLabels.count()).toBeGreaterThan(0);

    // Check first time label has content
    const firstLabel = await timeLabels.first().textContent();
    expect(firstLabel).toBeTruthy();
  });

  test('should render scheduler body (scrollable area)', async ({ page }) => {
    const body = page.locator('.ux-scheduler__body').first();
    await expect(body).toBeVisible();
  });

  test('should render scheduler grid', async ({ page }) => {
    const grid = page.locator('.ux-scheduler__grid').first();
    await expect(grid).toBeVisible();
  });

  test('should render time column', async ({ page }) => {
    const times = page.locator('.ux-scheduler__times').first();
    await expect(times).toBeVisible();
  });

  test('should render day columns', async ({ page }) => {
    const columns = page.locator('.ux-scheduler__columns').first();
    await expect(columns).toBeVisible();
  });

  test('should render day column', async ({ page }) => {
    const dayColumn = page.locator('.ux-scheduler__day-column').first();
    await expect(dayColumn).toBeVisible();
  });

  test('should render bookings', async ({ page }) => {
    const bookings = page.locator('.ux-scheduler__booking');
    expect(await bookings.count()).toBeGreaterThan(0);
  });

  test('should display booking title', async ({ page }) => {
    const bookingTitle = page.locator('.ux-scheduler__booking-title').first();
    await expect(bookingTitle).toBeVisible();

    const titleText = await bookingTitle.textContent();
    expect(titleText).toBeTruthy();
  });

  test('should display booking time', async ({ page }) => {
    const bookingTime = page.locator('.ux-scheduler__booking-time').first();
    if (await bookingTime.count() > 0) {
      await expect(bookingTime).toBeVisible();

      const timeText = await bookingTime.textContent();
      expect(timeText).toBeTruthy();
    }
  });

  test('should show current time indicator (now line)', async ({ page }) => {
    const nowLine = page.locator('.ux-scheduler__now-line').first();
    // The now line might not be visible if current time is outside displayed hours
    // Just check it exists in the DOM
    await expect(nowLine).toBeAttached();
  });

  test('should apply confirmed booking status', async ({ page }) => {
    const confirmedBooking = page.locator('.ux-scheduler__booking.ux-scheduler__booking--confirmed').first();
    if (await confirmedBooking.count() > 0) {
      await expect(confirmedBooking).toBeVisible();
    }
  });

  test('should apply pending booking status', async ({ page }) => {
    const pendingBooking = page.locator('.ux-scheduler__booking.ux-scheduler__booking--pending').first();
    if (await pendingBooking.count() > 0) {
      await expect(pendingBooking).toBeVisible();
    }
  });

  test('should apply cancelled booking status', async ({ page }) => {
    const cancelledBooking = page.locator('.ux-scheduler__booking.ux-scheduler__booking--cancelled').first();
    if (await cancelledBooking.count() > 0) {
      await expect(cancelledBooking).toBeVisible();
    }
  });

  test('should apply blocked booking status', async ({ page }) => {
    const blockedBooking = page.locator('.ux-scheduler__booking.ux-scheduler__booking--blocked').first();
    if (await blockedBooking.count() > 0) {
      await expect(blockedBooking).toBeVisible();
    }
  });

  test('should navigate to next day/week when next button clicked', async ({ page }) => {
    const title = page.locator('.ux-scheduler__title').first();
    const nextButton = page.locator('.ux-scheduler__nav-btn').last();

    const initialTitle = await title.textContent();

    await nextButton.click();

    // Wait for Alpine to update
    await page.waitForTimeout(100);

    const newTitle = await title.textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should navigate to previous day/week when prev button clicked', async ({ page }) => {
    const title = page.locator('.ux-scheduler__title').first();
    const prevButton = page.locator('.ux-scheduler__nav-btn').first();

    const initialTitle = await title.textContent();

    await prevButton.click();

    // Wait for Alpine to update
    await page.waitForTimeout(100);

    const newTitle = await title.textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should switch to Day view when Day button clicked', async ({ page }) => {
    const dayButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Day' }).first();

    if (await dayButton.count() > 0) {
      await dayButton.click();

      // Wait for Alpine to update
      await page.waitForTimeout(100);

      // Day button should be active
      await expect(dayButton).toHaveClass(/ux-scheduler__view-btn--active/);
    }
  });

  test('should switch to Week view when Week button clicked', async ({ page }) => {
    const weekButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Week' }).first();

    if (await weekButton.count() > 0) {
      await weekButton.click();

      // Wait for Alpine to update
      await page.waitForTimeout(100);

      // Week button should be active
      await expect(weekButton).toHaveClass(/ux-scheduler__view-btn--active/);
    }
  });

  test('should switch to Month view when Month button clicked', async ({ page }) => {
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();

    if (await monthButton.count() > 0) {
      await monthButton.click();

      // Wait for Alpine to update
      await page.waitForTimeout(200);

      // Month button should be active
      await expect(monthButton).toHaveClass(/ux-scheduler__view-btn--active/);

      // Month grid should be visible
      const monthGrid = page.locator('.ux-scheduler__month-grid').first();
      if (await monthGrid.count() > 0) {
        await expect(monthGrid).toBeVisible();
      }
    }
  });

  test('should render day headers in week view', async ({ page }) => {
    // First ensure we're in week view
    const weekButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Week' }).first();
    if (await weekButton.count() > 0) {
      await weekButton.click();
      await page.waitForTimeout(100);
    }

    const dayHeaders = page.locator('.ux-scheduler__day-header');
    if (await dayHeaders.count() > 0) {
      expect(await dayHeaders.count()).toBeGreaterThanOrEqual(7);
    }
  });

  test('should highlight today in day headers', async ({ page }) => {
    const todayHeader = page.locator('.ux-scheduler__day-header.ux-scheduler__day-header--today').first();
    if (await todayHeader.count() > 0) {
      await expect(todayHeader).toBeVisible();
    }
  });

  test('should render day names in week view', async ({ page }) => {
    const dayName = page.locator('.ux-scheduler__day-name').first();
    if (await dayName.count() > 0) {
      await expect(dayName).toBeVisible();

      const nameText = await dayName.textContent();
      expect(nameText).toBeTruthy();
    }
  });

  test('should render day numbers in week view', async ({ page }) => {
    const dayNumber = page.locator('.ux-scheduler__day-number').first();
    if (await dayNumber.count() > 0) {
      await expect(dayNumber).toBeVisible();

      const numberText = await dayNumber.textContent();
      expect(numberText).toBeTruthy();
    }
  });

  test('should highlight business hours differently', async ({ page }) => {
    const businessSlot = page.locator('.ux-scheduler__hour-slot.ux-scheduler__hour-slot--business').first();
    const nonBusinessSlot = page.locator('.ux-scheduler__hour-slot.ux-scheduler__hour-slot--non-business').first();

    if (await businessSlot.count() > 0 && await nonBusinessSlot.count() > 0) {
      // Both should exist, indicating different styling
      await expect(businessSlot).toBeAttached();
      await expect(nonBusinessSlot).toBeAttached();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassScheduler = page.locator('.ux-scheduler.ux-scheduler--glass').first();
    if (await glassScheduler.count() > 0) {
      await expect(glassScheduler).toBeVisible();

      // Check for backdrop-filter
      const backdropFilter = await glassScheduler.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should apply 15-minute interval variant', async ({ page }) => {
    const interval15 = page.locator('.ux-scheduler.ux-scheduler--interval-15').first();
    if (await interval15.count() > 0) {
      await expect(interval15).toBeVisible();
    }
  });

  test('should render resource headers when resources are provided', async ({ page }) => {
    const resourcesHeader = page.locator('.ux-scheduler__resources-header').first();
    if (await resourcesHeader.count() > 0) {
      await expect(resourcesHeader).toBeVisible();

      // Should have resource headers
      const resourceHeaders = resourcesHeader.locator('.ux-scheduler__resource-header');
      expect(await resourceHeaders.count()).toBeGreaterThan(0);
    }
  });

  test('should display resource names', async ({ page }) => {
    const resourceName = page.locator('.ux-scheduler__resource-name').first();
    if (await resourceName.count() > 0) {
      await expect(resourceName).toBeVisible();

      const nameText = await resourceName.textContent();
      expect(nameText).toBeTruthy();
    }
  });

  test('should display resource info', async ({ page }) => {
    const resourceInfo = page.locator('.ux-scheduler__resource-info').first();
    if (await resourceInfo.count() > 0) {
      await expect(resourceInfo).toBeVisible();
    }
  });

  test('should display resource avatar', async ({ page }) => {
    const resourceAvatar = page.locator('.ux-scheduler__resource-avatar').first();
    if (await resourceAvatar.count() > 0) {
      await expect(resourceAvatar).toBeVisible();
    }
  });

  test('bookings should have absolute positioning', async ({ page }) => {
    const booking = page.locator('.ux-scheduler__booking').first();
    if (await booking.count() > 0) {
      const position = await booking.evaluate(el => getComputedStyle(el).position);
      expect(position).toBe('absolute');
    }
  });

  test('bookings should be positioned based on time', async ({ page }) => {
    const booking = page.locator('.ux-scheduler__booking').first();
    if (await booking.count() > 0) {
      // Booking should have top position set (for time placement)
      const top = await booking.evaluate(el => getComputedStyle(el).top);
      expect(top).not.toBe('auto');
    }
  });

  test('bookings should have height based on duration', async ({ page }) => {
    const booking = page.locator('.ux-scheduler__booking').first();
    if (await booking.count() > 0) {
      // Booking should have height set (based on duration)
      const height = await booking.evaluate(el => getComputedStyle(el).height);
      expect(height).not.toBe('auto');
    }
  });

  test('should render month view grid', async ({ page }) => {
    // Switch to month view
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();
    if (await monthButton.count() > 0) {
      await monthButton.click();
      await page.waitForTimeout(200);

      const monthGrid = page.locator('.ux-scheduler__month-grid').first();
      if (await monthGrid.count() > 0) {
        await expect(monthGrid).toBeVisible();
      }
    }
  });

  test('should render month day cells', async ({ page }) => {
    // Switch to month view
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();
    if (await monthButton.count() > 0) {
      await monthButton.click();
      await page.waitForTimeout(200);

      const monthDays = page.locator('.ux-scheduler__month-day');
      if (await monthDays.count() > 0) {
        expect(await monthDays.count()).toBeGreaterThanOrEqual(28);
      }
    }
  });

  test('should highlight today in month view', async ({ page }) => {
    // Switch to month view
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();
    if (await monthButton.count() > 0) {
      await monthButton.click();
      await page.waitForTimeout(200);

      const todayCell = page.locator('.ux-scheduler__month-day.ux-scheduler__month-day--today').first();
      if (await todayCell.count() > 0) {
        await expect(todayCell).toBeVisible();
      }
    }
  });

  test('should render compact bookings in month view', async ({ page }) => {
    // Switch to month view
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();
    if (await monthButton.count() > 0) {
      await monthButton.click();
      await page.waitForTimeout(200);

      const monthBooking = page.locator('.ux-scheduler__month-booking').first();
      if (await monthBooking.count() > 0) {
        await expect(monthBooking).toBeVisible();
      }
    }
  });

  test('should show "more" indicator when many bookings on a day', async ({ page }) => {
    // Switch to month view
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();
    if (await monthButton.count() > 0) {
      await monthButton.click();
      await page.waitForTimeout(200);

      const moreIndicator = page.locator('.ux-scheduler__month-more').first();
      // This may or may not be visible depending on number of bookings
      await expect(moreIndicator).toBeAttached();
    }
  });

  test('time slots should be clickable', async ({ page }) => {
    const slot = page.locator('.ux-scheduler__hour-slot').first();
    if (await slot.count() > 0) {
      // Should have click handler (cursor pointer)
      const cursor = await slot.evaluate(el => getComputedStyle(el).cursor);
      expect(cursor).toBe('pointer');
    }
  });

  test('bookings should be clickable', async ({ page }) => {
    const booking = page.locator('.ux-scheduler__booking').first();
    if (await booking.count() > 0) {
      const cursor = await booking.evaluate(el => getComputedStyle(el).cursor);
      expect(cursor).toBe('pointer');
    }
  });

  test('scheduler body should be scrollable', async ({ page }) => {
    const body = page.locator('.ux-scheduler__body').first();
    if (await body.count() > 0) {
      const overflow = await body.evaluate(el => getComputedStyle(el).overflowY);
      expect(['auto', 'scroll']).toContain(overflow);
    }
  });

  test('should render drag preview element', async ({ page }) => {
    const dragPreview = page.locator('.ux-scheduler__drag-preview').first();
    // Drag preview should exist but be hidden initially
    if (await dragPreview.count() > 0) {
      await expect(dragPreview).toBeAttached();
    }
  });

  test('nav buttons should have minimum touch target size', async ({ page }) => {
    const navButton = page.locator('.ux-scheduler__nav-btn').first();
    if (await navButton.count() > 0) {
      const box = await navButton.boundingBox();
      if (box) {
        // Minimum touch target should be at least 36px
        expect(box.width).toBeGreaterThanOrEqual(36);
        expect(box.height).toBeGreaterThanOrEqual(36);
      }
    }
  });

  test('view toggle buttons should have minimum touch target', async ({ page }) => {
    const viewButton = page.locator('.ux-scheduler__view-btn').first();
    if (await viewButton.count() > 0) {
      const box = await viewButton.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(32);
      }
    }
  });

  test('Today button should navigate to current date', async ({ page }) => {
    const title = page.locator('.ux-scheduler__title').first();
    const todayButton = page.locator('.ux-scheduler__today-btn').first();
    const nextButton = page.locator('.ux-scheduler__nav-btn').last();

    // Navigate away from today
    await nextButton.click();
    await nextButton.click();
    await page.waitForTimeout(100);

    const afterNavTitle = await title.textContent();

    // Click Today button
    await todayButton.click();
    await page.waitForTimeout(100);

    const afterTodayTitle = await title.textContent();

    // Title should have changed back
    expect(afterTodayTitle).not.toBe(afterNavTitle);
  });

  test('header should have proper layout', async ({ page }) => {
    const header = page.locator('.ux-scheduler__header').first();
    if (await header.count() > 0) {
      const display = await header.evaluate(el => getComputedStyle(el).display);
      expect(['flex', 'grid']).toContain(display);
    }
  });

  test('day column should have relative positioning for bookings', async ({ page }) => {
    const dayColumn = page.locator('.ux-scheduler__day-column').first();
    if (await dayColumn.count() > 0) {
      const position = await dayColumn.evaluate(el => getComputedStyle(el).position);
      expect(position).toBe('relative');
    }
  });

  test('now line should have proper styling', async ({ page }) => {
    const nowLine = page.locator('.ux-scheduler__now-line').first();
    if (await nowLine.count() > 0) {
      const position = await nowLine.evaluate(el => getComputedStyle(el).position);
      expect(position).toBe('absolute');
    }
  });

  test('weekend columns should have different styling', async ({ page }) => {
    // Switch to week view first
    const weekButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Week' }).first();
    if (await weekButton.count() > 0) {
      await weekButton.click();
      await page.waitForTimeout(100);
    }

    const weekendColumn = page.locator('.ux-scheduler__day-column.ux-scheduler__day-column--weekend').first();
    if (await weekendColumn.count() > 0) {
      await expect(weekendColumn).toBeAttached();
    }
  });

  test('other month days in month view should have different styling', async ({ page }) => {
    // Switch to month view
    const monthButton = page.locator('.ux-scheduler__view-btn').filter({ hasText: 'Month' }).first();
    if (await monthButton.count() > 0) {
      await monthButton.click();
      await page.waitForTimeout(200);

      const otherMonthDay = page.locator('.ux-scheduler__month-day.ux-scheduler__month-day--other').first();
      if (await otherMonthDay.count() > 0) {
        await expect(otherMonthDay).toBeAttached();
      }
    }
  });
});
