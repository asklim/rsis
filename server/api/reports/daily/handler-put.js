// @ts-ignore
const debug = require('debug')('reports:daily:');
const {
    //icwd,
    Logger,
    StatusCodes: HTTP,
    // send200Ok,
    // send201Created,
    send400BadRequest,
    //send409Conflict,
    send500ServerError,
} = require('../../../helpers');

const DailyReports = require(`../../../applogic/daily-reports`);

const log = new Logger('api-reports:daily:');


/**
 * Update daily report document
 * @fires 200 OK     & message
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @usage
 * PUT /api/reports/daily
 */
module.exports = async function hapi_reports_daily_PUT (
    req,
    res
) {
    debug(`[h-PUT] start, reportId is "${req.params.reportId}"`);
    const filial = req?.body?.filial;
    const onDate = req?.body?.onDate;
    log.info(`try update daily-reports: filial=${filial}, onDate=${onDate}`);


    if( !req.body ||
        !Object.keys( req.body ).length ) {
        const result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'daily-report.PUT: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        send400BadRequest( res, result.response );
        return;
    }


    // const STATE_HANDLERS = {

    //     // @ts-ignore
    //     [HTTP.OK]: (result) => {
    //         log.info( result.logMessage );
    //         return send200Ok( res, result.response );
    //     },

    //     // @ts-ignore
    //     [HTTP.CREATED]: (result) => {
    //         log.info( result.logMessage );
    //         return send201Created( res, result.response );
    //     },

    //     // @ts-ignore
    //     [HTTP.BAD_REQUEST]: (result) => {
    //         log.warn( result.logMessage );
    //         return send400BadRequest( res, result.response );
    //     },

    //     // @ts-ignore
    //     [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
    //         log.error( result.logMessage );
    //         debug('[h-PUT] result.response', result.response ); //

    //         return send500ServerError( res, result.logMessage /*.response*/ );
    //         // Когда .logMessage - На клиенте более информативное сообщение
    //     }
    // };

    try {
        const updateResult = await DailyReports.updateOrCreate( req.body );

        // const { statusCode } = updateResult;
        // if( statusCode in STATE_HANDLERS ) {
        //     STATE_HANDLERS[ statusCode ]( updateResult );
        // }

        const handle = req.app.getStateHandler( res, log );
        handle( updateResult );

        // throw new Error(`Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        // @ts-ignore
        send500ServerError( res, err );
    }

};
