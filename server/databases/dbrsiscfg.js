//const debug = require( 'debug' )( 'dbs:cfg' );
const createConn = require( './create-conn' );
const { 
    dbName,
    mongoURI 
} = require( '../helpers/serverconfig' );

const { rsiscfg: databaseName } = dbName;

const title = `config-db [${databaseName}]`;


//'mongodb://hp8710w:36667 || env.MONGO_DEV1 || hp8710w:27017
const uri = ( process.env.NODE_ENV === 'production' ) 
    ? ( process.env.MONGO_STANDALONE || mongoURI.STANDALONE )
    : ( process.env.MONGO_DEV1 || mongoURI.DEV1 )
;

const db = createConn( `${uri}/${databaseName}`, title );

//debug( 'dbcfg', db );

// BRING IN YOUR SCHEMAS & MODELS
// last (3rd) arg - collection`s name in MongoDB

const agentSchema = require( './models/cfgdb/agent.schema' );
db.model( 'Agent', agentSchema, 'agents' ); 

const userSchema = require( './models/cfgdb/user.schema' );
db.model( 'User', userSchema, 'users' ); 

const productsCatalogSchema = require( './models/cfgdb/products-catalog.schema' );
db.model( 'ProductsCatalog', productsCatalogSchema, 'products.catalogs' ); 

const catalogLayoutsSchema = require( './models/cfgdb/catalog-layouts.schema' );
db.model( 'CatalogLayouts',catalogLayoutsSchema, 'catalog.layouts' ); 


module.exports = db;
