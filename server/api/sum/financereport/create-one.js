//const debug = require( 'debug' )( 'api:sum:financereport' );
const { 
    icwd, 
    consoleLogger,
    send201Created,
    send400BadRequest,
    send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-SUM:' );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const FinanceReport = db.model( 'FinanceReport' );

//const workdate = require( `${icwd}/imports/utils/workdate` );


/** 
 * Create a new Finance Report
 * @name createOne
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @example
 * POST /api/sum/financereport
**/

module.exports = function createOne (req, res) {


    log.info( `try create, sum-finance-report body.pid: ${req.body.pid}` ); 
    
    if( !req.body 
        || Object.keys( req.body ).length == 0 ) {
        return send400BadRequest( res, 'Bad request, body is required' );
    }

    const { pid, period } = req.body;

    if( !pid || !period ) {
        return send400BadRequest( res, 
            'Bad request, body.pid and body.period is required' 
        );
    }  
  
    const finding = { 
        period, 
        pid,
    };

    FinanceReport
    .find( finding )
    .limit( 1 )
    .exec( (err, docs) => { 

        if( err ) {                 
            log.error( err );
            return send500ServerError( res, err );
        }

        if( docs && docs.length !== 0 ) {

            return send409Conflict( res, 
                `Finance report data for period ${pid}/${period} already exists.`
            );
        }

        FinanceReport
        .create( 
            req.body, 
            (err, doc) => {

                if( err ) {
                    log.error( 'finance-report create err: ', err );
                    return send500ServerError( res, err ); 
                } 

                let { period, pid } = doc;
                log.info( `SUCCESS: financeReport ${period} ${pid} created.`);
                return send201Created( res, 
                    `Finance report for ${period} ${pid} created successfull.`
                );
            
            }
        );
    });    
};

