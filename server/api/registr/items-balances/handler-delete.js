const debug = require( 'debug' )( 'registr:items-balances handler-DELETE:' );

const {
    consoleLogger,
    httpResponseCodes: HTTP,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const ItemsBalances = require( `../../../applogic/items-balances` );

const log = consoleLogger( 'api-registr:' );


/**
 * Delete items-balances document by uuid, ObjId
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @usage
 * DELETE /api/registr/items-balances/:documentId
 * @example
 * DELETE /api/registr/items-balances/60950e87258015071e86c8f7
 * DELETE /api/registr/items-balances/f2ab5c11-a252-4f65-b278-adb3afe12bcd
 **/

module.exports = async function itemsBalancesHandler_DELETE (req, res) {


    debug(
        'I: try delete document',
        '\nI: items-balance`s delete params:', req.params,
        '\nI: items-balance`s delete query:', req.query
    );

    const { documentId } = req.params;

    if( !documentId ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'items-balances.DELETE: No <documentId>.',
            response: 'Bad request, No <documentId>.'
        };
        log.warn( result.logMessage );
        return send400BadRequest( res, result.response );
    }


    const STATE_HANDLERS = {

        [HTTP.NO_CONTENT]: (result) => {
            log.info( result.logMessage );
            debug( 'result.response', result.response );

            //TODO: Client не получает тело json-ответа
            return send204NoContent( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.NOT_FOUND]: (result) => {
            log.warn( result.logMessage );
            return send404NotFound( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            return send500ServerError( res, result.response );
        }
    };

    try {
        const deleteResult = await ItemsBalances.deleteById( documentId );

        const { statusCode } = deleteResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( deleteResult );
        }

        throw new Error( `Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};

