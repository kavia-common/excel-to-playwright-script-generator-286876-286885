/**
 * Core browser actions implemented with Playwright's core API.
 * We intentionally use 'playwright' package so this can be reused from CLI or other frontends.
 */

const { chromium, firefox, webkit } = require('playwright');

/**
 * Map of browser names to launchers.
 */
const BROWSERS = { chromium, firefox, webkit };

/**
 * PUBLIC_INTERFACE
 * Open a browser and create a fresh context/page.
 * @param {object} [opts]
 * @param {'chromium'|'firefox'|'webkit'} [opts.browserName='chromium']
 * @param {boolean} [opts.headless=true]
 * @returns {Promise<{browser:any, context:any, page:any}>}
 */
async function openBrowser(opts = {}) {
  const browserName = opts.browserName || 'chromium';
  const headless = typeof opts.headless === 'boolean' ? opts.headless : true;

  const launcher = BROWSERS[browserName];
  if (!launcher) {
    throw new Error(`Unsupported browser: ${browserName}`);
  }
  const browser = await launcher.launch({ headless });
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}

/**
 * PUBLIC_INTERFACE
 * Close the browser and its context.
 * @param {{browser:any, context:any}} handles
 */
async function closeBrowser(handles) {
  if (!handles) return;
  const { context, browser } = handles;
  try {
    if (context) await context.close();
  } catch (e) {
    // ignore
  }
  if (browser) await browser.close();
}

/**
 * PUBLIC_INTERFACE
 * Navigate to a URL.
 * @param {any} page
 * @param {string} url
 * @param {object} [options]
 */
async function navigateTo(page, url, options = {}) {
  if (!page) throw new Error('navigateTo: page is required');
  if (!url) throw new Error('navigateTo: url is required');
  await page.goto(url, options);
}

/**
 * PUBLIC_INTERFACE
 * Click an element by selector.
 * @param {any} page
 * @param {string} selector
 * @param {object} [options]
 */
async function click(page, selector, options = {}) {
  if (!page) throw new Error('click: page is required');
  if (!selector) throw new Error('click: selector is required');
  await page.click(selector, options);
}

/**
 * PUBLIC_INTERFACE
 * Type text into an element.
 * @param {any} page
 * @param {string} selector
 * @param {string} value
 * @param {object} [options]
 */
async function typeText(page, selector, value, options = {}) {
  if (!page) throw new Error('typeText: page is required');
  if (!selector) throw new Error('typeText: selector is required');
  await page.fill(selector, value ?? '', options);
}

/**
 * PUBLIC_INTERFACE
 * Select an option from a <select>.
 * @param {any} page
 * @param {string} selector
 * @param {string|string[]} values
 * @param {object} [options]
 */
async function selectOption(page, selector, values, options = {}) {
  if (!page) throw new Error('selectOption: page is required');
  if (!selector) throw new Error('selectOption: selector is required');
  await page.selectOption(selector, values, options);
}

/**
 * PUBLIC_INTERFACE
 * Assert page contains text (in locator) or anywhere if selector not provided.
 * @param {any} page
 * @param {string} expected
 * @param {string} [selector]
 */
async function assertText(page, expected, selector) {
  if (!page) throw new Error('assertText: page is required');
  if (!expected) throw new Error('assertText: expected text is required');
  if (selector) {
    const text = await page.textContent(selector);
    if (!text || !text.includes(expected)) {
      throw new Error(`Expected text "${expected}" not found in selector "${selector}". Actual: "${text || ''}"`);
    }
  } else {
    const content = await page.content();
    if (!content.includes(expected)) {
      throw new Error(`Expected text "${expected}" not found in page content`);
    }
  }
}

/**
 * PUBLIC_INTERFACE
 * Assert current URL matches (contains) expected.
 * @param {any} page
 * @param {string|RegExp} expected
 */
async function assertUrl(page, expected) {
  if (!page) throw new Error('assertUrl: page is required');
  const url = page.url();
  if (expected instanceof RegExp) {
    if (!expected.test(url)) {
      throw new Error(`URL "${url}" does not match ${expected}`);
    }
  } else if (typeof expected === 'string') {
    if (!url.includes(expected)) {
      throw new Error(`URL "${url}" does not include "${expected}"`);
    }
  } else {
    throw new Error('assertUrl: expected must be string or RegExp');
  }
}

/**
 * PUBLIC_INTERFACE
 * Wait for a selector to appear/be visible by default.
 * @param {any} page
 * @param {string} selector
 * @param {object} [options]
 */
async function waitForSelector(page, selector, options = {}) {
  if (!page) throw new Error('waitForSelector: page is required');
  if (!selector) throw new Error('waitForSelector: selector is required');
  const merged = { state: 'visible', ...options };
  await page.waitForSelector(selector, merged);
}

module.exports = {
  openBrowser,
  closeBrowser,
  navigateTo,
  click,
  typeText,
  selectOption,
  assertText,
  assertUrl,
  waitForSelector,
};
