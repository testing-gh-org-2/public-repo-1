// CodeQL: Regular Expression Denial of Service (ReDoS) vulnerability (js/redos)

// Vulnerable: Exponential backtracking regex
function validateEmail(email) {
  const regex = /^([a-zA-Z0-9]+)+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  return regex.test(email);
}

// Vulnerable: Nested quantifiers causing catastrophic backtracking
function matchPattern(input) {
  const regex = /^(a+)+$/;
  return regex.test(input);
}

// Vulnerable: Complex nested groups
function validateInput(str) {
  const regex = /^((ab)*)+$/;
  return regex.test(str);
}

// Vulnerable: Alternation with overlapping patterns
function checkFormat(text) {
  const regex = /^(.*a|.*b|.*c)+$/;
  return regex.test(text);
}

// Vulnerable: User-controlled regex
function searchWithRegex(req, res) {
  const pattern = req.query.pattern;
  const text = req.body.text;
  const regex = new RegExp(pattern);
  const matches = text.match(regex);
  res.json(matches);
}

// Vulnerable: Evil regex patterns
function validateURL(url) {
  const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regex.test(url);
}

module.exports = {
  validateEmail,
  matchPattern,
  validateInput,
  checkFormat,
  searchWithRegex,
  validateURL
};
