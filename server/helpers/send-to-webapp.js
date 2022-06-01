const debug = require( 'debug' )( 'helper:sendToWebApp' );
const axios = require( 'axios' ).default;

const {
    consoleLogger,
    httpResponseCodes: HTTP,
} = require(`../helpers`);

const log = consoleLogger( '[rsis:toWebApp]' );


module.exports.sendToWebApp = function (apiRoute, reqBody) {

    const { id, type, pid } = reqBody;

    const docMetaInfo = `type: ${type} id: ${id} pid: ${pid}`;
    debug( docMetaInfo );

    sendTo( apiRoute, "POST", reqBody ).
    then( (postRes) => {

        const postStatus = postRes.status;

        log.debug( `- POST status = ${postStatus}` );

        if( postStatus == HTTP.CREATED ) {
            return log.info(`SUCCESS: document created (${docMetaInfo})`);
        }

        if( postStatus == HTTP.CONFLICT ) {
            // нельзя создать. Уже существует.
            sendTo( apiRoute, "PUT", reqBody ).
            then( (putRes) => {
                const putStatus = putRes.status;

                log.debug( `- PUT status = ${putStatus}` );
                if( putStatus == HTTP.OK ) {
                    log.info(`SUCCESS: document updated (${docMetaInfo})`);
                }
                else {
                    log.error( 'document sending FAILURE:', docMetaInfo );
                }
            }).
            catch( (err) => {
                log.error( 'document <PUT> FAILURE:', docMetaInfo );
                log.error( err );
            });
        }
    }).
    catch( (err) => {
        log.error( 'document <POST> FAILURE:', docMetaInfo );
        log.error( err );
    });
};



function sendTo (apiRoute, verb, reqBody) {

    let webServerURL = process.env.API_SERVER;
    //debug('sendTo\n', reqBody);

    return axios({
        url: `${webServerURL}${apiRoute}`,
        method: `${verb}`,
        headers: {
            "Content-Type" : "application/json",
            "charset" : "utf-8"
        },
        data: reqBody,
        validateStatus: (status) => status < HTTP.INTERNAL_SERVER_ERROR
    });
}

