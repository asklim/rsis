const util = require('util');

const { dbName } = require('../../src/config/enumvalues');
const conn = require('./dbconnect');

const title = 'rsis.cfg';
let uri;

switch (process.env.NODE_ENV) {
  
  case 'production': 
    //uri = process.env.CLOUDDB_CFG_URI;
    uri = util.format(process.env.CLOUDDB_URI_TEMPLATE,
      process.env.ATLAS_CREDENTIALS,
      dbName.rsiscfg
    );
    break;
/*
  case 'intranet':
    uri = process.env.MONGO_STANDALONE_URI+'/'+dbName.rsiscfg;
    //var dbURI = 'mongodb://localhost:36667/rsiscfg';      
    break;
*/
  default:
    uri = process.env.MONGO_DEV1_URI+'/'+dbName.rsiscfg;
     //var dbURI = 'mongodb://localhost:27017/rsiscfg';    
}      

const db = conn.createConn(uri, title);    
      

// BRING IN YOUR SCHEMAS & MODELS

const agentSchema = require('../models/agents');
db.model('Agent', agentSchema, 'agents'); 

const userSchema = require('../models/users');
db.model('User', userSchema, 'users'); 

const idMappingSchema = require('../models/catalogs').idMappingExcel;
db.model('IdMappingExcel', idMappingSchema, 'catalogs'); 


module.exports = db;


//const salePlaceSchema = require('../models/saleplaces');
//db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

//const stafferSchema = require('../models/staffers');
//db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB
