/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
export = dailyReport;
declare const dailyReport: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    host: string;
    onDate: string;
    filial: "frm" | "filial1" | "filial2";
    creator: "mainsm" | "rsisjs";
    summary: {
        profit: number;
        costOfSales: number;
        revenue: number;
        invoices: number;
        usdRate: number;
        salePlaces: import("mongoose").Types.DocumentArray<{
            profit: number;
            place: string;
            seller: string;
            revenue: number;
            invoices: number;
            costs: number;
        }>;
    };
    topSales: import("mongoose").Types.DocumentArray<{
        revenue: number;
        daySold: number;
        soldBy: any;
        name?: string;
        group?: number;
        gid?: number;
    }>;
    topProfit: import("mongoose").Types.DocumentArray<{
        profit: number;
        name?: string;
        group?: number;
        gid?: number;
    }>;
    updatedAt?: Date;
    caption?: string;
    notes?: string;
    uuid?: string;
    created?: Date;
}>;
import { Schema } from "mongoose";
