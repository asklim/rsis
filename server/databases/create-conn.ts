
import {
    // debugFactory,
    createConnection,
    connections,
} from 'mongoose';

import { Logger, } from '../helpers';

import * as infoDB from './infodb';

//const d = debugFactory('dbs:connect');

/**
 * DON'T MAKE THIS AS ASYNC FUNCTION
 */
export default function createConn (uri: string, title: string) {

    const log = new Logger(`[${title}]`);

    let dbConnect: any;
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

    log.debug(`connected. Total connection's count:`, connections.length );
    // first 2, then 3, then 4

    return dbConnect;
};
