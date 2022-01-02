const debug = require( 'debug' )( 'reports:daily:' );
const {
    //icwd,
    consoleLogger,
    httpResponseCodes: HTTP,
    send200Ok,
    send201Created,
    send400BadRequest,
    //send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const DailyReports = require( `../../../applogic/daily-reports` );

const log = consoleLogger( 'api-reports:daily:' );


/**
 * Update daily report document
 * @fires 200 OK     & message
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * PUT /api/reports/daily
 */

module.exports = async function dailyReportsHandler_PUT (req, res) {


    debug( `[h-PUT] start, reportId is "${req.params.reportId}"` );
    let filial, onDate;

    if( req.body ) {
        filial = req.body.filial;
        onDate = req.body.onDate;
    }
    log.info( `try update daily-reports: filial=${filial}, onDate=${onDate}` );


    if( !req.body
        || !Object.keys( req.body ).length ) {
        let result = {
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'daily-report.PUT: req.body is empty.',
            response: 'Bad request, req.body is empty.'
        };
        log.warn( result.logMessage );
        return send400BadRequest( res, result.response );
    }


    const STATE_HANDLERS = {

        [HTTP.OK]: (result) => {
            log.info( result.logMessage );
            return send200Ok( res, result.response );
        },

        [HTTP.CREATED]: (result) => {
            log.info( result.logMessage );
            return send201Created( res, result.response );
        },

        [HTTP.BAD_REQUEST]: (result) => {
            log.warn( result.logMessage );
            return send400BadRequest( res, result.response );
        },

        [HTTP.INTERNAL_SERVER_ERROR]: (result) => {
            log.error( result.logMessage );
            debug( '[h-PUT] result.response', result.response ); //

            return send500ServerError( res, result.logMessage /*.response*/ );
            // Когда .logMessage - На клиенте более информативное сообщение
        }
    };

    try {
        const updateResult = await DailyReports.updateOrCreate( req.body );
        const { statusCode } = updateResult;

        if( statusCode in STATE_HANDLERS ) {
            return STATE_HANDLERS[ statusCode ]( updateResult );
        }

        throw new Error( `Handler of ${statusCode} not implemented.`);
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }

};

