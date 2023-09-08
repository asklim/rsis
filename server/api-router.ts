
import { Logger, express } from './helpers/';

//const d = debugFactory('router:api');
const log = new Logger('[rsis:api-router]');

const ROUTERS_PATHS = [
    './api/config/catalog-layouts/router',
    './api/config/agents/router',
    './api/health/router',
    './api/registr/items-balances/router',
    './api/reports/daily/router',
    './api/sum/procurement/router',
    './api/sum/weeknatural/router',
    './api/sum/financereport/router',
    './api/user/router',
    './api/dataset/router',
    './api/processenv/router',
];


const router = express.Router();

(async (rtr) => {
    for ( const path of ROUTERS_PATHS ) {
        const useRouter = (await import( path )).default;
        useRouter( rtr );
    }
    // (await import('./api/user/router')).default( rtr );
    // (await import('./api/config/catalog-layouts/router')).default( rtr );
    // (await import('./api/config/agents/router')).default( rtr );
    // (await import('./api/health/router')).default( rtr );
    // (await import('./api/processenv/router')).default( rtr );
    // (await import('./api/registr/items-balances/router')).default( rtr );
    // (await import('./api/reports/daily/router')).default( rtr );
    // (await import('./api/sum/procurement/router')).default( rtr );
    // (await import('./api/sum/weeknatural/router')).default( rtr );
    // (await import('./api/sum/financereport/router')).default( rtr );
    // (await import('./api/dataset/router')).default( rtr );

    // eslint-disable-next-line no-unused-vars
    rtr.use( (req, res /*, _next*/) => {
        log.warn(`${__filename} - unhandled route: ${req.url}`);
        //log.warn(_req);
        res.status( 400 );
        const utcStamp = (new Date).toUTCString();
        res.json( { message: `Bad request at api-router (${utcStamp}).`});
    });

})( router );

export default router;
