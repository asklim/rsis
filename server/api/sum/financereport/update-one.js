//const debug = require( 'debug' )( 'api:sum:financereport' );
const { 
    icwd, 
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-SUM:' );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const FinanceReport = db.model( 'FinanceReport' );

//const workdate = require( `${icwd}/imports/utils/workdate` );



/** 
 * Update Finance Report doc 
 * @name updateOne
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example
 * PUT /api/sum/financereport
**/

module.exports = function updateOne (req, res) {


    if( !req.body 
        || Object.keys( req.body ).length == 0 ) {        
        return send400BadRequest( res, 'Bad request, body is required' );
    }

    const periodNumber  = Number.parseInt( req.body.pid, 10 ); // or NaN
    const { period } = req.body;

    if( !periodNumber || !period ) {
        return send400BadRequest( res, 'Bad request, body.pid is required or wrong.' );
    }

    FinanceReport.find({ 
        period,
        pid: periodNumber 
    })
    .limit( 1 )
    .exec( (err, docs) => {

        if( err ) {                
            log.error( err );
            return send500ServerError( res, err );
        }

        if( !docs || docs.length < 1 ) {
            return send404NotFound( res, 
                `Summary data for ${period}/${periodNumber} not found.`
            );
        }
 
        Object.assign( 
            docs[0], 
            req.body,
            { updatedAt: Date.now() }
        );

        docs[0].save( (err, savedDoc) => {

            if( err ) {
                return send500ServerError( res, err );
            } 
            else {

                let { period, pid } = savedDoc;
                log.info( `SUCCESS: financeReport ${period}/${pid} updated.` );
                return send200Ok( res, savedDoc );
            }
        });
    });
};   

