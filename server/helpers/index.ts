
import {
    realpathSync,
    readFileSync,
} from 'node:fs';

import express from 'express';
import /*axios,*/ { AxiosError } from 'axios';

import {
    http,
    IConsoleLogger,
    Logger,
} from 'asklim';

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

import consoleLogger from './logger';
// import getProcessEnvWithout from './get-process-env-without';
import { makeResult,
    makeErrorResult } from './make-results';

import { shrinkServerRes } from './debug-utils';
import StatusCodes from './status-codes-enum';

const icwd = realpathSync( process.cwd() );
const packageJson = JSON.parse( readFileSync(`${icwd}/package.json`, 'utf-8'));
const { version } = packageJson;


//NO [Circular] ... require('./herokuapp'), // ONLY direct from file
//NO [Circular] ... require('./send-to-webapp'), // ONLY direct from file

export { default as env } from './env';
export { default as debugFactory } from 'debug';
export {
    express,
    Logger,
    logAxiosError,
    IConsoleLogger,
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
    version,
    // getProcessEnvWithout,
    consoleLogger, // переопределяет из 'asklim'
    makeResult,
    makeErrorResult,
    shrinkServerRes,
};


function logAxiosError (
    error: unknown,
    logger: IConsoleLogger
) {
    const err = error as AxiosError;
    logger.error('err.config', err.config );
    // log.error( err );
    if( err.response ){
        // The request was made and the server
        // responded with a status code
        // that falls out of the range of 2xx
        logger.error('err.response.headers', err.response.headers );
        logger.error('err.response.status', err.response.status );
        logger.error('err.response.data', err.response.data );
    }
    else if( err.request ) {
        // The request was made but
        // no response was received.
        // `error.request` is an instance of
        // XMLHttpRequest in the browser and
        // an instance of http.ClientRequest in node.js
        logger.error('err.request', err.request );
    }
    else {
        // Something happened in setting up the request
        // that triggered an Error
        logger.error('Error', err.message );
    }

}
