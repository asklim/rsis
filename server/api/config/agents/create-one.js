const {
    consoleLogger,
    send201Created,
    send400BadRequest,
    send409Conflict,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('api-config:');

// const db = require(`${icwd}/server/databases`).getDB('config');
const databases = require('../../../databases/index');
const db = databases.getDB('config');
const Agent = db.model('Agent');

const formatAgent = require('./format-agents-to-console');


/**
 * Create a new agent
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 500 Server Error & error object
 * @usage
 * POST /api/config/agents
 */
module.exports = async function createOne (
    req,
    res
) {
    const id = req?.body?.id;
    log.info(`try create, config-agents .id: ${id}`);

    if( !req.body
        || Object.keys( req.body ).length == 0 ) {
        send400BadRequest( res, 'Bad request, req.body is empty.');
        return;
    }


    if( !id ) {
        send400BadRequest( res, 'Bad request, req.body.id required.');
        return;
    }

    Agent.
    find( { id, } ).
    limit( 1 ).
    exec( (err, docs) => {

        if( err ) {
            log.error( err );
            send500ServerError( res, err );
            return;
        }

        if( docs && docs.length ) {
            send409Conflict( res, `Agent ${id} already exists.`);
            return;
        }

        Agent.create(
            req.body,
            (err, agent) => {

                if( err ) {
                    log.error('agent create err: ', err );
                    send500ServerError( res, err );
                    return;
                }

                const { id, type } = agent;
                log.info(`SUCCESS: agent type:${type} id:${id} created.`);
                console.log( formatAgent( agent ));
                send201Created( res,
                    `agent type:${type} id:${id} created successful.`
                );
                return;
            }
        );
    });
};
