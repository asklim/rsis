//const { format } = require( 'util' );
const UUID = require( 'uuid' );
//const {
//    httpResponseCodes: HTTP,
//    //consoleLogger,
//} = require( '../../helpers' );

//const debug = require( 'debug' )( 'api:config:catalogLayouts' );
//const log = consoleLogger( 'api-config:' );

//const db = require( '../../databases' ).getDB( 'config' );

//const CatalogLayouts = db.model( 'CatalogLayouts' );
const readOne = require( './read-one' );

/** 
 * Read a catalog-layout by the id
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @usage var.1 |
 * GET /api/config/catalog-layouts/:catalogId
 **/

module.exports = async function readById ( catalogId ) {


    let filtering = UUID.validate( catalogId ) 
        ? { uuid: catalogId }
        : { _id: catalogId };

    return await readOne( filtering );
};
