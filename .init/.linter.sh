#!/bin/bash
cd /home/kavia/workspace/code-generation/excel-to-playwright-script-generator-286876-286885/node_cli_excel_parser
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

