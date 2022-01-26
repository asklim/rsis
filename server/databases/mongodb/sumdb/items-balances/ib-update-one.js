const debug = require( 'debug' )( 'registr:items-balances' );
const UUID = require( 'uuid' );

const { httpResponseCodes: HTTP } = require( '../../../../helpers' );

const db = require( `../../..` ).getDB( 'sum' );
const ModelItemsBalances = db.model( 'ItemsBalances' );

/**
 * Update a items balance document by uuid or ObjId
 * @returns
 * - statusCode 200 OK & response= { message, uuid }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 500 Server Error & response= error object
 */

module.exports = async function updateOne (documentId, body) {

    try {
        /** TODO: body validation ???? */
        const { items, caption, notes, host } = body;

        const $set = Object.assign({}, {
            items,
            caption, notes,
            host,
            //updatedAt: Date.now()
            //Должно обновляться автоматически, т.к. schema.options.timestamps
        });
        const $inc = { __v: 1 };

        const filtering = UUID.validate( documentId )
            ? { uuid: documentId }
            : { _id: documentId };

        debug( '[update-one] filtering:', filtering );

        const { uuid } = await ModelItemsBalances.
            findOneAndUpdate( filtering, { $set, $inc }, { new: true } );

        debug( '[update-one] updated-doc`s uuid:', uuid );

        return ({
            statusCode: HTTP.OK,
            logMessage: `SUCCESS: items-balance with uuid:${uuid} updated.`,
            response: {
                message: `items-balance with uuid:${uuid} updated successful.`,
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
