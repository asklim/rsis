
const webpack = require( 'webpack' );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const WorkboxWebpackPlugin = require( 'workbox-webpack-plugin' );

const InlineChunkHtmlPlugin = require( 'react-dev-utils/InlineChunkHtmlPlugin' );

const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );
const InterpolateHtmlPlugin = require( 'react-dev-utils/InterpolateHtmlPlugin' );
const ModuleNotFoundPlugin = require( 'react-dev-utils/ModuleNotFoundPlugin' );
//const WatchMissingNodeModulesPlugin =
//      require( 'react-dev-utils/WatchMissingNodeModulesPlugin');
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );



module.exports = function (buildOptions) {

    const {
        appVersion,
        isEnvDevelopment,
        isEnvProduction,
        env,
        paths,
        publicPath,
        publicUrl,
        //shouldUseSourceMap,
        shouldInlineRuntimeChunk,

    } = buildOptions;

    return [
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
                    appVersion,
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
    ].filter( Boolean );
};