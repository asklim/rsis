
const { httpResponseCodes } = require( `asklim` );
// const helpers = require( 'asklim' );
//const serverConfig = require( '../server-config' );

const httpResponses = require( './http-responses.js' );
const consoleLogger = require( './logger.js' );
const getProcessEnvWithout = require( './get-process-env-without.js' );
const makeResults = require( './make-results.js' );

//console.log( 'helpers\n', helpers ); // {}

const icwd = require( 'fs' ).realpathSync( process.cwd() );

module.exports = {
    httpResponseCodes,
    ... httpResponses,
    //... helpers,
    //NO [Circular] ... require( './herokuapp' ), // ONLY direct from file
    //NO [Circular] ... require( './send-to-webapp' ), // ONLY direct from file
    icwd,
    getProcessEnvWithout,
    consoleLogger, // переопределяет из 'asklim'
    ... makeResults,
};
