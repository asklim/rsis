
import handlerGET from './handler-get';
import { callbackError405 } from '../../helpers';
// Метод запроса не разрешен к использованию для данного URL


/**
 * Return status of app or DBs
 * @usage GET /api/health/app
 * @usage GET /api/health/databases
 * @usage GET /api/health/mongocfg
 * @usage GET /api/health/mongosum
 */
export default function routerApiHealth (router) {

    const route = '/health';
    const routeWithId = `${route}/:pingId`;

    router.get( route, handlerGET );
    router.all( route, callbackError405 );
    router.get( routeWithId, handlerGET );
    router.all( routeWithId, callbackError405 );

};
