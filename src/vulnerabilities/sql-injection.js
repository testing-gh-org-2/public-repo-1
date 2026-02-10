// CodeQL: SQL Injection vulnerability (js/sql-injection)
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'testdb'
});

// Vulnerable: User input directly concatenated into SQL query
function getUserByName(req, res) {
  const username = req.query.username;
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  
  connection.query(query, function(error, results) {
    if (error) throw error;
    res.json(results);
  });
}

// Vulnerable: Template literal with user input
function getUserById(req, res) {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  connection.query(query, function(error, results) {
    if (error) throw error;
    res.json(results);
  });
}

// Vulnerable: String concatenation in DELETE query
function deleteUser(req, res) {
  const userId = req.body.userId;
  connection.query("DELETE FROM users WHERE id = " + userId);
  res.send('User deleted');
}

module.exports = { getUserByName, getUserById, deleteUser };
