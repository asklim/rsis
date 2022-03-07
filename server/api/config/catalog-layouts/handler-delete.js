//const debug = require( 'debug' )( 'api:catalogLayouts' );

const {
    consoleLogger,
    httpResponseCodes: HTTP,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const CatalogLayouts = require( `../../../applogic/catalog-layouts` );

const log = consoleLogger( '[catalogLayouts:api]' );


/**
 * Delete catalog-layout by uuid, ObjId or 'last'
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @usage
 * DELETE /api/config/catalog-layouts/:catalogId[?queryString]
 * @usage queryString: client=clientId & list=listId
 * @example
 * DELETE /api/config/catalog-layouts/60950e87258015071e86c8f7
 * DELETE /api/config/catalog-layouts/f2ab5c11-a252-4f65-b278-adb3afe12bcd
 * DELETE /api/config/catalog-layouts/last?client=excel&list=coffeeTea
 **/

module.exports = async function catalogLayoutsHandler_DELETE (req, res) {


    console.log(
        'I: try delete config/catalog-layout document',
        '\nI: catalog-layout`s delete params:', req.params,
        '\nI: catalog-layout`s delete query:', req.query
    );

    const { catalogId } = req.params;

    if( !catalogId ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.delete: No <catalogId>.',
            response: 'Bad request, No <catalogId>.'
        };
        log.warn( result.logMessage );
        return send400BadRequest( res, result.response );
    }


    const STATE_HANDLERS = {

        [HTTP.NO_CONTENT]: (result) => {
            log.info( result.logMessage );
            //debug( '[h-DELETE]:', result.response );
            //TODO: Client не получает тело json-ответа
            return send204NoContent( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.NOT_FOUND]: (result) => {
            log.warn( result.logMessage );
            return send404NotFound( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            return send500ServerError( res, result.response );
        }
    };

    try {
        const deleteResult = 'last' == catalogId.toLowerCase() ?
            await CatalogLayouts.deleteLast( req.query )
            : await CatalogLayouts.deleteById( catalogId );

        const { statusCode } = deleteResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( deleteResult );
        }

        throw new Error( `Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};

