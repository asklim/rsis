// const debug = require('debug')('-dbg:items-balances:api');

const {
    consoleLogger,
    send400BadRequest,
    send500ServerError,
} = require('../../../helpers/');

const log = consoleLogger('[items-balances:api]');
const ItemsBalances = require(`../../../applogic/items-balances/`);


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
module.exports = async function itemsBalancesHandler_DELETE (req, res) {

    const { documentId } = req.params;
    documentId ?
        log.debug('[h-DELETE] try delete document, req.params:', req.params )
        : log.debug('[h-DELETE] try delete document, req.query:', req.query )
    ;

    if( !documentId ) {
        log.warn('[h-DELETE] No <documentId>.');
        return send400BadRequest( res, 'Bad request, No <documentId>.');
    }

    try {
        const deleteResult = await (new ItemsBalances).deleteById( documentId );

        req.app.getStateHandler( res, log )( deleteResult );
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};
