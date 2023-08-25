const debug = require('debug')('-dbg:items-balances:db');

const { format } = require('util');
const {
    StatusCodes: HTTP,
    consoleLogger,
    makeResult,
    makeErrorResult,
} = require('../../../../helpers/');

const log = consoleLogger('[items-balances:dbs]');

/**
 * Find a ItemsBalance documents by parameters
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
module.exports = async function find (filtering) {

    const projection = {
        agent: 1,
        onDate: 1,
        filial: 1,
        creator: 1,
        caption: 1,
        notes: 1
    };

    try {
        log.debug('[find] filtering:', filtering );

        const filter = makeFilter( filtering );

        const storage = this.getModel();

        const docs = await storage.find( filter, projection ).exec();
        // .find возвращает Array, даже если 0 или 1 документ

        if( !docs || docs.length < 1 ) {
            let msg = `[storage] ItemsBalance not found.`;
            return makeResult(
                HTTP.NOT_FOUND,
                `${msg}\nw/filtering: ` + format('%o', filtering ),
                msg
            );
        }

        return makeResult(
            HTTP.OK,
            `[storage] ItemsBalance got (${docs.length} docs).`,
            {
                total: docs.length,
                list: docs,
            }
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


function makeFilter({
    agent,
    onDates,
    filial,
    creator
}) {
    const filter = {};
    const dates = onDates?.split('/');
    if( dates ) {
        const startDate = shortISODate( dates[0] );
        const endDate = dates[1] ?? (shortISODate( dates[1]) || startDate );

        filter.onDate = { $gte: startDate, $lte: endDate };
    }

    agent && (filter.agent = agent);
    filial && (filter.filial = filial);
    creator && (filter.creator = creator);

    debug('[find] filter:', filter );
    return filter;
}


function shortISODate( dt ) {
    return (new Date( dt )).toISOString().split('T')[0];
}
