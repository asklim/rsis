//const debug = require( 'debug' )( 'api:items-balances:' );

const {
    consoleLogger,
    /*httpResponseCodes: HTTP,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send409Conflict,*/
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( '[items-balances:api]' );
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


    const { documentId } = req.params;

    documentId ?
        log.debug( '[h-GET] try read document, req.params:', req.params )
        : log.debug( '[h-GET] try read document, req.query:', req.query )
    ;

    try {
        const readResult = ( documentId ) ?
            await ItemsBalances.readById( documentId )
            : await ItemsBalances.readByQuery( req.query );

        req.app.getStateHandler( res, log )( readResult );
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};

