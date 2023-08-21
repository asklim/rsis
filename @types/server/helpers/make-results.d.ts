/**
 * Format message for http routes handler middleware
 * @param {Integer} httpStatusCode
 * @param {String} logmsg
 * @param {String|Object} response
 * @returns {Object}
 */
export function makeResult(httpStatusCode: Integer, logmsg: string, response: string | any): any;
export function makeErrorResult(error: any): any;
