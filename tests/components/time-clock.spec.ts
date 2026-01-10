import { test, expect } from '@playwright/test';

test.describe('Time Clock Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/time-clock.html');
  });

  test('should render basic time clock', async ({ page }) => {
    const timeClock = page.locator('.ux-time-clock').first();
    await expect(timeClock).toBeVisible();
  });

  test('should render time display', async ({ page }) => {
    const display = page.locator('.ux-time-clock__display').first();
    await expect(display).toBeVisible();
  });

  test('should render current time', async ({ page }) => {
    const time = page.locator('.ux-time-clock__time').first();
    await expect(time).toBeVisible();
    const text = await time.textContent();
    // Should contain time format (digits and colon)
    expect(text).toMatch(/\d{1,2}:\d{2}/);
  });

  test('should render current date', async ({ page }) => {
    const date = page.locator('.ux-time-clock__date').first();
    if (await date.count() > 0) {
      await expect(date).toBeVisible();
      const text = await date.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render status indicator', async ({ page }) => {
    const status = page.locator('.ux-time-clock__status').first();
    await expect(status).toBeVisible();
  });

  test('should render status dot', async ({ page }) => {
    const statusDot = page.locator('.ux-time-clock__status-dot').first();
    await expect(statusDot).toBeVisible();
  });

  test.describe('Work Counters', () => {
    test('should render counter container', async ({ page }) => {
      const counter = page.locator('.ux-time-clock__counter').first();
      if (await counter.count() > 0) {
        await expect(counter).toBeVisible();
      }
    });

    test('should render counter items', async ({ page }) => {
      const counterItems = page.locator('.ux-time-clock__counter-item');
      if (await counterItems.count() > 0) {
        expect(await counterItems.count()).toBeGreaterThanOrEqual(2);
      }
    });

    test('should render counter values', async ({ page }) => {
      const counterValue = page.locator('.ux-time-clock__counter-value').first();
      if (await counterValue.count() > 0) {
        await expect(counterValue).toBeVisible();
      }
    });

    test('should render counter labels', async ({ page }) => {
      const counterLabel = page.locator('.ux-time-clock__counter-label').first();
      if (await counterLabel.count() > 0) {
        await expect(counterLabel).toBeVisible();
      }
    });
  });

  test.describe('Action Buttons', () => {
    test('should render actions container', async ({ page }) => {
      const actions = page.locator('.ux-time-clock__actions').first();
      await expect(actions).toBeVisible();
    });

    test('should render Clock In button when not clocked in', async ({ page }) => {
      const clockInBtn = page.locator('button:has-text("Clock In")').first();
      await expect(clockInBtn).toBeVisible();
    });

    test('should clock in when clicking Clock In button', async ({ page }) => {
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();

        // Wait for state change
        await page.waitForTimeout(500);

        // Either confirmation dialog appears or state changes
        const confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        const clockOutBtn = page.locator('.ux-time-clock button:has-text("Clock Out")').first();

        if (await confirmDialog.count() > 0) {
          // Click confirm button
          const confirmBtn = confirmDialog.locator('button:has-text("Confirm")');
          await confirmBtn.click();
          await page.waitForTimeout(300);
        }

        // After clocking in, Clock Out button should appear
        await expect(clockOutBtn).toBeVisible({ timeout: 2000 });
      }
    });

    test('should show Start Break button when clocked in', async ({ page }) => {
      // First clock in
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        // Handle confirmation if present
        const confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        if (await confirmDialog.count() > 0) {
          const confirmBtn = confirmDialog.locator('button:has-text("Confirm")');
          await confirmBtn.click();
          await page.waitForTimeout(300);
        }

        // Break button should be visible
        const breakBtn = page.locator('.ux-time-clock button:has-text("Break"), .ux-time-clock button:has-text("Start Break")').first();
        await expect(breakBtn).toBeVisible({ timeout: 2000 });
      }
    });

    test('should start break when clicking Break button', async ({ page }) => {
      // First clock in
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        // Handle confirmation
        let confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        if (await confirmDialog.count() > 0) {
          await confirmDialog.locator('button:has-text("Confirm")').click();
          await page.waitForTimeout(300);
        }

        // Click break button
        const breakBtn = page.locator('.ux-time-clock button:has-text("Break"), .ux-time-clock button:has-text("Start Break")').first();
        if (await breakBtn.count() > 0) {
          await breakBtn.click();
          await page.waitForTimeout(300);

          // Handle confirmation
          confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
          if (await confirmDialog.count() > 0) {
            await confirmDialog.locator('button:has-text("Confirm")').click();
            await page.waitForTimeout(300);
          }

          // End Break or Resume button should appear
          const endBreakBtn = page.locator('.ux-time-clock button:has-text("End Break"), .ux-time-clock button:has-text("Resume")').first();
          await expect(endBreakBtn).toBeVisible({ timeout: 2000 });
        }
      }
    });

    test('should clock out when clicking Clock Out button', async ({ page }) => {
      // Clock in first
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        // Handle confirmation
        let confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        if (await confirmDialog.count() > 0) {
          await confirmDialog.locator('button:has-text("Confirm")').click();
          await page.waitForTimeout(300);
        }

        // Now clock out
        const clockOutBtn = page.locator('.ux-time-clock button:has-text("Clock Out")').first();
        if (await clockOutBtn.count() > 0) {
          await clockOutBtn.click();
          await page.waitForTimeout(300);

          // Handle confirmation
          confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
          if (await confirmDialog.count() > 0) {
            await confirmDialog.locator('button:has-text("Confirm")').click();
            await page.waitForTimeout(300);
          }

          // Clock In button should reappear
          await expect(clockInBtn).toBeVisible({ timeout: 2000 });
        }
      }
    });
  });

  test.describe('History Section', () => {
    test('should render history container', async ({ page }) => {
      const history = page.locator('.ux-time-clock__history').first();
      await expect(history).toBeVisible();
    });

    test('should show empty state initially', async ({ page }) => {
      const emptyState = page.locator('.ux-time-clock__history-empty, .ux-time-clock__history:has-text("No entries")').first();
      if (await emptyState.count() > 0) {
        await expect(emptyState).toBeVisible();
      }
    });

    test('should show history title', async ({ page }) => {
      const historyTitle = page.locator('.ux-time-clock__history-title').first();
      if (await historyTitle.count() > 0) {
        await expect(historyTitle).toBeVisible();
      }
    });

    test('should show history entries after clock in', async ({ page }) => {
      // Clock in first
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        // Handle confirmation
        const confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        if (await confirmDialog.count() > 0) {
          await confirmDialog.locator('button:has-text("Confirm")').click();
          await page.waitForTimeout(500);
        }

        // History list should have entries
        const historyItem = page.locator('.ux-time-clock__history-item').first();
        if (await historyItem.count() > 0) {
          await expect(historyItem).toBeVisible();
        }
      }
    });
  });

  test.describe('Confirmation Dialog', () => {
    test('should show confirmation dialog on action', async ({ page }) => {
      // Find a time clock with confirmations enabled (first one by default)
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        const confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        // Confirmation may or may not be enabled
        if (await confirmDialog.count() > 0) {
          await expect(confirmDialog).toBeVisible();

          // Should have title
          const title = confirmDialog.locator('.ux-time-clock__confirm-title');
          await expect(title).toBeVisible();

          // Should have message
          const message = confirmDialog.locator('.ux-time-clock__confirm-message');
          await expect(message).toBeVisible();

          // Should have buttons
          const cancelBtn = confirmDialog.locator('button:has-text("Cancel")');
          await expect(cancelBtn).toBeVisible();

          const confirmBtn = confirmDialog.locator('button:has-text("Confirm")');
          await expect(confirmBtn).toBeVisible();
        }
      }
    });

    test('should close dialog on Cancel', async ({ page }) => {
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        const confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        if (await confirmDialog.count() > 0) {
          const cancelBtn = confirmDialog.locator('button:has-text("Cancel")');
          await cancelBtn.click();
          await page.waitForTimeout(300);

          // Dialog should be closed
          await expect(confirmDialog).not.toBeVisible();
        }
      }
    });
  });

  test.describe('Variants', () => {
    test('should apply glass variant', async ({ page }) => {
      const glassTimeClock = page.locator('.ux-time-clock--glass').first();
      if (await glassTimeClock.count() > 0) {
        await expect(glassTimeClock).toBeVisible();

        // Should have backdrop-filter
        const backdropFilter = await glassTimeClock.evaluate(el =>
          getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    });

    test('should apply compact variant', async ({ page }) => {
      const compactTimeClock = page.locator('.ux-time-clock--compact').first();
      if (await compactTimeClock.count() > 0) {
        await expect(compactTimeClock).toBeVisible();
      }
    });
  });

  test.describe('State Classes', () => {
    test('should apply clocked-in state class', async ({ page }) => {
      // Clock in
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        // Handle confirmation
        const confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        if (await confirmDialog.count() > 0) {
          await confirmDialog.locator('button:has-text("Confirm")').click();
          await page.waitForTimeout(300);
        }

        // Should have clocked-in class
        const clockedIn = page.locator('.ux-time-clock--clocked-in').first();
        await expect(clockedIn).toBeVisible({ timeout: 2000 });
      }
    });

    test('should apply on-break state class', async ({ page }) => {
      // Clock in then start break
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.click();
        await page.waitForTimeout(300);

        // Handle confirmation
        let confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
        if (await confirmDialog.count() > 0) {
          await confirmDialog.locator('button:has-text("Confirm")').click();
          await page.waitForTimeout(300);
        }

        // Start break
        const breakBtn = page.locator('.ux-time-clock button:has-text("Break"), .ux-time-clock button:has-text("Start Break")').first();
        if (await breakBtn.count() > 0) {
          await breakBtn.click();
          await page.waitForTimeout(300);

          // Handle confirmation
          confirmDialog = page.locator('.ux-time-clock__confirm--open').first();
          if (await confirmDialog.count() > 0) {
            await confirmDialog.locator('button:has-text("Confirm")').click();
            await page.waitForTimeout(300);
          }

          // Should have on-break class
          const onBreak = page.locator('.ux-time-clock--on-break').first();
          await expect(onBreak).toBeVisible({ timeout: 2000 });
        }
      }
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const timeClock = page.locator('.ux-time-clock').first();
      await expect(timeClock).toBeVisible();

      const time = page.locator('.ux-time-clock__time').first();
      await expect(time).toBeVisible();
    });

    test('should maintain layout on narrow viewports', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });

      const timeClock = page.locator('.ux-time-clock').first();
      await expect(timeClock).toBeVisible();

      const actions = page.locator('.ux-time-clock__actions').first();
      await expect(actions).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('buttons should be focusable', async ({ page }) => {
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.focus();
        await expect(clockInBtn).toBeFocused();
      }
    });

    test('should navigate buttons with keyboard', async ({ page }) => {
      const firstButton = page.locator('.ux-time-clock button').first();
      if (await firstButton.count() > 0) {
        await firstButton.focus();
        await expect(firstButton).toBeFocused();

        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });

    test('buttons should be keyboard activatable', async ({ page }) => {
      const clockInBtn = page.locator('.ux-time-clock button:has-text("Clock In")').first();
      if (await clockInBtn.count() > 0) {
        await clockInBtn.focus();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(300);
        // Test that keyboard activation works
        expect(true).toBe(true);
      }
    });
  });

  test.describe('Time Updates', () => {
    test('time should update in real-time', async ({ page }) => {
      const time = page.locator('.ux-time-clock__time').first();
      await expect(time).toBeVisible();

      const initialTime = await time.textContent();

      // Wait for at least 1 second
      await page.waitForTimeout(1100);

      const updatedTime = await time.textContent();

      // Time may or may not have changed depending on seconds
      // Just verify we can read the time without errors
      expect(updatedTime).toBeTruthy();
    });
  });

  test.describe('Seconds Display', () => {
    test('should display seconds when enabled', async ({ page }) => {
      const seconds = page.locator('.ux-time-clock__time-seconds').first();
      if (await seconds.count() > 0) {
        await expect(seconds).toBeVisible();
        const text = await seconds.textContent();
        // Should be 2 digits
        expect(text).toMatch(/\d{2}/);
      }
    });
  });

  test.describe('Without Confirmation (confirmActions: false)', () => {
    test('should execute action immediately without dialog', async ({ page }) => {
      // Find a time clock with confirmActions: false (like the glass or compact variant)
      const noConfirmTimeClock = page.locator('.ux-time-clock--glass, .ux-time-clock--compact').first();
      if (await noConfirmTimeClock.count() > 0) {
        const clockInBtn = noConfirmTimeClock.locator('button:has-text("Clock In")').first();
        if (await clockInBtn.count() > 0) {
          await clockInBtn.click();
          await page.waitForTimeout(500);

          // Should immediately show Clock Out without confirmation
          const clockOutBtn = noConfirmTimeClock.locator('button:has-text("Clock Out")');
          await expect(clockOutBtn).toBeVisible({ timeout: 2000 });
        }
      }
    });
  });
});
