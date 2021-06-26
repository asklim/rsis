const { format } = require( 'util' );
//const UUID = require( 'uuid' );
const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../helpers' );

const debug = require( 'debug' )( 'api:config:catalogLayouts' );
//const log = consoleLogger( 'api-config:' );

const db = require( '../../databases' ).getDB( 'config' );

const CatalogLayoutsModel = db.model( 'CatalogLayouts' );

const CatalogLayout = require( '../catalog-layout' );


/** 
 * Read a agent info by the id
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
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

module.exports = async function readOne (filtering, listType) {


    try {

        listType = CatalogLayout.validatedListType( listType );

        const projection = ( listType == 'meta')
            ? { xlGroups: 0, items: 0 }
            : {};

        //debug( 'filtering:', filtering );
        debug( 'projection:', projection );

        const docs = await CatalogLayoutsModel.find( filtering, projection );

        if( !docs || docs.length < 1 ) {
            let msg = `Catalog-layout not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg}\nwith filtering: ` + format( '%o', filtering ),
                response: msg 
            });
        }
        //debug( 'docs isArray:', Array.isArray(docs), /* true */
        //    'length=', docs.length  /* 1 */ );
        const doc = docs[0]; // структура MongoDB: Query? { $__, _doc, $init, isNew ...}

        return ({
            statusCode: HTTP.OK,
            logMessage: `SUCCESS: catalog-layout, uuid:${doc.uuid} readOne is Ok.`,
            response: { ...doc._doc, listType }
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

