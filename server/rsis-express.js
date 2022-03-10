// const debug = require( 'debug' )('rsis:express');
const express = require( 'express' );

const {
    consoleLogger,
    httpResponseCodes: HTTP,
    send200Ok,
    send201Created,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( './helpers/' );

const defaultLogger = consoleLogger( '[rsis:express]' );

const app = express();

app.getStateHandler = function getStateHandler(
    res,
    logger = defaultLogger
) {
    const STATE_HANDLERS = {

        [HTTP.OK]: (result) => {
            logger.info( result.logMessage );
            return send200Ok( res, result.response );
        },

        [HTTP.CREATED]: (result) => {
            logger.info( result.logMessage );
            return send201Created( res, result.response );
        },

        [HTTP.NO_CONTENT]: (result) => {
            logger.info( result.logMessage );
            //debug( '[h-DELETE]:', result.response );
            //TODO: Client не получает тело json-ответа
            return send204NoContent( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            logger.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.NOT_FOUND]: (result) => {
            logger.warn( result.logMessage );
            return send404NotFound( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            const { logMessage, response } = result;
            // debug( 'typeof response is', typeof result.response );// 'object'
            // debug( Object.keys( result.response )); // []
            // debug( 'response instanceof Error', response instanceof Error ); //true
            // debug( response );
            logger.error( logMessage );
            // debug( 'err.name:', err.name );
            // debug( 'err.message:', err.message );
            // debug( 'err.toString():', err.toString() );
            const len = response?.stack.split('\n').length;
            logger.debug( `err.stack (${len}):`, response?.stack );
            return send500ServerError( res, response );
        }
    };

    function handler (appLogicResult) {
        // throw new Error( `Test ERROR in Handler.`);
        const { statusCode } = appLogicResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( appLogicResult );
        }
        throw new Error( `Handler of ${statusCode} not implemented.`);
    }

    return handler;
};


module.exports = app;
