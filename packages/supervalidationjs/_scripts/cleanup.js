const shell = require('shelljs');

shell.rm('-rf', '.nyc_output');
shell.rm('-rf', 'typings');

// REMOVE OUTPUT DIRECTORY
const outDir = ['build', 'lib'];
outDir.forEach(each => shell.rm('-rf', each));
