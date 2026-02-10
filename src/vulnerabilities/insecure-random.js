// CodeQL: Insecure Randomness vulnerability (js/insecure-randomness)

// Vulnerable: Using Math.random() for security-sensitive operations
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

// Vulnerable: Weak token generation
function generateResetToken() {
  const token = Math.random().toString(36).substr(2) + 
                Math.random().toString(36).substr(2);
  return token;
}

// Vulnerable: Insecure password generation
function generatePassword(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Vulnerable: Weak OTP generation
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Vulnerable: Insecure API key generation
function generateApiKey() {
  return 'api_' + Math.random().toString(16).slice(2);
}

// Vulnerable: Weak encryption IV
function generateIV() {
  let iv = '';
  for (let i = 0; i < 16; i++) {
    iv += String.fromCharCode(Math.floor(Math.random() * 256));
  }
  return iv;
}

module.exports = {
  generateSessionId,
  generateResetToken,
  generatePassword,
  generateOTP,
  generateApiKey,
  generateIV
};
