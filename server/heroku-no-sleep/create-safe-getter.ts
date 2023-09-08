import {
    IConsoleLogger,
    logAxiosError,
    // debugFactory,
    Logger,
} from '../helpers/';
//const d = debugFactory('heroku:');
const log = new Logger('[heroku:safe-getter]');

import axios, { AxiosError } from 'axios';

const axiosGetter = (apiUrl: string) => axios.get( apiUrl,
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
export default function createSafeGetter (
    apiUrl: string,
    getter = axiosGetter,
    logger: IConsoleLogger = log
)
// : () => Promise<unknown>
{
    return async function safeGetter () {
        try {
            //d('apiUrl:', typeof apiUrl, apiUrl );
            return await getter( apiUrl );
        }
        catch (err) {
            logger && logger.error('Error GET of Resource\n');
            logAxiosError( err, logger );
            return err as AxiosError;
        }
    };
};
