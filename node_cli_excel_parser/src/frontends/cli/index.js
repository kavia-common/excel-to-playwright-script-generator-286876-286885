#!/usr/bin/env node
/**
 * Minimal CLI entry using commander.
 * Commands:
 *  - run: execute steps parsed from Excel (or demo steps if no Excel provided)
 *  - generate: placeholder for generating scripts/artifacts
 */

const { program } = require('commander');
const pino = require('pino')({ name: 'cli', level: process.env.LOG_LEVEL || 'info' });
const path = require('path');
const { parseExcel } = require('../../core/parsers/excelParser');
const { runSteps } = require('../../core/runner/runSteps');

program
  .name('excel-playwright')
  .description('Parse Excel and run Playwright automation.')
  .version('0.1.0');

program
  .command('run')
  .description('Run automation from an Excel file')
  .option('-e, --excel <file>', 'Path to Excel file (.xlsx)')
  .option('-o, --out <dir>', 'Output directory for artifacts', 'dist')
  .option('--headless', 'Run headless browser', true)
  .option('--no-headless', 'Run with headed browser window')
  .option('--baseURL <url>', 'Base URL for navigation')
  .option('--browser <name>', 'Browser name: chromium|firefox|webkit', 'chromium')
  .action(async (opts) => {
    try {
      pino.info({ opts }, 'Parsed CLI options');
      let cases;
      if (opts.excel) {
        const excelPath = path.resolve(process.cwd(), opts.excel);
        const parsed = await parseExcel(excelPath);
        cases = parsed.cases || [];
      } else {
        pino.warn('No --excel provided; using stub case/steps');
        cases = [
          {
            name: 'CLI Demo',
            steps: [
              { action: 'navigate', value: opts.baseURL || 'https://example.com' },
              { action: 'assertUrl', value: 'example.com' },
            ],
          },
        ];
      }

      for (const c of cases) {
        pino.info({ case: c.name }, 'Running case');
        await runSteps(c.steps, {
          headless: opts.headless,
          baseURL: opts.baseURL,
          browserName: opts.browser,
        });
      }
      pino.info('Run completed');
    } catch (err) {
      pino.error({ err }, 'Run failed');
      process.exit(1);
    }
  });

program
  .command('generate')
  .description('Generate Playwright scripts from Excel (placeholder)')
  .option('-e, --excel <file>', 'Path to Excel file (.xlsx)')
  .option('-o, --out <dir>', 'Output directory for scripts', 'dist')
  .action(async (opts) => {
    pino.info({ opts }, '[generate] Not implemented yet. Will produce scripts in the future.');
  });

program.parseAsync(process.argv)
  .catch((err) => {
    // Commander should handle common cases, but catch just in case
    console.error(err);
    process.exit(1);
  });
