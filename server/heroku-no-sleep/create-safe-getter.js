//const debug = require( 'debug' )('heroku:');
const log = require( '../helpers' ).consoleLogger( '[heroku:safe-getter]' );

const axios = require( 'axios' ).default;

const axiosGetter = (apiUrl) => axios.get( apiUrl,
    {
        //url: apiUrl,
        //method: "GET",
        headers: {
            credentials: "omit",
            "Content-Type": 'application/json',
            "Cache-Control": 'no-cache, no-store',
            //charset: "utf-8"
        }
    }
);

/**
 * Возвращает безопасный вариант функции getter ресурса apiUrl
 * Этот вариант возвращает Promise, т.к. async, и промис разрешается
 * либо в данные, либо в undefined.
 * @returns {Function} -
 */
module.exports = function createSafeGetter (
    apiUrl,
    getter = axiosGetter,
    logger = log
) {
    return async function () {
        try {
            //debug( 'apiUrl:', typeof apiUrl, apiUrl );
            return await getter( apiUrl );
        }
        catch (err) {
            logger && logger.error( 'Error GET of Resource\n', err );
            //return void 0 //undefined
        }
    };
};

