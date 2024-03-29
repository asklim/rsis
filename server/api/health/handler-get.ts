
import {
    send200Ok,
    send400BadRequest,
    send500ServerError,
    Logger,
} from '../../helpers';

import { getDB } from '../../databases';
import { Connection } from 'mongoose';

//const d = debugFactory('api:health:');
const log = new Logger('[api:health]');

const cfgdb = getDB('config');
const sumdb = getDB('sum');


/**
 * Отвечает сообщением для проверки работоспособности
 * приложения и базы данных
 * @usage GET /api/health/app
 * @usage or GET /api/health
 * @fires 200 {message : 'app'} - is Ok or nothing if app doesn't work
 *
 * @usage GET /api/health/databases
 * @fires 200 {ok: true, dbname: docsCount}
 * @fires 500 {ok: false, dbname: docsCountResult}
 *
 * @usage GET /api/health/mongocfg
 * @usage GET /api/health/mongosum
 * @fires 200 {message : 'nn'} - count of docs.
 * @fires 500 {message : '-1'} - no Mongo
 **/
export default async function hapi_health_GET (
    req: any,
    res: any
) {
    //params.pingId : {'app' | 'databases' | 'mongocfg' | 'mongosum'}
    let count = Object.keys( req.params ).length;
    log.debug(`params.count=${count},`, req.params );

    if( !count ) {
        // При отсутствии параметра: проверка приложения (app)
        send200Ok( res, 'app--');
        return;
    }

    let { pingId } = req.params;
    if( !pingId ) {
        // req.params.* должен быть
        send400BadRequest( res, 'req.params.pingId not present.');
        return;
    }

    pingId = pingId.toLowerCase();

    if( pingId === 'app') {
        send200Ok( res, 'app++');
        return;
    }


    if( pingId === 'mongocfg') {
        try {
            const count = await totalDocumentsInDB( cfgdb );
            send200Ok( res, count.toString() );
            return;
        }
        catch {
            send500ServerError( res, '-1');
            return;
        }
    }

    if( pingId === 'mongosum') {
        try {
            const count = await totalDocumentsInDB( sumdb );
            send200Ok( res, count.toString() );
            return;
        }
        catch {
            send500ServerError( res, '-1');
            return;
        }
    }

    if( pingId === 'databases') {

        let cfgCount;
        let sumCount;
        try {
            cfgCount = await totalDocumentsInDB( cfgdb );
            sumCount = await totalDocumentsInDB( sumdb );
            send200Ok( res,
                {
                    ok: true,
                    mongocfg: cfgCount,
                    mongosum: sumCount
                }
            );
            return;
        }
        catch {
            send500ServerError( res,
                {
                    ok: false,
                    mongocfg: cfgCount,
                    mongosum: sumCount
                }
            );
            return;
        }
    }

    send400BadRequest( res, `parameter '${pingId}' is invalid.`);
}



/**
 * returns count documents in db for all collections
 * @param mongodb - Mongoose.Connection to db
 **/
async function totalDocumentsInDB (
    mongodb: Connection
) {
    let total = 0;
    for( const name of mongodb.modelNames() ) {

        const theModel = mongodb.model( name );
        // es--lint-disable-next-line no-await-in-loop
        const count = await theModel.estimatedDocumentCount();
        total += count;
    }
    return total;
}
