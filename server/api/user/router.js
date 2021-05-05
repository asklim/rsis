const 
    register = require( './register' ),
    login = require( './login' )
;

/*  
 * api for user register: /api/user/register 
 *            user login: /api/user/login
 **/
module.exports = function (router) {

    router.post( '/user/register', register );
    router.post( '/user/login', login );
};

