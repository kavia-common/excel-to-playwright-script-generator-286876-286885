const { test, expect } = require('@playwright/test');

test('opens example.com and checks title contains Example', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/i);
});
