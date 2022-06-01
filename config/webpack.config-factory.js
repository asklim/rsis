const rootDir = require( 'fs' ).realpathSync( process.cwd() );
const appVersion = require( `${rootDir}/package.json` ).version;

const path = require( 'path' );
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PnpWebpackPlugin = require( 'pnp-webpack-plugin' );
const ModuleScopePlugin = require( 'react-dev-utils/ModuleScopePlugin' );

const getClientEnvironment = require( './env' );
const paths = require( './paths' );
const modules = require( './modules' );


// Source maps are resource heavy
// and can cause out of memory issue
// for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';
//!== 'false';

// Some apps do not need the benefits of saving
// a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK === 'true';
//!== 'false';

// This is the production and development configuration.
// It is focused on developer experience,
//fast rebuilds, and a minimal bundle.

module.exports = function( webpackEnv ) {

    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    // Variable used for enabling profiling in Production
    // passed into alias object. Uses a flag if passed into the build command
    const isEnvProductionProfile =
        isEnvProduction && process.argv.includes( '--profile' );

    // Webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // In development, we always serve from the root. This makes config easier.
    const publicPath = isEnvProduction ?
        paths.servedPath
        : isEnvDevelopment && '/';

    // Some apps do not use client-side routing with pushState.
    // For these, "homepage" can be set to "." to enable relative asset paths.
    const shouldUseRelativeAssetPaths = publicPath === './';

    // `publicUrl` is just like `publicPath`, but we will provide it to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    const publicUrl = isEnvProduction ?
        publicPath.slice( 0, -1 )
        : isEnvDevelopment && '';

    // Get environment variables to inject into our app.
    const env = getClientEnvironment( publicUrl );

    const buildOptions = {
        appVersion,
        isEnvDevelopment,
        isEnvProduction,
        isEnvProductionProfile,
        paths,
        publicPath,
        publicUrl,
        shouldUseSourceMap,
        shouldInlineRuntimeChunk,
        shouldUseRelativeAssetPaths,
        env
    };

    return ({
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction ?
            shouldUseSourceMap ? 'source-map' : false
            : isEnvDevelopment && 'source-map', //'inline-source-map',

        // These are the "entry points" to our application.
        // This means they will be the "root" imports that are included in JS bundle.
        entry : [
            // Finally, this is your app's code:
            paths.appIndexJs,
        ],
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        module: require( './webpack-config-module.js' )( buildOptions ),
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        // Uncaught ReferenceError: global is not defined,
        // if: node: false,
        node : {}, // it`s Ok
        // Turn off performance processing because we utilize
        // our own hints via the FileSizeReporter
        optimization: {
            //isEnvProduction ?

            // In development if minimizer is present,
            // then: "Uncaught TypeError: this is undefined"
            minimizer: [
                // This is only used in production mode
                '...',
                new CssMinimizerPlugin(),
            ],
            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            splitChunks: {
                chunks: 'all',
                //minSize : 524288,
                //maxSize : 1048576,
                //name: false,
            },

            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            // https://github.com/facebook/create-react-app/issues/5358
            // then: "Uncaught TypeError: this is undefined"
            /*runtimeChunk: {
                name: 'single', // alias for 'runtime'
                // 'multiple' is alias for:
                //name: entrypoint => `runtime-${entrypoint.name}`,
            },*/
        },
        output: {
            // The build folder.
            path: paths.appBuild,

            // There will be one main bundle,
            // and one file per asynchronous chunk.
            // In development, it does not produce real files.
            filename: isEnvProduction
                ? 'js/[name].[contenthash].bundle.js'
                : isEnvDevelopment && 'js/[name].bundle.js',

            assetModuleFilename: 'assets/[hash][ext][query]',

            // There are also additional JS chunk files
            // if you use code splitting.
            chunkFilename: isEnvProduction
                ? 'js/[name].[contenthash].chunk.js'
                : isEnvDevelopment && 'js/[name].chunk.js',

            // We inferred the "public path"
            // (such as / or /my-project) from homepage.
            // We use "/" in development.
            publicPath: publicPath,

            // Point sourcemap entries
            // to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: isEnvProduction
                ? info =>
                    path
                    .relative( paths.appSrc, info.absoluteResourcePath )
                    .replace(/\\/g, '/')
                : isEnvDevelopment &&
                ( info => path.resolve( info.absoluteResourcePath ).replace(/\\/g, '/')),

            // this defaults to 'window', but by setting it to 'this' then
            // module chunks which are built will work in web workers as well.
            globalObject: 'globalThis',
            // If 'this', then don`t work bundle chunking: this is undefined
        },
        performance: isEnvProduction ?
            {
                maxEntrypointSize: 512000,
                maxAssetSize: 512000,
            } : false,
        plugins: require( './webpack-config-plugins.js' )( buildOptions ),
        resolve: {
            // This allows you to set a fallback for where Webpack should look for modules.
            // We placed these paths second because we want `node_modules` to "win"
            // if there are any conflicts. This matches Node resolution mechanism.
            // https://github.com/facebook/create-react-app/issues/253
            modules: [
                paths.appSrc,
                'node_modules',
                paths.appNodeModules
            ]
            .concat( modules.additionalModulePaths || []
            // It is guaranteed to exist because we tweak it in `env.js`
            // process.env.NODE_PATH.split( path.delimiter ).filter(Boolean)
            ),

            // These are the reasonable defaults supported by the Node ecosystem.
            // We also include JSX as a common component filename extension to support
            // some tools, although we do not recommend using it, see:
            // https://github.com/facebook/create-react-app/issues/290
            // `web` extension prefixes have been added for better support
            // for React Native Web.
            extensions: paths.moduleFileExtensions
                .map( ext => `.${ext}` )
                .filter( ext => !ext.includes('ts') ),
            alias: {
                // Support React Native Web
                // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
                'react-native': 'react-native-web',
                //...( isEnvDevelopment && {
                //    'react-dom': '@hot-loader/react-dom',
                //}),
                // Allows for better profiling with ReactDevTools
                ...( isEnvProductionProfile && {
                    'react-dom$': 'react-dom/profiling',
                    'scheduler/tracing': 'scheduler/tracing-profiling',
                }),
                ...( modules.webpackAliases || {} ),
            },
            plugins: [
                // Adds support for installing with Plug'n'Play,
                // leading to faster installs and adding
                // guards against forgotten dependencies and such.
                PnpWebpackPlugin,

                // Prevents users from importing files from outside
                // of src/ (or node_modules/). This often causes confusion
                // because we only process files within src/ with babel.
                // To fix this, we prevent you from importing files out
                // of src/ -- if you'd like to, please link the files
                // into your node_modules/ and let module-resolution kick in.
                // Make sure your source files are compiled,
                // as they will not be processed in any way.
                new ModuleScopePlugin( paths.appSrc, [ paths.appPackageJson ]),
            ],
            fallback: {
                "buffer": false, // require.resolve("buffer"),
                "stream": require.resolve( 'stream-browserify' ),
                "crypto": false, // require.resolve("crypto-browserify"),
                "https": require.resolve( 'https-browserify' ),
                "path": false, // require.resolve("path-browserify"),
                "http": require.resolve( 'stream-http' ),
                "url": require.resolve( 'url' ),
                "fs" : false,
                "util": require.resolve("util/"),
            }
        },
        resolveLoader: {
            plugins: [
                // Also related to Plug'n'Play, but this time
                // it tells Webpack to load its loaders
                // from the current package.
                PnpWebpackPlugin.moduleLoader( module ),
            ],
        },
        stats: isEnvProduction ?
            'normal'
            : 'detailed', //'verbose',
        watchOptions: {
            aggregateTimeout: 600,
            ignored: [
                '**/node_modules',
                '**/.git',
                '**/server',
                '**/docs',
            ],
        },
    });

};
