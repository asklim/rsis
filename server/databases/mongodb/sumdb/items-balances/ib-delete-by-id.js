//const debug = require( 'debug' )( '_dbg_:items-balances:db' );

const { format } = require( 'util' );
const UUID = require( 'uuid' );
const {
    httpResponseCodes: HTTP,
    makeResult,
    makeErrorResult,
} = require( '../../../../helpers' );


module.exports = function injector( IClass ) {

    /**
     * Delete items-balance document by uuid or ObjId
     * @returns
     * - statusCode 204 No Content & { message, uuid }
     * - statusCode 404 Not Found & message
     * - statusCode 500 Server Error & error object
     **/

    async function deleteById (documentId) {

        try {
            const filtering = UUID.validate( documentId ) ?
                { uuid: documentId }
                : { _id: documentId };

            const ItemsBalances = IClass.getModel();

            const doc = await ItemsBalances.findOne( filtering );

            if( !doc ) {
                let msg = `[storage] ItemsBalance not found`;
                return makeResult(
                    HTTP.NOT_FOUND,
                    `${msg} w/filter: ` + format( '%o', filtering ),
                    `${msg}.`
                );
            }

            const { uuid } = await ItemsBalances.findOneAndDelete( filtering );

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
    }
    return deleteById;
};

