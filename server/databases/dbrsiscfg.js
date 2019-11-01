const conn = require('./dbconnect');
const { 
  dbName,
  mongoURI } = require('../../src/config/enumvalues');

const title = 'rsis.cfg';
let uri;

switch (process.env.NODE_ENV) {
  
  case 'production': 
    uri = mongoURI.STANDALONE+'/'+dbName.rsiscfg;
    //var dbURI = 'mongodb://hp8710w:36667/rsiscfg';      
    break;

  default:
    uri = mongoURI.DEV1+'/'+dbName.rsiscfg;
     //var dbURI = 'mongodb://hp8710w:27017/rsiscfg';    
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
