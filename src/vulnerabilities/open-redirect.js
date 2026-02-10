// CodeQL: Open Redirect vulnerability (js/server-side-unvalidated-url-redirection)

// Vulnerable: Unvalidated redirect URL from query parameter
function handleLogin(req, res) {
  const returnUrl = req.query.returnUrl;
  // After authentication...
  res.redirect(returnUrl);
}

// Vulnerable: Redirect using user input
function redirectHandler(req, res) {
  const destination = req.body.destination;
  res.redirect(302, destination);
}

// Vulnerable: URL from header
function handleCallback(req, res) {
  const referer = req.headers.referer;
  res.redirect(referer);
}

// Vulnerable: Building redirect URL with user input
function logout(req, res) {
  const next = req.query.next;
  req.session.destroy();
  res.redirect('https://' + next);
}

// Vulnerable: Location header set from user input
function customRedirect(req, res) {
  const url = req.params.url;
  res.setHeader('Location', url);
  res.status(302).end();
}

module.exports = {
  handleLogin,
  redirectHandler,
  handleCallback,
  logout,
  customRedirect
};
