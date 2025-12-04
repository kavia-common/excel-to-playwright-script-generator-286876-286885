# excel-to-playwright-script-generator-286876-286885

This repository contains a Node.js CLI backend that will parse Excel files and generate Playwright scripts. Playwright is installed and ready to use with helpful scripts.

Getting Started

- Install dependencies (including Playwright):
  npm install

- Install Playwright browsers and system deps:
  npm run pw:install

- Verify Playwright works on this machine:
  npm run pw:verify

Available Scripts

- pw:install: Downloads Playwright browsers and system dependencies (uses npx playwright install --with-deps).
- pw:verify: Runs a small Node script that launches Chromium in headless mode and opens about:blank.

Notes

- We intentionally use the core "playwright" package. If you later adopt @playwright/test for testing, you can add it without changing the existing CLI behavior.
- The prior "pw:doctor" script was removed because the "doctor" command is not available in the Playwright CLI.