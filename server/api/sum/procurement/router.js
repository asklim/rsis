
const handler_GET = require('../../dataset/get-procurement.cjs');
//const handler_GET = require('./read-one');

/**
 * api for 1 week procurement: /api/sum/procurements/<weekId>.
 */
module.exports = function (router) {

    const route = '/sum/procurement';
    const routeWithWeekId = route + '/:weekId';

    router.get( routeWithWeekId, handler_GET );
};

