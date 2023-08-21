export = IItemsBalancesStorage;
declare class IItemsBalancesStorage extends IA_ItemsBalances {
    constructor(modelInterface?: any);
    createOne: (body: any) => any;
    find: (filtering: any) => any;
    deleteById: (documentId: any) => any;
    readOne: (filtering: any) => any;
    updateOne: (documentId: any, body: any) => any;
    setModel(modelInterface: any): void;
    _mongoModel: any;
    getModel(): any;
    readById(reportId: any): Promise<any>;
    readByQuery({ agent, onDate, filial, creator }: {
        agent: any;
        onDate: any;
        filial?: string;
        creator?: string;
    }): Promise<any>;
}
import IA_ItemsBalances = require("../../../../applogic/items-balances/storage.interface-abstract");
