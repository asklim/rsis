
// const {
//     StatusCode: httpResponseCodes,
//     ExpressResponses,

// @ts-ignore
const asklim = require('asklim');
const { http, Logger } = asklim;

//const serverConfig = require('../server-config');

// const httpResponses = require('./http-responses.js');
const consoleLogger = require('./logger.js');
const getProcessEnvWithout = require('./get-process-env-without.js');
const makeResults = require('./make-results.js');

//console.log('helpers\n', helpers ); // {}

const icwd = require('fs').realpathSync( process.cwd() );

function shrinkServerRes( serverRes ) {
    const {
        outputSize,
        _header,
        _startTime,
        statusCode,
        statusMessage,
    } = serverRes;
    return ({
        outputSize,
        _header,
        _startTime,
        statusCode,
        statusMessage,
    });
}

module.exports = {
    Logger,
    ... http,
    //... helpers,
    //NO [Circular] ... require('./herokuapp'), // ONLY direct from file
    //NO [Circular] ... require('./send-to-webapp'), // ONLY direct from file
    icwd,
    getProcessEnvWithout,
    consoleLogger, // переопределяет из 'asklim'
    ... makeResults,
    shrinkServerRes,
};
