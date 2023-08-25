
const {
    callbackError405,
} = require('../../../helpers');

const
    createOne = require('./create-one'),
    readOne = require('./read-one'),
    updateOne = require('./update-one'),
    deleteOne = require('./delete-one'),
    readTypesGroupsIdsList = require('./read-types-groups-ids-list'),
    readAgentsList = require('./read-agents-list')
;

/**
 * api for 1 agent: /api/config/agents/<agentId>.
 */

module.exports = function (router) {

    const agents = '/config/agents';
    const agentId = agents+'/:agentId';
    const agentsList = agents + '/list';

    /* api for agents lists, must be before? one-agent routes */
    router.get( agentsList, readAgentsList );

    router.post( agentsList, callbackError405 );
    router.put( agentsList, callbackError405 );
    router.delete( agentsList, callbackError405 );

    router.get( agents, readTypesGroupsIdsList );

    // one-agent routes
    router.post( agents, createOne );
    router.put( agents, updateOne );

    router.delete( agents, callbackError405 );

    router.get( agentId, readOne );
    router.delete( agentId, deleteOne );

    router.post( agentId, callbackError405 );
    router.put( agentId, callbackError405 );
};
