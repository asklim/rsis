//const debug = require('debug')('reports:daily');

const { format } = require('util');
const UUID = require('uuid');
const { StatusCodes: HTTP } = require('../../../../helpers');

const db = require('../../..').getDB('sum');

const ModelDailyReports = db.model('DailyReports');


/**
 * Delete daily-report by uuid or ObjId
 * @returns
 * - statusCode 204 No Content & { message, uuid }
 * - statusCode 404 Not Found & message
 * - statusCode 500 Server Error & error object
 **/

module.exports = async function deleteById (reportId) {

    try {
        const filtering = UUID.validate( reportId )
            ? { uuid: reportId }
            : { _id: reportId };

        const doc = await ModelDailyReports.findOne( filtering );

        if( !doc ) {
            let msg = `Daily Report not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg} w/filter: ` + format('%o', filtering ),
                response: msg
            });
        }

        const { uuid } = await ModelDailyReports.findOneAndDelete( filtering );

        return ({
            statusCode: HTTP.NO_CONTENT,
            logMessage: `SUCCESS: daily-report w/uuid:${uuid} deleted.`,
            response: {
                message: `daily-report w/uuid:${uuid} deleted successful.`,
                uuid,
            }
        });
    }
    catch (err) {
        return ({
            statusCode: HTTP.INTERNAL_SERVER_ERROR,
            // @ts-ignore
            logMessage: err.message,
            response: err
        });
    }

};
