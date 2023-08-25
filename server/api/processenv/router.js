
const {
    callbackError405,
} = require('../../helpers/');

const handler_GET = require('./handler-get.js');
//const options = require('./options');

// Это ответ на запрос OPTIONS
// Access-Control-Allow-Methods - ответ Express
// GET,HEAD,PUT,PATCH,POST,DELETE
// Дополнительно - есть ответ:
// COPY,LINK,UNLINK,PURGE,LOCK,UNLOCK,PROPFIND
// Нет ответа на запрос VIEW

/**
* Read a env variable from process.env by name
* GET /api/config/processenv?name=<var_name>
*/
module.exports = function ( router ) {

    const envPath = '/processenv';

    //router.get(`${envPath}/:name`, handler_GET );
    router.get( envPath, handler_GET );
    router.all( envPath, callbackError405 );

    //router.options( envPath, options );
    //router.post( envPath, callbackError405 );
    //router.put( envPath, callbackError405 );
    //router.delete( envPath, callbackError405 );

};
