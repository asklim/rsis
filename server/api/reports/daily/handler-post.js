const debug = require('debug')('reports:daily:');
const {
    consoleLogger,
    StatusCodes: HTTP,
    send201Created,
    send400BadRequest,
    send409Conflict,
    send500ServerError,
} = require('../../../helpers');

const DailyReports = require(`../../../applogic/daily-reports`);

const log = consoleLogger('api-reports:daily:');


/**
 * Create a new daily-report
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict & message
 * @fires 500 Server Error & error object
 * @usage
 * POST /api/reports/daily
 */

module.exports = async function dailyReportsHandler_POST (req, res) {

    let filial, onDate;

    if( req.body ) {
        filial = req.body.filial;
        onDate = req.body.onDate;
    }
    debug(`[h-POST] try create: filial=${filial}, onDate=${onDate}`);


    if( !req.body
        || !Object.keys( req.body ).length ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'daily-report.POST: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        send400BadRequest( res, result.response );
        return;
    }

    const STATE_HANDLERS = {

        [HTTP.CREATED]: (result) => {
            log.info( result.logMessage );
            return send201Created( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
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
        const createResult = await DailyReports.createOne( req.body );
        const { statusCode } = createResult;

        if( statusCode in STATE_HANDLERS ) {

            return STATE_HANDLERS[ statusCode ]( createResult );
        }

        throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }

};
