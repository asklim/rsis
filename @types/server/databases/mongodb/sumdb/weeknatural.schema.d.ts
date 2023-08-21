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
export = WeekNatural;
/**
 * @name WeekNatural
 * @summary Week Summary Natural
 * @description Схема данных для расчета закупки
 * @property {Number} id   - number of week of 21 century
 * @property {String} type - тип отчета. ????
 * @property {String} host      - имя компьютера, сделавшего изменение.
 * @property {Date}   updatedAt - дата изменений
 * @property {Object} body - данные в зависимости от типа агента
 *
**/
declare const WeekNatural: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    host: string;
    id: number;
    type: string;
    body: import("mongoose").Types.DocumentArray<{
        name: string;
        gid: string;
        gr: string;
        qpu: number;
        from?: string;
        frAct?: number;
        fqL?: number;
        fqA?: number;
        fqM?: number;
        valid?: number;
    }>;
    updatedAt: Date;
}>;
import { Schema } from "mongoose";
