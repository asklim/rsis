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

const formatAgent = require( './format-agents-to-console' );

/** 
 * Read a agent info by the id
 * @name readOne
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * GET /api/config/agents/:agentId 
 **/

module.exports = function readOne (req, res) {


    console.log(
        'I: try readOne config-agents document',
        '\n I: finding agent`s params:', req.params,
        '\n I: finding agent`s query:', req.query
    );
  
    const { agentId } = req.params;

    if( !agentId ) {
        log.warn( 'agents.readOne: No agentId specified' );
        return send400BadRequest( res, 'No agent.Id in request' );
    }

    Agent
    .findOne( 
        { id: agentId },
        (err, agent) => {

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            } 

            if( !agent ) {
                let msg = `Agent ${agentId} not found.`;
                log.warn( msg );
                return send404NotFound( res, msg );                
            }

            log.info( `SUCCESS: Agent ${agentId} readOne is Ok.` );
            console.log( formatAgent( agent ));
            return send200Ok( res, agent );
        });

};

