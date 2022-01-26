const debug = require( 'debug' )( 'registr:items-balances' );

const { format } = require( 'util' );
const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../../../helpers' );

//const log = consoleLogger( 'dbs-sum:' );

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

        debug( '[read-one] filtering:', filtering );

        const docs = await ModelItemsBalances.find( filtering );
        // .find возвращает Array, даже если 0 или 1 документ

        if( !docs || docs.length < 1 ) {
            let msg = `Items-Balance not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg}\nw/filtering: ` + format( '%o', filtering ),
                response: msg
            });
        }

        const doc = docs[0];
        // doc - структура MongoDB: Query? { $__, _doc, $init, isNew ...}

        return ({
            statusCode: HTTP.OK,
            logMessage: `SUCCESS: readOne: items-balance document w/uuid:${doc.uuid}.`,
            response: { ...doc._doc, }
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

