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
export = productsCatalog;
declare const productsCatalog: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    host: string;
    type: "lid2gid" | "main" | "short" | "photo" | "extra" | "operdata";
    updatedAt: Date;
    client: "excel" | "web";
    list: "coffeeTea";
    until: Date;
    items: import("mongoose").Types.DocumentArray<{
        grp: number;
        fhl: number;
        part: number;
        fal: number;
        from?: any;
        lid?: number;
        gid?: number;
        qpul?: number;
        iname?: any;
        netto?: any;
        qpu0?: any;
        validfor?: any;
        kizing?: any;
        kiz4crp?: any;
        refdu?: any;
        ptag1?: any;
        ptag2?: any;
        title?: any;
        grwl?: any;
        cdml?: any;
        netcat?: any;
    }>;
    caption?: string;
    notes?: string;
    since?: Date;
    prev?: import("mongoose").Types.ObjectId;
    next?: import("mongoose").Types.ObjectId;
}>;
import { Schema } from "mongoose";
