const debug = require('debug')('reports:daily:');

const {
    consoleLogger,
    StatusCodes: HTTP,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send409Conflict,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('api-reports:daily:');
const DailyReports = require(`../../../applogic/daily-reports`);


/**
 * Read a daily-report by uuid or objId
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @usage var.1 |
 * GET /api/reports/daily/:reportId
 * @usage var.2 |
 * GET /api/reports/daily?queryString
 * @usage var.2 |
 * GET /api/reports/daily/?queryString
 * @usage queryString:
 * filial=filialId &
 * onDate=isoDate
 **/
module.exports = async function hapi_reports_daily_GET (
    req,
    res
) {
    debug(
        '[h-GET] try read document',
        '\nI: finding daily-report`s params:', req.params,
        '\nI: finding daily-report`s query:', req.query
    );

    const STATE_HANDLERS = {

        [HTTP.OK]: (result) => {
            log.info( result.logMessage );
            return send200Ok( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.NOT_FOUND]: (result) => {
            log.warn( result.logMessage );
            return send404NotFound( res, result.response );
        },

        [HTTP.CONFLICT]: (result) => {
            log.warn( result.logMessage );
            return send409Conflict( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            return send500ServerError( res, result.response );
        }
    };

    try {
        const { reportId } = req.params;

        const readResult = ( reportId )
            ? await DailyReports.readById( reportId )
            : await DailyReports.readByQuery( req.query );

        const { statusCode } = readResult;

        if( statusCode in STATE_HANDLERS ) {
            STATE_HANDLERS[ statusCode ]( readResult );
        }

        throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        // @ts-ignore
        return send500ServerError( res, err );
    }
};
