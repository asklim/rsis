//const debug = require( 'debug' )( 'dbs:index' );
const { consoleLogger, } = require( '../helpers' );

const log = consoleLogger( `dbs:` );
const dbs = {};

/**
 * @name getDB
 * @memberof /api/models 
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
 * @return {Mongoose.Connection} The connection to database
 *
**/
const getDB = (dbType) => {
    
    if( typeof dbType !== 'string' ) {
        log.warn( 'dbType must be a string.' );
        return;
    }
    //debug( 'getDB : ', ); 
    switch( dbType.toLowerCase() ) {
        case 'config': return dbs.rsiscfg;
        case   'temp': return dbs.rsistmp;
        case    'sum': return dbs.rsissum;
    }
};


const createMongoDBConnections = () => {

    if( !dbs.rsiscfg ) { dbs.rsiscfg = require( './dbrsiscfg' ); }
    if( !dbs.rsissum ) { dbs.rsissum = require( './dbrsissum' ); }
    if( !dbs.rsistmp ) { dbs.rsistmp = require( './dbrsistmp' ); }

    //debug( 'rsiscfg', dbs.rsiscfg );
};



/**
 * @description To be called when process is restarted Nodemon or terminated
 * @param {String} msg - message for output to console 
 * @param {Function} next - Функция вызывается после закрытия всех подключений 
 *                          к базам данных
 *
**/
const databasesShutdown = async (msg, next) => {
    /*
    const allDbsClosingPromises = Object.keys( dbs )
    .map( 
        (dbKey) => dbs[ dbKey ].closeConn() 
    );

    Promise.all( allDbsClosingPromises
        //[ dbTmp.closeConn(), dbSum.closeConn(), dbCfg.closeConn() ]
    )
    .then( (dbsNames) => {
        console.log( 'dbs closed: ', dbsNames );
        console.log( 'Mongoose disconnected through ' + msg );
        next();  
    })
    .catch( (error) => log.error( error ));
    */

    try {
        const dbsTitles = [];
        for( let dbKey in dbs ) {
            dbsTitles.push( await dbs[ dbKey ].closeConn() );
        }
        console.log( 'dbs closed: ', dbsTitles );
        console.log( `Mongoose disconnected through ${msg}` );
        next();
    }
    catch (error) {
        log.error( error );
    }
};


module.exports = {
    getDB,
    createMongoDBConnections,
    databasesShutdown
};
