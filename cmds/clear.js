var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function () {
  fs.writeFile(utils.lodir('lib', 'alias.txt'), '', 'utf-8', function (err) {
    if(err) {
      console.log("Alias not cleared, error:", err.red);
    } else {
      console.log("Alias cleared.".cyan);
    }
  });
};