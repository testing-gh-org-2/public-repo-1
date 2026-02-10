// CodeQL: Hardcoded Credentials vulnerability (js/hardcoded-credentials)
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Vulnerable: Hardcoded database credentials
const dbConfig = {
  host: 'production-db.example.com',
  user: 'admin',
  password: 'SuperSecretPassword123!',
  database: 'production'
};

// Vulnerable: Hardcoded API keys
const API_KEY = 'sk-1234567890abcdef1234567890abcdef';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
const STRIPE_SECRET = 'sk_live_1234567890abcdefghijklmnop';

// Vulnerable: Hardcoded JWT secret
const JWT_SECRET = 'my-super-secret-jwt-key-12345';

function generateToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
}

// Vulnerable: Hardcoded encryption key
const ENCRYPTION_KEY = 'aes-256-encryption-key-here!!';

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, 'initialization-vec');
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

// Vulnerable: Hardcoded OAuth credentials
const oauthConfig = {
  clientId: 'my-client-id-12345',
  clientSecret: 'my-client-secret-67890abcdef',
  redirectUri: 'https://example.com/callback'
};

// Vulnerable: Hardcoded password in connection string
const connectionString = 'mongodb://admin:password123@localhost:27017/mydb';

// Vulnerable: Hardcoded token
const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

module.exports = {
  dbConfig,
  API_KEY,
  generateToken,
  encrypt,
  oauthConfig,
  connectionString
};
