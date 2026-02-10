// Main entry point - imports all vulnerable modules for testing
const express = require('express');
const app = express();

// Import vulnerable modules
const sqlInjection = require('./vulnerabilities/sql-injection');
const commandInjection = require('./vulnerabilities/command-injection');
const pathTraversal = require('./vulnerabilities/path-traversal');
const xss = require('./vulnerabilities/xss');
const hardcodedCreds = require('./vulnerabilities/hardcoded-credentials');
const insecureRandom = require('./vulnerabilities/insecure-random');
const prototypePollution = require('./vulnerabilities/prototype-pollution');
const openRedirect = require('./vulnerabilities/open-redirect');
const regexDos = require('./vulnerabilities/regex-dos');
const unsafeDeserialize = require('./vulnerabilities/unsafe-deserialization');
const missingRateLimit = require('./vulnerabilities/missing-rate-limit');
const xxe = require('./vulnerabilities/xxe');
const logInjection = require('./vulnerabilities/log-injection');
const nosqlInjection = require('./vulnerabilities/nosql-injection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This file demonstrates various security vulnerabilities for CodeQL testing
console.log('Security test application loaded with vulnerable modules');

app.listen(3000, () => {
  console.log('Vulnerable test server running on port 3000');
});

module.exports = app;
