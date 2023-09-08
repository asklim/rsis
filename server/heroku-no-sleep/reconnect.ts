import {
    env,
    // debugFactory,
    Logger,
} from '../helpers/';
const log = new Logger('[heroku:reconnect]');

import tryGetResource from './try-get-resource-x-times';

const TOTAL_ATTEMPTS = 5;
const MILLISECONDS_BETWEEN_ATTEMPTS = 10*1000;


const apiHerokuHealthUrl = `${env.API_SERVER}/api/config/ping/app`;


const herokuGetter = async (apiUrl) => await tryGetResource({
    attempts: TOTAL_ATTEMPTS,
    interval: MILLISECONDS_BETWEEN_ATTEMPTS,
    apiUrl,
});

/****************************************************************************
 *
 *  2. Функция reconnect, пока существует Таймер herokuTimer, пытается с
 *     интервалом reconnectInterval подключиться к rsis-webapp.herokuapp.com
 *     На каждом цикле используется до TOTAL_ATTEMPTS попыток включительно,
 *     с интервалом между попытками MILLISECONDS_BETWEEN_ATTEMPTS.
 *     Если попытки не удались, то через reconnectInterval - повтор попыток
 *
 *  3. API возвращает объект: { message: 'app', attempt: 1..5, ms: 5501 }
 *
 *==========================================================================
**/
export default async function reconnect () {
    try {
        const res = await herokuGetter( apiHerokuHealthUrl );

        log.info(`app health is Ok:`, {
            ...res?.response?.data, //axios format of response
            attempt: res?.attempt,
            ms: res?.ms,
        });
    }
    catch (error) {
        log.error('catch - reconnect', error );
    }
}
