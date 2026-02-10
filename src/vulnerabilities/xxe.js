// CodeQL: XML External Entity (XXE) vulnerability (js/xxe)
const libxmljs = require('libxmljs');
const xml2js = require('xml2js');
const DOMParser = require('xmldom').DOMParser;

// Vulnerable: XML parsing with external entities enabled
function parseXmlUnsafe(req, res) {
  const xmlContent = req.body.xml;
  
  // libxmljs with dangerous options
  const doc = libxmljs.parseXml(xmlContent, {
    noent: true,  // Vulnerable: expands entities
    dtdload: true // Vulnerable: loads external DTD
  });
  
  res.json({ root: doc.root().name() });
}

// Vulnerable: DOMParser without security configuration
function parseXmlDom(req, res) {
  const xmlString = req.body.xml;
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');
  res.send(doc.documentElement.textContent);
}

// Vulnerable: xml2js with potentially dangerous defaults
function parseXmlToJson(req, res) {
  const xmlData = req.body.data;
  xml2js.parseString(xmlData, (err, result) => {
    if (err) return res.status(400).send('Parse error');
    res.json(result);
  });
}

// Vulnerable: SOAP message parsing
function processSoapRequest(req, res) {
  const soapEnvelope = req.body;
  const doc = libxmljs.parseXml(soapEnvelope, { 
    noent: true,
    nonet: false  // Vulnerable: allows network access
  });
  res.json({ processed: true });
}

module.exports = {
  parseXmlUnsafe,
  parseXmlDom,
  parseXmlToJson,
  processSoapRequest
};
