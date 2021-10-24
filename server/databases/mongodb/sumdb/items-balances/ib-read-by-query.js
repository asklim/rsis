//const debug = require( 'debug' )( 'registr:items-balances' );

const readOne = require( './ib-read-one' );

/**
 * Read a items-balance document by meta-parameters
 * @returns
 * - statusCode 200 OK & response= { ...doc }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found   & response= message
 * - statusCode 500 Server Error & response= error object
 **/

module.exports = async function readByQuery ({ agent, onDate, filial='filial1', creator='mainsm' }) {

    let filtering = { agent, onDate, filial, creator };

    return await readOne( filtering );

};

