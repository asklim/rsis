//"use strict";
const ctrlAgents = require('../../controllers/agents');

/**  
 * api for 1 agent: /api/config/agents/<agentId>. 
 */
module.exports = function ( router ) {

  let agents = '/config/agents';
  let agentId = agents+'/:agentId';
  
  router.get(agentId, ctrlAgents.readOne);
  router.post(agents, ctrlAgents.create);
  router.put(agentId, ctrlAgents.updateOne);
  router.delete(agentId, ctrlAgents.deleteOne);
  
  /* api for all agents */
  router.get(agents, ctrlAgents.readListAll);
};

