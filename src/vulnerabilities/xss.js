// CodeQL: Cross-Site Scripting (XSS) vulnerability (js/xss, js/reflected-xss)
const express = require('express');

// Vulnerable: Reflected XSS - user input directly in response
function searchHandler(req, res) {
  const searchTerm = req.query.q;
  res.send('<h1>Search results for: ' + searchTerm + '</h1>');
}

// Vulnerable: Stored XSS - rendering user content without escaping
function displayComment(req, res) {
  const comment = req.body.comment;
  const html = `
    <div class="comment">
      <p>${comment}</p>
    </div>
  `;
  res.send(html);
}

// Vulnerable: DOM-based XSS pattern
function renderProfile(req, res) {
  const username = req.params.username;
  const bio = req.query.bio;
  res.send(`
    <html>
      <body>
        <h1>Profile: ${username}</h1>
        <div id="bio">${bio}</div>
        <script>
          document.getElementById('bio').innerHTML = '${bio}';
        </script>
      </body>
    </html>
  `);
}

// Vulnerable: Unsafe innerHTML assignment
function updateContent(req, res) {
  const content = req.body.content;
  res.send(`
    <script>
      document.getElementById('content').innerHTML = "${content}";
    </script>
  `);
}

module.exports = { searchHandler, displayComment, renderProfile, updateContent };
