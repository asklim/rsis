const debug = require( 'debug' )( 'registr:items-balances' );

const { httpResponseCodes: HTTP } = require( '../../../../helpers' );

const db = require( `../../..` ).getDB( 'sum' );

const ModelItemsBalances = db.model( 'ItemsBalances' );


/**
 * Create a new items-balance document
 * @returns
 * - statusCode 201 Created & response= { message, uuid }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 409 Conflict & response= message
 * - statusCode 500 Server Error & response= error object
 */

module.exports = async function createOne (body) {


    const { filial, agent, creator, onDate } = body;

    try {

        const finded = await ModelItemsBalances.findOne({ filial, agent, creator, onDate });

        if( finded ) {
            let msg = `Conflict: items-balance ${onDate} for ${agent} from ${filial} by ${creator} exist.`;
            return ({
                statusCode: HTTP.CONFLICT,
                logMessage: msg,
                response: msg
            });
        }

        const report = await ModelItemsBalances.create( body );

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

