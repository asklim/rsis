
//const debug = require('debug')('api:catalogLayouts');
const {
    //icwd,
    consoleLogger,
    StatusCodes: HTTP,
    send201Created,
    send400BadRequest,
    //send409Conflict,
    send500ServerError,
} = require('../../../helpers');

const CatalogLayouts = require(`../../../applogic/catalog-layouts`);

const log = consoleLogger('[catalogLayouts:api]');


/**
 * Create a new catalog layout
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @usage
 * POST /api/config/catalog-layouts
*/
module.exports = async function catalogLayoutsHandler_POST (
    req,
    res
) {
    const client = req?.body?.client;
    const list = req?.body?.list;

    log.info(`try create, config/catalog-layouts: client=${client}, list=${list}`);


    if( !req?.body
        || !Object.keys( req.body ).length ) {
        const result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.createOne: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        send400BadRequest( res, result.response );
        return;
    }


    const STATE_HANDLERS = {

        [HTTP.CREATED]: (result) => {
            log.info( result.logMessage );
            send201Created( res, result.response );
            return;
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            send400BadRequest( res, result.response );
            return;
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            send500ServerError( res, result.response );
            return;
        }
    };

    try {
        const resultOfCreate = await CatalogLayouts.createOne( req.body );
        const { statusCode } = resultOfCreate;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( resultOfCreate );
        }

        throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        // @ts-ignore
        send500ServerError( res, err );
    }

};
