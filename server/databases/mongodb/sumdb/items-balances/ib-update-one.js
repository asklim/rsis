const debug = require('debug')('-dbg:items-balances:db');
const UUID = require('uuid');

const {
    StatusCodes: HTTP,
    makeResult,
    makeErrorResult,
} = require('../../../../helpers');


/**
 * Update a ItemsBalance document by uuid or ObjId
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

        const filtering = UUID.validate( documentId ) ?
            { uuid: documentId }
            : { _id: documentId };

        debug('[update-one] filtering:', filtering );

        const storage = this.getModel();

        const { uuid } = await storage.findOneAndUpdate(
            filtering,
            { $set, $inc },
            { new: true }
        );

        debug('[update-one] doc updated, uuid:', uuid );

        return makeResult( HTTP.OK,
            `[storage] ItemsBalance updated (${uuid}).`,
            {
                message: `ItemsBalance updated successful (${uuid}).`,
                uuid,
            }
        );
    }
    catch (err) {
        return makeErrorResult( err );
    }
};
