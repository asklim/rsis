const debug = require( 'debug' )( 'reports:daily' );

const { httpResponseCodes: HTTP } = require( '../../../../helpers' );

const db = require( `../../..` ).getDB( 'sum' );

const ModelDailyReports = db.model( 'DailyReports' );


/**
 * Create a new daily-report
 * @returns
 * - statusCode 201 Created & response= { message, uuid }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 409 Conflict & response= message
 * - statusCode 500 Server Error & response= error object
 */

module.exports = async function createOne (body) {


    const { filial, onDate } = body;

    try {

        const finded = await ModelDailyReports.findOne({ filial, onDate });

        if( finded ) {
            let msg = `Conflict: daily-report ${onDate} for ${filial} exist.`;
            return ({
                statusCode: HTTP.CONFLICT,
                logMessage: msg,
                response: msg
            });
        }

        const report = await ModelDailyReports.create( body );

        const { uuid } = report;
        //const uuid = '12345678-1234-1234-1234-123456789012';
        debug( `create-one: ${uuid}` );

        return ({
            statusCode: HTTP.CREATED,
            logMessage: `SUCCESS: daily-report uuid:${uuid} created.`,
            response: {
                message: `daily-report uuid:${uuid} created successful.`,
                uuid,
            }
        });
    }
    catch (err) {
        return ({
            statusCode: HTTP.INTERNAL_SERVER_ERROR,
            logMessage: err.message,
            response: err
        });
    }

};

