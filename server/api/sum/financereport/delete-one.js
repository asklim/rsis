//const debug = require('debug')('reports:finance');
const {
    consoleLogger,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('api-SUM:reports:finance:');

// const db = require(`${icwd}/server/databases`).getDB('sum');
const databases = require('../../../databases/index');
const db = databases.getDB('sum');
const FinanceReport = db.model('FinanceReport');

//const workdate = require(`${icwd}/imports/utils/workdate`);



/**
 * Delete Finance Report summary
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @example
 * DELETE /api/sum/financereport/:periodId
 * @example
 * DELETE /api/sum/financereport/w956
 * DELETE /api/sum/financereport/week956
 * DELETE /api/sum/financereport/w1011
 * DELETE /api/sum/financereport/week1011
 * DELETE /api/sum/financereport/2020w20
 * @example
 * DELETE /api/sum/financereport/q20201
 * DELETE /api/sum/financereport/2020q1
 *
**/

module.exports = async function deleteOne (req, res) {


    const { periodId } = req.params;

    if( !periodId ) {
        send400BadRequest( res, 'Bad request, periodId is required.');
        return;
    }

    const finding  = {
        period: 'week',
        pid: Number.parseInt( periodId, 10 )
    };

    console.log(
        `I: try deleteOne sum-finance-report document`,
        '\nI: finding financeReport\'s params: ', req.params,
        '\nI: parsing periodId is: ', finding
    );

    if( !finding.pid ) {

        log.warn('[financeReport.deleteOne] wrong <:periodId> specified.');
        send400BadRequest( res, 'Wrong <:periodId> in request.');
        return;
    }

    FinanceReport.
    findOneAndDelete(
        finding,
        (err, doc) => {

            if( err ) {
                log.error( err );
                send500ServerError( res, err );
                return;
            }

            if( !doc ) {
                send404NotFound( res, doc );
                return;
            }


            let { period, pid } = doc;
            log.info(`finance report by ${period}/${pid} period deleted.`);
            send204NoContent( res, doc );
            return;
        }
    );
};
