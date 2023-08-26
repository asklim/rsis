
import * as asklim from 'asklim';
const { http, Logger } = asklim;

const {
    send200Ok,
    send201Created,
    send204NoContent,
    send400BadRequest,
    send401UnAuthorized,
    send404NotFound,
    send409Conflict,
    send500ServerError,
    callbackError400,
    callbackError405,
} = http;

import consoleLogger from './logger.js';
import getProcessEnvWithout from './get-process-env-without.js';
import { makeResult,
    makeErrorResult } from './make-results.js';

import { shrinkServerRes } from './debug-utils.js';
import StatusCodes from './status-codes-enum.js';

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
    send401UnAuthorized,
    send404NotFound,
    send409Conflict,
    send500ServerError,
    callbackError400,
    callbackError405,
    icwd,
    getProcessEnvWithout,
    consoleLogger, // переопределяет из 'asklim'
    makeResult,
    makeErrorResult,
    shrinkServerRes,
};
