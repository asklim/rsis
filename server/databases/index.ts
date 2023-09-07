
import {
    debugFactory,
    Logger,
} from '../helpers';

import cfgDbConnection from './dbrsiscfg';
import sumDbConnection from './dbrsissum';
import tmpDbConnection from './dbrsistmp';

const d = debugFactory('--temp:dbs:index');
const log = new Logger('[mongo-dbs]');

const dbs: {
    rsiscfg: any,
    rsissum: any,
    rsistmp: any,
} = {
    rsiscfg: null,
    rsissum: null,
    rsistmp: null,
};

const DB_CODE_NAMES = {
    'cfg'   : 'rsiscfg',
    'config': 'rsiscfg',
    'sum'   : 'rsissum',
    'temp'  : 'rsistmp',
};

/**
 * return The connection to database
 * @memberof /api/models
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
**/
function getDB (dbType: string) {

    const dbKey = dbType.toLowerCase();
    if( !(dbKey in DB_CODE_NAMES) ) {
        log.error('Wrong `dbType` parameter.');
        return;
    }

    const dbCodeName = DB_CODE_NAMES[ dbKey ];

    if( !dbs[ dbCodeName ] ) {
        createMongoDBConnections();
    }
    d(`getDB: ${dbs[ dbCodeName ]}, dbName: ${dbCodeName}, dbKey: ${dbKey}\n`+
      `typeof .model: ${typeof dbs[ dbCodeName ]?.model}`);

    return dbs[ dbCodeName ];
    //Если getDB = async (), то ломается там где используется.
    //Надо переделывать под await, т.к. возвращается Promise???
}


function createMongoDBConnections () {
    if( !dbs.rsiscfg ) { dbs.rsiscfg = cfgDbConnection; }
    if( !dbs.rsissum ) { dbs.rsissum = sumDbConnection; }
    if( !dbs.rsistmp ) { dbs.rsistmp = tmpDbConnection; }
    // if( !dbs.rsiscfg ) { dbs.rsiscfg = (await import('./dbrsiscfg')).default; }
    // if( !dbs.rsissum ) { dbs.rsissum = (await import('./dbrsissum')).default; }
    // if( !dbs.rsistmp ) { dbs.rsistmp = (await import('./dbrsistmp')).default; }
}


/**
 * To be called when process is restarted Nodemon or terminated
 * @param msg - message for output to console
 * @param next - Функция вызывается после закрытия всех подключений к базам данных
**/
async function databasesShutdown (
    msg: string,
    next: any
)
: Promise<void> {
    try {
        const dbsTitles: string[] = [];
        for( const dbKey in dbs ) {
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


export {
    getDB,
    createMongoDBConnections,
    databasesShutdown
};
