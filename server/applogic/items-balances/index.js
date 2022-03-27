//const debug = require( 'debug' )( '-dbg:itemsBalances:logic' );

const {
    httpResponseCodes: HTTP,
    consoleLogger,
    makeResult,
} = require( '../../helpers' );
const log = consoleLogger( '[items-balances:logic]' );

const MongoStorage = require( '../../databases/mongodb/sumdb/items-balances/ib.interface' );
//const AbstractStorage = require( './storage.interface-abstract' );
//let IStorage = new MongoStorage;

exports = module.exports = class ItemsBalances {

    constructor (StorageInterface=MongoStorage) {
        this._storage = new StorageInterface;
    }

    /**
     * Create a new ItemsBalance doc
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     * @returns {ResultObject} ResultObject
     **/
    async createOne (body) {

        const {
            agent, onDate, items
        } = body;

        if( !onDate || !agent || !items  ) {
            return makeResult(
                HTTP.BAD_REQUEST,
                'ItemsBalances.createOne: No .onDate, .agent, .items fields.',
                'Bad request, No .onDate, .agent, .items fields.'
            );
        }
        return await this._storage.createOne( body );
    }


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
    async updateOrCreate (body) {

        const {
            filial, agent, creator, onDate,
        } = body;

        if( !filial || !onDate || !agent) {
            return makeResult(
                HTTP.BAD_REQUEST,
                'ItemsBalances.update: No .filial or .onDate or .agent fields.',
                'Bad request, No .filial or .onDate or .agent fields.'
            );
        }

        const result = await this.readByQuery({
            filial, agent, creator, onDate
        });

        log.debug( '[updateOrCreate] statusCode is', result.statusCode );

        if( result.statusCode == HTTP.OK ) {
            // response - это документ
            const { response: document } = result;
            return await this._storage.updateOne( document._id, body );
        }

        return await this.createOne( body );
    }


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
    async readById (documentId) {
        return await this._storage.readById( documentId );
    }

    /**
     *
     * @param {*} param0
     * @returns
     */
    async find ({
        onDates, startDate, endDate,
        agent,
        filial,
        creator
    }) {
        if( !onDates && !startDate
            || ( startDate && !Date.parse( startDate ))
            || ( endDate && !Date.parse( endDate )) ) {
            return makeResult(
                HTTP.BAD_REQUEST,
                'ItemsBalances.find: Bad dates in req.query specified.',
                'Bad dates in req.query specified.'
            );
        }
        const filter = {};
        onDates && (filter.onDates = onDates);
        startDate && (filter.startDate = startDate);
        endDate && (filter.endDate = endDate);
        agent && (filter.agent = agent);
        filial && (filter.filial = filial);
        creator && (filter.creator = creator);

        return await this._storage.find( filter );
    }


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
    async readByQuery (query) {

        const { onDate, } = query;

        if( onDate && !Date.parse( onDate )) {
            return makeResult(
                HTTP.BAD_REQUEST,
                'ItemsBalances.readByQuery: Bad query.date specified.',
                'Bad query.date in request.'
            );
        }
        return await this._storage.readByQuery( query );
    }


    /**
     * Delete ItemsBalance by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    async deleteById (documentId) {
        return await this._storage.deleteById( documentId );
    }
};
