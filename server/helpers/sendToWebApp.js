const request = require('request');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_CONFLICT = 409;
const HTTP_SERVICE_UNAVAILABLE = 503;

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
  
  request( 
    reqOptions,
    (err, res, /*body*/) =>
    {  
      if(err) {
        callback( HTTP_SERVICE_UNAVAILABLE );
        return;   
      }
      callback( res.statusCode ); 
  });
}


function sendToWebApp (apiRoute, reqBody) {
  let { id, type } = reqBody;
  let docMetaInfo = `type: ${type} id: ${id}`;

  sendTo( apiRoute, "POST", reqBody,
    postStatus => 
    {
      if( postStatus == HTTP_SERVICE_UNAVAILABLE ) {
        console.log('WebApp Service UnAvailable, ' + docMetaInfo);
        return;
      }
 
      if( postStatus == HTTP_CREATED ) {
        console.log('WebApp document Created, ' + docMetaInfo);
        return;
      }
      
      if( postStatus == HTTP_CONFLICT ) { //нельзя создать. Уже существует.
        sendTo( apiRoute, "PUT", reqBody,
          putStatus => 
          {
            if( putStatus == HTTP_OK) {
              console.log('WebApp document Updated, ' + docMetaInfo);
              return;
            }
            console.log('WebApp document sending FAILURE, ' + docMetaInfo);
            return;
        });
      }   
  });
}

module.export = {
  sendToWebApp,
};
