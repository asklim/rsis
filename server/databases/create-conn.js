//const debug = require('debug')('dbs:connect');
const {
    createConnection,
    connections,
} = require('mongoose');
const infoDB = require('./infodb');
const { consoleLogger, } = require('../helpers');


module.exports = function createConn (uri, title) {


    const log = consoleLogger(`[${title}]`);

    let dbConnect;
    try {
        dbConnect = createConnection( uri, {} );
        // Deprecated in Mongoose v6.0
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: false,

        //debug(`${title} connection state:`, dbConnect.readyState );
        // =2, если нормальное подключение
    }
    catch (error) {
        log.error('create-conn.js - catch block', error );
        return;
    }

    log.debug(`connected. Total connection's count:`, connections.length );
    // first 2, then 3, then 4

    // CONNECTION EVENTS

    dbConnect.on('connected', () => {
        const { host, port } = dbConnect;
        log.info(`connected to ${host}:${port}`);
        infoDB.log( dbConnect );
    });


    dbConnect.on('error', (err) => {
        log.error('connection error:', err );
    });


    dbConnect.on('disconnecting', () => {
        log.info(`connection closing ...`);
    });


    dbConnect.on('disconnected', () => {
        log.info(`disconnected from MongoDB.`);
    });


    dbConnect.on('close', () => {
        log.info(`connection closed.`);
    });

    // @ts-ignore
    dbConnect.closeConn = async () => {
        await dbConnect.close();
        return title;
    };

    return dbConnect;
};
