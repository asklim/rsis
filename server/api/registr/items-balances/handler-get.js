//const debug = require('debug')('-dbg:items-balances:api');

const {
    consoleLogger,
    send500ServerError,
} = require('../../../helpers/');

const log = consoleLogger('[items-balances:api]');
const ItemsBalances = require(`../../../applogic/items-balances/`);


/**
 * Read a items-balance by uuid or objId
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage GET /api/registr/items-balances/:documentId
 * @usage GET /api/registr/items-balances?queryString
 * @usage GET /api/registr/items-balances/?queryString
 * @usage queryString:
 * filial=filialId & creator=rsisjs
 * onDate=isoDate as YYYY-MM-DD & agent=agentId
 **/
module.exports = async function itemsBalancesHandler_GET (req, res) {

    const { documentId } = req.params;

    documentId ?
        log.debug('[h-GET] try read document, req.params:', req.params )
        : log.debug('[h-GET] try read document, req.query:', req.query )
    ;

    try {
        let readResult;
        if( documentId == 'list') {
            log.debug('[h-GET] try find documents, req.query:', req.query );
            readResult = await (new ItemsBalances).find( req.query );
        }
        else {
            readResult = ( documentId ) ?
                await (new ItemsBalances).readById( documentId )
                : await (new ItemsBalances).readByQuery( req.query );
        }
        req.app.getStateHandler( res, log )( readResult );
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};
