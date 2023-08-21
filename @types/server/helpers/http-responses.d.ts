/**
 * Send content as 'object' ONLY.
 * @param {Object} res Express response object
 * @param {Number} status HTTP Status Code
 * @param {*} content String or Object for transmition to client
 */
export function sendJSONresponse(res: any, status: number, content?: any): void;
export function send200Ok(res: any, ctx?: string): void;
export function send201Created(res: any, ctx?: string): void;
export function send204NoContent(res: any, ctx?: string): void;
export function send400BadRequest(res: any, ctx?: string): void;
export function send401UnAuthorized(res: any, ctx?: string): void;
export function send404NotFound(res: any, ctx?: string): void;
export function send405MethodNotAllowed(res: any, ctx?: string): void;
export function send409Conflict(res: any, ctx?: string): void;
export function send500ServerError(res: any, ctx?: string): void;
export function callbackError400(req: any, res: any): void;
export function callbackError405(req: any, res: any): void;
