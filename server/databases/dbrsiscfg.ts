
import {
    env,
    // debugFactory
} from '../helpers';
import { dbName, mongoHosts } from '../rsis.config';
import { default as createConn } from './create-conn';

import agentSchema from './mongodb/cfgdb/agent.schema';
import userSchema from './mongodb/cfgdb/user.schema';
import productsCatalogSchema from './mongodb/cfgdb/products-catalog.schema';
import catalogLayoutSchema from './mongodb/cfgdb/catalog-layouts/catalog-layout.schema';

// const logdebug = debugFactory('dbs:connect');
// const d = (...args) => logdebug('\b:[cfg]', ...args );

const { rsiscfg: databaseName } = dbName;

const title = `${databaseName}-db`;

const prodDbHost = mongoHosts.STANDALONE;
const devDbHost = mongoHosts.DEV1;
const testDbURI = process.env.MONGO_TESTDB_URI ?? '';

//'mongodb://hp8710w:36667 || env.MONGO_DEV1 || hp8710w:27017
const uriWithDB = env.isProduction ? `${prodDbHost}/${databaseName}`
    : ( env.NODE_ENV === 'test') ? testDbURI
        : `${devDbHost}/${databaseName}`
;

let db;


db = createConn( uriWithDB, title );

// BRING IN YOUR SCHEMAS & MODELS
// last (3rd) arg - collection`s name in MongoDB


db?.model('Agent', agentSchema, 'agents');

db?.model('User', userSchema, 'users');

db?.model('ProductsCatalogs', productsCatalogSchema, 'products.catalogs');

db?.model('CatalogLayouts', catalogLayoutSchema, 'catalog.layouts');

// d('dbcfg, create connection.', /*db*/ );


export default db;
