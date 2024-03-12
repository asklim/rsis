import {
    Router,
    callbackError400,
    //callbackError405
} from '<ssrv>/helpers/';


import handlerGET    from './handler-get';
import handlerPOST   from './handler-post';
import handlerPUT    from './handler-put';
import handlerDELETE from './handler-delete';

const ROOT = '/registr/items-balances';
const routeWithId = `${ROOT}/:documentId`;


export default function router_api_registr_itemsBalances (
    router: Router
) {
    router.get( routeWithId, handlerGET );
    router.put( routeWithId, handlerPUT);
    router.delete( routeWithId, handlerDELETE );

    router.get( ROOT, handlerGET );
    router.post( ROOT, handlerPOST );
    router.put( ROOT, handlerPUT);
    router.delete( ROOT, handlerDELETE );

    router.all(`${ROOT}/*`, callbackError400 );
};
