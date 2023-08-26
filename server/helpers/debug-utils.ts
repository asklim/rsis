// import type {Response} from 'express';

export function shrinkServerRes (
    serverRes: any
) {
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
