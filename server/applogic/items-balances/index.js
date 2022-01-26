const debug = require( 'debug' )( 'docs:itemsBalances' );

const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../helpers' );

//const IStorage = require( './storage.interface-abstract' );
const IStorage = require( '../../databases/mongodb/sumdb/items-balances/ib.interface' );


exports = module.exports = class ItemsBalances {

    /**
     * Create a new items balance doc
     * @returns
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     **/
    static createOne = async function (body) {

        const { agent, onDate, items } = body;

        if( !onDate || !agent || !items  ) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'items-balances.createOne: No .onDate, .agent, .items fields.',
                response: 'Bad request, No .onDate, .agent, .items fields.'
            });
        }

        return await IStorage.createOne( body );
    };


    /**
     * Update items-balance by Query (filial & onDate & agent & creator)
     * - Если и filial и onDate и creator и agent совпадает,
     * то обновляем запись, иначе создаем новую
     * @returns
     * - statusCode 200 OK & response = { message, uuid }
     * - statusCode 201 Created & response = { message, uuid }
     * - statusCode 400 Bad Request & response = message
     * - statusCode 500 Server Error & response = error object
     **/
    static updateOrCreate = async function (body) {

        const {
            filial, agent, creator, onDate,
        } = body;

        if( !filial || !onDate || !agent) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'items-balances.update: No .filial or .onDate or .agent fields.',
                response: 'Bad request, No .filial or .onDate or .agent fields.'
            });
        }

        const result = await ItemsBalances.
        readByQuery({ filial, agent, creator, onDate });

        debug( 'updateOrCreate: statusCode is', result.statusCode );

        if( result.statusCode == HTTP.OK ) {
            // response - это документ
            const { response: document } = result;
            return await IStorage.updateOne( document._id, body );
        }

        return await /*IStorage*/ ItemsBalances.createOne( body );
    };


    /**
     * Read a items-balance by the objId or uuid
     * @returns
     * - statusCode 200 OK          & document
     * - statusCode 400 Bad Request & message
     * - statusCode 404 Not Found   & message
     * - statusCode 500 Server Error & error object
     * @usage var.1 |
     * GET /api/ *** /:documentId
     **/
    static readById = async function (documentId) {

        return await IStorage.readById( documentId );
    };


    /**
     * Read a items-balance by the id
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
    static readByQuery = async function (query) {

        const { /*filial, agent,*/ onDate, } = query;

        /*if( !filial && !onDate && !agent ) {
            // Если какой-либо undefined - то ошибка
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'items-balances.readByQuery: No query specified.',
                response: 'No query in request.'
            });
        }*/

        if( onDate && !Date.parse( onDate )) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'items-balances.readByQuery: Bad query.date specified.',
                response: 'Bad query.date in request.'
            });
        }

        return await IStorage.readByQuery( query );

    };


    /**
     * Delete items-balance by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteById = async function (documentId) {

        return await IStorage.deleteById( documentId );
    };

};

