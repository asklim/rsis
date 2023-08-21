export = IA_DailyReports;
declare class IA_DailyReports {
    static createOne: (body: any) => Promise<never>;
    static readById: (documentId: any) => Promise<never>;
    static readByQuery: (query: any) => Promise<never>;
    static updateOne: (documentId: any, body: any) => Promise<never>;
    static deleteById: (documentId: any) => Promise<never>;
}
