const debug = require('debug')('reports:daily:');
const {
    Logger,
    StatusCodes: HTTP,
    // send201Created,
    // send409Conflict,
    send400BadRequest,
    send500ServerError,
} = require('../../../helpers');

const DailyReports = require(`../../../applogic/daily-reports`);

const log = new Logger('api-reports:daily:');


/**
 * Create a new daily-report
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict & message
 * @fires 500 Server Error & error object
 * @usage
 * POST /api/reports/daily
 */

module.exports = async function hapi_reports_daily_POST (
    req,
    res
) {
    const filial = req?.body?.filial;
    const onDate = req?.body?.onDate;
    debug(`[h-POST] try create: filial=${filial}, onDate=${onDate}`);


    if( !req.body
        || !Object.keys( req.body ).length ) {
        const result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'daily-report.POST: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        send400BadRequest( res, result.response );
        return;
    }

    // const STATE_HANDLERS = {

    //     [HTTP.CREATED]: (result) => {
    //         log.info( result.logMessage );
    //         return send201Created( res, result.response );
    //     },

    //     [HTTP.BAD_REQUEST]: (result) => {
    //         log.warn( result.logMessage );
    //         return send400BadRequest( res, result.response );
    //     },

    //     [HTTP.CONFLICT]: (result) => {
    //         log.warn( result.logMessage );
    //         return send409Conflict( res, result.response );
    //     },

    //     [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
    //         log.error( result.logMessage );
    //         return send500ServerError( res, result.response );
    //     }
    // };


    try {
        const createResult = await DailyReports.createOne( req.body );
        const handle = req.app.getStateHandler( res, log );
        handle( createResult );

        // const { statusCode } = createResult;
        // if( statusCode in STATE_HANDLERS ) {
        //     STATE_HANDLERS[ statusCode ]( createResult );
        // }
        // throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        // @ts-ignore
        send500ServerError( res, err );
    }

};
