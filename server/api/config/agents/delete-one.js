const {
    consoleLogger,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('api-config:');

// const db = require(`${icwd}/server/databases`).getDB('config');
const databases = require('../../../databases/index');
const db = databases.getDB('config');
const Agent = db.model('Agent');


/******
 * Delete agent card from Agent collection
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @usage
 * DELETE /api/config/agents/:agentId
 */
module.exports = async function deleteOne (
    req,
    res
) {
    //console.log('dOne: Finding agent`s params: ', req.params);
    //console.log('dOne: Finding agent`s query: ', req.query);

    const { agentId } = req.params;

    if( !agentId ) {
        send400BadRequest( res, 'Bad request, <:agentId> is required.');
        return;
    }

    Agent.
    findOneAndDelete(
        { id: agentId },
        (err, agentCard ) => {

            if (err) {
                log.error( err );
                send500ServerError( res, err );
                return;
            }
            if( !agentCard ) {
                send404NotFound( res, agentCard );
                return;
            }

            log.info(`Agent ${agentId} card deleted.`);
            send204NoContent( res, agentCard );
        });

};
