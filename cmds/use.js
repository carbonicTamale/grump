var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function (alias) {
  return new Promise(function(resolve, reject) {
    fs.readFile(utils.lodir('lib', 'use.json'), function(err, data) {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  })

};