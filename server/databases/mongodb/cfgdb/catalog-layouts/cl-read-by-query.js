
//const debug = require( 'debug' )( 'dbs:cfg:catalogLayouts' );
//const log = consoleLogger( 'dbs-cfg:' );

const readOne = require( './cl-read-one' );

/**
 * Read a catalog-layout by parameters
 * - if date - возвращается документ, в который попадает date
 * - if date == '' - возвращается первый документ
 * - if date == undefined - последний документ
 * @returns
 * - statusCode 200 OK & response= { ...doc, listType }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found   & response= message
 * - statusCode 500 Server Error & response= error object
 **/
module.exports = async function readByQuery ({ client, list, listType, date }) {


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
    else if( date == '' ) {
        Object.assign( filtering, {
            prev: { $eq: null }
        });
    }
    else {
        Object.assign( filtering, {
            until: { $eq: null }
        });
    }

    return await readOne( filtering, listType );

};

