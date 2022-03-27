//const debug = require( 'debug' )( '-dbg:items-balances:api' );
const {
    consoleLogger,
    send400BadRequest,
    send500ServerError,
} = require( '../../../helpers/' );

const log = consoleLogger( '[items-balances:api]' );
const ItemsBalances = require( `../../../applogic/items-balances/` );


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
    log.debug( '[h-POST] ' +
        `try create: filial=${filial}, onDate=${onDate}, agent=${agent}`
    );


    if( !req.body || !Object.keys( req.body ).length ) {
        log.warn( '[h-POST] req.body is empty.' );
        return send400BadRequest( res, 'Bad request, req.body is empty.' );
    }

    try {
        const createResult = await (new ItemsBalances).createOne( req.body );
        req.app.getStateHandler( res, log )( createResult );
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }

};

