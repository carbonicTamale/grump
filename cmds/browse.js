var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');
var open = require('open');

module.exports = function (args) {
  if (args.length < 1) {
    console.log('Please provide a grump');
    return;
  }

  var match = args[0].match(/(.+)?\/(.+)(?::)?/);
  if (!match) {
    console.log('Please list your grump in the following form:');
    console.log('<repo>/<username> OR <repo>/<username>:<command>');
    return;
  }

  open('https://github.com/' + match[1] + '/' + match[2]);
};