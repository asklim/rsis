
/**
 * from @types/node/globals.d.ts
 */
export interface ErrnoException extends Error {
    errno?: number | undefined;
    code?: string | undefined;
    path?: string | undefined;
    syscall?: string | undefined;
}
import {
    Express,
    // Request,
    Response
}  from 'express';

import {
    IConsoleLogger,
} from './helpers/';


export type AppResponse = Response | Error;

export type AppLogicResponse = {
    statusCode: number;
    logMessage: string;
    response: AppResponse;
}

export type HandlerFn = (res: AppLogicResponse) => void;

export interface RsisExpress extends Express {
    getMyDB (): any;
    logger: IConsoleLogger;
    startTimestamp: number | undefined;
    getStartTime: () => number | undefined;
    // eslint-disable-next-line no-unused-vars
    getStateHandler: (r: Response, l?: IConsoleLogger) => HandlerFn;
}
