//const debug = require( 'debug' )( 'reports:week-natural' );
const {
    icwd,
    consoleLogger,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-SUM:reports:week-natural:' );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = db.model( 'WeekNatural' );


/**
 * Delete week Natural summary
 * @name deleteOne
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * DELETE /api/sum/weeknatural/:weekId
 * @example
 * DELETE /api/sum/weeknatural/956
 * DELETE /api/sum/weeknatural/1011
**/

module.exports = function deleteOne (req, res) {


    const { weekId } = req.params;

    if( !weekId ) {
        return send400BadRequest( res, 'Bad request, <:weekId> is required.' );
    }

    const weekNumber  = Number.parseInt( weekId, 10 );

    if( !weekNumber ) {
        log.warn( `[weekNatural.deleteOne] bad parameter <:weekId> specified.` );
        return send400BadRequest( res, 'Bad parameter <:weekId> in request.' );
    }

    WeekNatural.
    findOneAndDelete(
        { id: weekNumber },
        (err, doc) => {

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            }

            if( !doc ) {
                return send404NotFound( res, doc );
            }

            log.info( `Week ${weekId} natural summary deleted.` );
            return send204NoContent( res, doc );
        }
    );
};

