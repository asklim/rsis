//var debug = require( 'debug' )( 'api:sum:financereport' );
//const colors = require( 'colors' );
const icwd = require( 'fs' ).realpathSync( process.cwd() );

const HTTPCODE = require( `${icwd}/src/config/http-response-codes` );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const FinanceReport = db.model( 'FinanceReport' );

//const workdate = require( `${icwd}/imports/utils/workdate` );



const sendJSONresponse = (res, status, content) => {

    //console.log('sendJSON: ', content);
    //console.log('sendJSON: ', Object.keys(content[0]));

    res.status( status );
    res.json( content );
};




/** 
 * @name readOne
 * @description 
 * Read a financials summary report 
 * by the XXI century week or calendar quarter or ???'last' 
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example for weeks
 * GET /api/sum/financereport/:periodId
 * GET /api/sum/financereport/960       - week #960
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
 *
 * 
**/
const readOne = ( req, res ) => {


    console.log( `I: try readOne sum-finance-report document`,
               '\nI: finding financeReport\'s params: ', req.params,
               '\nI: finding financeReport\'s query: ', req.query
    );
    //console.log(req.hostname);
    
    const { weekId: periodId } = req.params;

    if( !req.params || !periodId ) {

        console.log( 'W: financeReport readOne: No periodId specified.' );
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'No periodId in request.'
        });
        return;
    }

    let finding, sorting, periodNumber;
    let periodIdLow = periodId.toLowerCase();

    if( periodIdLow.startWith('last') ) {
        
        let period = periodIdLow.split( 'last' )[0]; 
        finding = { period };
        sorting = { id: -1 };
    }
    else {

        periodNumber = Number.parseInt( periodId, 10 );
        if( !periodNumber ) {

            console.log( 'W: weekNatural readOne: wrong weekId specified.' );
            sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
                message: 'Wrong weekId in request.'
            });
            return;            
        }
        finding =  { pid: periodNumber };
        sorting =  {};            
    }


    FinanceReport.find( finding )
    .sort( sorting )
    .limit(1)
    .exec( (err, docs) => {

        if( !docs || docs.length < 1 ) {

            let msg = `Summary data for week ${periodId}/${periodNumber} not found.`;
            console.log(`W: financeReport ${msg}`);

            sendJSONresponse( res, HTTPCODE.NOT_FOUND, {
                message: `FinanceReport ${msg}`
            });
            return;
        }

        if( err ) { 

            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            //console.log(err);                
            return;
        } 

        console.log( `SUCCESS: financeReport ${docs[0].id} readOne is Ok.`);
        sendJSONresponse( res, HTTPCODE.OK, docs[0] );
    });

};



/** 
 * @name create
 * @description Create a new Finance Report
 *  @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example
 * POST /api/sum/financereport
 * 
 *  
**/
const create = ( req, res )  => {


    console.log( `I: try create, sum-finance-report body.pid: ${req.body.pid}` ); 
    
    if( !req.body || req.body === {} ) {

        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body is required'
        });
        return;
    }
    const { pid, period } = req.body;

    if( !pid || !period ) {

        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body.pid and .period is required'
        });
        return;
    }  
  
    const finding = { 
        period, 
        pid,
    };

    FinanceReport.find( finding )
    .limit( 1 )
    .exec( (err, docs) => { 

        if( err ) { 

            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            //console.log(err);
            return;
        }

        if( docs && docs.length !== 0 ) {

            sendJSONresponse( res, HTTPCODE.CONFLICT, {
                message: `Finance report data for week ${pid} already exists.`
            });
            return;
        }

        FinanceReport.create( req.body, 
        (err, doc) => {

            if( err ) {

                console.log( 'E: finance-report create err: ', err );
                sendJSONresponse( res, HTTPCODE.BAD_REQUEST, err );
                return;
            } 

            let { period, pid } = doc;
            console.log( `SUCCESS: financeReport ${period} ${pid} created.`);

            sendJSONresponse( res, HTTPCODE.CREATED, {
                message: `Finance report for ${period} ${pid} created successfull.`
            });
            
        });
    });    
};



/** 
 * @name updateOne
 * @description Update Finance Report doc 
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 503 Service Unavailable & error object
 * @returns {} undefined
 * @example
 * PUT /api/sum/financereport
 * 
 *  
**/
const updateOne = ( req, res ) => {


    //console.log(req.body);

    if( !req.body || req.body === {} ) {
    
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body is required'
        });
        return;
    }

    const periodNumber  = Number.parseInt( req.body.pid, 10 );
    const { period } = req.body;

    if( !periodNumber || !period ) {
    
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, body.pid is required or wrong.'
        });
        return;
    }

    FinanceReport.find(
        { 
            period,
            pid: periodNumber 
        })
    .limit( 1 )
    .exec( (err, docs) => {

        if (!docs || docs.length < 1) {

            sendJSONresponse( res, HTTPCODE.NOT_FOUND, {
                message: `Summary data for ${period} ${periodNumber} not found.`
            });
            return;
        }

        if( err ) {             

            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err);
            //console.log(err);
            return;
        }
 
        Object.assign( docs[0], req.body,
            { updatedAt: Date.now() }
        );

        docs[0].save( (err, saved) => {

            if( err ) {
                sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            } 
            else {

                let { period, pid } = saved;
                console.log( `SUCCESS: financeReport ${period} ${pid} updated.`);
                sendJSONresponse( res, HTTPCODE.OK, saved );
            }
        });
    });
};   


/** 
 * @name deleteOne
 * @description Delete Finance Report summary
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 503 Service Unavailable & error object
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
const deleteOne = async ( req, res ) => {


    const { periodId } = req.params;

    if( !periodId || periodId === '' ) {

        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Bad request, periodId is required.'
        });    
        return;
    }   

    const finding  = parsePeriodId( periodId );
    
    console.log( `I: try deleteOne sum-finance-report document`,
        '\nI: finding financeReport\'s params: ', req.params,
        '\nI: parsing periodId is: ', finding
    );
    
    if( !finding.period || !finding.pid ) {

        console.log( 'W: [financeReport deleteOne] wrong :periodId specified.' );
        sendJSONresponse( res, HTTPCODE.BAD_REQUEST, {
            message: 'Wrong :periodId in request.'
        });
        return;            
    }

    FinanceReport.findOneAndDelete( finding,
    ( err, doc ) => { 

        if( err ) {

            console.log( err );
            sendJSONresponse( res, HTTPCODE.SERVICE_UNAVAILABLE, err );
            return;
        }
        
        if( !doc ) {

            sendJSONresponse( res, HTTPCODE.NOT_FOUND, doc );
            return;
        }

        let { period, pid } = doc;
        console.log( `I: ${period} ${pid} finance report deleted.` );
        sendJSONresponse( res, HTTPCODE.NO_CONTENT, doc );
    });  
};



module.exports = {

    readOne,
    create,
    updateOne,
    deleteOne,
};




function parsePeriodId( periodId ) {


    let period, pid;
    period = 'week';
    pid  = Number.parseInt( periodId, 10 );

    return {period, pid};
}