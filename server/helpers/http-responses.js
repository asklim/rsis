
const { httpResponseCodes: HTTP } = require( `asklim` );

/**
 * Send content as 'object' ONLY.
 * @param {Object} res Express response object
 * @param {Number} status HTTP Status Code
 * @param {*} content String or Object for transmition to client
 */
function sendJSONresponse (res, status, content = 'response is undefined') {

    let response = ( typeof content === 'object' ) ?
        content
        : { 'message': content };
    res.status( status ).json( response );
}


function send200Ok (res, ctx = 'OK') {
    sendJSONresponse( res, HTTP.OK, ctx );
}

function send201Created (res, ctx = 'CREATED') {
    sendJSONresponse( res, HTTP.CREATED, ctx );
}

function send204NoContent (res, ctx = 'NO_CONTENT') {
    sendJSONresponse( res, HTTP.NO_CONTENT, ctx );
}

function send400BadRequest (res, ctx = 'BAD_REQUEST (invalid syntax)') {
    sendJSONresponse( res, HTTP.BAD_REQUEST, ctx );
}

function send401UnAuthorized (res, ctx = 'UnAuthorized') {
    sendJSONresponse( res, HTTP.UNAUTHORIZED, ctx );
}

function send404NotFound (res, ctx = 'NOT_FOUND') {
    sendJSONresponse( res, HTTP.NOT_FOUND, ctx );
}

// Метод запроса не разрешен к использованию для данного URL
function send405MethodNotAllowed (res, ctx = 'METHOD_NOT_ALLOWED') {
    sendJSONresponse( res, HTTP.METHOD_NOT_ALLOWED, ctx );
}

function send409Conflict (res, ctx = 'CONFLICT') {
    sendJSONresponse( res, HTTP.CONFLICT, ctx );
}

function send500ServerError (res, ctx = 'INTERNAL_SERVER_ERROR') {
    sendJSONresponse( res,
        HTTP.INTERNAL_SERVER_ERROR,
        ctx instanceof Error ? ctx.toString() : ctx
    );
}


const callbackError400 = (req, res) => send400BadRequest( res, 'callbackE400' );
const callbackError405 = (req, res) => send405MethodNotAllowed( res, 'callbackE405' );


module.exports = {

    sendJSONresponse,

    send200Ok,
    send201Created,
    send204NoContent,

    send400BadRequest,
    send401UnAuthorized,
    send404NotFound,
    send405MethodNotAllowed,
    send409Conflict,

    send500ServerError,

    callbackError400,
    callbackError405,
};
