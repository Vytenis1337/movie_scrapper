const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');

module.exports = (config) => {
    const projectPath = process.cwd();

    const watchFolders = [path.resolve(projectPath, 'node_modules')];

    const monoRootPath = path.resolve(__dirname, '../../');
    watchFolders.push(path.resolve(monoRootPath, 'node_modules'));
    watchFolders.push(path.resolve(monoRootPath, 'packages'));

    if (config?.watchFolders?.length) {
        watchFolders.push(...config.watchFolders);
    }

    const cnf = {
        ...config,
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    // this defeats the RCTDeviceEventEmitter is not a registered callable module
                    inlineRequires: true,
                },
            }),
            ...(config?.transformer || {}),
        },
        resolver: {
            blockList: exclusionList([
                /projectConfig\/.*/,
                /metro.config.local.*/,
                /projectConfig\/.*/,
                /website\/.*/,
                /metro.config.local.*/,
            ]),
            ...(config?.resolver || {}),
            extraNodeModules: config?.resolver?.extraNodeModules,
        },
        watchFolders,
        projectRoot: path.resolve(projectPath),
    };

    return cnf;
};
