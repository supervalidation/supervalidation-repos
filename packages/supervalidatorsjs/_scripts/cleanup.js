const shell = require('shelljs');

shell.rm('-rf', '.nyc_output');
shell.rm('-rf', 'typings');

// REMOVE OUTPUT FILES
[
  'index',
  'validators',
].forEach(each => {
  shell.rm('-rf', `${each}.js`);
  shell.rm('-rf', `${each}.js.map`);
  shell.rm('-rf', `${each}.d.ts`);
  shell.rm('-rf', `${each}.spec.js`);
  shell.rm('-rf', `${each}.spec.js.map`);
  shell.rm('-rf', `${each}.spec.d.ts`);
});

// REMOVE OUTPUT DIRECTORY
[
  'adapters',
  'either',
  'inEmailFormat',
  'inStringLength',
  'isRequired',
  'oneOf',
  'typeOf',
].forEach(each => shell.rm('-rf', `./${each}`));
