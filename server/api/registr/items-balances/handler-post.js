const debug = require( 'debug' )( 'registr:items-balances:' );
const {
    consoleLogger,
    httpResponseCodes: HTTP,
    send201Created,
    send400BadRequest,
    send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const ItemsBalances = require( `../../../applogic/items-balances` );

const log = consoleLogger( 'api-registr:' );


/**
 * Create a new items-balance
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * POST /api/registr/items-balances
 */

module.exports = async function itemBalancesHandler_POST (req, res) {

    let filial, onDate;
    const agent = req.body?.agent;

    if( req.body ) {
        filial = req.body.filial;
        onDate = req.body.onDate;
    }
    debug( `[h-POST] try create: filial=${filial}, onDate=${onDate}, agent=${agent}` );


    if( !req.body
        || !Object.keys( req.body ).length ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'items-balances.POST: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        return send400BadRequest( res, result.response );
    }

    const STATE_HANDLERS = {

        [HTTP.CREATED]: (result) => {
            log.info( result.logMessage );
            return send201Created( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
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
        const createResult = await ItemsBalances.createOne( req.body );
        const { statusCode } = createResult;

        if( statusCode in STATE_HANDLERS ) {

            return STATE_HANDLERS[ statusCode ]( createResult );
        }

        throw new Error( `Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }

};
