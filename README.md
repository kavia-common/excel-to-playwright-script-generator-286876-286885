# excel-to-playwright-script-generator-286876-286885

This repository contains a modular Node.js automation scaffold designed to parse Excel files and drive Playwright browser automation. It is structured to be reusable across multiple frontends (CLI, server, GUI).

What's included:
- Core reusable actions and a runner for Playwright
- A stub Excel parser ready to integrate `xlsx`
- CLI placeholder with commands (`run`, `generate`)
- Server placeholder exporting `createServer()` (no auto-start)
- Playwright config and a sample test

Directory structure (key parts):
- node_cli_excel_parser/
  - config/playwright.config.js
  - scripts/verify_playwright.js
  - src/
    - core/
      - actions/browser.js
      - runner/runSteps.js
      - parsers/excelParser.js
    - frontends/
      - cli/index.js
      - server/index.js
      - gui/README.md
  - tests/e2e/sample.spec.js

Getting Started

- Install dependencies (including Playwright):
  npm install

- Install Playwright browsers and system deps:
  npm run pw:install

- Verify Playwright works on this machine:
  npm run pw:verify

- Run sample tests (using @playwright/test):
  npx playwright test

- CLI usage help:
  node src/frontends/cli/index.js --help
  node src/frontends/cli/index.js run --baseURL https://example.com --headless

Notes

- We intentionally keep browser automation logic in `src/core` so it can be consumed by CLI, server, or GUI without duplication.
- The sample test uses `@playwright/test` which is included as a devDependency via Playwright’s test runner.
- The prior "pw:doctor" script was removed because the "doctor" command is not available in recent Playwright CLI versions.

Roadmap

- Wire `xlsx` in `src/core/parsers/excelParser.js` to parse real Excel files into { cases, steps }.
- Add a server endpoint to trigger runs and accept Excel uploads.
- Add a GUI (Electron or Tauri) that reuses `src/core`.