
//var dbCfg;
//var dbTmp;
//var dbSum;
//var dbWeekNext;
//var dbWeekCur;
//var dbWeekPrev;

var dbs = {};
/**
 * name getDB
 * @memberof /api/models 
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
 * @return {Mongoose.Connection} The connection to database
 */
const getDB = dbType => 
{    
  if( typeof dbType !== 'string' ) {
    console.log( 'dbType must be a string.' );
    return;
  }
  //console.log( 'getDB : ', ); 
  switch( dbType.toLowerCase() ) {
    case 'config': return dbs.rsiscfg;
    case   'temp': return dbs.rsistmp;
    case    'sum': return dbs.rsissum;
  }
};


const createConns = () => 
{
  if( !dbs.rsiscfg ) { dbs.rsiscfg = require( './dbrsiscfg' ); }
  if( !dbs.rsissum ) { dbs.rsissum = require( './dbrsissum' ); }
  if( !dbs.rsistmp ) { dbs.rsistmp = require( './dbrsistmp' ); }
};


// To be called when process is restarted Nodemon or terminated
const databasesShutdown = (msg, next) => {

  const allDbsClosingPromises = Object.keys( dbs ).map( 
    dbKey => dbs[ dbKey ].closeConn() );

  Promise.all( allDbsClosingPromises
    /*[
    dbTmp.closeConn(),
    dbSum.closeConn(),
    dbCfg.closeConn()
  ]*/)
  .then( dbsNames => {
    console.log( 'dbs closed: ', dbsNames );
    console.log( 'Mongoose disconnected through ' + msg );
    next();  
  })
  .catch( error => console.log( error.message ));
};

module.exports = {
  getDB,
  createConns,
  databasesShutdown
};
