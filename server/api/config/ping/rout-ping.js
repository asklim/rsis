
const ctrlPing = require('./ctrl-ping');

const sendError405 = (req, res) => {
  // Метод запроса не разрешен к использованию для данного URL
  res.status(405);
  res.json({});
};


/**  
 * Read a env variable from process.env by name
 * GET /api/config/ping/app
 * GET /api/config/ping/mongo
 */
module.exports = function ( router ) {

  let pingPath = '/config/ping/:pingId';
  
  router.get(pingPath, ctrlPing.readOne);
  router.post(pingPath, sendError405);
  router.put(pingPath, sendError405);
  router.delete(pingPath, sendError405);
  
};

