
// const {
//     StatusCode: httpResponseCodes,
//     ExpressResponses,

// @ts-ignore
import * as asklim from 'asklim';
const { http, Logger } = asklim;

const {
    StatusCodes,
    send200Ok,
    send201Created,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send409Conflict,
    send500ServerError,
} = http;
//const serverConfig = require('../server-config');

// const httpResponses = require('./http-responses.js');
import consoleLogger from './logger.js';
import getProcessEnvWithout from './get-process-env-without.js';
import { makeResult,
    makeErrorResult } from './make-results.js';

import { shrinkServerRes } from './debug-utils.js';

const icwd = require('fs').realpathSync( process.cwd() );

//NO [Circular] ... require('./herokuapp'), // ONLY direct from file
//NO [Circular] ... require('./send-to-webapp'), // ONLY direct from file

export {
    Logger,
    StatusCodes,
    send200Ok,
    send201Created,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send409Conflict,
    send500ServerError,
    icwd,
    getProcessEnvWithout,
    consoleLogger, // переопределяет из 'asklim'
    makeResult,
    makeErrorResult,
    shrinkServerRes,
};
