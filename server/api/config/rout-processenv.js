
const ctrlEnvVariable = require('./ctrl-processenv');

const sendError405 = (req, res) => {
  // Метод запроса не разрешен к использованию для данного URL
  res.status(405);
  res.json({});
};


/**  
 * Read a env variable from process.env by name
 * GET /api/config/processenv?name=<var_name> 
 */
module.exports = function ( router ) {

  let envPath = '/config/processenv';
  
  router.get(envPath, ctrlEnvVariable.readOne);
  router.post(envPath, sendError405);
  router.put(envPath, sendError405);
  router.delete(envPath, sendError405);
  
};

