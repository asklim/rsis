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
 * Read a financials summary report 
 * by the XXI century week or calendar quarter or ???'last' 
 * @name readOne
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @example for weeks
 * GET /api/sum/financereport/:periodId
 * GET /api/sum/financereport/960       - week #960
 * GET /api/sum/financereport/1062      - week #1062
 * GET /api/sum/financereport/w1011     - week #1011
 * GET /api/sum/financereport/week1012  - week #1012
 * GET /api/sum/financereport/2020w20   - week #1011 - ISO week
 * @example for quarters
 * GET /api/sum/financereport/20201  - quarter 2020 q1
 * GET /api/sum/financereport/q20201 - quarter 2020 q1
 * GET /api/sum/financereport/2020q1 - quarter 2020 q1
 * @example for last period
 * ??? GET /api/sum/financereport/lastweek
 * ??? GET /api/sum/financereport/lastquarter
**/

module.exports = function readOne (req, res) {


    console.log( 
        `I: try readOne sum-finance-report document`,
        '\nI: finding financeReport\'s params:', req.params,
        '\nI: finding financeReport\'s query:', req.query
    );
    //console.log(req.hostname);
    
    const { periodId } = req.params;

    if( !periodId ) {

        log.warn( 'financeReport.readOne: No periodId specified.' );
        return send400BadRequest( res, 'No periodId in request.' );  
    }

    let finding, 
        sorting, 
        periodNumber
    ;
    const periodIdLow = periodId.toLowerCase();

    if( periodIdLow.startWith('last') ) {
        
        let period = periodIdLow.split( 'last' )[0]; 
        finding = { period };
        sorting = { id: -1 };
    }
    else {

        periodNumber = Number.parseInt( periodId, 10 );
        if( !periodNumber ) {

            log.warn( 'financeReport.readOne: wrong periodId specified.' );
            return send400BadRequest( res, 'Wrong periodId in request.' );    
        }
        finding =  { pid: periodNumber };
        sorting =  {};            
    }


    FinanceReport
    .find( finding )
    .sort( sorting )
    .limit(1)
    .exec( (err, docs) => {

        if( err ) {                 
            log.error( err );
            return send500ServerError( res, err );
        } 

        if( !docs || docs.length < 1 ) {

            let msg = `Summary data for week ${periodId}/${periodNumber} not found.`;
            log.warn(`financeReport ${msg}`);

            return send404NotFound( res, `FinanceReport ${msg}` );
        }

        log.info( `SUCCESS: financeReport ${docs[0].id} readOne is Ok.`);
        return send200Ok( res, docs[0] );
    });

};
