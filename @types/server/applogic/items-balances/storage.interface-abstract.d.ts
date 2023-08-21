export = IA_ItemBalances;
declare class IA_ItemBalances {
    /**
     *
     * @param {Object} body
     * @param {String} body.filial
     * @param {String} body.agent
     * @param {String} body.creator
     * @param {String} body.onDate - ISO date
     * @param {Map<String,Object>} body.items
     */
    createOne(body: {
        filial: string;
        agent: string;
        creator: string;
        onDate: string;
        items: Map<string, any>;
    }): Promise<void>;
    readById(documentId: any): Promise<void>;
    readByQuery(query: any): Promise<void>;
    updateOne(documentId: any, body: any): Promise<void>;
    deleteById(documentId: any): Promise<void>;
}
