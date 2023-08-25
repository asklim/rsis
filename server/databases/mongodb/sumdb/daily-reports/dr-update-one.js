const debug = require('debug')('reports:daily');
const UUID = require('uuid');

const { StatusCodes: HTTP } = require('../../../../helpers');

const db = require(`../../..`).getDB('sum');
const DailyReports = db.model('DailyReports');

/**
 * Update a daily-report by uuid or ObjId
 * @returns
 * - statusCode 200 OK & response= { message, uuid }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 500 Server Error & response= error object
 */

module.exports = async function updateOne (reportId, body) {

    try {
        /** TODO: body validation ???? */
        const { summary, topSales, topProfit, caption, notes, host } = body;

        const $set = Object.assign({}, {
            summary,
            topSales, topProfit,
            caption, notes,
            host,
            updatedAt: Date.now()
        });
        const $inc = { __v: 1 };

        const filtering = UUID.validate( reportId )
            ? { uuid: reportId }
            : { _id: reportId };

        debug('filtering:', filtering );

        const { uuid } = await DailyReports.
            findOneAndUpdate( filtering, { $set, $inc }, { new: true } );

        debug('updated-doc`s uuid:', uuid );

        return ({
            statusCode: HTTP.OK,
            logMessage: `SUCCESS: daily-report with uuid:${uuid} updated.`,
            response: {
                message: `daily-report with uuid:${uuid} updated successful.`,
                uuid,
            }
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
