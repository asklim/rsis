const { 
    icwd, 
    consoleLogger,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-config:' );

const db = require( `${icwd}/server/databases` ).getDB( 'config' );
const Agent = db.model( 'Agent' );


/****** 
 * Delete agent card from Agent collection
 * @name deleteOne
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * DELETE /api/config/agents/:agentId 
 */

module.exports = function deleteOne (req, res) {

    //console.log('dOne: Finding agent`s params: ', req.params);
    //console.log('dOne: Finding agent`s query: ', req.query);
    
    const { agentId } = req.params;

    if( !agentId ) {
        return send400BadRequest( res, 'Bad request, <:agentId> is required.' );  
    } 

    Agent
    .findOneAndDelete(
        { id: agentId },
        (err, agentCard ) => {

            if (err) {
                log.error( err );
                return send500ServerError( res, err );
            }

            if( !agentCard ) {
                return send404NotFound( res, agentCard );
            }

            log.info( `Agent ${agentId} card deleted.` );
            return send204NoContent( res, agentCard );
        });
    
};

