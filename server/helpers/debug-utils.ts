// import type {Response} from 'express';

export function shrinkServerRes (
    serverRes: any
) {
    if( typeof serverRes !== 'object' ) {
        return ({
            response: serverRes
        });
    }

    const {
        outputSize,
        _header,
        _startTime,
        statusCode,
        statusMessage,
    } = serverRes;

    return ({
        outputSize,
        _header,
        _startTime,
        statusCode,
        statusMessage,
    });
}
