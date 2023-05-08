var exec = require('child_process').exec;
var os = require('os');

// TODO Fix lerna pushing codegen to root
// Run command depending on the OS
if (os.type() === 'Linux')
    exec('cp -R -f node_modules/react-native-codegen packages/react-native-tvos-app/node_modules');
else if (os.type() === 'Darwin')
    exec('cp -R -f node_modules/react-native-codegen packages/react-native-tvos-app/node_modules');
else if (os.type() === 'Windows_NT')
    exec('xcopy node_modules/react-native-codegen packages/react-native-tvos-app/node_modules /e /i /c /y');
else throw new Error('Unsupported OS found: ' + os.type());
