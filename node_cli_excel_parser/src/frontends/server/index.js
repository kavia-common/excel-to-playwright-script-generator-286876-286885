/**
 * Minimal Express server placeholder.
 * Export createServer() only. Do NOT auto-start here.
 */
const express = require('express');

function createServer() {
  const app = express();

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server placeholder is healthy' });
  });

  // TODO: Add routes to trigger runs, upload Excel, etc.

  return app;
}

module.exports = { createServer };
