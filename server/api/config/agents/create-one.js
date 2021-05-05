const { 
    icwd, 
    consoleLogger,
    send201Created,
    send400BadRequest,
    send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-config:' );

const db = require( `${icwd}/server/databases` ).getDB( 'config' );
const Agent = db.model( 'Agent' );

const formatAgent = require( './format-agents-to-console' );


/** 
 * Create a new agent 
 * @name createOne
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * POST /api/config/agents 
 */

module.exports = function createOne (req, res) {


    log.info( `try create, config-agents .id: ${req.body.id}` ); 
    
    if( !req.body 
        || Object.keys( req.body ).length == 0 ) {
        return send400BadRequest( res, 'Bad request, req.body is empty.' );
    }

    const { id } = req.body;

    if( !id ) {
        return send400BadRequest( res, 
            'Bad request, req.body.id required.'
        );
    }  

    Agent
    .find( { id, })
    .limit( 1 )
    .exec( (err, docs) => { 

        if( err ) {                 
            log.error( err );
            return send500ServerError( res, err );
        }

        if( docs && docs.length ) {
            return send409Conflict( res, 
                `Agent ${id} already exists.`
            );
        }

        Agent.create( 
            req.body, 
            (err, agent) => {

                if( err ) {
                    log.error( 'agent create err: ', err );
                    return send500ServerError( res, err ); 
                } 

                let { id, type } = agent;
                log.info( `SUCCESS: agent type:${type} id:${id} created.` );
                console.log( formatAgent( agent ));
                return send201Created( res, 
                    `agent type:${type} id:${id} created successful.` 
                );
            }
        );
    });
};

