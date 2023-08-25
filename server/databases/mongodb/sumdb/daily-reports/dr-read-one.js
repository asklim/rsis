const debug = require('debug')('reports:daily');

const { format } = require('util');
const {
    StatusCodes: HTTP,
    //consoleLogger,
} = require('../../../../helpers');

//const log = consoleLogger('dbs-sum:');

const db = require('../../..').getDB('sum');

const DailyReportsModel = db.model('DailyReports');


/**
 * Read a daily report by parameters
 * - filtering - передается в Mongoose для отбора элементов
 * @returns
 * - statusCode 200 OK & response= { ...doc, listType }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found   & response= message
 * - statusCode 500 Server Error & response= error object
 **/

module.exports = async function readOne (filtering) {

    try {

        debug('filtering:', filtering );

        const docs = await DailyReportsModel.find( filtering );
        // .find возвращает Array, даже если 0 или 1 документ

        if( !docs || docs.length < 1 ) {
            let msg = `Daily-report not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg}\nwith filtering: ` + format('%o', filtering ),
                response: msg
            });
        }

        const doc = docs[0];
        // doc - структура MongoDB: Query? { $__, _doc, $init, isNew ...}

        return ({
            statusCode: HTTP.OK,
            logMessage: `SUCCESS: daily-report, uuid:${doc.uuid} readOne is Ok.`,
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
