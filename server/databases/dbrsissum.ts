
import {
    env,
    // debugFactory
} from '../helpers';
import { dbName, mongoHosts } from '../rsis.config';
import { default as createConn } from './create-conn';

import weekNaturalSchema from './mongodb/sumdb/weeknatural.schema';
import finReportSchema from './mongodb/sumdb/finance-report.schema';
import daylyReportSchema from './mongodb/sumdb/daily-report.schema';
import itemsBalanceSchema from './mongodb/sumdb/items-balance.schema';

// const logdebug = debugFactory('dbs:connect');
// const d = (...args) => logdebug('\b:[sum]', ...args );

const { rsissum: databaseName } = dbName;

const title = `${databaseName}-db`;

const prodDbHost = mongoHosts.STANDALONE;
const devDbHost = mongoHosts.DEV1;

//'mongodb://hp8710w:36667 || env.MONGO_DEV1 || hp8710w:27017
const dbHost = env.isProduction ? prodDbHost : devDbHost;

let db;


db = createConn(`${dbHost}/${databaseName}`, title );

// BRING IN YOUR SCHEMAS & MODELS
// last (3rd) arg - collection`s name in MongoDB

db?.model('WeekNatural', weekNaturalSchema, 'weekNatural');

db?.model('FinanceReport', finReportSchema, 'financeReport');

db?.model('DailyReports', daylyReportSchema, 'dailyReport');

db?.model('ItemsBalances', itemsBalanceSchema, 'itemsBalances');

// d('dbsum, create connection.', /*db*/ );


export default db;
