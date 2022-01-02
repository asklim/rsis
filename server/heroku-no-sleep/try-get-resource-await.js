
const debug = require( 'debug' )('heroku:');
//const log = require( '../helpers' ).consoleLogger( 'Heroku:[try-get]:' );

const createSafeGetter = require( './create-safe-getter.js' );

/**
 * @description Пробует получить ответ с помощью getter attempts раз через msInterval;
 * apiUrl для ответа и консоли.
 * @param {Number} options.attempts - число попыток
 * @param {Number} options.interval - число миллисекунд между попытками
 * @param {Function} options.getter - Выполняет http-запрос к api ресурса
 * @param {String} options.apiUrl - Описание куда выполняется запрос для logging
 * ---
 * @returns {Promise} - [object Error] OR [object Response Body]
**/
module.exports = async function tryConnectXtimes ({
    attempts: totalAttempts,
    interval: msInterval,
    getter,
    apiUrl
}) {
    const resourceGetter = (typeof getter == 'function'
        && getter /* Порядок имеет значение !!! */ )
        || createSafeGetter( apiUrl );
    let ms = 0;
    let tStart = Date.now();

    async function attempt (n) {
        let t0;
        try {
            t0 = Date.now();
            const response = await resourceGetter();
            ms += Date.now() - t0;
            if( response ) {
                return ({
                    attempt: n,
                    ok: true,
                    ms,
                    response,
                });
            }
            else {
                if( n < totalAttempts ) {
                    setTimeout( attempt, msInterval, n + 1 );
                }
            }
        }
        catch (err) {
            ms += Date.now() - t0;
            throw ({
                attempt: n,
                reason: 'catch',
                ms,
                message: err.message
            });
        }
    }

    let n = 0;
    while( n < totalAttempts ) {

        n++;
        if( n != 1 ) {
            debug( `Connection attempt #${n} to ${apiUrl}` );
        }

        let result = await attempt( n );
        if( result ) {
            return result;
        }


    }
    throw ({
        attempt: n,
        message: `No response from ${apiUrl}, ${n} times.`
    });
};

