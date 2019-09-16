const {
  readOne,
  create,
  updateOne,
  deleteOne
} = require('./ctrl-weeknatural');

const icwd = require('fs').realpathSync(process.cwd());
const { 
  postToWebApp: sendToWebApp, 
} = require(`${icwd}/server/helpers/sendToWebApp`);

/**  
 * api for 1 week summary: /api/sum/weeknatural/<weekId>. 
 */
module.exports = function ( router ) {

  let route = '/sum/weeknatural';
  let routeWithWeekId = route + '/:weekId';
  
  router.get( routeWithWeekId, readOne );
  router.post( route, (req, res) => {
    create( req, res );
    sendToWebApp( '/api' + route, req.body );
  });
  router.put( route, (req, res) => {
    updateOne( req, res );
    sendToWebApp( '/api' + route, req.body );
  });
  router.delete(routeWithWeekId, deleteOne);
  
  /* api for all records */
  //router.get(route, readListAll);
};

