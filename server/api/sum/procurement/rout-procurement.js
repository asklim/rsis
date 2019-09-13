const { readOne } = require('./ctrl-procurement');

/**  
 * api for 1 week procurement: /api/sum/procurements/<weekId>. 
 */
module.exports = function ( router ) {

  let route = '/sum/procurement';
  let routeWithWeekId = route + '/:weekId';
  
  router.get(routeWithWeekId, readOne);

};

