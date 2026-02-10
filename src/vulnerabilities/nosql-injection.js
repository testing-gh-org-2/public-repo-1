// CodeQL: NoSQL Injection vulnerability (js/sql-injection for MongoDB)
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

// Vulnerable: MongoDB query with user input in $where
async function findUserWhere(req, res) {
  const username = req.query.username;
  const db = await MongoClient.connect('mongodb://localhost:27017/test');
  
  // Dangerous: $where with user input allows JavaScript execution
  const users = await db.collection('users').find({
    $where: `this.username == '${username}'`
  }).toArray();
  
  res.json(users);
}

// Vulnerable: Direct object injection in query
async function findUser(req, res) {
  const query = req.body;  // User controls entire query object
  const users = await mongoose.model('User').find(query);
  res.json(users);
}

// Vulnerable: Unvalidated query operators
async function searchUsers(req, res) {
  const filter = req.body.filter;
  // User can inject operators like $gt, $ne, $regex
  const users = await mongoose.model('User').find({
    username: filter.username,
    age: filter.age
  });
  res.json(users);
}

// Vulnerable: RegExp from user input
async function regexSearch(req, res) {
  const pattern = req.query.pattern;
  const users = await mongoose.model('User').find({
    email: { $regex: pattern }
  });
  res.json(users);
}

// Vulnerable: Aggregation pipeline with user input
async function aggregateData(req, res) {
  const matchStage = req.body.match;
  const result = await mongoose.model('Order').aggregate([
    { $match: matchStage },  // User controls $match stage
    { $group: { _id: '$status', total: { $sum: '$amount' } } }
  ]);
  res.json(result);
}

module.exports = {
  findUserWhere,
  findUser,
  searchUsers,
  regexSearch,
  aggregateData
};
