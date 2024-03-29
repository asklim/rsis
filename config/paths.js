
const path = require('node:path');
const fs = require('node:fs');
//const url = require('url');



// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637

const appDirectory = fs.realpathSync( process.cwd() );

//console.log('paths: appDirectory is ', appDirectory);
//console.log('paths: __dirname is ', __dirname);

const resolveApp = (relativePath) => path.resolve( appDirectory, relativePath );

const envPublicUrl = process.env.PUBLIC_URL;



function ensureSlash (inputPath, needsSlash) {

    const hasSlash = inputPath.endsWith('/');

    if( hasSlash && !needsSlash ) {
        return inputPath.substr(0, inputPath.length - 1);
    }
    else if( !hasSlash && needsSlash ) {
        return `${inputPath}/`;
    }
    else {
        return inputPath;
    }
}


const getPublicUrl = (appPackageJson) => envPublicUrl || require( appPackageJson ).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.

function getServedPath (appPackageJson) {

    const publicUrl = getPublicUrl( appPackageJson );
    const servedUrl = envPublicUrl || (
        publicUrl && publicUrl.startsWith('http') ?
            (new URL( publicUrl )).pathname
            : '/'
    );
    return ensureSlash( servedUrl, true );
}

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) =>  {

    const extension = moduleFileExtensions.find( extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if( extension ) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

const distFolderName = 'dist/front';

// config after eject: we're in ./config/
module.exports = {

    distFolderName,
    distAppHtml :     resolveApp(`${distFolderName}/index.html`),
    dotenv :          resolveApp('.env'),
    appBuild :        resolveApp( distFolderName ), //('build'),
    appPath :         resolveApp('.'),
    appPublic :       resolveApp('src/assets/public'),
    appHtml :         resolveApp('src/index.html'),
    appHtmlTemplate : resolveApp('src/index-template.html'),
    appIndexJs :      resolveModule( resolveApp, 'src/index'), // without extension !!!
    appNodeModules :  resolveApp('node_modules'),
    appPackageJson :  resolveApp('package.json'),
    appSrc :          resolveApp('src'),
    appJsConfig:      resolveApp('jsconfig.json'),
    appTsConfig :     resolveApp('tsconfig.json'),
    yarnLockFile :    resolveApp('yarn.lock'),
    //ejsRoot :         resolveApp('server/views/index.ejs'),
    //proxySetup :      resolveApp('src/setupProxy.js'),
    //testsSetup :      resolveModule( resolveApp, 'src/setupTests'),
    publicUrl :       getPublicUrl( resolveApp('package.json')),
    servedPath :      getServedPath( resolveApp('package.json')),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
