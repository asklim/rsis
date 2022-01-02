const debug = require( 'debug' )( 'registr:items-balances:' );

const {
    consoleLogger,
    httpResponseCodes: HTTP,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-registr:' );
const ItemsBalances = require( `../../../applogic/items-balances` );


/**
 * Read a items-balance by uuid or objId
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage var.1 |
 * GET /api/registr/items-balances/:documentId
 * @usage var.2 |
 * GET /api/registr/items-balances?queryString
 * @usage var.2 |
 * GET /api/registr/items-balances/?queryString
 * @usage queryString:
 * filial=filialId & creator=rsisjs
 * onDate=isoDate as YYYY-MM-DD & agent=agentId
 **/

module.exports = async function itemsBalancesHandler_GET (req, res) {


    debug(
        '[h-GET] try read document',
        '\nI: finding items-balance`s params:', req.params,
        '\nI: finding items-balance`s query:', req.query
    );

    const STATE_HANDLERS = {

        [HTTP.OK]: (result) => {
            log.info( result.logMessage );
            return send200Ok( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.NOT_FOUND]: (result) => {
            log.warn( result.logMessage );
            return send404NotFound( res, result.response );
        },

        [HTTP.CONFLICT]: (result) => {
            log.warn( result.logMessage );
            return send409Conflict( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            return send500ServerError( res, result.response );
        }
    };

    try {
        const { documentId } = req.params;

        const readResult = ( documentId )
            ? await ItemsBalances.readById( documentId )
            : await ItemsBalances.readByQuery( req.query );

        const { statusCode } = readResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( readResult );
        }

        throw new Error( `Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};

