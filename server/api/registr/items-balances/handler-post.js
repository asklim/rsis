//const debug = require('debug')('-dbg:items-balances:api');
const {
    consoleLogger,
    send400BadRequest,
    send500ServerError,
} = require('../../../helpers/');

const log = consoleLogger('[items-balances:api]');
const ItemsBalances = require(`../../../applogic/items-balances/`);


/**
 * Create a new items-balance
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict & message
 * @fires 500 Server Error & error object
 * @usage
 * POST /api/registr/items-balances
 */
module.exports = async function hapi_registr_itemsBalances_POST (
    req,
    res
) {
    const agent = req?.body?.agent;
    const filial = req?.body?.filial;
    const onDate = req?.body?.onDate;
    log.debug('[h-POST] ' +
        `try create: filial=${filial}, onDate=${onDate}, agent=${agent}`
    );

    if( !req.body
        || !Object.keys( req.body ).length ) {
        log.warn('[h-POST] req.body is empty.');
        send400BadRequest( res, 'Bad request, req.body is empty.');
        return;
    }

    try {
        const createResult = await (new ItemsBalances).createOne( req.body );
        req.app.getStateHandler( res, log )( createResult );
    }
    catch (err) {
        log.error( err );
        // @ts-ignore
        return send500ServerError( res, err );
    }

};
