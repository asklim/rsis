import { RequestHandler } from 'express';
import { /*callbackError405,*/ Router } from '../../helpers';

import procurement from './procurement-handler-get';

const ROOT = '/dataset';
const routesAndHandlers: [string, RequestHandler][] = [
    [`${ROOT}/procurement/:weekId`, procurement ],
];

/**
 * @usage GET /api/dataset/:providerId/:datasetId
 */
export default function router_api_dataset (
    router: Router
) {
    for ( const [route, handler] of routesAndHandlers ) {
        router.get( route , handler );
    }
};
