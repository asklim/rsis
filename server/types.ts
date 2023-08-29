
/**
 * from @types/node/globals.d.ts
 */
export interface ErrnoException extends Error {
    errno?: number | undefined;
    code?: string | undefined;
    path?: string | undefined;
    syscall?: string | undefined;
}


export type AppResponse = Response | Error;

export type AppLogicResponse = {
    statusCode: number;
    logMessage: string;
    response: AppResponse;
}

export type HandlerFn = (res: AppLogicResponse) => void;
