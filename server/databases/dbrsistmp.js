const util = require( 'util' );
const connection = require( './create-conn' );
const { 
  dbName,
  mongoURI 
} = require( '../helpers/serverconfig' );

const { rsistmp: databaseName } = dbName;

let title = `temp-db [${databaseName}]`;

let uri = ( process.env.NODE_ENV === 'production' ) 
  ? util.format( mongoURI.CLOUDDB_TEMPLATE,
      process.env.ATLAS_CREDENTIALS,
      databaseName 
    )
  : `${ process.env.MONGO_DEV2 || mongoURI.DEV2 }/${databaseName}`;
  //var dbURI = 'mongodb://hp8710w:27016/rsistmp';       

const db = connection.createConn( uri, title );    
      

// BRING IN YOUR SCHEMAS & MODELS

//const salePlaceSchema = require('../models/saleplaces');
//db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

//const stafferSchema = require('../models/staffers');
//db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB

module.exports = db;
