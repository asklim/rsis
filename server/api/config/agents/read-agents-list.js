const debug = require( 'debug' )( 'api:config:agents' );
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
 * Return a (A)-list of all agents docs or
 * (B)-agent`s doc list { by type and/or group }
 * @usage
 * GET /api/config/agents/list
 * GET /api/config/agents/list?type=t
 * GET /api/config/agents/list?type=t&group=g
 */

module.exports = function readAgentsList (req, res) {


    console.log(
        'I: try read-agents-list config-agents document',
        '\nI: finding agent`s list params:', req.params,
        '\nI: finding agent`s list query:', req.query
    );

    if( !req.query ) {
        console.log('No query object for agents-list specified.');
        return send400BadRequest( res, 'No query object in request.' );
    }

    let queryLength = Object.keys( req.query ).length; // 0, 1, 2 and more

    let filtering = {}; // all agents

    if( queryLength ) { // !==0

        let typeCondition = new RegExp( req.query.type, 'i' );
        let groupCondition = new RegExp( req.query.group, 'i' );

        if( req.query.type ) { 
            filtering = { ...filtering, type: typeCondition };
        }
        if( req.query.group ) {
            filtering = { ...filtering, group: groupCondition };
        }
    }

    debug( 'conditions: ', filtering );

    Agent.find(
        filtering,
        (err, agents) => {

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            }
            if( !agents ) {
                return send404NotFound( res, 'agents not found.' );
            }

            log.info( 'read-agents-list count:', Object.keys( agents ).length );
            return send200Ok( res, agents);
        }
    );
};

