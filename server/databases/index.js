
var dbCfg;
var dbTmp;
var dbSum;
//var dbWeekNext;
//var dbWeekCur;
//var dbWeekPrev;

/**
 * name getDB
 * @memberof /api/models 
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
 * @return {Mongoose.Connection} The connection to database
 */
const getDB = dbType => 
{    
  if(typeof dbType !== 'string') {
    console.log('dbType must be a string.');
    return;
  }
  //console.log('getDB : ',); 
  switch (dbType.toLowerCase()) {
    case 'config': return dbCfg;
    case   'temp': return dbTmp;
    case    'sum': return dbSum;
  }
};


const createConns = () => 
{
  if(!dbCfg) { dbCfg = require('./dbrsiscfg'); }
  if(!dbSum) { dbSum = require('./dbrsissum'); }
  if(!dbTmp) { dbTmp = require('./dbrsistmp'); }
};


// To be called when process is restarted Nodemon or terminated
const databasesShutdown = (msg, next) => {
  
  Promise.all([
    dbTmp.closeConn(),
    dbSum.closeConn(),
    dbCfg.closeConn()
  ])
  .then( dbsNames => {
    console.log('dbs closed: ', dbsNames);
    console.log('Mongoose disconnected through ' + msg);
    next();  
  })
  .catch( error => {
    console.log(error.message);
  });
};

module.exports = {
  getDB,
  createConns,
  databasesShutdown
};
