//const debug = require( 'debug' )( 'reports:daily' );

const readOne = require( './dr-read-one' );

/**
 * Read a daily-report by meta-parameters
 * @returns
 * - statusCode 200 OK & response= { ...doc, listType }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found   & response= message
 * - statusCode 500 Server Error & response= error object
 **/

module.exports = async function readByQuery ({ onDate, filial='filial1', creator='mainsm' }) {

    let filtering = { onDate, filial, creator };

    return await readOne( filtering );

};

