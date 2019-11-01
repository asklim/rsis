const util = require( 'util' );

const connection = require( './createConn' );
const { 
  dbName,
  mongoURI } = require( '../helpers/serverconfig' );


let title = 'rsis.tmp';
let uri = util.format(mongoURI.CLOUDDB_TEMPLATE,
  process.env.ATLAS_CREDENTIALS,
  dbName.rsistmp
);

switch( process.env.NODE_ENV ) {

  case 'production': 
    uri = util.format( mongoURI.CLOUDDB_TEMPLATE,
      process.env.ATLAS_CREDENTIALS,
      dbName.rsistmp
    );
    break;

  default:
    uri = mongoURI.DEV2 + '/' + dbName.rsistmp;
     //var dbURI = 'mongodb://hp8710w:27016/rsistmp';    
}      

const db = connection.createConn( uri, title );    
      

// BRING IN YOUR SCHEMAS & MODELS

//const salePlaceSchema = require('../models/saleplaces');
//db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

//const stafferSchema = require('../models/staffers');
//db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB

//dbInfo.log(db);

module.exports = db;