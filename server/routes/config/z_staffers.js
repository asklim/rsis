
const ctrlStaffers = require('../../controllers/staffers');

/**  
  * api for 1 staffer: /api/staffers/<stafferId>. 
  * */
module.exports.setStaffersRoutes = function ( router ) {

  let staffers = '/config/staffers';
  let stafferId = staffers + '/:stafferId';
  
  router.get(stafferId, ctrlStaffers.stafferReadOne);
  router.post(staffers, ctrlStaffers.stafferCreate);
  router.put(stafferId, ctrlStaffers.stafferUpdateOne);
  router.delete(stafferId, ctrlStaffers.stafferDeleteOne);
  
  /* api for all staffers */
  router.get(staffers, ctrlStaffers.staffersListAll);
};

