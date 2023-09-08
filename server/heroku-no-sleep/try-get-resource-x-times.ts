import {
    // debugFactory,
    Logger,
} from '../helpers/';

//const d = debugFactory('heroku:');
const log = new Logger('[heroku:try-get]');

import createSafeGetter from './create-safe-getter';

export interface XTimesResponse {
    attempt: number,
    ms: number,
    ok?: boolean,
    response?: any,
    reason?: string,
    message?: string,
    err?: unknown
}

export interface XTimesParams {
    attempts: number,
    interval: number,
    apiUrl: string,
    getter? : any
}

/**
 * @description Пробует получить ответ с помощью getter attempts раз через msInterval;
 * apiUrl для ответа и консоли.
 * @param options - Объект параметров
 * ---
 * @param options.attempts - число попыток
 * @param options.interval - число миллисекунд между попытками
 * @param options.apiUrl - Описание куда выполняется запрос для logging
 * @param options.getter - Выполняет http-запрос к api ресурса
**/
export default async function tryGetResourceXtimes ({
    attempts: totalAttempts,
    interval: msInterval,
    apiUrl,
    getter
} : XTimesParams )
: Promise<XTimesResponse>
{
    const resourceGetter = (typeof getter === 'function'
        && getter /* Порядок имеет значение !!! */ )
        || createSafeGetter( apiUrl );

    return new Promise( (resolve, reject) => {
        let ms = 0;
        const tStart = Date.now();

        (async function attempt (n) {

            if( n != 1 ) {
                log.debug(`Connection attempt #${n} to ${apiUrl}`);
            }
            let attemptStartedAt = 0;
            try {
                //console.log('resourceGetter', resourceGetter );
                attemptStartedAt = Date.now();
                const response = await resourceGetter();
                ms += Date.now() - attemptStartedAt;
                if( response && !(response instanceof Error) ) {
                    return resolve ({
                        attempt: n,
                        ok: true,
                        ms,
                        response
                    });
                }

                if( n < totalAttempts ) {
                    setTimeout( attempt, msInterval, n + 1 );
                }
                else {
                    const ttl = Date.now() - tStart;
                    reject({
                        attempt: n,
                        reason: 'timeout',
                        ms: ttl,
                        message: `No response from ${apiUrl}, ${n} times (${ttl}ms).`
                        , err: response
                    });
                }
            }
            catch (err) {
                const { message } = err as Error;
                ms += Date.now() - attemptStartedAt;
                reject({
                    attempt: n,
                    reason: 'catch',
                    ms,
                    message,
                    err
                });
            }
        })( 1 );
    });
};
