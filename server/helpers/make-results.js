/**
 * Format message for http routes handler middleware
 * @param {number} httpStatusCode
 * @param {string} logmsg
 * @param {string | object} response
 */
function makeResult (
    httpStatusCode,
    logmsg,
    response
) {
    return ({
        statusCode: httpStatusCode,
        logMessage: logmsg,
        response
    });
}

function makeErrorResult (error) {
    return makeResult(
        500,
        error.message,
        error
    );
}

module.exports = {
    makeResult,
    makeErrorResult,
};
