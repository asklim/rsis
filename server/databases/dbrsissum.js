const connection = require( './createConn' );
const { 
  dbName,
  mongoURI } = require( '../helpers/serverconfig' );

let title = 'rsis.sum';
let uri;

switch( process.env.NODE_ENV ) {
  
  case 'production': 
    uri = mongoURI.STANDALONE + '/' + dbName.rsissum;
    //var dbURI = 'mongodb://hp8710w:36667/rsissum';  
    break;

  default:
    uri = mongoURI.DEV1 + '/' + dbName.rsissum;
     //var dbURI = 'mongodb://hp8710w:27017/rsissum';    
}      

const db = connection.createConn( uri, title );    
      

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