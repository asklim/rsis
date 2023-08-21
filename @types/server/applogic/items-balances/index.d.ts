export = ItemsBalances;
declare class ItemsBalances {
    constructor(StorageInterface?: {
        new (modelInterface?: any): MongoStorage;
    });
    _storage: MongoStorage;
    /**
     * Create a new ItemsBalance doc
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     * @returns {ResultObject} ResultObject
     **/
    createOne(body: any): ResultObject;
    /**
     * Update ItemsBalance by Query
     * - Query = (filial & onDate & agent & creator)
     * - Если и filial и onDate и creator и agent совпадает,
     * то обновляем запись, иначе создаем новую
     * @returns
     * - statusCode 200 OK & response = { message, uuid }
     * - statusCode 201 Created & response = { message, uuid }
     * - statusCode 400 Bad Request & response = message
     * - statusCode 500 Server Error & response = error object
     **/
    updateOrCreate(body: any): Promise<any>;
    /**
     * Read a ItemsBalance by the objId or uuid
     * @returns
     * - statusCode 200 OK          & document
     * - statusCode 400 Bad Request & message
     * - statusCode 404 Not Found   & message
     * - statusCode 500 Server Error & error object
     * @usage var.1 |
     * GET /api/ *** /:documentId
     **/
    readById(documentId: any): Promise<any>;
    /**
     *
     * @param {*} param0
     * @returns
     */
    find({ onDates, startDate, endDate, agent, filial, creator }: any): Promise<any>;
    /**
     * Read a ItemsBalance by the id
     * @fires 200 OK          & document
     * @fires 400 Bad Request & message
     * @fires 404 Not Found   & message
     * @fires 500 Server Error & error object
     * @param {String} query.filial - Level1: filial1 or frm
     * @param {String} query.agent - Level2: f1, wh1, wh0
     * @param {String} query.onDate - isoDate as "YYYY-MM-DD"
     * @usage GET /api/registr/items-balances/?queryString
     * @usage queryString:
     * filial=filialId & onDate=isoDate & agent=agentId
     **/
    readByQuery(query: any): Promise<any>;
    /**
     * Delete ItemsBalance by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    deleteById(documentId: any): Promise<any>;
}
import MongoStorage = require("../../databases/mongodb/sumdb/items-balances/ib.interface");
