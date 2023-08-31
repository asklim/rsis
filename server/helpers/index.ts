
import {
    realpathSync,
    readFileSync,
} from 'node:fs';

import express from 'express';

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

import consoleLogger from './logger.js';
import getProcessEnvWithout from './get-process-env-without.js';
import { makeResult,
    makeErrorResult } from './make-results.js';

import { shrinkServerRes } from './debug-utils.js';
import StatusCodes from './status-codes-enum.js';

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
    getProcessEnvWithout,
    consoleLogger, // переопределяет из 'asklim'
    makeResult,
    makeErrorResult,
    shrinkServerRes,
};
