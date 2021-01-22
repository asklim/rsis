
var dbs = {};

/**
 * @name getDB
 * @memberof /api/models 
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
 * @return {Mongoose.Connection} The connection to database
 *
**/
const getDB = dbType => {    
    
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


const createConns = () => {

    if( !dbs.rsiscfg ) { dbs.rsiscfg = require( './dbrsiscfg' ); }
    if( !dbs.rsissum ) { dbs.rsissum = require( './dbrsissum' ); }
    if( !dbs.rsistmp ) { dbs.rsistmp = require( './dbrsistmp' ); }
};



/**
 * @description To be called when process is restarted Nodemon or terminated
 * @param {String} msg - message for output to console 
 * @param {Function} next - Функция вызывается после закрытия всех подключений 
 *                          к базам данных
 *
**/
const databasesShutdown = (msg, next) => {

    const allDbsClosingPromises = Object.keys( dbs )
    .map( 
        dbKey => dbs[ dbKey ].closeConn() 
    );

    Promise.all( allDbsClosingPromises
        /*[
        dbTmp.closeConn(),
        dbSum.closeConn(),
        dbCfg.closeConn()
        ]*/
    )
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
