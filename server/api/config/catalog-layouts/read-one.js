//const debug = require( 'debug' )( 'api:config:catalogLayouts' );
//const { Schema } = require( 'mongoose' );
const uuid = require( 'uuid' );

const { 
    //icwd, 
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-config:' );

const db = require( '../../../databases' ).getDB( 'config' );

const CatalogLayouts = db.model( 'CatalogLayouts' );


//let testArr = [[2019011001, 2056], [2019011002, 2046]];

let filtering = {};
let projection = {};
let listType;

/** 
 * Read a agent info by the id
 * @name readOne
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

module.exports = async function catalogLayoutReadOne (req, res) {


    console.log(
        'I: try readOne config/catalog-layouts document',
        '\nI: finding catalog-layout`s params:', req.params,
        '\nI: finding catalog-layout`s query:', req.query
    );

    listType = validListTypeField( req.query );
    if( !listType ) {
        return send400BadRequest( res, 'Bad query.type in request.' );
    }

    const { catalogId } = req.params;

    if( catalogId ) {
        filtering = uuid.validate( catalogId ) 
            ? { uuid: catalogId }
            : { _id: catalogId };
    }
    else {
        const { client, list, date } = req.query;

        if( !client && !list ) {
            // Если оба undefined - то ошибка
            log.warn( 'calalog-layouts.readOne: No query specified.' );
            return send400BadRequest( res, 'No query in request.' );
        }

        if( date && !Date.parse( date )) {
            log.warn( 'calalog-layouts.readOne: Bad query.date specified.' );
            return send400BadRequest( res, 'Bad query.date in request.' );
        }

        Object.assign( filtering, { client, list } );

        if( date ) {
            const theDate = (new Date( date )).toISOString();
            const $or = [ 
                { until: { $gt: theDate }}, 
                { until: { $eq: null }}
            ];
            Object.assign( filtering, { 
                $or,
                since: { $lte: theDate }
            });
        }
        else {
            Object.assign( filtering, { 
                until: { $eq: null }
            });
        }
    }

    try {
        const docs = await CatalogLayouts.find( filtering, projection );

        if( !docs || docs.length < 1 ) {

            let msg = `Catalog-layout not found.`;
            log.warn( `${msg}\nfinding:`, filtering );
            return send404NotFound( res, msg );
        }
        //debug( 'docs isArray:', Array.isArray(docs), /* true */
        //    'length=', docs.length  /* 1 */ );
        const doc = docs[0]; // структура MongoDB { $__, _doc, $init, isNew ...}

        log.info( `SUCCESS: catalog-layout, uuid:${doc.uuid} readOne is Ok.`);
        return send200Ok( res, { ...doc._doc, listType } );

    }
    catch ( err ) {
        log.error( err );
        return send500ServerError( res, err );
    }
};


/**
 * Проверяет listType в запросе req
 * @param {Object} req.query 
 * @returns valid listType in lowercase
 * @returns undefined - if listType is not valid
 */
function validListTypeField({ listType = 'main' }) {

    /* for http requests in api/:
        &type='main' // default
        or, 'meta'
        &type='lid2gid' or, 
        &type='short' or, 
        &type='photo' or, 
        &type='extra'
    */
    const validListTypeValues = [ 
        'meta', 'main', 
        'lid2gid', 'short', 
        'photo', 'extra' 
    ];
    listType = listType.toLowerCase();

    if( !validListTypeValues.includes( listType )) {
        log.warn( 'calalog-layouts.readOne: Bad query.type specified.' );
        return void 0;
    }
    if( listType == 'meta') {
        projection = { xlGroups: 0, items: 0 };
    }
    return listType;
}
