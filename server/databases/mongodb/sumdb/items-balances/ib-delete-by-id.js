//const debug = require('debug')('-dbg:items-balances:db');

const { format } = require('util');
const UUID = require('uuid');
const {
    StatusCodes: HTTP,
    makeResult,
    makeErrorResult,
} = require('../../../../helpers');


/**
 * Delete ItemsBalance document by uuid or ObjId
 * @returns
 * - statusCode 204 No Content & { message, uuid }
 * - statusCode 404 Not Found & message
 * - statusCode 500 Server Error & error object
 **/
module.exports = async function deleteById (documentId) {

    try {
        const filtering = UUID.validate( documentId ) ?
            { uuid: documentId }
            : { _id: documentId };

        // @ts-ignore
        const storage = this.getModel();

        const doc = await storage.findOne( filtering );

        if( !doc ) {
            let msg = `[storage] ItemsBalance not found`;
            return makeResult(
                HTTP.NOT_FOUND,
                `${msg} w/filter: ` + format('%o', filtering ),
                `${msg}.`
            );
        }

        const { uuid } = await storage.findOneAndDelete( filtering );

        return makeResult(
            HTTP.NO_CONTENT,
            `[storage] ItemsBalance deleted (${uuid}).`,
            {
                message: `ItemsBalance deleted successful (${uuid}).`,
                uuid,
            }
        );
    }
    catch (err) {
        return makeErrorResult( err );
    }
};
