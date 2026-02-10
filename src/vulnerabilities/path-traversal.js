// CodeQL: Path Traversal vulnerability (js/path-injection)
const fs = require('fs');
const path = require('path');

// Vulnerable: Direct file path from user input
function readFile(req, res) {
  const filename = req.query.file;
  const content = fs.readFileSync('/var/data/' + filename, 'utf8');
  res.send(content);
}

// Vulnerable: Path join without validation
function downloadFile(req, res) {
  const userPath = req.params.filepath;
  const fullPath = path.join(__dirname, 'uploads', userPath);
  res.download(fullPath);
}

// Vulnerable: Reading file with unvalidated path
function getConfig(req, res) {
  const configName = req.body.config;
  fs.readFile(`./configs/${configName}.json`, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error');
    res.json(JSON.parse(data));
  });
}

// Vulnerable: Writing to arbitrary path
function saveFile(req, res) {
  const filename = req.body.filename;
  const content = req.body.content;
  fs.writeFileSync('./uploads/' + filename, content);
  res.send('File saved');
}

// Vulnerable: Directory listing with user input
function listDirectory(req, res) {
  const dir = req.query.dir;
  const files = fs.readdirSync('/home/user/' + dir);
  res.json(files);
}

module.exports = { readFile, downloadFile, getConfig, saveFile, listDirectory };
