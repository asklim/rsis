import {
    // debugFactory,
    Logger,
    RsisExpress,
    Request,
    Response,
    send400BadRequest,
    send500ServerError,
} from '<srv>/helpers/';

import ItemsBalances from '<srv>/applogic/items-balances/';

const log = new Logger('[items-balances:api]');
// const d = debugFactory('-dbg:items-balances:api');

/**
 * Delete items-balances document by uuid, ObjId
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @usage DELETE /api/registr/items-balances/:documentId
 * @example
 * DELETE /api/registr/items-balances/60950e87258015071e86c8f7
 * DELETE /api/registr/items-balances/f2ab5c11-a252-4f65-b278-adb3afe12bcd
 **/
export default async function hapi_registr_itemsBalances_DELETE (
    req: Request,
    res: Response
) {
    const { documentId } = req.params;
    documentId ?
        log.debug('[h-DELETE] try delete document, req.params:', req.params )
        : log.debug('[h-DELETE] try delete document, req.query:', req.query )
    ;

    if ( !documentId ) {
        log.warn('[h-DELETE] No <documentId>.');
        send400BadRequest( res, 'Bad request, No <documentId>.');
        return;
    }

    try {
        const deleteResult = await (new ItemsBalances).deleteById( documentId );

        const app = req.app as RsisExpress;
        const handle = app.getStateHandler( res, log );
        handle( deleteResult );
    }
    catch (err) {
        log.error( err );
        send500ServerError( res, err as Error );
    }
};
