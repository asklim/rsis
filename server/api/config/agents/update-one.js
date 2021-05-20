
const { 
    icwd, 
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-config:' );

const db = require( `${icwd}/server/databases` ).getDB( 'config' );
const Agent = db.model( 'Agent' );



/** 
 * Update agent card 
 * @name updateOne
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @example
 * PUT /api/config/agents
 */

module.exports = function updateOne (req, res) {


    if( !req.body 
        || Object.keys( req.body ).length == 0 ) {
        return send400BadRequest( res, 'Bad request, body is empty' );
    }
    //console.log(req.body);

    const { id } = req.body;

    if( !id ) {
        return send400BadRequest( res, 'Bad request, <.id> field is required.' );
    }

    Agent.findOne(
        { id, },
        (err, findedAgent) => {

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            }

            if( !findedAgent ) {
                return send404NotFound( res, `agent ${id} not found.` );
            } 


            Object.assign( findedAgent, req.body );
            //agent.host = req.body.host;

            findedAgent
            .save( (err, savedAgent) => {

                if( err ) {
                    return send500ServerError( res, err );
                }

                log.info( `SUCCESS: agent ${savedAgent.id} updated.` );
                return send200Ok( res, savedAgent );

            });
        }
    );
};
