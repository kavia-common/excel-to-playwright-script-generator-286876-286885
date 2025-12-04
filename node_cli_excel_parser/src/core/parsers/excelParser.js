/**
 * Placeholder for Excel -> Cases parser using xlsx library.
 * Types:
 *  - Step: { action: string, selector?: string, value?: any, options?: object }
 *  - Case: { name: string, steps: Step[] }
 */

/**
 * PUBLIC_INTERFACE
 * Parse an Excel file and return structured cases.
 * @param {string} filePath
 * @returns {Promise<{cases: Array<{name:string, steps:Array<{action:string, selector?:string, value?:any, options?:object}>}>}>}
 */
async function parseExcel(filePath) {
  // TODO: Implement with 'xlsx' library, e.g.:
  // const xlsx = require('xlsx');
  // const workbook = xlsx.readFile(filePath);
  // const sheet = workbook.Sheets[workbook.SheetNames[0]];
  // const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });
  // Transform rows to { name, steps } structure.
  if (!filePath) throw new Error('parseExcel: filePath is required');

  // For now, return a single dummy case/steps for demo
  return {
    cases: [
      {
        name: 'Sample case',
        steps: [
          { action: 'navigate', value: 'https://example.com' },
          { action: 'assertUrl', value: 'example.com' },
        ],
      },
    ],
  };
}

module.exports = { parseExcel };
