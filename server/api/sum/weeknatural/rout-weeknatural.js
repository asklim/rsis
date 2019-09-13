const {
  readOne,
  create,
  updateOne,
  deleteOne
} = require('./ctrl-weeknatural');

/**  
 * api for 1 week summary: /api/sum/weeknatural/<weekId>. 
 */
module.exports = function ( router ) {

  let route = '/sum/weeknatural';
  let routeWithWeekId = route + '/:weekId';
  
  router.get(routeWithWeekId, readOne);
  router.post(route, create);
  router.put(route, updateOne);
  router.delete(routeWithWeekId, deleteOne);
  
  /* api for all records */
  //router.get(route, readListAll);
};

