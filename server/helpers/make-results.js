/**
 * Format message for http routes handler middleware
 * @param {Integer} httpStatusCode
 * @param {String} logmsg
 * @param {String|Object} response
 * @returns {Object}
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
