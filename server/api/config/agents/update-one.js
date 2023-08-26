
const {
    icwd,
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('api-config:');

const db = require(`${icwd}/server/databases`).getDB('config');
const Agent = db.model('Agent');



/**
 * Update agent card
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @example
 * PUT /api/config/agents
*/
module.exports = async function updateOne (
    req,
    res
) {
    if( !req.body
        || Object.keys( req.body ).length == 0 ) {
        send400BadRequest( res, 'Bad request, body is empty');
        return;
    }
    //console.log(req.body);

    const id = req?.body?.id;

    if( !id ) {
        send400BadRequest( res, 'Bad request, <.id> field is required.');
        return;
    }

    Agent.findOne(
        { id, },
        (err, findedAgent) => {

            if( err ) {
                log.error( err );
                send500ServerError( res, err );
                return;
            }

            if( !findedAgent ) {
                send404NotFound( res, `agent ${id} not found.`);
                return;
            }


            Object.assign( findedAgent, req.body );
            //agent.host = req.body.host;

            findedAgent.
            save( (err, savedAgent) => {

                if( err ) {
                    send500ServerError( res, err );
                    return;
                }

                log.info(`SUCCESS: agent ${savedAgent.id} updated.`);
                send200Ok( res, savedAgent );
            });
        }
    );
};
