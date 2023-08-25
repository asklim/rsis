//const debug = require('debug')('reports:daily');

const {
    StatusCodes: HTTP,
    consoleLogger,
} = require('../../helpers');
const log = consoleLogger('[daily-reports:logic]');

const MongoStorage = require('../../databases/mongodb/sumdb/daily-reports/daily-reports.interface');
let IStorage = MongoStorage;

exports = module.exports = class DailyReports {

    static setStorage = function (storageInterface=MongoStorage) {
        IStorage = storageInterface;
    };

    /**
     * Create a new daily report
     * @returns
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     **/
    static createOne = async function (body) {

        if( !body.onDate  ) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'daily-report.createOne: No body.onDate.',
                response: 'Bad request, No body.onDate.'
            });
        }

        return await IStorage.createOne( body );
    };


    /**
     * Update daily-report by Query (filial & onDate)
     * - Если и filial и onDate и creator совпадает,
     * то обновляем запись, иначе создаем новую
     * @returns
     * - statusCode 200 OK & response = { message, uuid }
     * - statusCode 201 Created & response = { message, uuid }
     * - statusCode 400 Bad Request & response = message
     * - statusCode 500 Server Error & response = error object
     **/
    static updateOrCreate = async function (body) {

        const {
            filial, creator, onDate,
        } = body;

        if( !filial || !onDate ) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'daily-report.update: No body.filial or body.onDate.',
                response: 'Bad request, No body.filial or body.onDate.'
            });
        }

        const result = await DailyReports.readByQuery({ filial, creator, onDate });
        log.debug('updateOrCreate, statusCode is', result.statusCode );

        if( result.statusCode == HTTP.OK ) {
            // response - это документ
            const { response: report } = result;
            return await IStorage.updateOne( report._id, body );
        }

        return await IStorage.createOne( body );
    };


    /**
     * Read a daily-report by the objId or uuid
     * @returns
     * - statusCode 200 OK          & document
     * - statusCode 400 Bad Request & message
     * - statusCode 404 Not Found   & message
     * - statusCode 500 Server Error & error object
     * @usage var.1 |
     * GET /api/reports/daily/:reportId
     **/
    static readById = async function (reportId) {

        return await IStorage.readById( reportId );
    };


    /**
     * Read a daily-report by the id
     * @fires 200 OK          & document
     * @fires 400 Bad Request & message
     * @fires 404 Not Found   & message
     * @fires 500 Server Error & error object
     * @usage var.2 |
     * GET /api/reports/daily?queryString
     * @usage var.2 |
     * GET /api/reports/daily/?queryString
     * @usage queryString:
     * filial=filialId & creator=rsisjs
     * onDate=isoDate as YYYY-MM-DD
     **/
    static readByQuery = async function (query) {

        const { onDate } = query;

        if( !onDate ) {
            // Если оба undefined - то ошибка
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'daily-reports.readByQuery: No query specified.',
                response: 'No query in request.'
            });
        }

        if( onDate && !Date.parse( onDate )) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'daily-reports.readByQuery: Bad query.date specified.',
                response: 'Bad query.date in request.'
            });
        }

        return await IStorage.readByQuery( query );
    };


    /**
     * Delete daily-report by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteById = async function (reportId) {

        return await IStorage.deleteById( reportId );
    };
};
