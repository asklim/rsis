import {
    // debugFactory,
    Logger,
    RsisExpress,
    Request,
    Response,
    send500ServerError,
} from '<srv>/helpers/';

import ItemsBalances from '<srv>/applogic/items-balances/';

const log = new Logger('[items-balances:api]');
//const d = debugFactory('-dbg:items-balances:api');

/**
 * Read a items-balance by uuid or objId
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * ---
 * variant 1 (parameter)
 * @usage GET /api/registr/items-balances/:documentId
 * ---
 * variant 2 (query)
 * @usage GET /api/registr/items-balances?queryString
 * @usage GET /api/registr/items-balances/?queryString
 * ---
 * queryString:
 * * filial=filialId & creator=rsisjs & onDate=isoDate & agent=agentId
 * * format isoDate as YYYY-MM-DD
 **/
export default async function hapi_registr_itemsBalances_GET (
    req: Request,
    res: Response
) {
    const { documentId } = req.params;

    documentId ?
        log.debug('[h-GET] try read document, req.params:', req.params )
        : log.debug('[h-GET] try read document, req.query:', req.query )
    ;

    try {
        let readResult: any;
        if ( documentId === 'list') {
            log.debug('[h-GET] try find documents, req.query:', req.query );
            readResult = await (new ItemsBalances).find( req.query );
        }
        else {
            readResult = ( documentId ) ?
                await (new ItemsBalances).readById( documentId )
                : await (new ItemsBalances).readByQuery( req.query );
        }
        const app = req.app as RsisExpress;
        const handle = app.getStateHandler( res, log );
        handle( readResult );
    }
    catch (err) {
        log.error( err );
        send500ServerError( res, err as Error );
    }
};
