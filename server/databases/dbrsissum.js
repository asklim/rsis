const connection = require( './createConn' );
const { 
  dbName,
  mongoURI 
} = require( '../helpers/serverconfig' );
const { rsissum: databaseName } = dbName;

let title = 'rsis.sum';
/*let uri = ( process.env.NODE_ENV === 'production' ) 
  ? mongoURI.STANDALONE + '/' + dbName.rsissum
    //'mongodb://hp8710w:36667/rsissum';  
  : mongoURI.DEV1 + '/' + dbName.rsissum;
    //'mongodb://hp8710w:27017/rsissum';       
*/

//'mongodb://hp8710w:36667 || env.MONGO_DEV1 || hp8710w:27017
let uri = ( process.env.NODE_ENV === 'production' ) 
  ? ( process.env.MONGO_STANDALONE || mongoURI.STANDALONE )
  : ( process.env.MONGO_DEV1 || mongoURI.DEV1 );
const db = connection.createConn( `${uri}/${databaseName}`, title );   


// BRING IN YOUR SCHEMAS & MODELS

const weekNaturalSchema = require( '../api/sum/weeknatural/schm-weeknatural' );
db.model( 'WeekNatural', weekNaturalSchema, 'weekNatural' ); 
// last arg - collection`s name in MongoDB

/*
var stafferSchema = require('./staffers');
db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB
*/


module.exports = db;