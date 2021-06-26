const { format } = require( 'util' );
const UUID = require( 'uuid' );
const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../helpers' );

//const debug = require( 'debug' )( 'api:config:catalogLayouts' );
//const log = consoleLogger( 'api-config:' );

const db = require( '../../databases' ).getDB( 'config' );

const CatalogLayouts = db.model( 'CatalogLayouts' );


/** 
 * Delete catalog-layout by uuid or ObjId
 * @statusCode 204 No Content & { uuid, message }
 * @statusCode 404 Not Found & message
 * @statusCode 500 Server Error & error object
 **/

module.exports = async function deleteById (catalogId) {


    const filtering = UUID.validate( catalogId ) 
        ? { uuid: catalogId }
        : { _id: catalogId };

    try {
        const doc = await CatalogLayouts.findOneAndDelete( filtering );

        if( !doc ) {
            let msg = `Catalog-layout not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg}\nwith filtering: ` + format( '%o', filtering ),
                response: msg 
            });
        }

        const { uuid } = doc;
        return ({
            statusCode: HTTP.NO_CONTENT,
            logMessage: `SUCCESS: catalog-layout uuid:${uuid} deleted.`,
            response: {
                message: `catalog-layout uuid:${uuid} deleted successful.`,
                uuid,
            }
        });
    }
    catch (err) {
        return ({
            statusCode: HTTP.INTERNAL_SERVER_ERROR,
            logMessage: err.message,
            response: err
        });
    }

};

