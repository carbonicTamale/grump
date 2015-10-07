var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function (alias) {
  alias = alias ? alias[0] : null;
  var message = alias ? "Now using the alias " + alias.cyan : "Alias cleared.";
  console.log(message);
  return alias;
};