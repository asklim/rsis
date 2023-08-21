export = CatalogLayouts;
declare class CatalogLayouts {
    /**
     * Create a new catalog-layout at end of linked list
     * @returns
     * @statusCode 201 Created & { message, uuid }
     * @statusCode 400 Bad Request & message
     * @statusCode 500 Server Error & error object
     **/
    static createOne: (body: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
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
    static updateLastOrCreate: (body: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
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
    static readById: (catalogId: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
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
    static readByQuery: ({ client, list, listType, date }: {
        client: any;
        list: any;
        listType: any;
        date: any;
    }) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    /**
     * Read a first catalog-layout by client & list
     * @fires 200 OK          & document
     * @fires 400 Bad Request & message
     * @fires 404 Not Found   & message
     * @fires 500 Server Error & error object
    **/
    static readFirst: ({ client, list }: {
        client: any;
        list: any;
    }) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    /**
     * Удаляет из последовательности документы относящиеся к одной дате,
     * оставляет только последний. А надо ли?
     * После реализации updateLastOrCreate, дубликатов с незначительными
     * изменениями быть не должно.
    **/
    static compressList: () => Promise<void>;
    /**
     * Удаляет последний документ в связанном списке
     * и обновляет поля until, next у предыдущего документа
     * Delete last catalog-layout by client & list
     * @statusCode 204 No Content  & { uuid, message }
     * @statusCode 400 Bad Request & message
     * @statusCode 404 Not Found   & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteLast: ({ client, list }: {
        client: any;
        list: any;
    }) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    /**
     * Delete catalog-layout by uuid or ObjId
     * @statusCode 204 No Content & { uuid, message }
     * @statusCode 404 Not Found & message
     * @statusCode 500 Server Error & error object
     **/
    static deleteById: (catalogId: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
}
