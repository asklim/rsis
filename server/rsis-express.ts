
/** @ typedef { import ("../@types/server/rsis-express").RsisExpress} RsisExpress */
import express, {
    Express,
    // Request,
    Response
}  from 'express';

import {
    debugFactory,
    env,
    IConsoleLogger,
    Logger,
    StatusCodes as HTTP,
    send200Ok,
    send201Created,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send409Conflict,
    send500ServerError,
} from './helpers/';

import { HandlerFn } from './types';

const d = debugFactory('rsis:express');
const defaultLogger = new Logger('[rsis:express]');

export interface RsisExpress extends Express {
    getMyDB (): any;
    logger: IConsoleLogger;
    startTimestamp: number | undefined;
    getStartTime: () => number | undefined;
    // eslint-disable-next-line no-unused-vars
    getStateHandler: (r: Response, l?: IConsoleLogger) => HandlerFn;
}


const app = express() as RsisExpress;


/*******************************************************
 * Get port from environment and store in Express.
 */
app.set('port', env.PORT );

app.logger = defaultLogger;
app.getMyDB = function () {
    this.logger?.debug('Call from rsisExpressApp.getMyDB !!!!!!!!!!!!!!!');
};

app.startTimestamp = Date.now();
app.getStartTime = function () { return this.startTimestamp;};
d(`(at define) app.getStartTime: ${app.getStartTime()}`);

//d('app(define).logger is', ({}).hasOwnProperty.call( app, 'logger'));


app.getStateHandler = function getStateHandler(
    res,
    logger = defaultLogger
) {
    const STATE_HANDLERS = {

        [HTTP.OK]: (result) => {
            logger.info( result.logMessage );
            send200Ok( res, result.response );
            return;
        },

        [HTTP.CREATED]: (result) => {
            logger.info( result.logMessage );
            send201Created( res, result.response );
            return;
        },

        [HTTP.NO_CONTENT]: (result) => {
            logger.info( result.logMessage );
            //debug('[h-DELETE]:', result.response );
            //TODO: Client не получает тело json-ответа
            send204NoContent( res, result.response );
            return;
        },

        [HTTP.BAD_REQUEST]: (result) => {
            logger.warn( result.logMessage );
            send400BadRequest( res, result.response );
            return;
        },

        [HTTP.NOT_FOUND]: (result) => {
            logger.warn( result.logMessage );
            send404NotFound( res, result.response );
            return;
        },

        [HTTP.CONFLICT]: (result) => {
            logger.warn( result.logMessage );
            return send409Conflict( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            const { logMessage, response } = result;
            // d('typeof response is', typeof result.response );// 'object'
            // d( Object.keys( result.response )); // []
            // d('response instanceof Error', response instanceof Error ); //true
            // d( response );
            logger.error( logMessage );
            // d('err.name:', err.name );
            // d('err.message:', err.message );
            // d('err.toString():', err.toString() );
            const len = response?.stack?.split('\n').length;
            logger.debug(`err.stack (${len}):`, response?.stack );
            send500ServerError( res, response );
            return;
        }
    };

    function handler (appLogicResult) {
        // throw new Error(`Test ERROR in Handler.`);
        const { statusCode } = appLogicResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( appLogicResult );
        }
        // throw new Error(`Handler of ${statusCode} not implemented.`);
        logger.warn(`Handler of ${statusCode} not implemented.`);
    }

    return handler;
};


export default app;
