console.time('build time is');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
// Warn and crash if required files are missing
if( !checkRequiredFiles([ paths.appHtml, paths.appIndexJs ]) ) {
    process.exit(1);
}

const path = require('path');
//const bfj = require('bfj');

/** Process CLI arguments
 *  script: "node scripts/bundle-builder.js --development-config --stats"
 *  argv:  [
 *     '/usr/bin/node',
 *     '/mnt/e/code/rsis/scripts/bundle-builder.js',
 *     '--development-config',
 *    '--stats'
 *  ]
**/
console.log('argv: ', process.argv );
const argv = process.argv.slice(2);
//const writeStatsJson = argv.indexOf('--stats') !== -1;
const isEnvDevelopment = argv.includes('--development-config');
const ENV_MODE = isEnvDevelopment ? 'development' : 'production';

// Do this as the first thing so that any code reading it knows the right env.
// process.env.BABEL_ENV = ENV_MODE;
// process.env.NODE_ENV = ENV_MODE;

// Generate configuration
const webpackConfiguration = isEnvDevelopment
    ? require('../config/webpack.dev')
    : require('../config/webpack.prod')
;
console.log('entry: ', webpackConfiguration.entry );
//console.log('devServer: ', webpackConfiguration.devServer );

// Ensure environment variables are read.
// require('../config/env');

const compiler = require('webpack')( webpackConfiguration );

const chalk = require('react-dev-utils/chalk');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const printBuildError = require('react-dev-utils/printBuildError');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

const formatWebpackMessages = require('./format-webpack5-messages');

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

console.log('before checkBrowsers, isInteractive', isInteractive );

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper');

checkBrowsers( paths.appPath, isInteractive ).
    then(() => {
        // First, read the current file sizes in build directory.
        // This lets us display how much they changed later.
        return measureFileSizesBeforeBuild( paths.appBuild );
    }).
    then( (previousFileSizes) => {
        // Start the webpack build
        return build( previousFileSizes );
    }).
    then( ({ stats, previousFileSizes, warnings }) => {
        if(
            warnings.length
        ){
            console.log( chalk.yellow('Compiled with warnings.\n'));
            console.log( warnings.join('\n\n'));
            console.log(
                '\nSearch for the ' +
                chalk.underline( chalk.yellow('keywords')) +
                ' to learn more about each warning.'
            );
            console.log(
                'To ignore, add ' +
                chalk.cyan('// eslint-disable-next-line') +
                ' to the line before.\n'
            );
        }
        else {
            console.log( chalk.green('Compiled successfully.\n'));
        }

        console.log('File sizes after gzip:\n');
        printFileSizesAfterBuild(
            stats,
            previousFileSizes,
            paths.appBuild,
            WARN_AFTER_BUNDLE_GZIP_SIZE,
            WARN_AFTER_CHUNK_GZIP_SIZE
        );
        console.log();

        const appPackage = require( paths.appPackageJson );
        const publicUrl = `"${paths.publicUrl}"`;
        const publicPath = webpackConfiguration.output.publicPath;
        const buildFolder = path.relative( process.cwd(), paths.appBuild );
        printHostingInstructions(
            appPackage,
            publicUrl,
            publicPath,
            buildFolder,
        );
    },
    (err) => {
        const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
        if( tscCompileOnError ) {
            console.log( chalk.yellow(
                'Compiled with the following type errors ' +
                '(you may want to check these before deploying your app):\n'
            ));
            printBuildError( err );
            process.exit(1);
        }
        else {
            console.log( chalk.red('Failed to compile.\n'));
            printBuildError( err );
            process.exit(1);
        }
    }).
    then( () => {
        console.timeEnd('build time is');
    }).
    catch( (err) => {
        if( err && err.message ) {
            console.log( err.message );
        }
        process.exit(1);
    });

/**
 * Function definition
 */

// Create the webpack build and print the deployment instructions.
//
function build (previousFileSizes) {

    console.log(`Creating an ${ENV_MODE} build...`);
    return new Promise( (resolve, reject) => {

        compiler.run( (err, stats) => {

            let messages;

            if( err ) {
                if( !err.message ) {
                    return reject( err );
                }
                messages = formatWebpackMessages({
                    errors: [err.message],
                    warnings: [],
                });
            }
            else {
                let statistics = stats.toJson('errors-warnings');

                console.log('Stats.toJson:\n', statistics );
                //Replaced on helper.formatWebpack5Messages
                messages = formatWebpackMessages( statistics );
            }

            if( messages?.errors?.length ) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader with noise.
                messages.errors.length = 1;
                return reject( new Error( messages.errors.join('\n\n')));
            }

            const resolveArgs = {
                stats,
                previousFileSizes,
                warnings: messages.warnings,
            };

            /*if( writeStatsJson ) {
                // ЗАВИСАЕТ ПРИ ЗАПИСИ.
                return bfj
                    .write( paths.appBuild + '/bundle-stats.json', stats.toJson() )
                    .then( () => resolve( resolveArgs ))
                    .catch( error => reject( new Error( error )));
            }*/

            return resolve( resolveArgs );
        });
    });
}
