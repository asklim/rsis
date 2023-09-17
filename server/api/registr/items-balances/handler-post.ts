
import {
    Logger,
    RsisExpress,
    Request,
    Response,
    send400BadRequest,
    send500ServerError,
} from '<srv>/helpers/';
import ItemsBalances from '<srv>/applogic/items-balances/';

const log = new Logger('[items-balances:api]');
//const d = debugFactory('-dbg:items-balances:api');

/**
 * Create a new items-balance
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict & message
 * @fires 500 Server Error & error object
 * @usage POST /api/registr/items-balances
 */
export default async function hapi_registr_itemsBalances_POST (
    req: Request,
    res: Response
) {
    const agent = req?.body?.agent
        , filial = req?.body?.filial
        , onDate = req?.body?.onDate
    ;
    const info = `filial=${filial}, onDate=${onDate}, agent=${agent}`;
    log.debug(`[h-POST] try create: ${info}`);

    if ( !req.body
        || !Object.keys( req.body ).length ) {
        log.warn(`[h-POST] req.body is empty (${info}).`);
        send400BadRequest( res, 'Bad request, req.body is empty.');
        return;
    }

    try {
        const createResult = await (new ItemsBalances).createOne( req.body );
        const app = req.app as RsisExpress;
        const handle = app.getStateHandler( res, log );
        handle( createResult );
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err as Error );
    }
};
