// const debug = require('debug')('dbg:items-balances:db');

const { format } = require('util');
const {
    StatusCodes: HTTP,
    consoleLogger,
    makeResult,
    makeErrorResult,
} = require('../../../../helpers/');

const log = consoleLogger('[items-balances:dbs]');

/**
 * Read a ItemsBalance document by parameters
 * @param {Object} filtering - передается в Mongoose для отбора элементов
 * @fires 200 OK & response= { ...doc }
 * @fires 400 Bad Request & response= message
 * @fires 404 Not Found   & response= message
 * @fires 500 Server Error & response= error object
 **/
module.exports = async function readOne (filtering) {

    try {
        log.debug('[read-one] filtering:', filtering );
        // throw new Error(`Test ERROR in ib-readone-injector.`);
        // @ts-ignore
        const storage = this.getModel();

        const docs = await storage.find( filtering ).exec();
        // .find возвращает Array, даже если 0 или 1 документ
        // w/o .exec() - Mongoose#Query { $__, _doc, $init, isNew ...}

        if( !docs || docs.length < 1 ) {
            let msg = `[storage] ItemsBalance not found.`;
            return makeResult(
                HTTP.NOT_FOUND,
                `${msg}\nw/filtering: ` + format('%o', filtering ),
                msg
            );
        }
        // const doc = docs[0];
        return makeResult(
            HTTP.OK,
            `[storage] ItemsBalance got (${docs[0].uuid}).`,
            docs[0]
        );
    }
    catch (err) {
        // debug('err.name:', err.name );
        // debug('err.message:', err.message );
        // debug('err.toString():', err.toString() );
        // log.debug(`err.stack (${err.stack.split('\n').length}):`, err.stack );
        return makeErrorResult( err );
    }
};
