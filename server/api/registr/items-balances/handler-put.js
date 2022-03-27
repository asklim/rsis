//const debug = require( 'debug' )( '-dbg:items-balances:api' );
const {
    consoleLogger,
    send400BadRequest,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( '[items-balances:api]' );
const ItemsBalances = require( `../../../applogic/items-balances/` );


/**
 * Update items-balance document
 * @fires 200 OK     & message
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage PUT /api/registr/items-balances
 */
module.exports = async function itemsBalancesHandler_PUT (req, res) {

    const agent = req.body?.agent;
    const filial = req.body?.filial;
    const onDate = req.body?.onDate;

    const { documentId } = req.params;

    log.debug( '[h-PUT] ' + (documentId ?
        `try update, documentId is '${documentId}'`
        : `try update for filial=${filial}, onDate=${onDate}, agent=${agent}`)
    );

    if( !req.body || !Object.keys( req.body ).length ) {
        log.warn( '[h-PUT] req.body is empty.' );
        return send400BadRequest( res, 'Bad request, req.body is empty.' );
    }

    try {
        const updateResult = await (new ItemsBalances).updateOrCreate( req.body );

        req.app.getStateHandler( res, log )( updateResult );
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};

