var path = require('path');
var fs = require('fs');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function(args, installedGrumps) {
  // Check if the grump is installed locally
  if (!utils.validLocalGrump(grump)) {
    if (utils.isVerbose()) {
      console.log("Error".red + ": grump " + grump.cyan + " was not found locally...querying server...");
    }
    // Query server for grumps
    utils.queryServer(grump, function(err, res) {
      if (err) {
        if (err.code === "ENOTFOUND") {
          console.log("Error".red + ": Unable to contact grump servers. Are you online?");
        } else {
          console.log(err);
        }
      } else {

        // Multiple grumps found
        if (res.grumps.length > 1) {
          console.log("Found multiple remote grumps named " + grump.cyan + ".");
          console.log("Please choose a specific grump from the list below and rerun your command.\n");

          res.grumps.forEach(function(grump) {
            console.log("\t" + grump.author.green + "/" + grump.defaultCommand.cyan);
          });

          console.log("\n");

          // Only 1 grump found, ready to install/run
        } else if (res.grumps.length === 1) {
          // install it
          utils.install(res.grumps[0], installedGrumps);

          // No grumps found
        } else {
          console.log("Error".red + ": Grump " + grump.cyan + " was not found on the server.");
        }
      }
    });
  }
  else {
    console.log('Grump already installed.');
  }
};
