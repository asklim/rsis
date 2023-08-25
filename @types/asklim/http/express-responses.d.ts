import { Response, Request } from 'express';
import { ResponseMessage } from '../types';
/**
 * Send content as 'object' ONLY.
 * * res Express response object
 * * status - HTTP Status Code
 * * content - String or Object for transmition to client
 */
export declare function sendJSONResponse(res: Response, status: number, content?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send200Ok(res: Response, ctx?: string): Response<any, Record<string, any>>;
export declare function send201Created(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send204NoContent(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send400BadRequest(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send401UnAuthorized(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send404NotFound(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send405MethodNotAllowed(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send409Conflict(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send500ServerError(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare function send503ServiceUnavailable(res: Response, msg?: ResponseMessage): Response<any, Record<string, any>>;
export declare const callbackError400: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const callbackError405: (req: Request, res: Response) => Response<any, Record<string, any>>;
//# sourceMappingURL=express-responses.d.ts.map