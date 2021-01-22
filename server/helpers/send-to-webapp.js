var debug = require('debug')('helper:sendToWebApp');
const request = require('request');

const icwd = require('fs').realpathSync(process.cwd());
const HTTP = require(`${icwd}/src/config/http-response-codes`);
/*
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_CONFLICT = 409;
const HTTP_SERVICE_UNAVAILABLE = 503;
*/

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
    (err, res, /*body*/) =>
    {  
      if(err) {
        callback( HTTP.SERVICE_UNAVAILABLE );
        return;   
      }
      callback( res.statusCode ); 
  });
}


module.exports.sendToWebApp = (apiRoute, reqBody) => 
{
  let { id, type, pid } = reqBody;
  let docMetaInfo = ` - type: ${type} id: ${id} pid: ${pid}`;
  debug( docMetaInfo );

  sendTo( apiRoute, "POST", reqBody,
    postStatus => 
    {
      debug( ' - POST - %d', postStatus );
      if( postStatus == HTTP.SERVICE_UNAVAILABLE ) {
        console.log( 'WebApp Service UnAvailable, ' + docMetaInfo );
        return;
      }
 
      if( postStatus == HTTP.CREATED ) {
        console.log( 'WebApp document Created, ' + docMetaInfo );
        return;
      }
      
      if( postStatus == HTTP.CONFLICT ) { //нельзя создать. Уже существует.
        sendTo( apiRoute, "PUT", reqBody,
          putStatus => 
          {
            debug( 'sendToWebApp - PUT - %d', putStatus );
            if( putStatus == HTTP.OK ) {
              console.log( 'WebApp document Updated, ' + docMetaInfo );
              return;
            }
            console.log( 'WebApp document sending FAILURE, ' + docMetaInfo );
            return;
        });
      }   
  });
};

/*
module.export = {
  sendToWebApp,
};*/
