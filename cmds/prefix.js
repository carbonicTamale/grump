var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function () {
  fs.readFile(utils.lodir('lib','prefix.txt'), 'utf-8', function (err, data) {
    if(err) {
      console.log("No prefix set".red);
    } else {
      if(data === '') {
        console.log("No prefix set".red);
      } else {
        console.log("Your prefix is currently set to ", data.green);
      }
    }
  });
};

