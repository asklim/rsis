const debug = require( 'debug' )( 'dbs:cfg:catalogLayouts' );

const { format } = require( 'util' );
const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../../../helpers' );

//const log = consoleLogger( 'dbs-cfg:' );

const db = require( '../../..' ).getDB( 'config' );

const CatalogLayoutsModel = db.model( 'CatalogLayouts' );

const CatalogLayout = require( '../../../../applogic/catalog-layout' );


/**
 * Read a agent info by the id
 * - filtering - передается в Mongoose для отбора элементов
 * - listType (необязательный) - тип возвращаемого списка (набора данных)
 * по умолчанию - 'main' (meta, lid2gid, extra, ...)
 * @returns
 * - statusCode 200 OK & response= { ...doc, listType }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found   & response= message
 * - statusCode 500 Server Error & response= error object
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

