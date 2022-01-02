//const debug = require( 'debug' )( 'reports:finance' );
const {
    icwd,
    consoleLogger,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-SUM:reports:finance:' );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const FinanceReport = db.model( 'FinanceReport' );

//const workdate = require( `${icwd}/imports/utils/workdate` );



/**
 * Delete Finance Report summary
 * @name deleteOne
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @returns {} undefined
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
        return send400BadRequest( res, 'Bad request, periodId is required.' );
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

        log.warn( '[financeReport.deleteOne] wrong <:periodId> specified.' );
        return send400BadRequest( res, 'Wrong <:periodId> in request.' );
    }

    FinanceReport
    .findOneAndDelete(
        finding,
        (err, doc) => {

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            }

            if( !doc ) {
                return send404NotFound( res, doc );
            }


            let { period, pid } = doc;
            log.info( `finance report by ${period}/${pid} period deleted.` );
            return send204NoContent( res, doc );
        }
    );
};

