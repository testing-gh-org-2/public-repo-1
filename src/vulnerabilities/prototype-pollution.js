// CodeQL: Prototype Pollution vulnerability (js/prototype-polluting-assignment)

// Vulnerable: Direct property assignment from user input
function mergeObjects(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}

// Vulnerable: Recursive merge without prototype check
function deepMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Vulnerable: Setting property via bracket notation with user input
function setProperty(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}

// Vulnerable: Object.assign with user-controlled object
function updateConfig(req, res) {
  const userConfig = req.body;
  const config = Object.assign({}, globalConfig, userConfig);
  res.json(config);
}

// Vulnerable: Spread operator with untrusted input
function createUser(req, res) {
  const userData = req.body;
  const user = {
    role: 'user',
    ...userData
  };
  return user;
}

const globalConfig = { debug: false };

module.exports = { mergeObjects, deepMerge, setProperty, updateConfig, createUser };
