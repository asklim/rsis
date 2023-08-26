//const debug = require('debug')('reports:finance:');
const {
    consoleLogger,
    send200Ok,
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
 * Update Finance Report doc
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 503 Service Unavailable & error object
 * @example
 * PUT /api/sum/financereport
**/
module.exports = async function updateOne (
    req,
    res
) {
    if( !req.body
        || Object.keys( req.body ).length == 0 ) {
        send400BadRequest( res, 'Bad request, body is required');
        return;
    }

    const periodNumber  = Number.parseInt( req.body.pid, 10 ); // or NaN
    const { period } = req.body;

    if( !periodNumber || !period ) {
        send400BadRequest( res, 'Bad request, body.pid is required or wrong.');
        return;
    }

    FinanceReport.find({
        period,
        pid: periodNumber
    }).
    limit( 1 ).
    exec( (err, docs) => {

        if( err ) {
            log.error( err );
            send500ServerError( res, err );
            return;
        }

        if( !docs || docs.length < 1 ) {
            send404NotFound( res,
                `Summary data for ${period}/${periodNumber} not found.`
            );
            return;
        }

        Object.assign(
            docs[0],
            req.body,
            { updatedAt: Date.now() }
        );

        docs[0].save( (err, savedDoc) => {

            if( err ) {
                send500ServerError( res, err );
                return;
            }
            else {

                let { period, pid } = savedDoc;
                log.info(`SUCCESS: financeReport ${period}/${pid} updated.`);
                send200Ok( res, savedDoc );
                return;
            }
        });
    });
};
