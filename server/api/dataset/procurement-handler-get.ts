
import axios from 'axios';

import {
    icwd,
    Logger,
    Request,
    Response,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} from '../../helpers';

//const d = debugFactory('api:sum:procurement');
const log = new Logger('[api:procurement]');


import { procurementPeriods as period } from '<root>/src/config/enum-values';

import { rsisFactory } from 'asklim';
const { needUnitsForPeriod } = rsisFactory();

// d( "typeof needUnitsForPeriod", typeof needUnitsForPeriod );
// d( "needUnitsForPeriod", needUnitsForPeriod );


/**
 * Read a procurement dataset by the week id (router middleware)
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @usage
 * GET /api/sum/procurements/:weekId
 * @example
 * GET /api/sum/procurement/960
 * GET /api/sum/procurement/1011
 * GET /api/sum/procurement/last
 **/
export default async function hapi_dataset_procurement_GET (
    req: Request,
    res: Response
) {
    log.debug(
        'hGET - req.params:', req.params, 'req.query:', req.query
    );

    const weekId = req?.params?.weekId;

    if( !weekId ) {
        log.warn('handler GET: No or bad <weekId> specified.');
        send400BadRequest( res, 'No or bad <:weekId> in request.');
        return;
    }

    const apiServer = req.app.get('apiServer');
    log.debug(`handler GET: before fetch Dataset from ${apiServer} ...`);

    try {
        const dataset = await makeProcurementDataset( apiServer, weekId );
        if( !dataset ) {
            const msg = `procurement data for week ${weekId} not found.`;
            log.warn( msg );
            send404NotFound( res, msg );
            return;
        }
        const count = dataset.length;
        log.info(`GET: (week: ${weekId}) sent ${count} items.`);
        send200Ok( res, dataset );
    }
    catch (err) {
        if( err ) {
            log.error( err );
            send500ServerError( res, err );
        }
    }
};



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

/**
 * Make dataset for Procurement View of Invoice Board
 * @param {*} hostname - getting data from { web | local | test }
 * @param {*} weekId - which week number (XXI century format)
 */
async function makeProcurementDataset (
    hostname,
    weekId
) {
    log.info('try get ProcurementDataSet from', hostname );

    if( !hostname ) {
        const SAMPLE_DATASET_FNAME = `${icwd}/server/sample-datasets/procurement`;
        // Тестовый датасет если hostname=''
        const TEST_DATASET = require( SAMPLE_DATASET_FNAME );
        return TEST_DATASET;
    }

    const body = await getBodyOfWeekNatural( hostname, weekId );

    const result = body.
        map( convertToProcurement ).
        filter( onlyItemsXtraLongGTZero )
        // Клиент получает только те позиции которые нужны на закупку
        // на xtraLong период
        // т.e. хотя-бы один элемент больше 0, => их сумма >0, а не [0,0,0]
    ;
    log.debug('makeDataset, converted to procurement dataset.');

    return result;
}


async function getBodyOfWeekNatural (
    hostname,
    weekId
) {
    const resp = await axios({
        method: 'GET',
        url: `${hostname}/api/sum/weeknatural/${weekId}`,
        headers: {
            credentials: 'omit',
            'Content-Type': 'application/json',
            "Cache-Control": 'no-cache, no-store'
        },
    });
    // d('resp', resp.status, resp.data );
    const body = resp?.data?.body;
    if( Array.isArray( body )) {
        const count = body?.length;
        log.debug(`makeDataset, got ${count} items in week-natural data.`);
        return body;
    }
    else {
        log.debug(
            'makeDataset, got NOT ARRAY in week-natural data.\n' +
            `typeof 'body' is ${typeof body}`
        );
        return [];
    }
}
