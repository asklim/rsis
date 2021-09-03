
//const debug = require( 'debug' )( 'dbs:cfg:catalogLayouts' );
//const log = consoleLogger( 'dbs-cfg:' );

const UUID = require( 'uuid' );
const readOne = require( './cl-read-one' );

/**
 * Read a catalog-layout by the id
 * @returns
 * - statusCode 200 OK          & document
 * - statusCode 400 Bad Request & message
 * - statusCode 404 Not Found   & message
 * - statusCode 500 Server Error & error object
 * @usage
 * - await CatalogLayouts.readById( uuid );
 * - await CatalogLayouts.readById( ObjId );
 **/

module.exports = async function readById ( catalogId ) {


    let filtering = UUID.validate( catalogId )
        ? { uuid: catalogId }
        : { _id: catalogId };

    return await readOne( filtering );
};
