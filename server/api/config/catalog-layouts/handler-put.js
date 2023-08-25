
//const debug = require('debug')('api:catalogLayouts');
const {
    //icwd,
    consoleLogger,
    StatusCodes: HTTP,
    send200Ok,
    send201Created,
    send400BadRequest,
    //send409Conflict,
    send500ServerError,
} = require('../../../helpers');

const CatalogLayouts = require(`../../../applogic/catalog-layouts`);

const log = consoleLogger('[catalogLayouts:api]');


/**
 * Update catalog layout
 * @fires 200 OK     & message
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * PUT /api/config/catalog-layouts
 */

module.exports = async function catalogLayoutsHandler_PUT (req, res) {

    let client, list;

    if( req.body ) {
        client = req.body.client;
        list = req.body.list;
    }
    log.info(`try update last config/catalog-layouts: client=${client}, list=${list}`);


    if( !req.body
        || !Object.keys( req.body ).length ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.handler-put: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        return send400BadRequest( res, result.response );
    }


    const STATE_HANDLERS = {

        [HTTP.OK]: (result) => {
            log.info( result.logMessage );
            return send200Ok( res, result.response );
        },

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
        const updateResult = await CatalogLayouts.updateLastOrCreate( req.body );
        const { statusCode } = updateResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( updateResult );
        }

        throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }

};
