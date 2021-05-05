//const debug = require( 'debug' )( 'api:sum:weeknatural' );
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
const WeekNatural = db.model( 'WeekNatural' );


/** 
 * @name readOne
 * @description 
 * Read a week summary Natural info 
 * by the XXI century weekId or 'last' 
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * GET /api/sum/weeknatural/:weekId
 * @example
 * GET /api/sum/weeknatural/960
 * GET /api/sum/weeknatural/1011
 * GET /api/sum/weeknatural/last 
 * 
**/
const readOne = (req, res) => {


    console.log( 
        `I: try readOne sum-week-natural document`,
        `\nI: finding weekNatural's params:`, req.params,
        `\nI: finding weekNatural's query :`, req.query
    );
    
    const { weekId } = req.params;

    if( !req.params || !weekId ) {

        log.warn( 'weekNatural.readOne: No weekId specified.' );
        return send400BadRequest( res, 'No weekId in request.' );
    }

    let finding, sorting, weekNumber;

    if( weekId.toLowerCase() === 'last' ) {
        
        finding = {};
        sorting = { id: -1 };
    }
    else {

        weekNumber = Number.parseInt( weekId, 10 );
        if( !weekNumber ) {

            log.warn( 'weekNatural.readOne: wrong weekId specified.' );
            return send400BadRequest( res, 'Wrong weekId in request.' );
        }

        finding =  { id: weekNumber };
        sorting =  {};            
    }


    WeekNatural
        .find( finding )
        .sort( sorting )
        .limit(1)
        .exec( (err, docs) => {

            if( err ) {                 
                log.error( err );
                return send500ServerError( res, err );
            } 

            if( !docs || docs.length < 1 ) {

                let msg = `Summary data for week ${weekId}/${weekNumber} not found.`;
                log.warn( `weekNatural ${msg}` );

                return send404NotFound( res, `WeekNatural ${msg}` );
            }

            log.info( `SUCCESS: weekNatural ${docs[0].id} readOne is Ok.`);
            return send200Ok( res, docs[0] );
        });

};

module.exports = readOne;
