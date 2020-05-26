const shell = require('shelljs');

shell.rm('-rf', '.nyc_output');
shell.rm('-rf', './**/*.spec.js');
shell.rm('-rf', './**/*.spec.js.map');

shell.rm('-rf', './**/*.spec.d.ts');
