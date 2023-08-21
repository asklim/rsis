export = IDailyReports;
declare class IDailyReports extends IA_DailyReports {
    static createOne: (body: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    static readById: (reportId: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    static readByQuery: ({ onDate, filial, creator }: {
        onDate: any;
        filial?: string;
        creator?: string;
    }) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    static updateOne: (reportId: any, body: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
    static deleteById: (reportId: any) => Promise<{
        statusCode: any;
        logMessage: any;
        response: any;
    }>;
}
import IA_DailyReports = require("../../../../applogic/daily-reports/storage.interface-abstract");
