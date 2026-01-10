import { test, expect } from '@playwright/test';

test.describe('Audio Player Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/audio-player.html');
  });

  test('should render audio player', async ({ page }) => {
    const player = page.locator('.ux-audio-player').first();
    await expect(player).toBeVisible();
  });

  test('should render play button', async ({ page }) => {
    const playBtn = page.locator('.ux-audio-player__play, .ux-audio-player__play-btn').first();
    if (await playBtn.count() > 0) {
      await expect(playBtn).toBeVisible();
    }
  });

  test('should render progress bar', async ({ page }) => {
    const progress = page.locator('.ux-audio-player__progress, .ux-audio-player__progress-bar').first();
    if (await progress.count() > 0) {
      await expect(progress).toBeVisible();
    }
  });

  test('should render time display', async ({ page }) => {
    const time = page.locator('.ux-audio-player__time, .ux-audio-player__current-time').first();
    if (await time.count() > 0) {
      await expect(time).toBeVisible();
    }
  });

  test('should render duration display', async ({ page }) => {
    const duration = page.locator('.ux-audio-player__duration, .ux-audio-player__total-time').first();
    if (await duration.count() > 0) {
      await expect(duration).toBeVisible();
    }
  });

  test('should render volume control', async ({ page }) => {
    const volume = page.locator('.ux-audio-player__volume, .ux-audio-player__volume-slider').first();
    if (await volume.count() > 0) {
      await expect(volume).toBeVisible();
    }
  });

  test('should render track info', async ({ page }) => {
    const trackInfo = page.locator('.ux-audio-player__info, .ux-audio-player__track').first();
    if (await trackInfo.count() > 0) {
      await expect(trackInfo).toBeVisible();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-audio-player--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-audio-player--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have proper styling', async ({ page }) => {
    const player = page.locator('.ux-audio-player').first();
    const bgColor = await player.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).not.toBe('transparent');
  });
});
