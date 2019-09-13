
const ctrlSaleplaces = require('../../controllers/saleplaces');

/**  
  * api for 1 saleplace: /api/saleplaces/<placeId>. 
  **/
module.exports.setSaleplacesRoutes = function ( router ) {

  let places = '/config/saleplaces';
  let placeId = places+'/:placeId';
  
  router.get(placeId, ctrlSaleplaces.saleplaceReadOne);
  router.post(places, ctrlSaleplaces.saleplaceCreate);
  router.put(placeId, ctrlSaleplaces.saleplaceUpdateOne);
  router.delete(placeId, ctrlSaleplaces.saleplaceDeleteOne);
  
  /* api for all saleplaces */
  router.get(places, ctrlSaleplaces.saleplacesListAll);
};

