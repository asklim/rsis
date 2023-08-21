
//declare const app: import("express-serve-static-core").Express;

declare type Express = import("express-serve-static-core").Express;

export interface RsisExpress extends Express {
    getMyDB (): any;
    logger: any;
}

export declare const app: RsisExpress;
