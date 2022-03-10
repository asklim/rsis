const debug = require( 'debug' )( '_dbg_:items-balances:db' );

const { format } = require( 'util' );
const {
    httpResponseCodes: HTTP,
    // consoleLogger,
    makeResult,
    makeErrorResult,
} = require( '../../../../helpers' );

// const log = consoleLogger( '[items-balances:dbs]' );


module.exports = function injector( IClass ) {

    /**
     * Read a items-balance document by parameters
     * @param {Object} filtering - передается в Mongoose для отбора элементов
     * @returns {Object} ResultMessage
     * @returns {Number} ResultMessage.statusCode
     * @returns {String} ResultMessage.logMessage
     * @returns {*} ResultMessage.response
     * @statusCode 200 OK & response= { ...doc }
     * @statusCode 400 Bad Request & response= message
     * @statusCode 404 Not Found   & response= message
     * @statusCode 500 Server Error & response= error object
     **/
    async function readOne (filtering) {

        try {
            debug( '[read-one] filtering:', filtering );
            // throw new Error( `Test ERROR in ib-readone-injector.`);
            const ItemsBalances = IClass.getModel();

            const docs = await ItemsBalances.find( filtering );
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
            // doc - структура Mongoose#Query { $__, _doc, $init, isNew ...}

            return makeResult(
                HTTP.OK,
                `[storage] ItemsBalance got (${doc.uuid}).`,
                { ...doc._doc, }
            );

        }
        catch (err) {
            // debug( 'err.name:', err.name );
            // debug( 'err.message:', err.message );
            // debug( 'err.toString():', err.toString() );
            // log.debug( `err.stack (${err.stack.split('\n').length}):`, err.stack );
            return makeErrorResult( err );
        }
    }
    return readOne;
};
