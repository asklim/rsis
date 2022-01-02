//const debug = require( 'debug' )( 'reports:week-natural' );
const {
    icwd,
    consoleLogger,
    send201Created,
    send400BadRequest,
    send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-SUM:reports:week-natural:' );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = db.model( 'WeekNatural' );


/**
 * @name createOne
 * @description Create a new week Natural
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @example
 * POST /api/sum/weeknatural
 *
**/

const createOne = (req, res)  => {

    log.info( `try create, sum-week-natural body.id: ${req.body.id}` );

    if( !req.body ||
        !Object.keys( req.body ).length ) { // == 0
        return send400BadRequest( res, 'Bad request, body is required' );
    }

    const { id } = req.body;

    if( !id ) {
        return send400BadRequest( res, 'Bad request, body.id number is required' );
    }

    const finding = { id };

    WeekNatural.
    find( finding ).
    limit( 1 ).
    exec( (err, docs) => {

        if( err ) {
            log.error( err );
            return send500ServerError( res, err );
        }

        if( docs &&
            docs.length ) {
            return send409Conflict( res,
                `Summary data for week ${id} already exists.`
            );
        }

        WeekNatural.
        create( req.body, (err, doc) => {

            if( err ) {
                log.error( 'weekNatural.create err: ', err );
                return send500ServerError( res, err );
            }

            log.info( `SUCCESS: weekNatural ${doc.id} created.`);
            return send201Created( res,
                `Summary data for week ${doc.id} created successfull.`
            );
        });
    });
};


module.exports = createOne;
