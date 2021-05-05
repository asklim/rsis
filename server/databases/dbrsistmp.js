const { format } = require( 'util' );
const createConn = require( './create-conn' );
const { 
    dbName,
    mongoURI 
} = require( '../helpers/serverconfig' );

const { rsistmp: databaseName } = dbName;

const title = `temp-db [${databaseName}]`;

const uriWithDbName = ( process.env.NODE_ENV === 'production' ) 
    ? format( mongoURI.CLOUDDB_TEMPLATE,
        process.env.ATLAS_CREDENTIALS,
        databaseName 
    )
    : `${ process.env.MONGO_DEV2 || mongoURI.DEV2 }/${databaseName}`
;
//var dbURI = 'mongodb://hp8710w:27016/rsistmp';


const db = createConn( uriWithDbName, title );

// BRING IN YOUR SCHEMAS & MODELS


module.exports = db;
