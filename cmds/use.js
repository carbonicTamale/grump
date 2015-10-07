var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function (prefix) {
  if(!prefix) {
    console.log("Please define an prefix.".red);
    return;
  } else {
    fs.writeFile(utils.lodir('lib', 'prefix.txt'), prefix[0], 'utf-8', function (err) {
      if(err) {
        console.log("Prefix not set, error:", err.red);
      } else {
        console.log("Prefix set to", prefix[0].green);
      }
    });
  }
};
