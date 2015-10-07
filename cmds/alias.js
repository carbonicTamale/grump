var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function (args) {
  if (args.length < 2) {
    console.log('Please provide a grump and an alias for it');
    return;
  }

  var grump = args[0];
  var alias = args[1];

  try {
    installedGrumps = JSON.parse(fs.readFile(utils.lodir('lib', 'grumpTable.json')));
    if (!installedGrumps.hasOwnProperty(grump)) {
      console.log('grump command ' + grump.cyan + 'not found');
    }
    else if (installedGrumps[grump].length>2) {
      console.log('Multiple grumps with this name exist. Please be more specific.');
    }
    else {
      installedGrumps[alias] = installedGrumps[alias] || [];
      installedGrumps[alias].push(installedGrumps[grump][0]);
    }
    
    try {
      fs.writeFileSync(utils.lodir('lib', 'grumpTable.json');
        console.log('Alias for ' + grump.cyan + 'set as ' + alias.cyan);
    } catch(e) {
      console.log('Error writing new alias');
    }
  } catch(e) {
    console.log('error reading table file to add alias');
  }
};