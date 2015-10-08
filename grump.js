#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var color = require('colors');
var utils = require('./utils.js');
var pack = require('./package.json');

process.on('SIGINT', function() {
  console.log('exiting');
  process.exit();
});

var prefix;

try {
  prefix = fs.readFileSync(utils.lodir('lib', 'prefix.txt'));
} catch (e) {
  console.log("No alias set".red);
  prefix = '';
}

var args  = process.argv.slice(2);

// Perform initial run actions for 1st time running grump
utils.initialRun();

// Load in available commands
var cmds = [];
fs.readdirSync(utils.lodir('./cmds')).forEach(function(file) {
  cmds.push(file.slice(0, -3));
});

// Get installed grumps
var installedGrumps = utils.getInstalledGrumps();

// Find out if they are querying with action
// or just sending in a package name
var action = "";
if (cmds.indexOf(args[0]) !== -1) {
  action = args[0];
  args = args.slice(1);
}

// Verbose logging
if (utils.isVerbose()) {
  console.log("Loaded all the grumps".green);
  console.log("Action received:\t", action.green);
  console.log("Arguments received:\t", args.toString().cyan + "\n");
}

// Execute commands
if (args.length === 0 && cmds.indexOf(action) === -1) {
  console.log("usage: grump [action/package] [args]");

  // Specified command
} else if (cmds.indexOf(action) !== -1 && action !== 'install') {
  require('./cmds/' + action)(args);

  // Version data
} else if (args[0] === "--version" || args[0] === "-v") {
  console.log("grump version " + pack.version);

  // Assume they want to run/install the package if no previous commands/actions match
} else {
    if (action === 'install') {
      require('./cmds/install')(args, installedGrumps);
    }
    else {
      //Add prefix
      if(prefix) {
        args[0] = prefix + ":" + args[0];
      }
      require('./cmds/run')(args, installedGrumps);
    }
}
