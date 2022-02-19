
//const debug = require( 'debug' )( 'heroku:' );
const log = require( '../helpers' ).consoleLogger( '[heroku:try-get]' );

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
    apiUrl,
    getter
}) {
    const resourceGetter = (typeof getter == 'function'
        && getter /* Порядок имеет значение !!! */ )
        || createSafeGetter( apiUrl );

    return new Promise( (resolve, reject) => {
        let ms = 0;
        let tStart = Date.now();

        (async function attempt (n) {

            if( n != 1 ) {
                log.debug( `Connection attempt #${n} to ${apiUrl}` );
            }
            let t0;
            try {
                //console.log( 'resourceGetter', resourceGetter );
                t0 = Date.now();
                const response = await resourceGetter();
                ms += Date.now() - t0;
                if( response ) {
                    return resolve ({
                        attempt: n,
                        ok: true,
                        ms,
                        response
                    });
                }
            }
            catch (err) {
                ms += Date.now() - t0;
                reject({
                    attempt: n,
                    reason: 'catch',
                    ms,
                    message: err.message
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
                });
            }

        })( 1 );
    });
};

