//const debug = require('debug')('reports:finance:');
const {
    consoleLogger,
    send201Created,
    send400BadRequest,
    send409Conflict,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('api-SUM:reports:finance:');

// const db = require(`${icwd}/server/databases`).getDB('sum');
const databases = require('../../../databases/index');
const db = databases.getDB('sum');
const FinanceReport = db.model('FinanceReport');

//const workdate = require(`${icwd}/imports/utils/workdate`);


/**
 * Create a new Finance Report
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 500 Server Error & error object
 * @example
 * POST /api/sum/financereport
**/

module.exports = async function createOne (req, res) {


    log.info(`try create, sum-finance-report body.pid: ${req.body.pid}`);

    if( !req.body
        || Object.keys( req.body ).length == 0 ) {
        send400BadRequest( res, 'Bad request, body is required');
        return;
    }

    const { pid, period } = req.body;

    if( !pid || !period ) {
        send400BadRequest( res,
            'Bad request, body.pid and body.period is required'
        );
        return;
    }

    const finding = {
        period,
        pid,
    };

    FinanceReport.
    find( finding ).
    limit( 1 ).
    exec( (err, docs) => {

        if( err ) {
            log.error( err );
            send500ServerError( res, err );
            return;
        }

        if( docs?.length !== 0 ) {
            send409Conflict( res,
                `Finance report data for period ${pid}/${period} already exists.`
            );
            return;
        }

        FinanceReport.
        create(
            req.body,
            (err, doc) => {

                if( err ) {
                    log.error('finance-report create err: ', err );
                    send500ServerError( res, err );
                    return;
                }

                let { period, pid } = doc;
                log.info(`SUCCESS: financeReport ${period} ${pid} created.`);
                send201Created( res,
                    `Finance report for ${period} ${pid} created successfull.`
                );
                return;
            }
        );
    });
};
