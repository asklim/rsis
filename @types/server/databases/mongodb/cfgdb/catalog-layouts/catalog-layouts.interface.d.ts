export = ICatalogLayouts;
declare class ICatalogLayouts {
    static createOne: (body: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    static readById: (catalogId: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
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
    static updateOne: (catalogId: any, body: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    static deleteLast: ({ client, list }: {
        client: any;
        list: any;
    }) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    static deleteById: (catalogId: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
}
