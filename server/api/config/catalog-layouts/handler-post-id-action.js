const debug = require( 'debug' )( 'api:catalogLayouts:post-id-action' );
const {
    //icwd,
    //consoleLogger,
    httpResponseCodes: HTTP,
    //send201Created,
    //send400BadRequest,
    //send409Conflict,
    //send500ServerError,
} = require( '../../../helpers' );

//const CatalogLayouts = require( `../../../applogic/catalog-layouts` );

//const log = consoleLogger( 'api-config:' );



/**
 * Make action with catalog layout by uuid or ObjId
 * @fires 200 Ok     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * POST /api/config/catalog-layouts/:catalogId/:action
 * @usage
 * POST /api/config/catalog-layouts/< uuid >/sendEmail
 */
module.exports = async function (req, res) {

    debug( 'req.params:', req.params );

    const { catalogId, action } = req.params;

    debug( 'catalogId:', catalogId );
    debug( 'action:', action);

    res.status( HTTP.I_AM_A_TEAPOT ).json( { message: 'I`am a Tea Pot'} );

};
