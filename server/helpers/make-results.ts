/**
 * Format message for http routes handler middleware
 */
export function makeResult (
    httpStatusCode: number,
    logmsg: string,
    response: string | object
) {
    return ({
        statusCode: httpStatusCode,
        logMessage: logmsg,
        response
    });
}

export function makeErrorResult (
    error: any
) {
    return ({
        statusCode: 500,
        logMessage: error?.message,
        error
    });
}
