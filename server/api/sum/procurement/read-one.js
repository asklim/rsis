//const debug = require( 'debug' )( 'api:sum:procurement' );
const request = require( 'request' );

const {
    icwd,
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( '[api:procurement]' );


const { procurementPeriods: period } = require( `${icwd}/src/config/enum-values` );

const { needUnitsForPeriod } = require( 'asklim/rsis' )();

// debug( "typeof needUnitsForPeriod", typeof needUnitsForPeriod );
// debug( "needUnitsForPeriod", needUnitsForPeriod );


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

    log.debug(
        'readOne - req.params:', req.params, 'req.query:', req.query
    );

    const { weekId } = req.params;

    if( !weekId ) {
        log.warn( 'readOne: No or bad <weekId> specified.' );
        return send400BadRequest( res, 'No or bad <:weekId> in request.' );
    }

    const apiServer = req.app.get( 'apiServer' );
    log.debug( `readOne: before fetch Dataset from ${apiServer} ...` );

    makeProcurementDataset(
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

            const count = data.length;
            log.info( `SUCCESS: readOne (week: ${weekId}) sent ${count} items.` );
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
function makeProcurementDataset (hostname, weekId, callback) {


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
            const count = weekNaturalItems?.length;
            log.debug( `makeDataset, got ${count} items in week-natural data.` );

            //Преобразование в Procurement DataSet
            const result = weekNaturalItems.
                map( convertToProcurement ).
                filter( onlyItemsXtraLongGTZero );
            // Клиент получает только те позиции которые нужны на закупку
            // на xtraLong период
            // т.e. хотя-бы один элемент больше 0, => их сумма >0, а не [0,0,0]

            log.debug( 'makeDataset, converted to procurement dataset.' );
            callback( null, result );
        }
    );
}
