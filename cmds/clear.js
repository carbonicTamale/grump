var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function () {
  fs.writeFile(utils.lodir('lib', 'prefix.txt'), '', 'utf-8', function (err) {
    if(err) {
      console.log("prefix not cleared, error:", err.red);
    } else {
      console.log("prefix cleared.".cyan);
    }
  });
};