var color = require('colors');
var utils = require('../utils.js');
var grumpInstaller = require('../helpers/grump-installer.js');

module.exports = function(args, installedGrumps) {
  // Check if the grump is installed locally
  if (utils.isVerbose()) {
    console.log("Error".red + ": grump " + grump.cyan + " was not found locally...querying server...");
  }
  grumpInstaller(args, installedGrumps, false);
};
