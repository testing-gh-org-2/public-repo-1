// CodeQL: Missing Rate Limiting vulnerability (js/missing-rate-limiting)
const express = require('express');
const router = express.Router();

// Vulnerable: Login endpoint without rate limiting
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic without rate limiting
  if (authenticate(username, password)) {
    res.json({ token: generateToken(username) });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Vulnerable: Password reset without rate limiting
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  // Send reset email without rate limiting
  sendPasswordResetEmail(email);
  res.json({ message: 'Reset email sent' });
});

// Vulnerable: API endpoint without rate limiting
router.get('/api/data', (req, res) => {
  const data = fetchSensitiveData();
  res.json(data);
});

// Vulnerable: File upload without rate limiting
router.post('/upload', (req, res) => {
  const file = req.files.document;
  file.mv('/uploads/' + file.name);
  res.json({ message: 'File uploaded' });
});

// Vulnerable: SMS/OTP endpoint without rate limiting
router.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  sendSMS(phone, otp);
  res.json({ message: 'OTP sent' });
});

function authenticate(u, p) { return true; }
function generateToken(u) { return 'token'; }
function sendPasswordResetEmail(e) {}
function fetchSensitiveData() { return {}; }
function generateOTP() { return '123456'; }
function sendSMS(p, o) {}

module.exports = router;
