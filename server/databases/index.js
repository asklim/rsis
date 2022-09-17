const debug = require('debug')('_temp:dbs:index');
const { consoleLogger, } = require('../helpers');

const log = consoleLogger(`[mongo-dbs]`);
const dbs = {};

const DB_CODENAME = {
    'cfg'   : 'rsiscfg',
    'config': 'rsiscfg',
    'sum'   : 'rsissum',
    'temp'  : 'rsistmp',
};

/**
 * @name getDB
 * @memberof /api/models
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
 * @return {Mongoose.Connection} The connection to database
 *
**/
function getDB (dbType) {

    if( typeof dbType !== 'string' ) {
        log.warn( 'dbType must be a string.' );
        return;
    }

    let dbName = DB_CODENAME[ dbType.toLowerCase() ];

    /*switch( dbType.toLowerCase() ) {
        case 'config': dbName = 'rsiscfg'; break;
        case   'temp': dbName = 'rsistmp'; break;
        case    'sum': dbName = 'rsissum'; break;
    }*/

    if( !dbs[dbName] ) {
        createMongoDBConnections();
    }
    debug(`getDB: ${dbs[ dbName ]}\ntypeof .model: ${typeof dbs[ dbName ].model}`);

    return dbs[ dbName ];
    //Если getDB = async (), то ломается там где используется.
    //Надо переделывать под await, т.к. возвращается Promise???
}


function createMongoDBConnections () {
    if( !dbs.rsiscfg ) { dbs.rsiscfg = require('./dbrsiscfg'); }
    if( !dbs.rsissum ) { dbs.rsissum = require('./dbrsissum'); }
    if( !dbs.rsistmp ) { dbs.rsistmp = require('./dbrsistmp'); }
}


/**
 * @description To be called when process is restarted Nodemon or terminated
 * @param {String} msg - message for output to console
 * @param {Function} next - Функция вызывается после закрытия всех подключений
 *                          к базам данных
 *
**/
async function databasesShutdown (
    msg,
    next
) {
    try {
        const dbsTitles = [];
        for( let dbKey in dbs ) {
            const db = dbs[ dbKey ];
            // eslint-disable-next-line no-await-in-loop
            const title = await db.closeConn();
            dbsTitles.push( title );
        }
        log.info('dbs closed: ', dbsTitles );
        console.log(`Mongoose disconnected through ${msg}`);
    }
    catch (error) {
        log.error('databases shutdown error', error );
    }
    finally {
        next && await next();
    }
}


module.exports = {
    getDB,
    createMongoDBConnections,
    databasesShutdown
};
