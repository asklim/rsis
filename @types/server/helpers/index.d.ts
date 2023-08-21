declare const _exports: {
    makeResult: typeof makeResults.makeResult;
    makeErrorResult: typeof makeResults.makeErrorResult;
    icwd: string;
    getProcessEnvWithout: (excludes?: string, isSorted?: boolean, secretKeys?: string[]) => Promise<{}>;
    consoleLogger: (ticker?: string) => {
        trace: (...args: any[]) => void;
        debug: (...args: any[]) => void;
        info: (...args: any[]) => void;
        warn: (...args: any[]) => void;
        error: (...args: any[]) => void;
    };
    sendJSONresponse: typeof httpResponses.sendJSONresponse;
    send200Ok: typeof httpResponses.send200Ok;
    send201Created: typeof httpResponses.send201Created;
    send204NoContent: typeof httpResponses.send204NoContent;
    send400BadRequest: typeof httpResponses.send400BadRequest;
    send401UnAuthorized: typeof httpResponses.send401UnAuthorized;
    send404NotFound: typeof httpResponses.send404NotFound;
    send405MethodNotAllowed: typeof httpResponses.send405MethodNotAllowed;
    send409Conflict: typeof httpResponses.send409Conflict;
    send500ServerError: typeof httpResponses.send500ServerError;
    callbackError400: (req: any, res: any) => void;
    callbackError405: (req: any, res: any) => void;
    httpResponseCodes: any;
};
export = _exports;
import makeResults = require("./make-results.js");
import httpResponses = require("./http-responses.js");
