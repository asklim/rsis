
const path = require( 'path' );
const webpack = require( 'webpack' );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );


const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );


const WorkboxWebpackPlugin = require( 'workbox-webpack-plugin' );

const paths = require( './paths' );
const modules = require( './modules' );

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const getCSSModuleLocalIdent = require( 'react-dev-utils/getCSSModuleLocalIdent' );

const InlineChunkHtmlPlugin = require( 'react-dev-utils/InlineChunkHtmlPlugin' );


const getClientEnvironment = require( './env' );

const PnpWebpackPlugin = require( 'pnp-webpack-plugin' );
const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );
const postcssNormalize = require( 'postcss-normalize' );
const InterpolateHtmlPlugin = require( 'react-dev-utils/InterpolateHtmlPlugin' );
const ModuleScopePlugin = require( 'react-dev-utils/ModuleScopePlugin' );
const ModuleNotFoundPlugin = require( 'react-dev-utils/ModuleNotFoundPlugin' );
//const WatchMissingNodeModulesPlugin =
//      require( 'react-dev-utils/WatchMissingNodeModulesPlugin');
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );


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

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

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
    const publicPath = isEnvProduction
        ? paths.servedPath
        : isEnvDevelopment && '/';

    // Some apps do not use client-side routing with pushState.
    // For these, "homepage" can be set to "." to enable relative asset paths.
    const shouldUseRelativeAssetPaths = publicPath === './';

    // `publicUrl` is just like `publicPath`, but we will provide it to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    const publicUrl = isEnvProduction
        ? publicPath.slice( 0, -1 )
        : isEnvDevelopment && '';

    // Get environment variables to inject into our app.
    const env = getClientEnvironment( publicUrl );

    // common function to get style loaders
    const getStyleLoaders = ( cssOptions, preProcessor ) => {

        const loaders = [
            isEnvDevelopment && require.resolve( 'style-loader' ),
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                //options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
            },
            {
                loader: require.resolve( 'css-loader' ),
                options: cssOptions,
            },
            {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve( 'postcss-loader' ),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    postcssOptions: {
                        plugins: [
                            require( 'postcss-flexbugs-fixes' ),
                            require( 'postcss-preset-env' )({
                                autoprefixer: {
                                    flexbox: 'no-2009',
                                },
                                stage: 3,
                            }),
                            // Adds PostCSS Normalize as the reset css with default options,
                            // so that it honors browserslist config in package.json
                            // which in turn let's users customize the target behavior as per their needs.
                            postcssNormalize(),
                        ]
                    },
                },
            },
        ].filter( Boolean );

        if( preProcessor ) {

            loaders.push(
                {
                    loader: require.resolve( 'resolve-url-loader' ),
                    options: {
                        sourceMap: isEnvProduction && shouldUseSourceMap,
                    },
                },
                {
                    loader: require.resolve( preProcessor ),
                }
            );
        }
        return loaders;
    };


    return {

        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

        // Stop compilation early in production
        bail: isEnvProduction,
        stats: isEnvProduction
            ? 'normal'
            : 'detailed', //'verbose',
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? 'source-map'
                : false
            : isEnvDevelopment && 'inline-source-map',

        // These are the "entry points" to our application.
        // This means they will be the "root" imports that are included in JS bundle.
        entry : [
            // Finally, this is your app's code:
            paths.appIndexJs,
        ],
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
            globalObject: 'this',
        },
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
        //: {},
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
        module: {
            rules: [
                // First, run the linter.
                // It's important to do this before Babel processes the JS.
                /*{
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    enforce: 'pre',
                    loader: require.resolve('eslint-loader'),
                    options: {
                        cache: true,
                        formatter: require.resolve('react-dev-utils/eslintFormatter'),
                        eslintPath: require.resolve('eslint'),
                        resolvePluginsRelativeTo: __dirname,
                    },
                    include: paths.appSrc,
                },*/
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto',
                    use: [],
                },
                {
                    // "oneOf" will traverse all following loaders until one will
                    // match the requirements. When no loader matches it will fall
                    // back to the "file" loader at the end of the loader list.
                    oneOf: [
                        // A missing `test` is equivalent to a match.
                        {
                            //test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
                            test: /\.(bmp|gif|jpe?g|png|ico)$/,
                            type: 'asset/resource',
                            generator: {
                                filename: 'images/[hash][ext][query]'
                            }
                        },
                        // Fonts and SVGs: Inline files
                        {
                            test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                            type: 'asset/inline',
                            generator: {
                                filename: 'fonts/[hash][ext][query]'
                            }
                        },
                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: paths.appSrc,
                            exclude: /node_modules/,
                            loader: require.resolve( 'babel-loader' ),
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react'
                                ],
                                plugins: [
                                    'react-hot-loader/babel',
                                ],
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                // cacheCompression: false,             //isEnvProduction,
                                // compact: isEnvProduction,
                            },
                        },
                        // Process any JS outside of the app with Babel.
                        // Unlike the application JS, we only compile the standard ES features.
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve( 'babel-loader' ),
                            options: {
                                babelrc: false,
                                configFile: false,
                                compact: false,
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,

                                // If an error happens in a package, it's possible to be
                                // because it was compiled. Thus, we don't want the browser
                                // debugger to show the original code. Instead, the code
                                // being evaluated would be much more helpful.
                                sourceMaps: false,
                            },
                        },
                        // "postcss" loader applies autoprefixer to our CSS.
                        // "css" loader resolves paths in CSS and adds assets as dependencies.
                        // "style" loader turns CSS into JS modules that inject <style> tags.
                        // In production, we use MiniCSSExtractPlugin to extract that CSS
                        // to a file, but in development "style" loader enables hot editing
                        // of CSS.
                        // By default we support CSS Modules with the extension .module.css
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    sourceMap: isEnvProduction && shouldUseSourceMap,
                                }),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                        // using the extension .module.css
                        {
                            test: cssModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    sourceMap: isEnvProduction && shouldUseSourceMap,
                                    modules: true,
                                    getLocalIdent: getCSSModuleLocalIdent,
                                }),
                        },
                        // Opt-in support for SASS (using .scss or .sass extensions).
                        // By default we support SASS Modules with the
                        // extensions .module.scss or .module.sass
                        {
                            test: sassRegex,
                            exclude: sassModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 2,
                                    sourceMap: isEnvProduction && shouldUseSourceMap,
                                },
                                'sass-loader'
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        // Adds support for CSS Modules, but using SASS
                        // using the extension .module.scss or .module.sass
                        {
                            test: sassModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 2,
                                    sourceMap: isEnvProduction && shouldUseSourceMap,
                                    modules: true,
                                    getLocalIdent: getCSSModuleLocalIdent,
                                },
                                'sass-loader'
                            ),
                        },
                        // "file" loader makes sure those assets get served by WebpackDevServer.
                        // When you `import` an asset, you get its (virtual) filename.
                        // In production, they would get copied to the `build` folder.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            loader: require.resolve( 'file-loader' ),
                            // Exclude `js` files to keep "css" loader working as
                            // it injects its runtime that would otherwise be
                            // processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they
                            // get processed by webpacks internal loaders.
                            exclude: [
                                /\.(js|mjs|jsx|ts|tsx)$/,
                                /\.html$/,
                                /\.json$/,
                            ],
                            options: {
                                name: 'assets/[name].[contenthash].[ext]',
                            },
                        },
                        // ** STOP ** Are you adding a new loader?
                        // Make sure to add the new loader(s) before the "file" loader.
                    ],
                },
            ],
        },
        plugins: [
            // The ProgressPlugin provides a way to customize how progress is
            // reported during a compilation.
            // new webpack.ProgressPlugin(),

            // By default, this plugin will remove all files inside webpack's
            // output.path directory, as well as all unused webpack assets after
            // every successful rebuild.
            new CleanWebpackPlugin(),

            // Copies files from target to destination folder
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: paths.appSrc + '/public',
                        to: 'assets/',
                        globOptions: {
                            ignore: [ '*.DS_Store' ],
                        },
                        noErrorOnMissing: true,
                    },
                ],
            }),
            // Generates an `index.html` file with the <script> injected.
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        title: isEnvProduction
                            ? 'rsis local'
                            : 'rsis dev-mode',
                        template: paths.appHtmlTemplate,
                    },
                    isEnvProduction
                        ? {
                            minify: {
                                removeComments: true,
                                collapseWhitespace: true,
                                removeRedundantAttributes: true,
                                useShortDoctype: true,
                                removeEmptyAttributes: true,
                                removeStyleLinkTypeAttributes: true,
                                keepClosingSlash: true,
                                minifyJS: true,
                                minifyCSS: true,
                                minifyURLs: true,
                            },
                        }
                        : undefined
                )
            ),

            // Inlines the webpack runtime script.
            // This script is too small to warrant a network request.
            // https://github.com/facebook/create-react-app/issues/5358
            isEnvProduction &&
            shouldInlineRuntimeChunk &&
                new InlineChunkHtmlPlugin( HtmlWebpackPlugin, [ /main.+[.]js/ ]),

            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
            // In production, it will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            // In development, this will be an empty string.
            new InterpolateHtmlPlugin( HtmlWebpackPlugin, env.raw ),

            // This gives some necessary context
            // to module not found errors,
            // such as the requesting resource.
            new ModuleNotFoundPlugin( paths.appPath ),

            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
            // It is absolutely essential that NODE_ENV is set to production
            // during a production build.
            // Example of use:
            //     new webpack.DefinePlugin({
            //         "process.env.NODE_ENV": JSON.stringify( 'development' )
            //     }),
            // Otherwise React will be compiled in the very slow development mode.
            new webpack.DefinePlugin( env.stringified ),

            // Watcher doesn't work well if you mistype casing in a path so we use
            // a plugin that prints an error when you attempt to do this.
            // See https://github.com/facebook/create-react-app/issues/240
            isEnvDevelopment &&
                new CaseSensitivePathsPlugin(),

            // If you require a missing module and then `npm install` it, you still have
            // to restart the development server for Webpack to discover it. This plugin
            // makes the discovery automatic so you don't have to restart.
            // See https://github.com/facebook/create-react-app/issues/186
            //isEnvDevelopment &&
            //    new WatchMissingNodeModulesPlugin( paths.appNodeModules ),

            isEnvProduction &&
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'css/[name].[contenthash].css',
                chunkFilename: 'css/[name].[contenthash].chunk.css',
            }),

            // Generate an asset manifest file with the following content:
            // - "files" key: Mapping of all asset filenames to their corresponding
            //   output file so that tools can pick it up without having to parse
            //   `index.html`
            // - "entrypoints" key: Array of files which are included in `index.html`,
            //   can be used to reconstruct the HTML if necessary
            new WebpackManifestPlugin({

                fileName: 'asset-manifest.json',
                publicPath: publicPath,
                generate: (seed, files, entrypoints) => {

                    const manifestFiles = files.reduce((manifest, file) => {
                        manifest[ file.name ] = file.path;
                        return manifest;
                    }, seed);

                    const entrypointFiles = entrypoints.main.filter(
                        fileName => !fileName.endsWith( '.map' )
                    );

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            }),
            // Generate a service worker script that will precache, and keep up to date,
            // the HTML & assets that are part of the Webpack build.
            isEnvProduction &&
            new WorkboxWebpackPlugin.GenerateSW({

                clientsClaim: true,
                exclude: [ /\.map$/, /asset-manifest\.json$/ ],
                //importWorkboxFrom: 'cdn',
                navigateFallback: publicUrl + '/index.html',
                navigateFallbackDenylist: [
                    // Exclude URLs starting with /_, as they're likely an API call
                    new RegExp( '^/_' ),
                    // Exclude any URLs whose last part seems to be a file extension
                    // as they're likely a resource and not a SPA route.
                    // URLs containing a "?" character won't be blacklisted as they're likely
                    // a route with query params (e.g. auth callbacks).
                    new RegExp( '/[^/?]+\\.[^/]+$' ),
                ],
            }),
        ].filter( Boolean ),

        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        // Uncaught ReferenceError: global is not defined,
        // if: node: false,
        node : {}, // it`s Ok
        // Turn off performance processing because we utilize
        // our own hints via the FileSizeReporter
        performance: isEnvProduction
            ? {
                maxEntrypointSize: 512000,
                maxAssetSize: 512000,
            }
            : false,
    };

};
