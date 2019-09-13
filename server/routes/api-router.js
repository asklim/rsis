//const express = require('express');
//import express from 'express';
//const router = express.Router();

const router = require('express').Router();

require('./auth')( router );

require('./config/catalogs')( router );

require('./config/agents')( router );

require('../api/config/ping/rout-ping')( router );

require('../api/config/rout-processenv')( router );

require('../api/sum/procurement/rout-procurement')( router );

require('../api/sum/weeknatural/rout-weeknatural')( router );

router.get('/*', 
  (req, res) => {
     res.status(400);
     res.json({message: "Bad request in api-router."});
});

/*
const { setSaleplacesRoutes } = require('./config/saleplaces');
setSaleplacesRoutes( router );

const { setStaffersRoutes } = require('./config/staffers');
setStaffersRoutes( router );
*/

module.exports = router;
