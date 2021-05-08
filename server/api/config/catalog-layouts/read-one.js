
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


/** 
 * Read a agent info by the id
 * @name readOne
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * GET /api/config/catalog-layouts/:catalogId
 * @usage
 * GET /api/config/catalog-layouts?client=clientId&list=listId&type=typeId&date=isoDate
 * @usage
 * GET /api/config/catalog-layouts/?client=clientId&list=listId&type=typeId&date=isoDate
 **/

module.exports = async function catalogLayoutReadOne (req, res) {


    console.log(
        'I: try readOne config/catalog-layouts document',
        '\nI: finding catalog-layout`s params:', req.params,
        '\nI: finding catalog-layout`s query:', req.query
    );

    const { catalogId } = req.params;

    let filtering = {};

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

        /* for http requests in api/:
            &type='lid2gid' or, 
            &type='main' or, 
            &type='short' or, 
            &type='photo' or, 
            &type='extra'
        */
        const validTypeValues = [ 'main', 'lid2gid', 'short', 'photo', 'extra' ];

        const type = req.query.type || 'main';

        if( !validTypeValues.includes( type.toLowerCase() )) {
            log.warn( 'calalog-layouts.readOne: Bad query.type specified.' );
            return send400BadRequest( res, 'Bad query.type in request.' );
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
        const docs = await CatalogLayouts.find( filtering );

        if( !docs || docs.length < 1 ) {

            let msg = `Catalog-layout not found.`;
            log.warn( `${msg}\nfinding:`, filtering );
            return send404NotFound( res, msg );
        } 

        log.info( `SUCCESS: catalog-layout, uuid:${docs[0].uuid} readOne is Ok.`);
        return send200Ok( res, docs[0] );

    }
    catch ( err ) {
        log.error( err );
        return send500ServerError( res, err );
    }
};

