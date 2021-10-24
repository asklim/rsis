//const debug = require( 'debug' )( 'registr:items-balances' );

const { format } = require( 'util' );
const UUID = require( 'uuid' );
const { httpResponseCodes: HTTP } = require( '../../../../helpers' );

const db = require( '../../..' ).getDB( 'sum' );

const ModelItemsBalances = db.model( 'ItemsBalances' );


/**
 * Delete items-balance document by uuid or ObjId
 * @returns
 * - statusCode 204 No Content & { message, uuid }
 * - statusCode 404 Not Found & message
 * - statusCode 500 Server Error & error object
 **/

module.exports = async function deleteById (documentId) {

    try {
        const filtering = UUID.validate( documentId )
            ? { uuid: documentId }
            : { _id: documentId };

        const doc = await ModelItemsBalances.findOne( filtering );

        if( !doc ) {
            let msg = `Items-Balance not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg} w/filter: ` + format( '%o', filtering ),
                response: msg
            });
        }

        const { uuid } = await ModelItemsBalances.findOneAndDelete( filtering );

        return ({
            statusCode: HTTP.NO_CONTENT,
            logMessage: `SUCCESS: items-balance document w/uuid:${uuid} deleted.`,
            response: {
                message: `items-balance document w/uuid:${uuid} deleted successful.`,
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

