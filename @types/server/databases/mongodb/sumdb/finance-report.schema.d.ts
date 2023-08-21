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
export = FinanceReport;
/**
 * @name FinanceReport
 * @summary Week/Quarter Finance Summary Report
 * @description Схема данных о Финансовых Результатах
 * @property {String} type - тип отчета. < 'profit' |  >
 * @property {String} period - < 'week' | 'quarter' >
 * @property {Number Int32} pid   - periodId
 * case period=week: number of week of 21 century: 960 | 1011
 * case period=quarter: 20201 | 20204 | 20211
 * @property {Object} body - данные в зависимости от типа агента
 * @property {String} host      - имя компьютера, сделавшего изменение.
 * @property {Date}   updatedAt - дата изменений
 *
**/
declare const FinanceReport: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    host: string;
    type: "profit";
    updatedAt: Date;
    period: "week" | "quarter";
    pid: number;
    body?: any;
}>;
import { Schema } from "mongoose";
