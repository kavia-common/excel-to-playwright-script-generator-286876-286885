# GUI Frontend (Placeholder)

This directory is reserved for a future desktop GUI, e.g., Electron or Tauri.

Suggested plan:
- Keep all automation logic in `src/core/` (actions, runner, parsers).
- The GUI should only orchestrate user input (select Excel, configure headless, baseURL, etc.) and call into `src/core/`.
- For Electron:
  - `main` process handles file selection and launching runs.
  - `renderer` displays progress and logs.
- For Tauri:
  - Rust backend bridges to Node.js or call a bundled JS runtime for core logic.

Do not duplicate logic in the GUI; always reuse the core modules to ensure consistency with CLI and server.
