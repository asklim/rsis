var debug = require('debug')('api:router');

const router = require('express').Router();

require('./auth')( router );

require('./config/catalogs')( router );

require('./config/agents')( router );

require('../api/config/ping/rout-ping')( router );

require('../api/config/rout-processenv')( router );

require('../api/sum/procurement/rout-procurement')( router );

require('../api/sum/weeknatural/rout-weeknatural')( router );

router.all('/*', 
    (req, res) => {
        res.status(400);
        res.json({message: "Bad request at api-router."});
        debug(`${__filename}  router.all - unhandled route`);
});

/*
const { setSaleplacesRoutes } = require('./config/saleplaces');
setSaleplacesRoutes( router );

const { setStaffersRoutes } = require('./config/staffers');
setStaffersRoutes( router );
*/

module.exports = router;
