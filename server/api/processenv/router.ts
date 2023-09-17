
import {
    callbackError405,
    Router,
} from '../../helpers/';

import handler_GET from './handler-get';
//import handler_OPTIONS = './handler-options';

// Это ответ на запрос OPTIONS
// Access-Control-Allow-Methods - ответ Express
// GET,HEAD,PUT,PATCH,POST,DELETE
// Дополнительно - есть ответ:
// COPY,LINK,UNLINK,PURGE,LOCK,UNLOCK,PROPFIND
// Нет ответа на запрос VIEW

/**
* Read a env variable from process.env by name
* GET /api/config/processenv?name=<var_name>
*/
export default function routerApiProcessEnv (
    router: Router
) {
    const envPath = '/processenv';

    //router.get(`${envPath}/:name`, handler_GET );
    router.get( envPath, handler_GET );
    router.all( envPath, callbackError405 );

    //router.options( envPath, handler_OPTIONS );
    //router.post( envPath, callbackError405 );
    //router.put( envPath, callbackError405 );
    //router.delete( envPath, callbackError405 );

};
