import { test, expect } from '@playwright/test';

test.describe('Event Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/event-card.html');
  });

  test('should render event card', async ({ page }) => {
    const card = page.locator('.ux-event-card').first();
    await expect(card).toBeVisible();
  });

  test('should display event title', async ({ page }) => {
    const title = page.locator('.ux-event-card__title').first();
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test('should display event time', async ({ page }) => {
    const time = page.locator('.ux-event-card__time').first();
    if (await time.count() > 0) {
      await expect(time).toBeVisible();
    }
  });

  test('should display event location', async ({ page }) => {
    const location = page.locator('.ux-event-card__location').first();
    if (await location.count() > 0) {
      await expect(location).toBeVisible();
    }
  });

  test('should apply meeting category', async ({ page }) => {
    const meeting = page.locator('.ux-event-card--meeting').first();
    if (await meeting.count() > 0) {
      await expect(meeting).toBeVisible();
    }
  });

  test('should apply work category', async ({ page }) => {
    const work = page.locator('.ux-event-card--work').first();
    if (await work.count() > 0) {
      await expect(work).toBeVisible();
    }
  });

  test('should apply personal category', async ({ page }) => {
    const personal = page.locator('.ux-event-card--personal').first();
    if (await personal.count() > 0) {
      await expect(personal).toBeVisible();
    }
  });

  test('should apply deadline category', async ({ page }) => {
    const deadline = page.locator('.ux-event-card--deadline').first();
    if (await deadline.count() > 0) {
      await expect(deadline).toBeVisible();
    }
  });

  test('should render attendees', async ({ page }) => {
    const attendees = page.locator('.ux-event-card__attendees').first();
    if (await attendees.count() > 0) {
      await expect(attendees).toBeVisible();
    }
  });

  test('should render avatar stack', async ({ page }) => {
    const avatarStack = page.locator('.ux-event-card__attendees-stack').first();
    if (await avatarStack.count() > 0) {
      const avatars = avatarStack.locator('.ux-avatar');
      expect(await avatars.count()).toBeGreaterThan(0);
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-event-card--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply all-day variant', async ({ page }) => {
    const allDay = page.locator('.ux-event-card--all-day').first();
    if (await allDay.count() > 0) {
      await expect(allDay).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-event-card--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should render footer with actions', async ({ page }) => {
    const footer = page.locator('.ux-event-card__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should display RSVP status', async ({ page }) => {
    const rsvp = page.locator('.ux-event-card__rsvp').first();
    if (await rsvp.count() > 0) {
      await expect(rsvp).toBeVisible();
    }
  });

  test('should have colored left border for category', async ({ page }) => {
    const card = page.locator('.ux-event-card').first();
    const borderLeft = await card.evaluate(el =>
      getComputedStyle(el).borderLeftWidth
    );
    expect(parseInt(borderLeft)).toBeGreaterThan(0);
  });
});
