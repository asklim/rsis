//const debug = require('debug')('docs:catalogLayouts');

const {
    StatusCodes: HTTP,
    consoleLogger,
} = require('../../helpers');
const log = consoleLogger('[catalog-layouts:logic]');

//const IStorage = require('./storage.interface-contract');
const IStorage = require('../../databases/mongodb/cfgdb/catalog-layouts/catalog-layouts.interface');
class CatalogLayouts {

    /**
     * Create a new catalog-layout at end of linked list
     * @returns
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     **/
    static createOne = async function createOne (body) {

        const { client, list } = body;

        if( !client || !list ) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'calalog-layouts.createOne: No body.client or body.list.',
                response: 'Bad request, No body.client or body.list.'
            });
        }

        return await IStorage.createOne( body );
    };


    /**
     * Update catalog-layout at end of linked list
     * - Если и client и list и caption и notes совпадает,
     * то обновляем запись, иначе создаем новую
     * @returns
     * - statusCode 200 OK & response = { message, uuid }
     * - statusCode 201 Created & response = { message, uuid }
     * - statusCode 400 Bad Request & response = message
     * - statusCode 500 Server Error & response = error object
     **/
    static updateLastOrCreate = async function (body) {

        const {
            client, list,   // обязательные поля
            caption, notes  // необязательные
        } = body;

        if( !client || !list ) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'calalog-layouts.updateLast: No body.client or body.list.',
                response: 'Bad request, No body.client or body.list.'
            });
        }

        log.debug(`updateLastOrCreate, client=${client}, list=${list}`);

        const { response: last } = await CatalogLayouts.readByQuery({ client, list });

        log.debug('last uuid:', last.uuid );
        //debug( last );

        if( client == last.client && list == last.list
            && caption == last.caption && notes == last.notes ) {

            return await IStorage.updateOne( last._id, body );
        }

        return await IStorage.createOne( body );
    };


    /**
     * Read a catalog-layout by the id
     * @returns
     * - statusCode 200 OK          & document
     * - statusCode 400 Bad Request & message
     * - statusCode 404 Not Found   & message
     * - statusCode 500 Server Error & error object
     * @usage var.1 |
     * GET /api/config/catalog-layouts/:catalogId
     **/
    static readById = async function readById (catalogId) {

        return await IStorage.readById( catalogId );
    };


    /**
     * Read a catalog-layout by the id
     * @fires 200 OK          & document
     * @fires 400 Bad Request & message
     * @fires 404 Not Found   & message
     * @fires 500 Server Error & error object
     * @usage var.2 |
     * GET /api/config/catalog-layouts?queryString
     * @usage var.2 |
     * GET /api/config/catalog-layouts/?queryString
     * @usage queryString:
     * client=clientId &
     * list=listId &
     * listType=listtype &
     * type=typeId &
     * date=isoDate
     **/
    static readByQuery = async function readByQuery ({ client, list, listType, date }) {

        /*if( !listType ) {
            return ( {
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'calalog-layouts.read: Bad query.listType specified.',
                response: 'Bad query.listType in request.'
            });
        }*/

        if( !client && !list ) {
            // Если оба undefined - то ошибка
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'calalog-layouts.readOne: No query specified.',
                response: 'No query in request.'
            });
        }

        if( date && !Date.parse( date )) {
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'calalog-layouts.readOne: Bad query.date specified.',
                response: 'Bad query.date in request.'
            });
        }

        return await IStorage.readByQuery({ client, list, listType, date });
    };


    /**
     * Read a first catalog-layout by client & list
     * @fires 200 OK          & document
     * @fires 400 Bad Request & message
     * @fires 404 Not Found   & message
     * @fires 500 Server Error & error object
    **/
    static readFirst = async function readFirst ({ client, list }) {

        const DATE_BEFORE_ALL = '';
        return await IStorage.readByQuery({ client, list, date: DATE_BEFORE_ALL });
    };


    /**
     * Удаляет из последовательности документы относящиеся к одной дате,
     * оставляет только последний. А надо ли?
     * После реализации updateLastOrCreate, дубликатов с незначительными
     * изменениями быть не должно.
    **/
    static compressList = async function (/*{ client, list }*/) {

    };


    /**
     * Удаляет последний документ в связанном списке
     * и обновляет поля until, next у предыдущего документа
     * Delete last catalog-layout by client & list
     * @statusCode 204 No Content  & { uuid, message }
     * @statusCode 400 Bad Request & message
     * @statusCode 404 Not Found   & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteLast = async function deleteLast ({ client, list }) {

        if( !client && !list ) {
            // Если оба undefined - то ошибка
            return ({
                statusCode: HTTP.BAD_REQUEST,
                logMessage: 'calalog-layouts.deleteOne: No queryString specified.',
                response: 'Bad request. No queryString specified.'
            });
        }

        return await IStorage.deleteLast({ client, list });
    };


    /**
     * Delete catalog-layout by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteById = async function deleteById (catalogId) {

        return await IStorage.deleteById( catalogId );
    };

}

exports = module.exports = CatalogLayouts;
