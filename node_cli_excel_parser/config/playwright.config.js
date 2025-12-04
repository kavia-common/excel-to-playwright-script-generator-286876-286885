const { defineConfig } = require('@playwright/test');

/**
 * Playwright configuration for E2E tests.
 * - baseURL can be overridden via PW_BASE_URL env var
 * - headless mode can be overridden via PW_HEADLESS env var (true/false)
 */
module.exports = defineConfig({
  testDir: '../tests/e2e',
  timeout: 30 * 1000,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: process.env.PW_BASE_URL || 'https://example.com',
    headless: String(process.env.PW_HEADLESS || 'true') === 'true',
    trace: 'retain-on-failure',
  },
});
