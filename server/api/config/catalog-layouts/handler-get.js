//const debug = require( 'debug' )( 'api:config:catalogLayouts' );

const { 
    icwd, 
    consoleLogger,
    httpResponseCodes: HTTP,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const CatalogLayouts = require( `${icwd}/server/applogic/catalog-layouts` );
//const catalogLayoutReadOne = require( '../../../applogic/catalog-layouts/read-one' );

const log = consoleLogger( 'api-config:' );


/** 
 * Read a catalog-layout
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage var.1 |
 * GET /api/config/catalog-layouts/:catalogId
 * @usage var.2 |
 * GET /api/config/catalog-layouts?queryString
 * @usage var.2 |
 * GET /api/config/catalog-layouts/?queryString
 * @usage queryString: 
 * client=clientId &
 * list=listId &
 * listType=listtype &
 * type=typeId &
 * date=isoDate
 **/

module.exports = async function catalogLayoutHandler_GET (req, res) {


    console.log(
        'I: try read config/catalog-layout document',
        '\nI: finding catalog-layout`s params:', req.params,
        '\nI: finding catalog-layout`s query:', req.query
    );

    const STATE_HANDLERS = {

        [HTTP.OK]: (result) => {
            log.info( result.logMessage );
            return send200Ok( res, result.response );
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

    const { catalogId } = req.params;

    const readResult = ( catalogId )
        ? await CatalogLayouts.readById( catalogId )
        : await CatalogLayouts.readByQuery( req.query );

    const { statusCode } = readResult;

    if( statusCode in STATE_HANDLERS ) {
        return STATE_HANDLERS[ statusCode ]( readResult );
    }
};

