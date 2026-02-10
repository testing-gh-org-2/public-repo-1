// CodeQL: Log Injection vulnerability (js/log-injection)
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

// Vulnerable: Logging user input directly
function logUserAction(req, res) {
  const username = req.body.username;
  const action = req.query.action;
  
  // User can inject newlines and fake log entries
  console.log('User ' + username + ' performed action: ' + action);
  logger.info(`User ${username} performed action: ${action}`);
  
  res.send('OK');
}

// Vulnerable: Logging request data without sanitization
function logRequest(req, res, next) {
  const userAgent = req.headers['user-agent'];
  const referer = req.headers.referer;
  
  console.log('Request from: ' + userAgent + ', Referer: ' + referer);
  next();
}

// Vulnerable: Error logging with user input
function handleError(req, res) {
  const errorMessage = req.body.error;
  
  console.error('Application error: ' + errorMessage);
  logger.error('Error occurred: ' + errorMessage);
  
  res.status(500).send('Error logged');
}

// Vulnerable: Debug logging with sensitive data
function debugLog(req, res) {
  const data = req.body;
  console.log('Debug data: ' + JSON.stringify(data));
  
  // Potentially logging passwords or tokens
  logger.debug('Request body: ' + JSON.stringify(req.body));
  res.send('Logged');
}

module.exports = { logUserAction, logRequest, handleError, debugLog };
