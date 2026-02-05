import { defineConfig, devices } from '@playwright/test';

/**
 * UX Component Library - Playwright Test Configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  /* Shared settings for all projects */
  use: {
    /* Base URL for the docs server */
    baseURL: 'http://localhost',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers and devices */
  projects: [
    // ==========================================================
    // Desktop Browsers
    // ==========================================================
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // ==========================================================
    // Tablet Devices
    // ==========================================================
    {
      name: 'ipad-portrait',
      use: {
        ...devices['iPad (gen 7)'],
        viewport: { width: 810, height: 1080 },
      },
    },
    {
      name: 'ipad-landscape',
      use: {
        ...devices['iPad (gen 7) landscape'],
        viewport: { width: 1080, height: 810 },
      },
    },
    {
      name: 'ipad-pro',
      use: {
        ...devices['iPad Pro 11'],
        viewport: { width: 834, height: 1194 },
      },
    },
    {
      name: 'android-tablet',
      use: {
        viewport: { width: 800, height: 1280 },
        userAgent: 'Mozilla/5.0 (Linux; Android 11; Galaxy Tab S7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36',
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },

    // ==========================================================
    // Mobile Devices
    // ==========================================================
    {
      name: 'iphone-14',
      use: {
        ...devices['iPhone 14'],
      },
    },
    {
      name: 'iphone-14-pro-max',
      use: {
        ...devices['iPhone 14 Pro Max'],
      },
    },
    {
      name: 'pixel-7',
      use: {
        ...devices['Pixel 7'],
      },
    },
    {
      name: 'samsung-galaxy-s23',
      use: {
        viewport: { width: 360, height: 780 },
        userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  /* Run local dev server before starting the tests */
  /* No webServer: tests serve docs assets from disk via request routing */
});
