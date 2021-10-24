//const debug = require( 'debug' )( 'registr:items-balances' );
const UUID = require( 'uuid' );

const readOne = require( './ib-read-one' );

/**
 * Read a items-balance document by the id
 * @returns
 * - statusCode 200 OK          & document
 * - statusCode 400 Bad Request & message
 * - statusCode 404 Not Found   & message
 * - statusCode 500 Server Error & error object
 * @usage
 * - await Storage.readById( uuid );
 * - await Storage.readById( objId );
 **/

module.exports = async function readById ( reportId ) {

    let filtering = UUID.validate( reportId )
        ? { uuid: reportId }
        : { _id: reportId };

    return await readOne( filtering );
};
