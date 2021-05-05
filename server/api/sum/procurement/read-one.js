const debug = require( 'debug' )( 'api:sum:procurement' );
const request = require( 'request' );

const { 
    icwd, 
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-SUM:' );


const { procurementPeriods: period } = require( `${icwd}/src/config/enum-values` );
const { needUnitsForPeriod } = require( `${icwd}/src/lib/rsis` );

const { NODE_ENV, API_SERVER } = process.env;
const { API_SERVER_LOCAL } = require( `../../../helpers` );

const apiServer = NODE_ENV === 'production' 
    ? API_SERVER                   //'https://rsis-webapp.herokuapp.com'
    : API_SERVER_LOCAL
;



/** 
 * Read a procurement dataset by the week id 
 * @type router middleware
 * @param {*} req 
 * @param {*} res 
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * GET /api/sum/procurements/:weekId 
 * @example
 * GET /api/sum/procurement/960
 * GET /api/sum/procurement/1011
 * GET /api/sum/procurement/last 
 **/

module.exports = function readOne (req, res) {


    if( !req.params ) { 
        return send400BadRequest( res, 'No req.param in request.' );
    }

    console.log(
        'procurement.readOne: Finding params: ', req.params, '\n',
        'procurement.readOne: Finding query:  ', req.query
    );
    debug( `hostname is ${req.hostname}` );
  
    const { weekId } = req.params;  

    if( !weekId ) {
        log.warn( 'procurement.readOne: No weekId specified.' );
        return send400BadRequest( res, 'No weekId in request.' );  
    }

    debug( 'procurement.readOne: before fetch Dataset ...' );

    makeProcurementDataSet( 
        apiServer, 
        weekId,
        (err, data) => {

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            }

            if( !data ) {

                let msg = `procurement data for week ${weekId} not found.`;
                log.warn( msg );

                return send404NotFound( res, msg );
            }
            log.info( `SUCCESS: procurement.readOne (week: ${weekId}) is Ok.` );
            return send200Ok( res, data );
        }
    );
};


/**
 * Make dataset for Procurement View of Invoice Board
 * @param {*} hostname - getting data from { web | local | test }
 * @param {*} weekId - which week number (XXI century format)
 * @param {*} callback - data handler: (err, data) {}
 * @returns - callback invoke with err or data
 */

function makeProcurementDataSet (hostname, weekId, callback) {


    if( !hostname ) {
        // Тестовый датасет если hostname=''
        const TEST_DATASET = require( `${icwd}/server/sample-datasets/procurement` );
        return callback( null, TEST_DATASET );
    }
    

    const summa = (accum, current) => accum + current;

    const onlyItemsXtraLongGTZero = (item) => item.xlp.reduce( summa ) > 0;

    const convertToProcurement = (item) => {

        item.sp = needUnitsForPeriod( item, period.short );
        item.mp = needUnitsForPeriod( item, period.middle );
        item.lp = needUnitsForPeriod( item, period.long );
        item.xlp = needUnitsForPeriod( item, period.xtraLong );
        delete item.valid;
        delete item.fqA;
        delete item.fqM;
        return item;
    };

    const requestOptions = {
        url: `${hostname}/api/sum/weeknatural/${weekId}`,
        method: "GET",
        headers: {
            "Cache-Control": "no-cache, no-store"
        },
        json: {}, qs: {},
    };

    request( 
        requestOptions,
        (err, _res, resBody) => { // '{id, type, ..., body:[{}, ..., {}]}' 

            //debug( 'makeProcurementDataset: week-natural data got.' ));
            if( err ) {
                return callback( err, null );
            }

            if( !resBody || !resBody.body ) {
                return callback( null, null );
            }

            const weekNaturalItems = resBody.body;

            if( !Array.isArray( weekNaturalItems )) {
                return callback( null, null );
            }

            debug( 'make--Dataset: week-natural data got: %d items', weekNaturalItems.length );
            debug( 'make--Dataset: convert week-natural-body to procurement dataset.' );

            //Преобразование в Procurement DataSet
            callback( null, 
                weekNaturalItems
                .map( convertToProcurement )
                .filter( onlyItemsXtraLongGTZero ) 
                // Клиент получает только те позиции которые нужны на закупку
                // на xtraLong период
                // т.e. хотя-бы один элемент больше 0, => их сумма >0, а не [0,0,0]   
            );
        }
    );
}
