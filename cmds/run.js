var path  = require('path');
var fs    = require('fs');
var color = require('colors');
var utils = require('../utils.js');
var inquirer = require('inquirer');

module.exports = function(args, installedGrumps) {

  if (utils.isVerbose()) {
    console.log("Received grump collection: " + JSON.stringify(installedGrumps));
  }
  // Make sure we are receiving a grump to run
  if (args.length === 0) {
    console.log("Error".red + ": Please provide a grump to run.");
    return;
  } 
  else {
    if (!installedGrumps.hasOwnProperty(args[0])) {
      console.log('Grump not found.');
    }
    else if (installedGrumps[args[0]].length > 1) {
      console.log('Multiple grumps exist');

      var choices = installedGrumps[args[0]].map(function(grump) {
        return grump.author + "/" + grump.command;
      });

      var question = {
        type: 'list',
        choices: choices,
        message: 'Choose a grump to run',
        name: 'run'
      };


      inquirer.prompt([question], function( answers ) {
        var chosenIndex = choices.indexOf(answers.run);
        console.log(chosenIndex);
        console.log(installedGrumps[args[0]][chosenIndex]);
        utils.run(installedGrumps[args[0]][chosenIndex], args.slice(1));
      });

      
    }
    else {
      utils.run(installedGrumps[args[0]][0], args.slice(1));
    }


  // Or else just run the grump
}};
