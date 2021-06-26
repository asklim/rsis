//const { format } = require( 'util' );
//const UUID = require( 'uuid' );
const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../helpers' );

//const debug = require( 'debug' )( 'api:config:catalogLayouts' );
//const log = consoleLogger( 'api-config:' );

//const db = require( '../../databases' ).getDB( 'config' );

//const CatalogLayouts = db.model( 'CatalogLayouts' );

const readOne = require( './read-one' );

/** 
 * Read a agent info by the id
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
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

module.exports = async function readByQuery ({ client, list, listType, date }) {


    /*if( !listType ) {
        return ( {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.read: Bad query.listType specified.',
            response: 'Bad query.listType in request.'
        });
    }*/

    if( !client && !list ) {
        // Если оба undefined - то ошибка
        return ({
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.readOne: No query specified.',
            response: 'No query in request.'
        });
    }

    if( date && !Date.parse( date )) {
        return ({
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.readOne: Bad query.date specified.',
            response: 'Bad query.date in request.' 
        });
    }

    let filtering = { client, list };

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

    return await readOne( filtering, listType );

};

