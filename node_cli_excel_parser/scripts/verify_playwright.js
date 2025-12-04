#!/usr/bin/env node
/**
 * Simple Playwright sanity check.
 * Launches Chromium headless, opens about:blank, prints the title, and exits.
 */
(async () => {
  try {
    // Prefer core 'playwright' as requested
    const { chromium } = require('playwright');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('about:blank');
    const title = await page.title();
    console.log(`Playwright verification succeeded. Page title: "${title}"`);
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('Playwright verification failed:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();
