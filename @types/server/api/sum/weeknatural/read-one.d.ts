export = readOne;
/**
 * @name readOne
 * @description
 * Read a week summary Natural info
 * by the XXI century weekId or 'last'
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * GET /api/sum/weeknatural/:weekId
 * @example
 * GET /api/sum/weeknatural/960
 * GET /api/sum/weeknatural/1011
 * GET /api/sum/weeknatural/last
 *
**/
declare function readOne(req: any, res: any): any;
