const connection = require( './create-conn' );
const { 
  dbName,
  mongoURI 
} = require( '../helpers/serverconfig' );
const { rsiscfg: databaseName } = dbName;

let title = 'rsis.cfg';
/*let uri = ( process.env.NODE_ENV === 'production' ) 
  ? mongoURI.STANDALONE + '/' + dbName.rsiscfg
    //'mongodb://hp8710w:36667/rsiscfg';  
  : mongoURI.DEV1 + '/' + dbName.rsiscfg;
    //'mongodb://hp8710w:27017/rsiscfg';     
*/

//'mongodb://hp8710w:36667 || env.MONGO_DEV1 || hp8710w:27017
let uri = ( process.env.NODE_ENV === 'production' ) 
  ? ( process.env.MONGO_STANDALONE || mongoURI.STANDALONE )
  : ( process.env.MONGO_DEV1 || mongoURI.DEV1 );
const db = connection.createConn( `${uri}/${databaseName}`, title );    
      

// BRING IN YOUR SCHEMAS & MODELS

const agentSchema = require( '../models/agents' );
db.model( 'Agent', agentSchema, 'agents' ); 

const userSchema = require( '../models/users' );
db.model( 'User', userSchema, 'users' ); 

const idMappingSchema = require( '../models/catalogs' ).idMappingExcel;
db.model( 'IdMappingExcel', idMappingSchema, 'catalogs' ); 


module.exports = db;


//const salePlaceSchema = require('../models/saleplaces');
//db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

//const stafferSchema = require('../models/staffers');
//db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB
