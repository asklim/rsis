//const debug = require( 'debug' )( 'reports:daily' );

const readOne = require( './dr-read-one' );

/**
 * Read a daily-report by parameters
 * - if date - возвращается документ, в который попадает date
 * @returns
 * - statusCode 200 OK & response= { ...doc, listType }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found   & response= message
 * - statusCode 500 Server Error & response= error object
 **/

module.exports = async function readByQuery ({ filial, onDate }) {

    let filtering = { filial, onDate };

    return await readOne( filtering );

};

