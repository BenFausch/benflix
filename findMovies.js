var dirTree = require('directory-tree');

console.log('BENFLIX STARTED')

// buildDb();
/////////
var chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('videos')
.on('change', (event, path) => {
  // console.log(event, path);
  console.log('FILES CHANGED YO');
  buildDb();
})
.on('add', (event, path) => {
  // console.log(event, path);
  // console.log('FILES ADDED YO');
  buildDb();
});

///////
// to run this file, run node findMovies.js
////////





function buildDb(){
var tree = dirTree('videos');
tree = tree.children;

var file = 'db.js';
var jsonfile = require('jsonfile');

jsonfile.writeFile(file, tree);



var file = 'db2.js';
var jsonfile = require('jsonfile');


console.log('database updated.')
};



