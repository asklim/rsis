
import { format } from 'node:util';

import {
    env,
    // debugFactory
} from '../helpers';
import { dbName, mongoHosts } from '../rsis.config';
import { default as createConn } from './create-conn';

// const logdebug = debugFactory('dbs:connect');
// const d = (...args) => logdebug('\b:[tmp]', ...args );


const { rsistmp: databaseName } = dbName;

const title = `${databaseName}-db`;

const uriWithDbName = env.isProduction ?
    format( mongoHosts.CLOUDDB_TEMPLATE,
        env.ATLAS_CREDENTIALS,
        databaseName
    )
    : `${mongoHosts.DEV2}/${databaseName}`
;
//var dbURI = 'mongodb://hp8710w:27016/rsistmp';


let db = createConn( uriWithDbName, title );
    // BRING IN YOUR SCHEMAS & MODELS


export default db;
