const logdebug = require('debug')('dbs:connect');
const debug = (...args) => logdebug('\b:[tmp]', ...args );

const { format } = require('util');
const createConn = require('./create-conn');
const {
    dbName,
    mongoURI
} = require('../rsis.config');

const { rsistmp: databaseName } = dbName;

const title = `${databaseName}-db`;

const uriWithDbName = ( process.env.NODE_ENV === 'production')
    ? format( mongoURI.CLOUDDB_TEMPLATE,
        process.env.ATLAS_CREDENTIALS,
        databaseName
    )
    : `${ process.env.MONGO_DEV2 || mongoURI.DEV2 }/${databaseName}`
;
//var dbURI = 'mongodb://hp8710w:27016/rsistmp';


const db = createConn( uriWithDbName, title );

debug('dbtmp, create connection.', /*db*/ );

// BRING IN YOUR SCHEMAS & MODELS


module.exports = db;
