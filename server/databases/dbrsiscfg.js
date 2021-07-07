//const debug = require( 'debug' )( 'dbs:cfg' );
const createConn = require( './create-conn' );
const { 
    dbName,
    mongoURI 
} = require( '../helpers/serverconfig' );

const { rsiscfg: databaseName } = dbName;

const title = `config-db [${databaseName}]`;

const prodDbURI = process.env.MONGO_STANDALONE || mongoURI.STANDALONE;
const devDbURI = process.env.MONGO_DEV1 || mongoURI.DEV1;

//'mongodb://hp8710w:36667 || env.MONGO_DEV1 || hp8710w:27017
const uriWithDB = ( process.env.NODE_ENV === 'production' ) 
    ? `${prodDbURI}/${databaseName}`
    : ( process.env.NODE_ENV === 'test' ) 
        ? process.env.MONGO_TESTDB_URI
        : `${devDbURI}/${databaseName}`
;

const db = createConn( uriWithDB, title );

//debug( 'dbcfg', db );

// BRING IN YOUR SCHEMAS & MODELS
// last (3rd) arg - collection`s name in MongoDB

const agentSchema = require( './mongodb/cfgdb/agent.schema' );
db.model( 'Agent', agentSchema, 'agents' ); 

const userSchema = require( './mongodb/cfgdb/user.schema' );
db.model( 'User', userSchema, 'users' ); 

const productsCatalogSchema = require( './mongodb/cfgdb/products-catalog.schema' );
db.model( 'ProductsCatalogs', productsCatalogSchema, 'products.catalogs' ); 

const catalogLayoutSchema = require( './mongodb/cfgdb/catalog-layouts/catalog-layout.schema' );
db.model( 'CatalogLayouts', catalogLayoutSchema, 'catalog.layouts' ); 


module.exports = db;
