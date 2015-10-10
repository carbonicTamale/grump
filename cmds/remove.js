var fs    = require('fs.extra');
var color = require('colors');
var utils = require('../utils.js');

module.exports = function(args) {
  var grump = args[0];

  // Make sure we are receiving a grump to run
  if (args.length === 0) {
    console.log("Error".red + ": Please provide a grump to remove.");
    return;
  }

  var match = args[0].match(/^(.+)?\/(.+)$/);
  var author = match[1];
  var repoName = match[2];
  // TO-DO: enable choice selection

  if (!match) {
    console.log('Please specify <user>/<repo>');
    return;
  }


  var installedGrumps = utils.getInstalledGrumps();

  console.log('repoName =', repoName);

  if (!installedGrumps.hasOwnProperty(repoName)) {
    console.log('Not a valid grump.');
    return;
  }

  var list = installedGrumps[grump];

  // remove from grumpTable.json
  for (var i = 0; i < list.length; i++) {
    if (list[i].author === author && list[i].repoName === repoName) {
      list[i].splice(i,1);
      break;
    }
  }

  try {
    fs.writeFileSync(utils.lodir('lib', 'grumpTable.json'), installedGrumps);
  }
  catch(e) {
    console.log('Error updating grumpTable.json');
  }

  fs.rmrf(utils.lodir('lib', author, repoName), function(err) {
    if (err) {
      console.log('Error removing library');
      return;
    }

    console.log('Successfully removed', grump);
  });
};


  // // Specific grump.
  // if (grump.indexOf("/") !== -1) {
  //   remove(grump, args.slice(1));

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
  //     remove(chosen[0] + "/" + chosen[1], args.slice(1));
  //   }
  // }

  // function remove(grump) {
  //   var index       = grump.indexOf("/");
  //   var author      = grump.slice(0, index);
  //   var generalName = grump.slice(index+1);  // Without the author attached
  //   var totalGrumps = Object.keys(installedGrumps[2][generalName]).length;  // How many grumps have this name

  //   // Only 1 grump found, so we can also delete the root folder
  //   if (totalGrumps === 1) {
  //     fs.rmrf(utils.lodir("lib", generalName), function (err) {
  //       if (err) {
  //         console.error(err);
  //       }
  //       console.log(author.green + "/" + generalName.cyan + " was removed successfully!");
  //     });

  //   // Only delete the sub author folder
  //   } else {
  //     fs.rmrf(utils.lodir("lib", generalName, author), function (err) {
  //       if (err) {
  //         console.error(err);
  //       }
  //       console.log(author.green + "/" + generalName.cyan + " was removed successfully!");
  //     });
  //   }
  // }
// };