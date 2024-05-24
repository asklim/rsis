
import {
    send200Ok,
    send400BadRequest,
    packageVersion,
    Logger,
} from '../../helpers';

import { getDB } from '../../databases';
import { Connection } from 'mongoose';

//const d = debugFactory('api:health:');
const log = new Logger('[api:health]');


/**
 * Отвечает сообщением для проверки работоспособности
 * приложения и базы данных
 * @usage GET /api/health/app
 * @usage or GET /api/health
 * @fires 200, 400
 * {message : 'app'} - is Ok or nothing if app doesn't work
 *
 * @usage GET /api/health/mongocfg or /api/health/mongosum
 * @fires 200 {message : 'nn'} - count of docs.
 * @fires 500 {message : '-1'} - no Mongo
 **/
export default async function hapi_health_GET (
    req: any,
    res: any
) {
    const cfgdb = getDB('config');
    const sumdb = getDB('sum');

    //params.pingId : {'app' | 'mongocfg' | 'mongosum' | 'testfailure'}
    const count = Object.keys( req?.params ).length;
    log.debug(`params.count=${count},`, req.params );

    let mongocfg: number,
        mongosum: number;

    let { pingId } = req.params;
    if ( !pingId || !count ) {
        // При отсутствии параметра: проверка всех частей app
        try {
            mongocfg = await totalDocumentsInDB( cfgdb );
        }
        catch {
            mongocfg = -1
        }

        try {
            mongosum = await totalDocumentsInDB( sumdb );
        }
        catch {
            mongosum = -1
        }

        const answer = {
            ok: true,
            app: `rsislocal (v.${packageVersion})`,
            mongocfg,
            mongosum
        }
        send200Ok( res, answer );
        return;
    }

    pingId = pingId.toLowerCase();

    if ( pingId === 'app') {
        send200Ok( res, {
            ok: true,
            app: `rsislocal (v.${packageVersion})`
        });
        return;
    }

    if ( pingId === 'mongocfg') {
        try {
            mongocfg = await totalDocumentsInDB( cfgdb );
            send200Ok( res, {
                ok: true,
                mongocfg
            });
            return;
        }
        catch {
            send200Ok( res, {
                ok: false,
                mongocfg: -1
            });
            return;
        }
    }

    if ( pingId === 'mongosum') {
        try {
            mongosum = await totalDocumentsInDB( sumdb );
            send200Ok( res, {
                ok: true,
                mongosum
            });
            return;
        }
        catch {
            send200Ok( res, {
                ok: false,
                mongosum: -1
            });
            return;
        }
    }

    if ( pingId === 'testfailure' ) {
        send200Ok( res, {
            ok: false,
            mongo: -1
        });
        return;
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
