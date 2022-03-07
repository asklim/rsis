//const debug = require( 'debug' )( 'router:api' );
const { consoleLogger } = require(`./helpers/`);

const log = consoleLogger( '[rsis:api-router]' );


const router = require( 'express' ).Router();

require( './api/user/router' )( router );

require( './api/config/catalog-layouts/router' )( router );

require( './api/config/agents/router' )( router );

require( './api/health/router' )( router );

require( './api/processenv/router' )( router );

require( './api/registr/items-balances/router' )( router );

require( './api/reports/daily/router' )( router );

require( './api/sum/procurement/router' )( router );

require( './api/sum/weeknatural/router' )( router );

require( './api/sum/financereport/router' )( router );

require( './api/dataset/router.cjs' )( router );


router.all(
    '/*',
    (_req, res) => {
        log.warn( `${__filename} - api-router.js - unhandled route` );
        res.status( 400 );
        const tstamp = (new Date).toUTCString();
        res.json( { message: `Bad request at api-router (${tstamp}).` });
    }
);

module.exports = router;
