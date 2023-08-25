
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
 * @name createOne
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * POST /api/config/catalog-layouts
 */

module.exports = async function catalogLayoutsHandler_POST (req, res) {

    let client, list;

    if( req.body ) {
        client = req.body.client;
        list = req.body.list;
    }
    log.info(`try create, config/catalog-layouts: client=${client}, list=${list}`);


    if( !req.body
        || !Object.keys( req.body ).length ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.createOne: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        return send400BadRequest( res, result.response );
    }


    const STATE_HANDLERS = {

        [HTTP.CREATED]: (result) => {
            log.info( result.logMessage );
            return send201Created( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            return send500ServerError( res, result.response );
        }
    };

    try {
        const createResult = await CatalogLayouts.createOne( req.body );
        const { statusCode } = createResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( createResult );
        }

        throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }

};
