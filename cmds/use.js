var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function (alias) {
  if(!alias) {
    console.log("Please define an alias.".red);
    return;
  } else {
    fs.writeFile(utils.lodir('lib', 'alias.txt'), alias[0], 'utf-8', function (err) {
      if(err) {
        console.log("Alias not set, error:", err.red);
      } else {
        console.log("Alias set to", alias[0].green);
      }
    });
  }
};