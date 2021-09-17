
const handlerGET = require( './handler-get' );
const { callbackError405 } = require( '../../helpers' );
// Метод запроса не разрешен к использованию для данного URL


/**
 * Return status of app or DBs
 * @usage GET /api/health/app
 * @usage GET /api/health/databases
 * @usage GET /api/health/mongocfg
 * @usage GET /api/health/mongosum
 */

module.exports = function ( router ) {

    const route = '/health';
    const routeWithId = `${route}/:pingId`;

    router.get( route, handlerGET );
    router.all( route, callbackError405 );
    router.get( routeWithId, handlerGET );
    router.all( routeWithId, callbackError405 );

};
