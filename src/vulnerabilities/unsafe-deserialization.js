// CodeQL: Unsafe Deserialization vulnerability (js/unsafe-deserialization)
const serialize = require('node-serialize');
const yaml = require('js-yaml');

// Vulnerable: Deserializing untrusted data with node-serialize
function processData(req, res) {
  const serializedData = req.body.data;
  const obj = serialize.unserialize(serializedData);
  res.json(obj);
}

// Vulnerable: eval() with user input (code injection)
function executeCode(req, res) {
  const code = req.body.code;
  const result = eval(code);
  res.json({ result });
}

// Vulnerable: Function constructor with user input
function runExpression(req, res) {
  const expression = req.query.expr;
  const func = new Function('return ' + expression);
  res.json({ result: func() });
}

// Vulnerable: YAML deserialization with dangerous types
function parseYaml(req, res) {
  const yamlContent = req.body.yaml;
  const data = yaml.load(yamlContent);
  res.json(data);
}

// Vulnerable: JSON parse with reviver function from user
function parseJson(req, res) {
  const jsonStr = req.body.json;
  const reviver = req.body.reviver;
  const reviverFunc = new Function('key', 'value', reviver);
  const data = JSON.parse(jsonStr, reviverFunc);
  res.json(data);
}

// Vulnerable: vm module with user code
const vm = require('vm');
function runInSandbox(req, res) {
  const userCode = req.body.code;
  const result = vm.runInNewContext(userCode);
  res.json({ result });
}

module.exports = {
  processData,
  executeCode,
  runExpression,
  parseYaml,
  parseJson,
  runInSandbox
};
