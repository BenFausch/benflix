var dirTree = require('directory-tree');
console.log('BENFLIX STARTED')
// buildDb();
/////////
var chokidar = require('chokidar');
// One-liner for current directory, ignores .dotfiles
// chokidar.watch('D:')
// .on('change', (event, path) => {
//   // console.log(event, path);
//   console.log('FILES CHANGED YO');
//   buildDb();
// })
// .on('add', (event, path) => {
//   // console.log(event, path);
//   // console.log('FILES ADDED YO');
//   buildDb();
// });
///////
// to run this file, run node findMovies.js
////////
function buildDb() {
    var tree = dirTree('D:');
    tree = tree.children;
    //
    function findAndReplace(object, value, replacevalue) {
        for (var x in object) {
            if (object.hasOwnProperty(x)) {
                if (typeof object[x] == 'object') {
                    findAndReplace(object[x], value, replacevalue);
                } else {
                    val = object[x]
                    
                    if(typeof val === 'string'){
                    	console.log(val)	
                    	val = val.replace(/D:/g, 'movies.benflix.com')
                    	val = val.replace(/\\/g, '/')
                    	object[x] = val
                    	console.log(val)
                    }
                    
                }
                // if (object[x] == value) { 
                //   // object[x].replace(/D:/g, 'movies.benflix.com')
                //   object[x] = replacevalue;
                //   // break; // uncomment to stop after first replacement
                // }
            }
        }
        return object
    }
    //
    var newTree = findAndReplace(tree, 'D:', 'movies.benflix.com/');
    var file = 'db.js';
    var jsonfile = require('jsonfile');
    jsonfile.writeFile(file, newTree);
    // var file = 'db2.js';
    // var jsonfile = require('jsonfile');
    console.log('database updated.')
};
buildDb();