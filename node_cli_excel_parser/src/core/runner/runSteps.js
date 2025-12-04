/**
 * Orchestrates an array of step objects into Playwright calls.
 * Each step: { action, selector?, value?, options? }
 */

const actions = require('../actions/browser');

/**
 * PUBLIC_INTERFACE
 * Run steps inside a managed browser session.
 * @param {Array<{action:string, selector?:string, value?:any, options?:object}>} steps
 * @param {object} [runtimeOptions] { headless?: boolean, browserName?: string, baseURL?: string }
 */
async function runSteps(steps = [], runtimeOptions = {}) {
  if (!Array.isArray(steps)) throw new Error('runSteps: steps must be an array');
  const { headless = true, browserName = 'chromium', baseURL } = runtimeOptions;

  const handles = await actions.openBrowser({ headless, browserName });
  const { page } = handles;

  const log = (...args) => console.log('[runner]', ...args);

  try {
    for (const [idx, step] of steps.entries()) {
      const { action, selector, value, options } = step || {};
      log(`Step #${idx + 1}:`, action, selector || '', value !== undefined ? `value=${JSON.stringify(value)}` : '');

      switch ((action || '').toLowerCase()) {
        case 'navigate':
        case 'navigateTo':
        case 'goto': {
          const target = typeof value === 'string' ? value : (baseURL || 'about:blank');
          await actions.navigateTo(page, target, options);
          break;
        }
        case 'click': {
          await actions.click(page, selector, options);
          break;
        }
        case 'type':
        case 'typeText':
        case 'fill': {
          await actions.typeText(page, selector, value ?? '', options);
          break;
        }
        case 'select':
        case 'selectOption': {
          await actions.selectOption(page, selector, value, options);
          break;
        }
        case 'waitFor':
        case 'waitForSelector': {
          await actions.waitForSelector(page, selector, options);
          break;
        }
        case 'assertText': {
          await actions.assertText(page, value, selector);
          break;
        }
        case 'assertUrl': {
          await actions.assertUrl(page, value);
          break;
        }
        default:
          log(`Unknown action "${action}" - skipping`);
      }
    }
  } catch (err) {
    console.error('[runner] Error during steps execution:', err && err.stack ? err.stack : err);
    throw err;
  } finally {
    await actions.closeBrowser(handles);
  }
}

module.exports = { runSteps };
