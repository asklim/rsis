//const debug = require( 'debug' )( 'reports:daily' );
const UUID = require( 'uuid' );

const readOne = require( './dr-read-one' );

/**
 * Read a daily-report by the id
 * @returns
 * - statusCode 200 OK          & document
 * - statusCode 400 Bad Request & message
 * - statusCode 404 Not Found   & message
 * - statusCode 500 Server Error & error object
 * @usage
 * - await DailyReports.readById( uuid );
 * - await DailyReports.readById( objId );
 **/

module.exports = async function readById ( reportId ) {

    let filtering = UUID.validate( reportId )
        ? { uuid: reportId }
        : { _id: reportId };

    return await readOne( filtering );
};
