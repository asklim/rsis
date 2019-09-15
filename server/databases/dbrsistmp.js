//'use strict';
const util = require('util');

const { dbName } = require('../../src/config/enumvalues');
let rsisDbName = dbName.rsistmp;
const conn = require('./dbconnect');

let title = 'rsis.tmp';
let uri = util.format(process.env.CLOUDDB_URI_TEMPLATE,
  process.env.ATLAS_CREDENTIALS,
  rsisDbName
);

switch (process.env.NODE_ENV) {

  case 'intranet':  
  case 'production': 
    uri = util.format(process.env.CLOUDDB_URI_TEMPLATE,
      process.env.ATLAS_CREDENTIALS,
      rsisDbName
    );
    break;

  default:
    uri = process.env.MONGO_DEV2_URI + '/' + rsisDbName;
     //var dbURI = 'mongodb://localhost:27016/rsistmp';    
}      

const db = conn.createConn(uri, title);    
      

// BRING IN YOUR SCHEMAS & MODELS

//const salePlaceSchema = require('../models/saleplaces');
//db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

//const stafferSchema = require('../models/staffers');
//db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB

//dbInfo.log(db);

module.exports = db;