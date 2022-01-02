const logdebug = require( 'debug' )( 'dbs:connect' );
const debug = (...args) => logdebug( '\b:[sum]', ...args );

const createConn = require( './create-conn' );
const {
    dbName,
    mongoURI
} = require( '../rsis-config.js' );
const { rsissum: databaseName } = dbName;

const title = `[${databaseName}] summary-db`;


//'mongodb://hp8710w:36667 || env.MONGO_DEV1 || hp8710w:27017
const uri = ( process.env.NODE_ENV === 'production' )
    ? ( process.env.MONGO_STANDALONE || mongoURI.STANDALONE )
    : ( process.env.MONGO_DEV1 || mongoURI.DEV1 )
;

const db = createConn( `${uri}/${databaseName}`, title );

debug( 'dbsum, create connection.', /*db*/ );
// BRING IN YOUR SCHEMAS & MODELS

const weekNaturalSchema = require( './mongodb/sumdb/weeknatural.schema' );
db.model( 'WeekNatural', weekNaturalSchema, 'weekNatural' );
// last (3rd) arg - collection`s name in MongoDB


const finReportSchema = require( './mongodb/sumdb/finance-report.schema' );
db.model( 'FinanceReport', finReportSchema, 'financeReport' );


const daylyReportSchema = require( './mongodb/sumdb/daily-report.schema' );
db.model( 'DailyReports', daylyReportSchema, 'dailyReport' );


const itemsBalanceSchema = require( './mongodb/sumdb/items-balance.schema' );
db.model( 'ItemsBalances', itemsBalanceSchema, 'itemsBalances' );


module.exports = db;
