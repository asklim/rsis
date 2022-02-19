const debug = require( 'debug' )( 'helper:sendToWebApp' );
const request = require( 'request' );

const {
    //icwd,
    consoleLogger,
    httpResponseCodes: HTTP,
} = require(`../helpers`);

const log = consoleLogger( '[rsis:toWebApp]' );


module.exports.sendToWebApp = function (apiRoute, reqBody) {

    const { id, type, pid } = reqBody;

    const docMetaInfo = `- type: ${type} id: ${id} pid: ${pid}`;
    debug( docMetaInfo );

    sendTo(
        apiRoute,
        "POST",
        reqBody,
        (postStatus) => {

            log.debug( `- POST status = ${postStatus}` );
            if( postStatus >= HTTP.INTERNAL_SERVICE_ERROR ) {
                return log.error( 'Service Error, ' + docMetaInfo );
            }

            if( postStatus == HTTP.CREATED ) {
                return log.info( 'SUCCESS: document Created, ' + docMetaInfo );
            }

            if( postStatus == HTTP.CONFLICT ) {
            // нельзя создать. Уже существует.
                sendTo(
                    apiRoute,
                    "PUT",
                    reqBody,
                    (putStatus) => {

                        log.debug( `- PUT status = ${putStatus}` );
                        if( putStatus == HTTP.OK ) {
                            log.info( 'SUCCESS: document Updated, ' + docMetaInfo );
                        }
                        else {
                            log.error( 'document sending FAILURE, ' + docMetaInfo );
                        }
                    }
                );
            }
        }
    );
};



function sendTo (apiRoute, verb, reqBody, callback) {

    let webServerURL = process.env.API_SERVER;

    const reqOptions = {
        url : `${webServerURL}${apiRoute}`,
        method : `${verb}`,
        headers : {
            "Content-Type" : "application/json",
            "charset" : "utf-8"
        },
        json : reqBody,
        qs : {},
    };
    //debug('sendTo\n', reqBody);

    request(
        reqOptions,
        (err, res, /*body*/) => {

            if( err ) {
                return callback( HTTP.SERVICE_UNAVAILABLE );
            }
            return callback( res.statusCode );
        }
    );
}

