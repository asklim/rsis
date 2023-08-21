export = DailyReports;
declare class DailyReports {
    static setStorage: (storageInterface?: any) => void;
    /**
     * Create a new daily report
     * @returns
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     **/
    static createOne: (body: any) => Promise<any>;
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
    static updateOrCreate: (body: any) => Promise<any>;
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
    static readById: (reportId: any) => Promise<any>;
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
    static readByQuery: (query: any) => Promise<any>;
    /**
     * Delete daily-report by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteById: (reportId: any) => Promise<any>;
}
