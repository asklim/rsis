const debug = require( 'debug' )( 'items-balances' );

const { format } = require( 'util' );
const {
    httpResponseCodes: HTTP,
    //consoleLogger,
    makeResult,
    makeErrorResult,
} = require( '../../../../helpers' );

//const log = consoleLogger( '[items-balances:dbs]' );

const db = require( '../../..' ).getDB( 'sum' );

const ModelItemsBalances = db.model( 'ItemsBalances' );


/**
 * Read a items-balance document by parameters
 * - filtering - передается в Mongoose для отбора элементов
 * @returns
 * - statusCode 200 OK & response= { ...doc }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found   & response= message
 * - statusCode 500 Server Error & response= error object
 **/

module.exports = async function readOne (filtering) {

    try {
        debug( '[dbs.read-one] filtering:', filtering );

        const docs = await ModelItemsBalances.find( filtering );
        // .find возвращает Array, даже если 0 или 1 документ

        if( !docs || docs.length < 1 ) {
            let msg = `[storage] ItemsBalance not found.`;
            return makeResult(
                HTTP.NOT_FOUND,
                `${msg}\nw/filtering: ` + format( '%o', filtering ),
                msg
            );
        }

        const doc = docs[0];
        // doc - структура MongoDB: Query? { $__, _doc, $init, isNew ...}

        return makeResult(
            HTTP.OK,
            `[storage] ItemsBalance got (${doc.uuid}).`,
            { ...doc._doc, }
        );

    }
    catch (err) {
        return makeErrorResult( err );
    }
};

