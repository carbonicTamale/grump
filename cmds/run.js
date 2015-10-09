var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');
var inquirer = require('inquirer');

module.exports = function(args, installedGrumps) {

  // Make sure we are receiving a grump to run
  if (args.length === 0) {
    console.log("Error".red + ": Please provide a grump to run.");
    return;
  }

  if (utils.isVerbose()) {
    console.log("Received grump collection: " + installedGrumps[args[0]].cyan);

  // Or else just run the grump
  } else {
    if (!installedGrumps.hasOwnProperty(args[0])) {
      console.log('Grump not found.');
    }
    else if (installedGrumps[args[0]].length > 1) {
      console.log('Multiple grumps exist');

      var choices = res.grumps.map(function(grump) {
        return grump.author + "/" + grump.defaultCommand;
      });

      var question = {
        type: 'list',
        choices: choices,
        message: 'Choose a grump to install',
        name: 'install'
      };


      inquirer.prompt([question], function( answers ) {
        var chosenIndex = choices.indexOf(answers.install);
        utils.install(res.grumps[chosenIndex], installedGrumps);
      });

      
    }
    else {
      utils.run(installedGrumps[args[0]][0], args.slice(1));
    }


    // // Specific grump.
    // if (grump.indexOf("/") !== -1) {
    //   utils.run(grump, args.slice(1));

    // // General
    // } else {
    //   // If more than one local grump installed with same name
    //   if (installedGrumps[2][grump].length > 1) {
    //     console.log("Found multiple local grumps named " + grump.cyan + ".");
    //     console.log("Please choose a specific grump from the list below and rerun your command.\n");

    //     installedGrumps[2][grump].forEach(function(grump) {
    //       console.log("\t" + grump[0].green + "/" + grump[1].cyan);
    //     });

    //     console.log("\n");

    //   // Since only 1 local grump exists, assume that is the one the user wanted.
    //   } else {
    //     var chosen = installedGrumps[2][grump][0];
    //     utils.run(chosen[0] + "/" + chosen[1], args.slice(1));
    //   }
    // }
  }
};
