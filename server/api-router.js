const debug = require( 'debug' )( 'api:router' );

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


router.all(
    '/*',
    (_req, res) => {
        res.status( 400 );
        res.json( { message: "Bad request at api-router." });
        debug( `${__filename} - api-router.js - unhandled route` );
    }
);

module.exports = router;
