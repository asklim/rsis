const debug = require( 'debug' )( 'reports:daily' );

const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../helpers' );

const IStorage = require( '../../databases/mongodb/sumdb/daily-reports/daily-reports.interface' );


class DailyReports {

    /**
     * Create a new daily report
     * @returns
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     **/
    static createOne = async function (body) {

        const { client, list } = body;

        if( !client || !list ) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'calalog-layouts.createOne: No body.client or body.list.',
                response: 'Bad request, No body.client or body.list.'
            });
        }

        return await IStorage.createOne( body );
    }


    /**
     * Update daily-report by Query (filial & onDate)
     * - Если и filial и onDate совпадает,
     * то обновляем запись, иначе создаем новую
     * @returns
     * - statusCode 200 OK & response = { message, uuid }
     * - statusCode 201 Created & response = { message, uuid }
     * - statusCode 400 Bad Request & response = message
     * - statusCode 500 Server Error & response = error object
     **/
    static updateOrCreate = async function (body) {

        const {
            filial, onDate,
        } = body;

        if( !filial || !onDate ) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'daily-report.update: No body.filial or body.onDate.',
                response: 'Bad request, No body.filial or body.onDate.'
            });
        }

        //debug( 'salePlaces\n', body.summary.salePlaces );

        const result = await DailyReports.readByQuery({ filial, onDate });
        debug( 'updateOrCreate: statusCode is', result.statusCode );

        if( result.statusCode == HTTP.OK ) {
            // response - это документ
            const { response: report } = result;
            return await IStorage.updateOne( report._id, body );
        }

        return await IStorage.createOne( body );

    }


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
    }


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
     * filial=filialId &
     * onDate=isoDate as YYYY-MM-DD
     **/
    static readByQuery = async function ({ filial, onDate }) {

        if( !filial && !onDate ) {
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

        return await IStorage.readByQuery({ filial, onDate });

    }


    /**
     * Delete daily-report by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteById = async function (reportId) {

        return await IStorage.deleteById( reportId );
    }

}

exports = module.exports = DailyReports;
