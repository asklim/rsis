
import {
    Logger,
    RsisExpress,
    Request,
    Response,
    send400BadRequest,
    send500ServerError,
} from '<srv>/helpers';
import ItemsBalances from '<srv>/applogic/items-balances/';

const log = new Logger('[items-balances:api]');
//const d = debugFactory('-dbg:items-balances:api');

/**
 * Update items-balance document
 * @fires 200 OK     & message
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @usage PUT /api/registr/items-balances
 */
export default async function hapi_registr_itemsBalances_PUT (
    req: Request,
    res: Response
) {
    const agent = req?.body?.agent
        , filial = req?.body?.filial
        , onDate = req?.body?.onDate
    ;
    const docId = req?.params?.documentId;
    const info = `filial=${filial}, onDate=${onDate}, agent=${agent}, documentId=${docId}`;

    log.debug(`[h-PUT] try update for ${info}`);

    if ( !req.body
        || !Object.keys( req.body ).length ) {
        log.warn(`[h-PUT] req.body is empty (${info}).`);
        send400BadRequest( res, 'Bad request, req.body is empty.');
        return;
    }

    try {
        const updateResult = await (new ItemsBalances).updateOrCreate( req.body );
        const app = req.app as RsisExpress;
        const handle = app.getStateHandler( res, log );
        handle( updateResult );
    }
    catch (err) {
        log.error( err );
        send500ServerError( res, err as Error );
    }
};
