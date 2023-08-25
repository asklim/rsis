const debug = require('debug')('reports:daily:');

const {
    consoleLogger,
    StatusCodes: HTTP,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require('../../../helpers');

const DailyReports = require(`../../../applogic/daily-reports`);

const log = consoleLogger('api-reports:daily:');


/**
 * Delete daily-report by uuid, ObjId
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @usage
 * DELETE /api/reports/daily/:reportId
 * @example
 * DELETE /api/reports/daily/60950e87258015071e86c8f7
 * DELETE /api/reports/daily/f2ab5c11-a252-4f65-b278-adb3afe12bcd
 **/

module.exports = async function dailyReportsHandler_DELETE (req, res) {


    debug(
        '[h-DELETE] try delete document',
        '\nI: daily-report`s delete params:', req.params,
        '\nI: daily-report`s delete query:', req.query
    );

    const { reportId } = req.params;

    if( !reportId ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'daily-reports.DELETE: No <reportId>.',
            response: 'Bad request, No <reportId>.'
        };
        log.warn( result.logMessage );
        return send400BadRequest( res, result.response );
    }


    const STATE_HANDLERS = {

        [HTTP.NO_CONTENT]: (result) => {
            log.info( result.logMessage );
            debug('[h-DELETE] result.response', result.response );

            //TODO: Client не получает тело json-ответа
            return send204NoContent( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.NOT_FOUND]: (result) => {
            log.warn( result.logMessage );
            return send404NotFound( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            return send500ServerError( res, result.response );
        }
    };

    try {
        const deleteResult = await DailyReports.deleteById( reportId );

        const { statusCode } = deleteResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( deleteResult );
        }

        throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }
};
